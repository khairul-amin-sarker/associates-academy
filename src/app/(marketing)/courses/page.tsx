import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { defaultCourse } from "@/lib/content/defaults";

export const metadata: Metadata = { title: "কোর্সসমূহ", description: "Associates Academy-এর live ও professional learning programs." };

export default function CoursesPage() {
  return <section className="py-14 sm:py-20"><div className="section-shell"><Badge variant="outline">ACADEMY PROGRAMS</Badge><h1 className="font-heading mt-4 text-4xl font-extrabold sm:text-6xl">Professional learning, structured for practice</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Live class, framework, guided resource এবং long-term dashboard access—প্রতিটি program professional outcome-কেন্দ্রিক।</p><div className="mt-10 grid gap-5 lg:grid-cols-2"><Card className="overflow-hidden border-brand-navy/10 py-0"><div className="paper-grid bg-brand-navy p-7 text-white"><div className="flex items-center justify-between"><Badge className="bg-brand-gold text-brand-navy">Enrollment open</Badge><BookOpen className="text-brand-gold" /></div><h2 className="font-heading mt-6 text-3xl font-bold">{defaultCourse.title}</h2><p className="mt-2 text-white/65">{defaultCourse.subtitle}</p></div><CardContent className="p-7"><div className="flex flex-wrap gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />Live cohort</span><span className="flex items-center gap-2"><Clock3 className="h-4 w-4" />Recorded access</span></div><div className="mt-6 flex items-end justify-between gap-5"><div><p className="text-xs text-muted-foreground">Program fee</p><p className="font-heading text-3xl font-bold">৳ {defaultCourse.price.toLocaleString("bn-BD")}</p></div><Button asChild><Link href="/courses/income-tax-working-framework">বিস্তারিত<ArrowRight /></Link></Button></div></CardContent></Card><Card className="grid min-h-80 place-items-center border-dashed bg-white/45 text-center"><CardContent><p className="font-heading text-2xl font-bold">নতুন program আসছে</p><p className="mt-2 text-muted-foreground">VAT, withholding এবং advanced professional track dashboard থেকে publish করা যাবে।</p></CardContent></Card></div></div></section>;
}
