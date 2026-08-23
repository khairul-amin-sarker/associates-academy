import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseLanding } from "@/components/marketing/course-landing";
import { PracticalReturnCoursePage } from "@/components/marketing/practical-return-course-page";
import {
  practicalReturnCourse,
  practicalReturnCoursePath,
} from "@/lib/content/practical-return-course";
import {
  createPublicServerClient,
  hasSupabaseConfig,
} from "@/lib/supabase/server";

type Props = { params: Promise<{ slug: string }> };
type PracticalCourseCommerce = {
  price: number;
  regularPrice: number | null;
};

export const dynamic = "force-dynamic";

async function getPracticalCourseCommerce(): Promise<PracticalCourseCommerce | null> {
  if (!hasSupabaseConfig()) return null;

  const { data } = await createPublicServerClient()
    .from("products")
    .select("price,compare_at_price")
    .eq("slug", practicalReturnCourse.productSlug)
    .eq("product_type", "course")
    .eq("is_published", true)
    .maybeSingle();

  if (!data) return null;
  return {
    price: Number(data.price),
    regularPrice:
      data.compare_at_price === null ? null : Number(data.compare_at_price),
  };
}

export function generateStaticParams() {
  return [
    { slug: "income-tax-working-framework" },
    { slug: practicalReturnCourse.slug },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === practicalReturnCourse.slug) {
    const title =
      "Practical Paper Return & NBR E-Return Filing Course | Finance Act 2026";
    const description =
      "Finance Act 2026 ও Assessment Year 2026–2027 অনুযায়ী হাতে-কলমে Income Tax Return Filing শিখুন। Client documents যাচাই, 7 Heads of Income, Tax Computation, TDS/AIT, Tax Rebate, IT10B, IT10BB, Paper Return ও NBR e-Return submission—একটি complete client case দিয়ে।";

    return {
      title,
      description,
      alternates: { canonical: practicalReturnCoursePath },
      openGraph: {
        type: "website",
        locale: "bn_BD",
        title: `${title} | Associates Academy`,
        description,
        url: practicalReturnCoursePath,
        images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Associates Academy`,
        description,
        images: ["/opengraph-image"],
      },
    };
  }
  if (slug !== "income-tax-working-framework") return {};
  return {
    title: "Fundamentals of Income Tax Act, 2023",
    description:
      "Act থেকে Return—complete practical Income Tax working framework.",
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  if (slug === practicalReturnCourse.slug) {
    const commerce = await getPracticalCourseCommerce();
    return <PracticalReturnCoursePage commerce={commerce} />;
  }
  if (slug === "income-tax-working-framework") return <CourseLanding />;
  notFound();
}
