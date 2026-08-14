import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, BriefcaseBusiness, Calculator, Check, FileText, GraduationCap, Landmark, LibraryBig, Lightbulb, Scale, Sparkles, Target, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { HomePageContent } from "@/lib/content/defaults";
import { defaultCourse } from "@/lib/content/defaults";

const offers = [
  { icon: GraduationCap, title: "Live Courses", text: "Structured live class, discussion ও guided practice।" },
  { icon: LibraryBig, title: "Professional eBooks", text: "Reference-friendly framework ও practical working notes।" },
  { icon: FileText, title: "Practical Resources", text: "Tax update, guide, checklist ও future professional tools।" },
  { icon: BriefcaseBusiness, title: "Professional Training", text: "বাস্তব কাজের জন্য প্রয়োগভিত্তিক learning experience।" },
];

const reasons = [
  [Target, "Practical learning", "Theory-এর সঙ্গে calculation, return ও compliance workflow।"],
  [Landmark, "Updated law", "বর্তমান আইন, বিধি ও professional update-এর আলোকে content।"],
  [Calculator, "Structured framework", "Complex topic-কে step-by-step working system-এ শেখানো।"],
  [BadgeCheck, "Experienced instructor", "বাস্তব অভিজ্ঞতা ও teaching clarity-এর সমন্বয়।"],
] as const;

const journey = [
  ["০১", "Learn", "মূল আইন ও ধারণা শিখুন"],
  ["০২", "Understand", "কেন ও কীভাবে—গভীরভাবে বুঝুন"],
  ["০৩", "Apply", "বাস্তব situation-এ প্রয়োগ করুন"],
  ["০৪", "Practice", "framework ও resources দিয়ে অনুশীলন করুন"],
] as const;

export function HomePage({ content }: { content: HomePageContent }) {
  return (
    <>
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14">
          <div>
            <Badge variant="outline" className="mb-5 border-brand-gold/55 bg-white/60 px-3 py-1 text-brand-indigo">{content.eyebrow}</Badge>
            <h1 className="font-heading text-[2.65rem] leading-[1.08] font-extrabold tracking-[-0.02em] text-brand-navy sm:text-6xl lg:text-[4.25rem]">{content.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{content.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="clicky h-13 px-7 text-base shadow-xl shadow-brand-navy/15"><Link href="/courses">{content.primaryCta}<ArrowRight className="ml-1" /></Link></Button>
              <Button size="lg" variant="outline" asChild className="clicky h-13 border-brand-navy/20 bg-white/65 px-7 text-base"><Link href="/ebook">{content.secondaryCta}</Link></Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-brand-indigo">
              {["Bengali-first learning", "Updated professional content", "Secure online access"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-gold" />{item}</span>)}
            </div>
          </div>

          <div className="paper-grid premium-shadow relative overflow-hidden rounded-[2rem] bg-brand-navy p-5 text-white sm:p-7 lg:min-h-[535px] lg:p-9">
            <div className="flex items-start justify-between gap-5"><div><p className="text-sm font-semibold tracking-[0.15em] text-brand-gold uppercase">Associates Academy</p><h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">Professional Learning Map</h2></div><Sparkles className="h-7 w-7 text-brand-gold" /></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[{ icon: Scale, label: "Income Tax", meta: "Act → Computation" }, { icon: Calculator, label: "VAT", meta: "Law → Compliance" }, { icon: BookOpen, label: "Legal", meta: "Concept → Practice" }, { icon: BriefcaseBusiness, label: "Professional", meta: "Learn → Apply" }].map(({ icon: Icon, label, meta }, index) => <div key={label} className="rounded-2xl border border-white/12 bg-white/[0.075] p-5"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gold/15 text-brand-gold"><Icon className="h-5 w-5" /></span><span className="font-mono text-xs text-white/35">0{index + 1}</span></div><h3 className="font-heading mt-5 text-xl font-semibold">{label}</h3><p className="mt-1 text-sm text-white/60">{meta}</p></div>)}
            </div>
            <div className="mt-4 rounded-2xl border border-brand-gold/25 bg-brand-gold/10 p-5"><p className="text-xs font-bold tracking-[0.14em] text-brand-gold uppercase">Our promise</p><p className="mt-2 text-sm leading-6 text-white/75">শুধু course নয়—একটি দীর্ঘমেয়াদি Tax, Legal & Professional Learning platform.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 py-16 sm:py-20"><div className="section-shell"><SectionTitle eyebrow="WHAT WE OFFER" title="শেখা থেকে professional confidence" description="একটি academy ecosystem—যেখানে live learning, reference material এবং practical resources একসঙ্গে কাজ করে।" /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{offers.map(({ icon: Icon, title, text }) => <Card key={title} className="group border-brand-navy/10 bg-card/95 py-0 transition-transform duration-200 hover:-translate-y-1"><CardContent className="p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-navy text-brand-gold"><Icon className="h-5 w-5" /></span><h3 className="font-heading mt-5 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></CardContent></Card>)}</div></div></section>

      <section className="py-16 sm:py-24"><div className="section-shell"><SectionTitle eyebrow="FEATURED PROGRAM" title="বর্তমান featured learning program" description="Income Tax Act, 2023-এর complete working journey—Act থেকে Return পর্যন্ত।" /><div className="premium-shadow mt-10 grid overflow-hidden rounded-[2rem] border border-brand-navy/10 bg-white lg:grid-cols-[0.88fr_1.12fr]"><div className="paper-grid bg-brand-navy p-8 text-white sm:p-10"><Badge className="bg-brand-gold text-brand-navy hover:bg-brand-gold">Flagship program</Badge><h3 className="font-heading mt-6 text-3xl font-bold sm:text-4xl">{defaultCourse.title}</h3><p className="mt-3 text-white/65">{defaultCourse.subtitle}</p><div className="mt-8 flex items-end gap-3"><span className="font-heading text-4xl font-bold">৳ {defaultCourse.price.toLocaleString("bn-BD")}</span><span className="mb-1 text-sm text-white/45 line-through">৳ {defaultCourse.compareAtPrice.toLocaleString("bn-BD")}</span></div><Button asChild size="lg" className="clicky mt-8 bg-white text-brand-navy hover:bg-white/90"><Link href="/income-tax-working-framework">বিস্তারিত দেখুন<ArrowRight /></Link></Button></div><div className="p-8 sm:p-10"><p className="text-xs font-bold tracking-[0.16em] text-brand-gold uppercase">Complete scope</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{defaultCourse.scope.map((item, index) => <div key={item} className="flex items-center gap-3 rounded-xl border border-brand-navy/10 bg-brand-cream/55 p-4"><span className="font-mono text-xs text-brand-gold">0{index + 1}</span><span className="font-semibold">{item}</span></div>)}</div><p className="mt-7 text-sm leading-7 text-muted-foreground">Live class, guided framework, recorded access, professional resources এবং certificate—সব এক জায়গায়।</p></div></div></div></section>

      <section className="bg-[#e9e0d1] py-16 sm:py-24"><div className="section-shell"><SectionTitle eyebrow="WHY ASSOCIATES ACADEMY" title="কেন এই learning experience আলাদা" /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{reasons.map(([Icon, title, text]) => <div key={title} className="rounded-2xl border border-brand-navy/10 bg-white/80 p-6"><Icon className="h-6 w-6 text-brand-gold" /><h3 className="font-heading mt-5 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></div></section>

      <section className="py-16 sm:py-24"><div className="section-shell"><SectionTitle eyebrow="LEARNING JOURNEY" title="Learn → Understand → Apply → Practice" description="Professional confidence আসে একটি clear sequence থেকে।" /><div className="mt-10 grid gap-4 lg:grid-cols-4">{journey.map(([number, title, text]) => <div key={number} className="relative rounded-2xl border border-brand-navy/10 bg-white p-6"><span className="font-mono text-xs font-bold text-brand-gold">{number}</span><h3 className="font-heading mt-6 text-2xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></div></section>

      <section className="bg-white/75 py-16 sm:py-24"><div className="section-shell grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-brand-navy/10 bg-brand-cream"><Image src="/brand/founder.png" alt={content.founderName} fill sizes="(max-width: 1024px) 90vw, 32vw" className="object-cover object-top" /></div><div><p className="text-xs font-bold tracking-[0.16em] text-brand-gold uppercase">FOUNDER & INSTRUCTOR</p><h2 className="font-heading mt-3 text-4xl font-extrabold sm:text-5xl">{content.founderName}</h2><p className="mt-2 font-semibold text-brand-indigo">{content.founderTitle}</p><p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{content.founderBio}</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{["Practical clarity", "Updated framework", "Learner-first teaching"].map((item) => <div key={item} className="rounded-xl border bg-brand-cream/55 p-4 text-sm font-semibold"><Lightbulb className="mb-3 h-5 w-5 text-brand-gold" />{item}</div>)}</div></div></div></section>

      <section className="py-16 sm:py-24"><div className="section-shell"><SectionTitle eyebrow="STUDENT TRUST" title="Genuine progress, measurable confidence" description="শিক্ষার্থী ও batch data publish হলে এই section dashboard থেকে live update হবে।" /><div className="mt-10 grid gap-4 sm:grid-cols-3"><TrustStat value="Practical" label="application-focused framework" icon={Target} /><TrustStat value="Updated" label="law and compliance content" icon={BadgeCheck} /><TrustStat value="Structured" label="course-to-resource journey" icon={Users} /></div></div></section>

      <section className="bg-white/75 py-16 sm:py-24"><div className="section-shell"><SectionTitle eyebrow="FREE RESOURCES" title="শেখা চলুক course-এর বাইরেও" description="Tax update, quick guide, checklist এবং future professional tools।" /><div className="mt-10 grid gap-4 lg:grid-cols-3">{[["Tax Updates", "নতুন আইন, SRO ও গুরুত্বপূর্ণ পরিবর্তনের concise update।"], ["Practical Guides", "Computation, TDS ও return workflow-এর step-by-step guide।"], ["Professional Tools", "Checklist, calculator ও practice resource—ধাপে ধাপে আসছে।"]].map(([title, text], index) => <Card key={title} className="py-0"><CardContent className="p-6"><span className="font-mono text-xs text-brand-gold">0{index + 1}</span><h3 className="font-heading mt-5 text-2xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p><Button variant="link" asChild className="mt-4 h-auto p-0 text-brand-indigo"><Link href="/resources">Explore resources<ArrowRight /></Link></Button></CardContent></Card>)}</div></div></section>

      <section className="bg-brand-navy py-16 text-white sm:py-20"><div className="section-shell text-center"><p className="text-xs font-bold tracking-[0.18em] text-brand-gold uppercase">START TODAY</p><h2 className="font-heading mx-auto mt-4 max-w-4xl text-4xl font-extrabold sm:text-6xl">আপনার Professional Tax Learning Journey শুরু করুন</h2><p className="mx-auto mt-5 max-w-2xl text-white/65">সঠিক framework, updated content এবং practical guidance—একটি platform-এ।</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button size="lg" asChild className="clicky bg-white text-brand-navy hover:bg-white/90"><Link href="/courses">কোর্স দেখুন<ArrowRight /></Link></Button><Button size="lg" variant="outline" asChild className="clicky border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"><Link href="/auth">Learning dashboard</Link></Button></div></div></section>
    </>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="max-w-3xl"><p className="text-xs font-bold tracking-[0.16em] text-brand-gold uppercase">{eyebrow}</p><h2 className="font-heading mt-3 text-3xl font-extrabold tracking-[-0.01em] sm:text-5xl">{title}</h2>{description ? <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p> : null}</div>;
}

function TrustStat({ value, label, icon: Icon }: { value: string; label: string; icon: typeof Users }) {
  return <div className="rounded-2xl border border-brand-navy/10 bg-white p-7 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-gold/12 text-brand-gold"><Icon className="h-5 w-5" /></span><p className="font-heading mt-5 text-3xl font-bold">{value}</p><p className="mt-1 text-sm text-muted-foreground">{label}</p></div>;
}
