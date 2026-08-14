import type { Metadata } from "next";
import { Award } from "lucide-react";
import { CertificateLookup } from "@/components/verify/certificate-lookup";

export const metadata: Metadata = { title: "Certificate Verification", description: "Associates Academy certificate public verification." };
export default function VerifyPage() { return <section className="py-14 sm:py-20"><div className="section-shell"><div className="mx-auto max-w-3xl"><Award className="h-9 w-9 text-brand-gold" /><p className="mt-5 text-xs font-bold tracking-[0.16em] text-brand-gold uppercase">PUBLIC VERIFICATION</p><h1 className="font-heading mt-3 text-4xl font-extrabold sm:text-6xl">Certificate যাচাই করুন</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">Certificate code দিয়ে public, PII-limited registry থেকে authenticity যাচাই করুন।</p><div className="mt-8"><CertificateLookup /></div></div></div></section>; }
