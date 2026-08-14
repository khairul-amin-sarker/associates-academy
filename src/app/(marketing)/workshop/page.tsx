import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Free Workshop", description: "Associates Academy-এর free live professional workshop." };

export default function WorkshopPage() {
  return <section className="py-14 sm:py-20"><div className="section-shell grid items-center gap-10 lg:grid-cols-2"><div><Badge variant="outline">FREE LIVE WORKSHOP</Badge><h1 className="font-heading mt-5 text-4xl font-extrabold sm:text-6xl">Income Tax Working Framework—orientation session</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Tax law শেখার সঠিক sequence, common confusion এবং practical preparation নিয়ে একটি focused live workshop।</p><div className="mt-7 space-y-3">{["Tax learning roadmap", "Act থেকে computation-এর connection", "Return readiness checklist"].map((item) => <p key={item} className="flex items-center gap-3 font-semibold"><CheckCircle2 className="h-5 w-5 text-brand-gold" />{item}</p>)}</div><Button size="lg" asChild className="mt-8"><Link href="/auth?next=/workshop/dashboard">Free registration<ArrowRight /></Link></Button></div><div className="paper-grid rounded-[2rem] bg-brand-navy p-8 text-white sm:p-10"><Video className="h-8 w-8 text-brand-gold" /><p className="mt-8 text-xs font-bold tracking-[0.16em] text-brand-gold uppercase">NEXT SESSION</p><h2 className="font-heading mt-3 text-3xl font-bold">Registration dashboard থেকে open হবে</h2><p className="mt-3 text-white/60">Admin workshop publish করলে date, time, Meet link এবং reminder এখানে live update হবে।</p><div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 p-4"><CalendarDays className="h-5 w-5 text-brand-gold" /><span>Schedule will be announced</span></div></div></div></section>;
}
