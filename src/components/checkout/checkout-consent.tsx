import type { Route } from "next";
import Link from "next/link";

export function CheckoutConsent({ className = "" }: { className?: string }) {
  return (
    <p className={`text-muted-foreground text-xs leading-6 ${className}`}>
      “পেমেন্ট করুন / Pay Now” বাটনে ক্লিক করার মাধ্যমে আমি Associates
      Academy-এর{" "}
      <Link
        href="/terms"
        className="text-brand-indigo font-semibold underline underline-offset-4"
      >
        Terms & Conditions
      </Link>
      ,{" "}
      <Link
        href="/refund-policy"
        className="text-brand-indigo font-semibold underline underline-offset-4"
      >
        Return & Refund Policy
      </Link>{" "}
      এবং{" "}
      <Link
        href={"/privacy-policy" as Route}
        className="text-brand-indigo font-semibold underline underline-offset-4"
      >
        Privacy Policy
      </Link>{" "}
      পড়েছি এবং এসব নীতিমালায় সম্মতি প্রদান করছি।
    </p>
  );
}
