import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { BrandLogo } from "@/components/brand-logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaymentResult } from "@/lib/payments/service";

export const metadata: Metadata = { title: "লগইন" };
type Props = {
  searchParams: Promise<{
    next?: string;
    invoice?: string;
    mode?: "signin" | "signup";
  }>;
};

export default async function AuthPage({ searchParams }: Props) {
  const { next, invoice, mode } = await searchParams;
  const order = invoice ? await getPaymentResult(invoice.toUpperCase()) : null;
  const lockedEmail =
    order && ["paid_unclaimed", "verified_paid"].includes(order.payment_state)
      ? order.normalized_email
      : null;
  return (
    <section className="grid min-h-[calc(100vh-76px)] place-items-center px-4 py-12">
      <Card className="premium-shadow border-brand-navy/10 w-full max-w-md">
        <CardHeader className="items-center text-center">
          <BrandLogo />
          <CardTitle className="font-heading mt-5 text-3xl">
            {lockedEmail ? "Paid course access নিন" : "আপনার learning dashboard"}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {lockedEmail
              ? "Checkout email verify করে login বা account তৈরি করুন।"
              : "Course, resource, class link ও certificate এক জায়গায়।"}
          </p>
        </CardHeader>
        <CardContent>
          <AuthForm
            nextPath={next?.startsWith("/") ? next : "/dashboard"}
            lockedEmail={lockedEmail}
            initialMode={mode === "signup" ? "signup" : "signin"}
          />
          {invoice ? (
            <p className="text-brand-blue mt-5 text-center font-mono text-xs break-all">
              Invoice: {invoice.toUpperCase()}
            </p>
          ) : null}
          <p className="text-muted-foreground mt-6 flex items-center justify-center gap-2 text-xs">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure Supabase Auth session
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
