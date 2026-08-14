"use client";

import { useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({ name: z.string().min(2), email: z.email(), phone: z.string().min(8).max(20), couponCode: z.string().max(40).optional() });
type Values = z.infer<typeof schema>;

export function CheckoutForm({ productSlug, defaultEmail = "" }: { productSlug: string; defaultEmail?: string }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: "", email: defaultEmail, phone: "", couponCode: "" } });
  async function submit(values: Values) {
    setLoading(true);
    try {
      const response = await fetch("/api/payments/paystation/initiate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ productSlug, couponCode: values.couponCode, customer: { name: values.name, email: values.email, phone: values.phone } }) });
      const data = await response.json();
      if (!response.ok || !data.checkoutUrl) throw new Error(data.error ?? "checkout_failed");
      window.location.assign(data.checkoutUrl);
    } catch (error) { toast.error(error instanceof Error ? error.message : "Checkout শুরু করা যায়নি"); setLoading(false); }
  }
  return <form onSubmit={form.handleSubmit(submit)} className="space-y-5"><div className="space-y-2"><Label htmlFor="name">পূর্ণ নাম</Label><Input id="name" autoComplete="name" {...form.register("name")} /></div><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" inputMode="email" autoComplete="email" {...form.register("email")} /></div><div className="space-y-2"><Label htmlFor="phone">Mobile number</Label><Input id="phone" inputMode="tel" autoComplete="tel" {...form.register("phone")} /></div><div className="space-y-2"><Label htmlFor="coupon">Coupon (optional)</Label><Input id="coupon" {...form.register("couponCode")} /></div><Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : <LockKeyhole />}Secure PayStation checkout</Button></form>;
}
