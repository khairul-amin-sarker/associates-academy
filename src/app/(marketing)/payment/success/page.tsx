import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
type Props = { searchParams: Promise<{ invoice?: string; mock?: string }> };
export default async function PaymentSuccess({ searchParams }: Props) { const { invoice, mock } = await searchParams; return <section className="grid min-h-[60vh] place-items-center px-4 py-14 text-center"><div className="max-w-lg"><CheckCircle2 className="mx-auto h-14 w-14 text-success" /><h1 className="font-heading mt-5 text-4xl font-extrabold">Payment status received</h1><p className="mt-3 text-muted-foreground">{mock ? "Local mock checkout complete। Production-এ provider verification-এর পরেই access active হবে।" : "Transaction verify সম্পন্ন হলে আপনার dashboard access automatically update হবে।"}</p>{invoice ? <p className="mt-4 font-mono text-sm">Invoice: {invoice}</p> : null}<Button asChild className="mt-7"><Link href="/dashboard">Dashboard-এ যান</Link></Button></div></section>; }
