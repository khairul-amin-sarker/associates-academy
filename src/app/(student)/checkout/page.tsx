import { ShieldCheck } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";

type Props = { searchParams: Promise<{ product?: string }> };
export default async function CheckoutPage({ searchParams }: Props) {
  const auth = await requireUser();
  const { product } = await searchParams;
  const slug = product === "fundamentals-income-tax-ebook" ? product : "income-tax-working-framework";
  const isEbook = slug.includes("ebook");
  return <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]"><div><p className="text-xs font-bold tracking-[0.16em] text-brand-gold uppercase">SECURE CHECKOUT</p><h1 className="font-heading mt-3 text-4xl font-extrabold">{isEbook ? "eBook access" : "Course enrollment"}</h1><p className="mt-3 text-muted-foreground">Order amount server-side product setting থেকে নেওয়া হবে। Callback re-verification ছাড়া access active হবে না।</p><Card className="mt-6"><CardHeader><CardTitle className="font-heading">Payment details</CardTitle></CardHeader><CardContent><CheckoutForm productSlug={slug} defaultEmail={auth.email ?? ""} /></CardContent></Card></div><Card className="h-fit bg-brand-navy text-white"><CardHeader><CardTitle className="font-heading">Order summary</CardTitle></CardHeader><CardContent><p className="text-sm text-white/60">{isEbook ? "Fundamentals of Income Tax Act, 2023 eBook" : "Fundamentals of Income Tax Act, 2023"}</p><p className="font-heading mt-4 text-4xl font-bold">৳ {isEbook ? "১৪৯" : "১,৭১০"}</p><div className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5 text-sm text-white/60"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" /><p>Invoice, amount, currency এবং transaction status PayStation server থেকে verify হবে।</p></div></CardContent></Card></div>;
}
