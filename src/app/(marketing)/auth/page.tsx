import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { BrandLogo } from "@/components/brand-logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "লগইন" };
type Props = { searchParams: Promise<{ next?: string }> };

export default async function AuthPage({ searchParams }: Props) {
  const { next } = await searchParams;
  return <section className="grid min-h-[calc(100vh-76px)] place-items-center px-4 py-12"><Card className="premium-shadow w-full max-w-md border-brand-navy/10"><CardHeader className="items-center text-center"><BrandLogo /><CardTitle className="font-heading mt-5 text-3xl">আপনার learning dashboard</CardTitle><p className="text-sm text-muted-foreground">Course, resource, class link ও certificate এক জায়গায়।</p></CardHeader><CardContent><AuthForm nextPath={next?.startsWith("/") ? next : "/dashboard"} /><p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" />Secure Supabase Auth session</p></CardContent></Card></section>;
}
