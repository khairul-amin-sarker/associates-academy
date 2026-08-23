import { CheckCircle2, KeyRound, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getVerifiedAuthContext } from "@/lib/auth";
import { businessInfo } from "@/lib/content/legal";
import { getPaymentResult } from "@/lib/payments/service";
import { claimPaidCourses } from "./actions";

type Props = {
  searchParams: Promise<{ invoice?: string; error?: string }>;
};

export default async function PaymentRecoveryPage({ searchParams }: Props) {
  const { invoice: rawInvoice, error } = await searchParams;
  const invoice = rawInvoice?.trim().toUpperCase();
  const [auth, order] = await Promise.all([
    getVerifiedAuthContext(),
    invoice ? getPaymentResult(invoice) : Promise.resolve(null),
  ]);

  if (
    auth &&
    order?.payment_state === "verified_paid" &&
    order.user_id === auth.userId &&
    order.product_slug_snapshot
  )
    redirect(`/dashboard/courses/${order.product_slug_snapshot}`);

  const next = invoice
    ? `/payment/recovery?invoice=${encodeURIComponent(invoice)}`
    : "/payment/recovery";

  return (
    <main className="bg-cream grid min-h-[calc(100vh-68px)] place-items-center px-4 py-12">
      <section className="border-border w-full max-w-xl rounded-3xl border bg-white p-6 shadow-[0_20px_40px_-24px_rgb(17_24_68_/_35%)] sm:p-8">
        <span className="bg-brand-indigo/10 text-brand-indigo grid h-12 w-12 place-items-center rounded-2xl">
          <KeyRound className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-heading mt-4 text-3xl font-extrabold">
          আগে করা payment claim করুন
        </h1>
        <p className="text-brand-blue mt-3 leading-7">
          Checkout-এ যে email ব্যবহার করেছিলেন, সেই verified email দিয়ে login
          করলে সব eligible paid order একবারেই claim হবে।
        </p>

        {error ? (
          <p role="alert" className="text-destructive mt-5 text-sm font-semibold">
            Entitlement claim করা যায়নি। Invoice সহ support-এ যোগাযোগ করুন।
          </p>
        ) : null}

        {auth ? (
          <form action={claimPaidCourses} className="mt-6">
            <button className="focus-ring bg-brand-navy w-full rounded-xl px-5 py-3 text-sm font-bold text-white">
              <CheckCircle2 className="mr-2 inline h-4 w-4" />
              Paid course access claim করুন
            </button>
          </form>
        ) : (
          <Link
            href={`/auth?next=${encodeURIComponent(next)}${invoice ? `&invoice=${encodeURIComponent(invoice)}` : ""}`}
            className="focus-ring bg-brand-navy mt-6 block rounded-xl px-5 py-3 text-center text-sm font-bold text-white"
          >
            একই email দিয়ে লগইন করুন
          </Link>
        )}

        <div className="border-border bg-secondary/60 mt-6 rounded-2xl border p-4 text-sm">
          {invoice ? (
            <p className="font-mono font-semibold break-all">
              Invoice: {invoice}
            </p>
          ) : null}
          <p className="text-brand-blue mt-2 flex gap-2">
            <LifeBuoy className="mt-0.5 h-4 w-4 shrink-0" />
            Support: {businessInfo.phones[0]} · {businessInfo.email}
          </p>
        </div>
      </section>
    </main>
  );
}
