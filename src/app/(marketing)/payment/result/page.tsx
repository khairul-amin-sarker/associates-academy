import {
  Check,
  CircleAlert,
  Clock3,
  MessageCircle,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PaymentResultRefresh } from "@/components/checkout/payment-result-refresh";
import { getVerifiedAuthContext } from "@/lib/auth";
import { businessInfo } from "@/lib/content/legal";
import { getPaymentResult } from "@/lib/payments/service";

type Props = { searchParams: Promise<{ invoice?: string }> };

function stateContent(state: string) {
  if (state === "paid_unclaimed" || state === "verified_paid")
    return {
      icon: Check,
      iconClass: "bg-emerald-100 text-emerald-700",
      title: "পেমেন্ট সফল হয়েছে",
      detail:
        state === "paid_unclaimed"
          ? "পেমেন্ট সফল হয়েছে। কোর্স অ্যাক্সেস করতে এখন অ্যাকাউন্ট খুলুন বা লগইন করুন।"
          : "পেমেন্ট verify হয়েছে। আপনার account-এ কোর্স access প্রস্তুত।",
    };
  if (state === "processing" || state === "pending_payment")
    return {
      icon: Clock3,
      iconClass: "bg-amber-100 text-amber-800",
      title: "পেমেন্ট যাচাই চলছে",
      detail:
        "PayStation status এখনো processing। এই page নিজে থেকে refresh হবে; page বন্ধ করলেও server পরে আবার যাচাই করবে।",
    };
  if (state === "refunded")
    return {
      icon: CircleAlert,
      iconClass: "bg-slate-200 text-slate-700",
      title: "Payment refund হয়েছে",
      detail:
        "এই transaction-এর জন্য course access active নেই। বিস্তারিত জানতে invoice সহ support-এ যোগাযোগ করুন।",
    };
  return {
    icon: CircleAlert,
    iconClass: "bg-red-100 text-red-700",
    title: "পেমেন্ট সফলভাবে verify হয়নি",
    detail:
      "Payment failed, cancelled বা expired হতে পারে। টাকা কাটা হলে নতুন payment করবেন না—invoice সহ support-এ যোগাযোগ করুন।",
  };
}

export default async function PaymentResultPage({ searchParams }: Props) {
  const { invoice: rawInvoice } = await searchParams;
  const invoice = rawInvoice?.trim().toUpperCase();
  if (!invoice) notFound();
  const [order, auth] = await Promise.all([
    getPaymentResult(invoice),
    getVerifiedAuthContext(),
  ]);
  if (!order) notFound();
  if (
    order.payment_state === "verified_paid" &&
    order.user_id &&
    order.user_id === auth?.userId &&
    order.product_slug_snapshot
  ) {
    redirect(`/dashboard/courses/${order.product_slug_snapshot}`);
  }

  const content = stateContent(order.payment_state);
  const Icon = content.icon;
  const paid = ["paid_unclaimed", "verified_paid"].includes(
    order.payment_state,
  );
  const pending = ["pending_payment", "processing"].includes(
    order.payment_state,
  );
  const recoveryPath = `/payment/recovery?invoice=${encodeURIComponent(invoice)}`;
  const authPath = `/auth?invoice=${encodeURIComponent(invoice)}&next=${encodeURIComponent(recoveryPath)}`;

  return (
    <main className="bg-cream min-h-[calc(100vh-68px)] px-4 py-10 sm:py-16">
      <PaymentResultRefresh enabled={pending} />
      <section className="border-border mx-auto max-w-2xl overflow-hidden rounded-3xl border bg-white shadow-[0_20px_40px_-24px_rgb(17_24_68_/_35%)]">
        <div className="gradient-navy course-bg-dots-navy px-6 py-8 text-center text-white sm:px-10">
          <span
            className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${content.iconClass}`}
          >
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="font-heading mt-4 text-3xl font-extrabold sm:text-4xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            {content.detail}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <ol className="grid gap-3 sm:grid-cols-3" aria-label="Course access steps">
            {[
              [ShieldCheck, "১", "Payment verification", true],
              [UserRoundPlus, "২", "Account তৈরি বা login", paid],
              [Check, "৩", "Course access", order.payment_state === "verified_paid"],
            ].map(([StepIcon, number, label, complete]) => {
              const Step = StepIcon as typeof ShieldCheck;
              return (
                <li
                  key={String(number)}
                  className={`rounded-2xl border p-4 ${
                    complete
                      ? "border-emerald-700/20 bg-emerald-50"
                      : "border-border bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-navy grid h-8 w-8 place-items-center rounded-lg text-xs font-bold text-white">
                      {String(number)}
                    </span>
                    <Step className="text-brand-indigo h-4 w-4" />
                  </div>
                  <p className="mt-3 text-sm font-bold">{String(label)}</p>
                </li>
              );
            })}
          </ol>

          {paid ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={`${authPath}&mode=signin` as Route}
                className="focus-ring bg-brand-navy rounded-xl px-5 py-3 text-center text-sm font-bold text-white"
              >
                লগইন করুন
              </Link>
              <Link
                href={`${authPath}&mode=signup` as Route}
                className="focus-ring border-border rounded-xl border bg-white px-5 py-3 text-center text-sm font-bold"
              >
                অ্যাকাউন্ট খুলুন
              </Link>
            </div>
          ) : pending ? (
            <p className="bg-secondary/60 border-border mt-6 rounded-2xl border p-4 text-center text-sm">
              Status প্রতি ১০ সেকেন্ডে refresh হচ্ছে। একই invoice-এর জন্য
              duplicate enrollment হবে না।
            </p>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {order.product_slug_snapshot ? (
                <Link
                  href={`/checkout/${order.product_slug_snapshot}`}
                  className="focus-ring bg-brand-indigo rounded-xl px-5 py-3 text-center text-sm font-bold text-white"
                >
                  আবার payment চেষ্টা করুন
                </Link>
              ) : null}
              <a
                href={businessInfo.phoneHrefs[0]}
                className="focus-ring border-border rounded-xl border px-5 py-3 text-center text-sm font-bold"
              >
                Support-এ যোগাযোগ করুন
              </a>
            </div>
          )}

          <div className="border-border mt-7 border-t pt-5 text-sm">
            <p className="font-mono font-semibold break-all">
              Invoice: {invoice}
            </p>
            <p className="text-brand-blue mt-2 flex items-start gap-2">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
              Support: {businessInfo.phones[0]} · {businessInfo.email}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
