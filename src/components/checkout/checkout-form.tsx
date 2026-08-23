"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutConsent } from "@/components/checkout/checkout-consent";
import { Input } from "@/components/ui/input";
import {
  checkoutCustomerSchema,
  type CheckoutCustomer,
} from "@/lib/validation/checkout";

const schema = checkoutCustomerSchema.extend({
  couponCode: z.string().trim().max(40).optional(),
});
type Values = z.input<typeof schema>;
type Quote = {
  subtotal: number;
  discountAmount: number;
  gatewayFee: number;
  totalAmount: number;
  currency: string;
};

function amount(value: number) {
  return new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 }).format(
    value,
  );
}

function errorMessage(value: string) {
  const messages: Record<string, string> = {
    invalid_coupon: "এই coupon codeটি এই কোর্সের জন্য প্রযোজ্য নয়।",
    coupon_exhausted: "এই coupon-এর ব্যবহারসীমা শেষ হয়েছে।",
    coupon_user_limit: "আপনি এই coupon-এর ব্যবহারসীমায় পৌঁছে গেছেন।",
    zero_total_not_supported:
      "এই coupon ব্যবহারে ৳0 payment হয়; অন্য coupon ব্যবহার করুন।",
    already_enrolled: "আপনি ইতিমধ্যে এই কোর্সে যুক্ত আছেন।",
    authenticated_email_mismatch:
      "লগইন করা account-এর email দিয়েই payment করুন।",
    payment_provider_not_connected:
      "Payment gateway এখনো configure করা হয়নি। Invoice সহ support-এ যোগাযোগ করুন।",
    payment_provider_unavailable:
      "PayStation এখন সাড়া দিচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।",
  };
  return messages[value] ?? "পেমেন্ট শুরু করা যায়নি। আবার চেষ্টা করুন।";
}

const inputClassName =
  "mt-1 h-auto w-full rounded-xl border-[color:var(--border)] bg-white px-3 py-2.5 text-sm text-brand-navy";

export function CheckoutForm({
  productSlug,
  defaultValues,
  emailLocked = false,
}: {
  productSlug: string;
  defaultValues: CheckoutCustomer;
  emailLocked?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [checkoutRequestId] = useState(() => crypto.randomUUID());
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, couponCode: "" },
  });

  async function applyCoupon() {
    const couponCode = form.getValues("couponCode")?.trim();
    if (!couponCode) {
      form.setError("couponCode", { message: "Coupon code লিখুন" });
      return;
    }
    setQuoteLoading(true);
    form.clearErrors("couponCode");
    try {
      const response = await fetch("/api/checkout/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productSlug,
          couponCode,
          email: form.getValues("email"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "quote_failed");
      setQuote(data);
      toast.success("Coupon apply হয়েছে");
    } catch (error) {
      setQuote(null);
      form.setError("couponCode", {
        message: errorMessage(
          error instanceof Error ? error.message : "quote_failed",
        ),
      });
    } finally {
      setQuoteLoading(false);
    }
  }

  async function submit(values: Values) {
    setLoading(true);
    try {
      const response = await fetch("/api/payments/paystation/initiate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productSlug,
          checkoutRequestId,
          couponCode: values.couponCode,
          customer: {
            ...values,
            occupation: values.occupation ?? "",
            city: values.city ?? "",
          },
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.checkoutUrl)
        throw new Error(data.error ?? "checkout_failed");
      window.location.assign(data.checkoutUrl);
    } catch (error) {
      toast.error(
        errorMessage(
          error instanceof Error ? error.message : "checkout_failed",
        ),
      );
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="border-border space-y-4 rounded-3xl border bg-white p-6 shadow-[0_20px_40px_-24px_rgb(17_24_68_/_35%)] sm:p-7"
      >
        <div>
          <h2 className="font-heading text-xl font-extrabold">ভর্তির তথ্য</h2>
          <p className="text-brand-blue mt-1 text-xs">
            PayStation-এ যাওয়ার আগে প্রয়োজনীয় তথ্যগুলো দিন।
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold">পূর্ণ নাম *</span>
            <Input
              id="name"
              autoComplete="name"
              aria-invalid={Boolean(form.formState.errors.name)}
              aria-describedby={
                form.formState.errors.name ? "name-error" : undefined
              }
              className={inputClassName}
              {...form.register("name")}
            />
            {form.formState.errors.name ? (
              <span
                id="name-error"
                role="alert"
                className="text-destructive mt-1 block text-xs"
              >
                পূর্ণ নাম লিখুন
              </span>
            ) : null}
          </label>
          <label className="block">
            <span className="text-xs font-semibold">ইমেইল *</span>
            <Input
              id="email"
              inputMode="email"
              autoComplete="email"
              readOnly={emailLocked}
              aria-readonly={emailLocked}
              aria-invalid={Boolean(form.formState.errors.email)}
              aria-describedby={
                form.formState.errors.email ? "email-error" : undefined
              }
              className={inputClassName}
              {...form.register("email")}
            />
            {emailLocked ? (
              <span className="text-brand-blue mt-1 block text-[11px]">
                লগইন করা account-এর verified email
              </span>
            ) : null}
            {form.formState.errors.email ? (
              <span
                id="email-error"
                role="alert"
                className="text-destructive mt-1 block text-xs"
              >
                সঠিক ইমেইল লিখুন
              </span>
            ) : null}
          </label>
          <label className="block">
            <span className="text-xs font-semibold">প্রাথমিক ফোন নম্বর *</span>
            <Input
              id="phone"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={Boolean(form.formState.errors.phone)}
              aria-describedby={
                form.formState.errors.phone ? "phone-error" : undefined
              }
              className={inputClassName}
              {...form.register("phone")}
            />
            {form.formState.errors.phone ? (
              <span
                id="phone-error"
                role="alert"
                className="text-destructive mt-1 block text-xs"
              >
                সঠিক ফোন নম্বর লিখুন
              </span>
            ) : null}
          </label>
          <label className="block">
            <span className="text-xs font-semibold">WhatsApp নম্বর *</span>
            <Input
              id="whatsappNumber"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={Boolean(form.formState.errors.whatsappNumber)}
              aria-describedby={
                form.formState.errors.whatsappNumber
                  ? "whatsapp-error"
                  : undefined
              }
              className={inputClassName}
              {...form.register("whatsappNumber")}
            />
            {form.formState.errors.whatsappNumber ? (
              <span
                id="whatsapp-error"
                role="alert"
                className="text-destructive mt-1 block text-xs"
              >
                সঠিক WhatsApp নম্বর লিখুন
              </span>
            ) : null}
          </label>
          <label className="block">
            <span className="text-xs font-semibold">পেশা *</span>
            <Input
              id="occupation"
              autoComplete="organization-title"
              aria-invalid={Boolean(form.formState.errors.occupation)}
              aria-describedby={
                form.formState.errors.occupation
                  ? "occupation-error"
                  : undefined
              }
              className={inputClassName}
              {...form.register("occupation")}
            />
            {form.formState.errors.occupation ? (
              <span
                id="occupation-error"
                role="alert"
                className="text-destructive mt-1 block text-xs"
              >
                পেশা লিখুন
              </span>
            ) : null}
          </label>
          <label className="block">
            <span className="text-xs font-semibold">শহর *</span>
            <Input
              id="city"
              autoComplete="address-level2"
              aria-invalid={Boolean(form.formState.errors.city)}
              aria-describedby={
                form.formState.errors.city ? "city-error" : undefined
              }
              className={inputClassName}
              {...form.register("city")}
            />
            {form.formState.errors.city ? (
              <span
                id="city-error"
                role="alert"
                className="text-destructive mt-1 block text-xs"
              >
                শহর লিখুন
              </span>
            ) : null}
          </label>
        </div>

        <div className="border-border bg-secondary/60 rounded-2xl border border-dashed p-3">
          <label htmlFor="coupon" className="text-xs font-semibold">
            Coupon code{" "}
            <span className="text-brand-blue font-normal">(ঐচ্ছিক)</span>
          </label>
          <div className="mt-1 flex gap-2">
            <Input
              id="coupon"
              placeholder="Coupon code লিখুন"
              className="placeholder:text-brand-blue/60 h-auto flex-1 rounded-xl border-[color:var(--border)] bg-white px-3 py-2.5 text-sm font-semibold tracking-wider uppercase placeholder:text-xs placeholder:font-normal placeholder:tracking-normal placeholder:normal-case"
              {...form.register("couponCode", {
                onChange: () => setQuote(null),
              })}
            />
            <button
              type="button"
              className="bg-brand-navy rounded-xl px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              disabled={quoteLoading}
              onClick={applyCoupon}
            >
              {quoteLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Apply করুন"
              )}
            </button>
          </div>
          {form.formState.errors.couponCode ? (
            <p role="alert" className="text-destructive mt-2 text-xs">
              {form.formState.errors.couponCode.message}
            </p>
          ) : null}
          {quote ? (
            <div className="mt-3 rounded-xl border border-emerald-700/14 bg-emerald-50 px-3 py-2 text-xs text-emerald-950">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                Coupon discount apply হয়েছে
              </div>
              <dl className="mt-2 space-y-1 text-emerald-900/80">
                <div className="flex justify-between gap-4">
                  <dt>Course fee</dt>
                  <dd>৳ {amount(quote.subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Discount</dt>
                  <dd>- ৳ {amount(quote.discountAmount)}</dd>
                </div>
                {quote.gatewayFee ? (
                  <div className="flex justify-between gap-4">
                    <dt>Gateway fee</dt>
                    <dd>৳ {amount(quote.gatewayFee)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 border-t border-emerald-800/12 pt-1 font-extrabold">
                  <dt>Payable total</dt>
                  <dd>৳ {amount(quote.totalAmount)}</dd>
                </div>
              </dl>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-brand-indigo w-full rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-[0_20px_40px_-24px_rgb(17_24_68_/_35%)] disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          ) : (
            "PayStation-এ পেমেন্ট করুন"
          )}
        </button>
      </form>
      <CheckoutConsent className="mt-4 px-2" />
    </>
  );
}
