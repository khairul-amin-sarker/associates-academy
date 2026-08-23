import {
  CheckCircle2,
  CircleCheck,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import {
  CheckoutReferenceFooter,
  CheckoutReferenceHeader,
} from "@/components/checkout/checkout-reference-chrome";
import { getVerifiedAuthContext } from "@/lib/auth";
import { businessInfo } from "@/lib/content/legal";
import {
  createPublicServerClient,
  hasSupabaseConfig,
} from "@/lib/supabase/server";

type CourseProduct = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  price: number;
  compareAtPrice: number | null;
  outcomes: string[];
};

// These records only render when the local development auth demo is enabled.
// Production checkout always loads the published product and course rows below.
const demoCourses: CourseProduct[] = [
  {
    id: 1,
    slug: "income-tax-working-framework",
    title: "Fundamentals of Income Tax Act, 2023",
    summary: "৬ Live Class · Bangla · Certificate",
    price: 1710,
    compareAtPrice: 3000,
    outcomes: [
      "Live Class",
      "PDF Notes",
      "Slides",
      "Recording",
      "Certificate",
      "WhatsApp Support",
    ],
  },
  {
    id: 3,
    slug: "practical-paper-return-e-return-filing",
    title: "Practical Paper Return & E-Return Filing Course",
    summary: "Paper Return + NBR E-Return · Bangla",
    price: 1600,
    compareAtPrice: 2000,
    outcomes: [
      "Document Verification",
      "Income Classification",
      "Tax Computation",
      "IT10B / IT10BB",
      "Paper Return",
      "NBR E-Return",
    ],
  },
];

function amount(value: number) {
  return new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 }).format(
    value,
  );
}

function outcomes(value: unknown) {
  return Array.isArray(value)
    ? value.filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      )
    : [];
}

export default async function CourseCheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const auth = await getVerifiedAuthContext();
  let product: CourseProduct | null = null;
  let profile: {
    full_name: string | null;
    phone: string | null;
    whatsapp_number: string | null;
    occupation: string | null;
    city: string | null;
  } | null = null;
  let enrolled = false;
  const useDemoCatalog =
    !hasSupabaseConfig() ||
    (process.env.NODE_ENV === "development" &&
      process.env.LOCAL_DEMO_CATALOG === "true");

  if (useDemoCatalog) {
    product = demoCourses.find((course) => course.slug === slug) ?? null;
  } else {
    const catalog = auth?.supabase ?? createPublicServerClient();
    const { data } = await catalog
      .from("products")
      .select(
        "id,slug,title,summary,price,compare_at_price,courses(learning_outcomes)",
      )
      .eq("slug", slug)
      .eq("product_type", "course")
      .eq("is_published", true)
      .maybeSingle();
    if (data) {
      const course = data.courses as unknown as {
        learning_outcomes: unknown;
      } | null;
      product = {
        id: data.id,
        slug: data.slug,
        title: data.title,
        summary: data.summary,
        price: Number(data.price),
        compareAtPrice:
          data.compare_at_price === null ? null : Number(data.compare_at_price),
        outcomes: outcomes(course?.learning_outcomes),
      };
      const [{ data: profileData }, { data: enrollment }] = auth?.supabase
        ? await Promise.all([
            auth.supabase
              .from("profiles")
              .select("full_name,phone,whatsapp_number,occupation,city")
              .eq("id", auth.userId)
              .maybeSingle(),
            auth.supabase
              .from("enrollments")
              .select("id")
              .eq("user_id", auth.userId)
              .eq("product_id", data.id)
              .eq("status", "active")
              .maybeSingle(),
          ])
        : [{ data: null }, { data: null }];
      profile = profileData;
      enrolled = Boolean(enrollment);
    }
  }

  if (!product) notFound();
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100,
        )
      : null;

  return (
    <>
      <CheckoutReferenceHeader />
      <main className="mx-auto max-w-6xl bg-[#f1e7d6] px-4 py-8 sm:py-12">
        <h1 className="font-heading text-brand-navy text-3xl font-extrabold sm:text-4xl">
          Checkout
        </h1>
        <p className="text-brand-blue mt-1">
          ভর্তি চূড়ান্ত করতে নিচের ফর্মটি পূরণ করুন।
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <aside className="space-y-4">
            <article className="border-border overflow-hidden rounded-3xl border bg-white shadow-[0_8px_24px_-12px_rgb(17_24_68_/_18%),0_2px_6px_-2px_rgb(17_24_68_/_8%)]">
              <div className="gradient-navy relative p-5 text-white">
                <div className="course-bg-dots-navy absolute inset-0 opacity-60" />
                <div className="relative">
                  <p className="text-xs tracking-widest text-white/70 uppercase">
                    Course
                  </p>
                  <h2 className="font-heading mt-1 text-xl font-extrabold">
                    {product.title}
                  </h2>
                  <p className="mt-0.5 line-clamp-1 text-sm text-white/70">
                    {product.summary ?? "Live Class · Bangla · Certificate"}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-brand-blue text-sm">Regular Price</span>
                  {product.compareAtPrice ? (
                    <span className="text-red-500 line-through">
                      ৳{amount(product.compareAtPrice)}
                    </span>
                  ) : (
                    <span />
                  )}
                </div>
                <div className="mt-1 flex items-baseline justify-between gap-4">
                  <span className="font-semibold">Offer Price</span>
                  <span className="font-heading text-brand-indigo text-2xl font-black">
                    ৳{amount(product.price)}
                  </span>
                </div>
                {discount ? (
                  <span className="bg-brand-gold/15 text-brand-gold mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold">
                    {amount(discount)}% OFF
                  </span>
                ) : null}
                {product.outcomes.length ? (
                  <ul className="mt-4 space-y-2 text-sm">
                    {product.outcomes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CircleCheck
                          className="text-brand-indigo h-4 w-4"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
            <div className="border-border bg-secondary flex gap-2 rounded-2xl border p-4 text-sm">
              <ShieldCheck
                className="text-brand-indigo mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              Browser result নয়—PayStation status server থেকে verify হলেই
              payment confirmed হবে। এরপর login/account তৈরি করে access নিন।
            </div>
          </aside>

          <section>
            {enrolled ? (
              <div className="border-border rounded-3xl border bg-white p-6 text-center shadow-[0_20px_40px_-24px_rgb(17_24_68_/_35%)]">
                <CheckCircle2
                  className="mx-auto h-12 w-12 text-emerald-600"
                  aria-hidden="true"
                />
                <h2 className="font-heading mt-4 text-2xl font-extrabold">
                  আপনি ইতিমধ্যে এই কোর্সে যুক্ত আছেন
                </h2>
                <p className="text-brand-blue mt-2 text-sm">
                  আপনার learning workspace থেকে class, materials ও progress
                  দেখুন।
                </p>
                <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href={`/dashboard/courses/${product.slug}`}
                    className="focus-ring bg-brand-indigo rounded-xl px-5 py-3 text-sm font-bold text-white"
                  >
                    কোর্স workspace দেখুন
                  </Link>
                  <Link
                    href="/dashboard"
                    className="focus-ring border-border rounded-xl border px-5 py-3 text-sm font-bold"
                  >
                    Student dashboard-এ যান
                  </Link>
                </div>
              </div>
            ) : (
              <CheckoutForm
                productSlug={product.slug}
                emailLocked={Boolean(auth?.email)}
                defaultValues={{
                  name: profile?.full_name ?? "",
                  email: auth?.email ?? "",
                  phone: profile?.phone ?? "",
                  whatsappNumber: profile?.whatsapp_number ?? "",
                  occupation: profile?.occupation ?? "",
                  city: profile?.city ?? "",
                }}
              />
            )}
          </section>
        </div>
      </main>
      <a
        href={businessInfo.phoneHrefs[0]}
        aria-label="WhatsApp support"
        className="fixed right-4 bottom-20 z-30 grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-lg hover:scale-105 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <CheckoutReferenceFooter
        courseTitle={product.title}
        courseSummary={product.summary}
      />
    </>
  );
}
