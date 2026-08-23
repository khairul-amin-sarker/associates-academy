import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgePercent,
  BriefcaseBusiness,
  Calculator,
  ChartNoAxesCombined,
  Check,
  CircleCheckBig,
  FileCheck2,
  Files,
  FileText,
  House,
  Landmark,
  ReceiptText,
  Scale,
  SearchCheck,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  practicalReturnCheckoutPath,
  practicalReturnCourse,
  type CourseIconName,
  type CourseModule,
} from "@/lib/content/practical-return-course";
import { cn } from "@/lib/utils";

const icons: Record<CourseIconName, LucideIcon> = {
  BadgePercent,
  BriefcaseBusiness,
  Calculator,
  ChartNoAxesCombined,
  CircleCheckBig,
  FileCheck2,
  Files,
  FileText,
  House,
  Landmark,
  ReceiptText,
  Scale,
  SearchCheck,
  ShieldCheck,
  WalletCards,
};

const registrationSteps = [
  [
    "Account / Login",
    "Existing account-এ login করুন অথবা নতুন account তৈরি করুন।",
  ],
  [
    "Checkout Details",
    "নাম, email, mobile number এবং প্রযোজ্য হলে coupon দিন।",
  ],
  [
    "Secure Payment",
    "Existing PayStation checkout-এর মাধ্যমে payment সম্পন্ন করুন।",
  ],
  [
    "Server Verification",
    "Invoice, amount, currency ও payment status server-to-server verify হবে।",
  ],
  [
    "Dashboard Access",
    "Verified payment-এর পর enrollment activate হয়ে dashboard-এ দেখা যাবে।",
  ],
] as const;

const routeTerritories = [
  { number: "01", title: "Documents", range: "ধাপ ১–৩", icon: Files },
  {
    number: "02",
    title: "Income & Classification",
    range: "ধাপ ৪–৬",
    icon: ChartNoAxesCombined,
  },
  { number: "03", title: "Computation", range: "ধাপ ৭–৯", icon: Calculator },
  {
    number: "04",
    title: "Tax & Schedules",
    range: "ধাপ ১০–১৩",
    icon: ReceiptText,
  },
  { number: "05", title: "Submission", range: "ধাপ ১৪", icon: FileCheck2 },
] as const;

function SectionHeading({
  title,
  description,
  inverse = false,
  className,
}: {
  title: string;
  description?: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2
        className={cn(
          "font-heading text-3xl leading-[1.16] font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-[2.8rem]",
          inverse ? "text-white" : "text-brand-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-[70ch] text-base leading-8 sm:text-lg",
            inverse ? "text-[#d9dced]" : "text-[#505b75]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function EnrollmentButton({
  label = "কোর্সে ভর্তি হোন",
  className,
  gold = false,
}: {
  label?: string;
  className?: string;
  gold?: boolean;
}) {
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "clicky focus-ring h-12 rounded-xl px-6 text-base font-bold shadow-[0_12px_24px_-14px_rgba(17,24,68,.65)]",
        gold && "bg-brand-gold text-brand-navy hover:bg-[#d7aa42]",
        className,
      )}
    >
      <Link href={practicalReturnCheckoutPath}>
        {label}
        <ArrowRight aria-hidden="true" />
      </Link>
    </Button>
  );
}

function HeroSection() {
  return (
    <section className="dossier-field overflow-hidden border-b border-[#a78d5c]/30">
      <div className="mx-auto max-w-[1600px] px-3 py-4 sm:px-5 sm:py-7 lg:px-8 lg:py-10">
        <div className="dossier-desk grid min-h-[690px] overflow-hidden lg:grid-cols-[1.04fr_.96fr]">
          <div className="dossier-sheet relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 xl:px-20">
            <p className="font-heading max-w-2xl text-lg leading-7 font-bold text-[#35457e] sm:text-xl">
              {practicalReturnCourse.name}
            </p>
            <div
              className="my-5 flex max-w-xl items-center gap-4 text-[#a87922]"
              aria-hidden="true"
            >
              <span className="h-px flex-1 bg-current/60" />
              <Scale className="h-5 w-5" />
              <span className="h-px flex-1 bg-current/60" />
            </div>
            <h1 className="font-heading text-brand-navy max-w-[780px] text-[2.65rem] leading-[1.06] font-extrabold tracking-[-0.025em] sm:text-6xl xl:text-[3.55rem]">
              <span className="lg:block">একটি Client Case —</span>{" "}
              <span className="lg:block">Documents থেকে</span>{" "}
              <span className="lg:block">NBR Submission পর্যন্ত</span>
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-8 text-[#3f4963] sm:text-lg">
              Paper Return ও E-Return Filing হাতে-কলমে শিখুন—documents, income
              classification, computation, reconciliation ও final submission এক
              ধারাবাহিক workflow-এ।
            </p>
            <p className="mt-4 text-sm font-semibold text-[#766241]">
              Assessment Year {practicalReturnCourse.assessmentYear}
              <span className="mx-2" aria-hidden="true">
                •
              </span>
              {practicalReturnCourse.financeAct}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <EnrollmentButton className="w-full sm:w-auto" />
              <Button
                asChild
                size="lg"
                variant="outline"
                className="clicky focus-ring border-brand-navy/35 text-brand-navy h-12 w-full rounded-xl bg-transparent px-6 text-base font-bold hover:bg-[#eee0c8] sm:w-auto"
              >
                <Link href="#workflow">
                  সম্পূর্ণ Workflow দেখুন
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div
              className="dossier-stamp mt-9 w-fit"
              aria-label="Associates Academy reviewed"
            >
              <span>Reviewed</span>
              <small>Associates Academy</small>
            </div>
          </div>

          <div className="case-stack dossier-settle relative min-h-[540px] overflow-hidden bg-[#5b3824] sm:min-h-[650px] lg:min-h-full">
            <Image
              src="/course/return-dossier-hero.png"
              alt="নেভি client return dossier, evidence papers, paperclip ও fountain pen"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <p className="text-brand-navy absolute top-[6%] left-[28%] w-[35%] text-center font-serif text-[10px] font-bold tracking-[0.04em] whitespace-nowrap sm:text-lg sm:tracking-[0.08em] lg:text-base xl:text-xl">
              CLIENT FILE 01
            </p>
            <p className="text-brand-gold absolute top-[42%] left-[20%] w-[43%] text-center font-serif text-[10px] tracking-[0.12em] uppercase sm:text-sm lg:text-xs xl:text-sm">
              Practical Return Dossier
            </p>
            <div className="dossier-stamp dossier-stamp-dark absolute top-[25%] left-[53%] hidden sm:flex">
              <span>Reviewed</span>
            </div>
            <div className="text-brand-navy absolute bottom-[12%] left-[13%] flex w-[53%] items-center gap-3 px-2 sm:px-4">
              <FileCheck2
                className="h-6 w-6 shrink-0 text-[#a87922] sm:h-8 sm:w-8"
                aria-hidden="true"
              />
              <div>
                <strong className="font-heading block text-xl leading-none sm:text-3xl lg:text-2xl xl:text-3xl">
                  ১৪ ধাপের
                </strong>
                <span className="font-serif text-[10px] italic sm:text-sm lg:text-xs xl:text-sm">
                  Complete Return Workflow
                </span>
              </div>
            </div>
            <aside
              className="text-brand-navy absolute top-[52%] right-[3%] z-10 w-[38%] rounded-sm border border-[#aa9670]/45 bg-[#f5ead4]/92 p-2 shadow-md backdrop-blur-[1px] sm:top-[18%] sm:right-[3%] sm:w-[20%] sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none"
              aria-label="Client file exhibit index"
            >
              <p className="border-brand-navy/40 border-b pb-1 font-serif text-[10px] font-bold tracking-[0.04em] uppercase sm:text-xs sm:tracking-[0.08em]">
                Exhibit Index
              </p>
              <ol className="divide-y divide-[#988b73]/35">
                {practicalReturnCourse.hero.workflowCards.map((item, index) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-[18px_1fr] gap-1 py-1 text-[9px] leading-[1.05] sm:grid-cols-[24px_1fr] sm:py-2 sm:text-[10px] sm:leading-tight lg:text-[9px] xl:text-[11px]"
                  >
                    <span className="font-serif font-bold text-[#35457e]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif">{item.title}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>

        <div className="case-summary mt-4 grid overflow-hidden lg:grid-cols-[330px_1fr]">
          <div className="flex items-center gap-4 border-b border-[#b8a47d]/40 px-6 py-5 lg:border-r lg:border-b-0">
            <BriefcaseBusiness
              className="h-7 w-7 text-[#a87922]"
              aria-hidden="true"
            />
            <p className="font-heading text-brand-navy text-xl font-bold sm:text-2xl">
              Client File-এর ভেতরে যা যা শিখবেন
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 divide-x divide-y divide-[#b8a47d]/35 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
              {practicalReturnCourse.hero.workflowCards.map((item, index) => (
                <a
                  key={item.title}
                  href="#curriculum"
                  className={cn(
                    "focus-ring group px-4 py-4 text-sm transition-colors",
                    index === 0
                      ? "bg-brand-navy text-white"
                      : "text-brand-navy hover:bg-[#eadbc0]",
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-xs font-bold",
                      index === 0 ? "text-brand-gold" : "text-[#9b6d17]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-semibold group-hover:underline group-hover:underline-offset-4">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
            <p className="border-t border-[#b8a47d]/35 px-5 py-4 text-sm leading-6 text-[#505b75]">
              Client profile, TIN এবং supporting documents সংগ্রহ ও যাচাই করে
              return working শুরু হবে। তারপর প্রতিটি figure তার evidence-এর
              সঙ্গে reconcile করা হবে।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowAtlas() {
  return (
    <section
      id="workflow"
      className="dossier-paper scroll-mt-24 py-20 sm:py-28"
    >
      <div className="section-shell">
        <SectionHeading
          title="একটি Client File-এর ১৪ ধাপের Return Atlas"
          description="Documents সংগ্রহ থেকে acknowledgement সংরক্ষণ—প্রতিটি waypoint আগের তথ্যকে verify করে, যাতে final return defensible ও submission-ready হয়।"
        />
        <div className="mt-12 grid gap-8 xl:grid-cols-[330px_1fr]">
          <div className="border-y border-[#b5a078]/55 py-7">
            <p className="font-heading text-brand-navy text-2xl font-bold">
              শুধু portal training নয়
            </p>
            <p className="mt-3 text-base leading-8 text-[#505b75]">
              Portal return preparation-এর শেষ অংশ। তার আগে client-এর তথ্যকে
              correctly classified, computed এবং reconciled return-এ রূপান্তর
              করাই মূল practical skill।
            </p>
            <div className="mt-7 space-y-3">
              {practicalReturnCourse.differentiatorFlow.map((step, index) => (
                <div
                  key={step}
                  className="text-brand-navy flex items-center gap-3 text-sm font-semibold"
                >
                  <span className="bg-brand-navy grid h-7 w-7 place-items-center rounded-full text-[10px] text-white">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div className="route-map relative overflow-hidden border border-[#b5a078]/45 bg-[#f8f1e6]/80 px-4 py-8 sm:px-8">
            <div
              className="absolute top-1/2 right-8 left-8 hidden h-px -translate-y-1/2 bg-[#35457e]/30 lg:block"
              aria-hidden="true"
            />
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {routeTerritories.map((territory, index) => {
                const Icon = territory.icon;
                return (
                  <div
                    key={territory.number}
                    className={cn(
                      "route-territory relative min-h-52 p-5",
                      index % 2 === 1 && "lg:mt-16",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-serif text-4xl font-bold text-[#35457e]">
                        {territory.number}
                      </span>
                      <Icon
                        className="h-6 w-6 text-[#a87922]"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-heading text-brand-navy mt-5 text-xl leading-tight font-bold">
                      {territory.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[#66708b]">
                      {territory.range}
                    </p>
                    <span className="bg-brand-navy absolute bottom-5 left-5 grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white">
                      {index === 4 ? "✓" : index * 3 + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-8 overflow-x-auto pb-3">
          <ol className="flex min-w-[1120px] items-stretch">
            {practicalReturnCourse.workflow.map((step, index) => (
              <li
                key={step}
                className="text-brand-navy relative flex w-40 shrink-0 items-start gap-2 border-t border-[#9f8c65]/45 px-2 pt-5 text-sm leading-5"
              >
                <span className="bg-brand-navy grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProblemLedger() {
  return (
    <section className="bg-[#111844] py-20 text-white sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <SectionHeading
          inverse
          title="রিটার্ন ফাইলিংয়ে শুধু আইন জানা যথেষ্ট নয়"
          description="বাস্তবে আইন, documents, calculation, evidence, reconciliation এবং portal entry—সবকিছু একই client file-এর মধ্যে ঠিক থাকতে হয়।"
        />
        <div className="border-y border-white/20">
          {practicalReturnCourse.problems.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <article
                key={item.title}
                className="grid gap-4 border-b border-white/15 py-6 last:border-b-0 sm:grid-cols-[48px_1fr_1.25fr] sm:items-start"
              >
                <span className="text-brand-gold font-serif text-lg font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading flex gap-3 text-xl leading-snug font-bold">
                  <Icon
                    className="text-brand-gold mt-1 h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[#c7cbe0]">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AudienceAndSkills() {
  return (
    <section className="dossier-field py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading title="যাদের desk-এ client return আসে, তাদের জন্য" />
            <div className="mt-8 border-t border-[#a9956d]/50">
              {practicalReturnCourse.audience.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <div
                    key={item.title}
                    className="grid grid-cols-[36px_1fr] gap-4 border-b border-[#a9956d]/45 py-5"
                  >
                    <Icon
                      className="mt-1 h-5 w-5 text-[#a87922]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-heading text-brand-navy text-lg font-bold">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#59637b]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="skills-ledger overflow-hidden border border-[#9f8c65]/55 bg-[#f9f2e7] shadow-[0_24px_60px_-40px_rgba(17,24,68,.65)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#9f8c65]/55 px-6 py-5 sm:px-8">
              <h2 className="font-heading text-brand-navy text-2xl font-extrabold sm:text-3xl">
                Complete Return File Skill Ledger
              </h2>
              <Scale
                className="h-7 w-7 shrink-0 text-[#a87922]"
                aria-hidden="true"
              />
            </div>
            <div className="grid sm:grid-cols-2">
              {practicalReturnCourse.skills.map((skill, index) => {
                const Icon = icons[skill.icon];
                return (
                  <div
                    key={skill.title}
                    className="grid grid-cols-[36px_1fr] gap-3 border-b border-[#9f8c65]/35 px-5 py-5 sm:px-7 odd:sm:border-r"
                  >
                    <span className="font-serif text-sm font-bold text-[#9b6d17]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-brand-navy flex items-center gap-2 text-lg font-bold">
                        <Icon
                          className="h-4 w-4 text-[#35457e]"
                          aria-hidden="true"
                        />
                        {skill.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#59637b]">
                        {skill.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section className="dossier-paper py-20 sm:py-28">
      <div className="section-shell">
        <div className="mx-auto grid max-w-6xl overflow-hidden border border-[#9f8c65]/55 bg-[#f8f0e4] shadow-[0_30px_70px_-45px_rgba(17,24,68,.72)] lg:grid-cols-[.72fr_1.28fr]">
          <div className="bg-brand-navy relative min-h-[420px] lg:min-h-[610px]">
            <Image
              src="/brand/founder.png"
              alt="Mohammad Khairul Amin Sarker"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top saturate-[.88]"
            />
            <div className="bg-brand-navy/95 absolute inset-x-5 bottom-5 px-5 py-4 text-white shadow-[0_14px_35px_-22px_rgba(0,0,0,.8)]">
              <p className="font-heading text-xl font-bold">
                বাস্তব practice থেকে শেখানো
              </p>
              <p className="mt-1 text-sm text-[#d7daea]">
                Law · Documents · Calculation · Filing
              </p>
            </div>
          </div>
          <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
            <h2 className="font-heading text-brand-navy text-3xl font-extrabold sm:text-4xl">
              আপনার প্রশিক্ষক
            </h2>
            <div className="mt-7 border-y border-[#9f8c65]/45 py-7">
              <h3 className="font-heading text-brand-navy text-3xl font-bold">
                Mohammad Khairul Amin Sarker
              </h3>
              <p className="mt-2 font-bold text-[#35457e]">LLB, MBA, CA-CC</p>
              <p className="mt-1 text-sm font-semibold text-[#59637b] sm:text-base">
                Income Tax Lawyer · Trainer · CEO, Associates Academy
              </p>
            </div>
            <p className="mt-7 max-w-[65ch] text-base leading-8 text-[#505b75]">
              বাস্তব Income Tax practice-এর perspective থেকে course-টি এমনভাবে
              পরিচালিত হবে যাতে আইন বা portal আলাদাভাবে নয়, বরং একটি client
              return কীভাবে professionally prepare, verify এবং submit করতে
              হয়—সেই complete process শেখা যায়।
            </p>
            <div className="mt-8 grid divide-y divide-[#9f8c65]/35 border-y border-[#9f8c65]/35 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {["Practice-led", "Workflow-first", "Client-focused"].map(
                (item) => (
                  <div
                    key={item}
                    className="text-brand-navy flex items-center gap-2 px-3 py-4 text-sm font-bold"
                  >
                    <Check
                      className="h-4 w-4 text-[#a87922]"
                      aria-hidden="true"
                    />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniFlow({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#9f8c65]/35 pt-4">
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-2">
          <span className="bg-[#e8dcc7] px-2.5 py-1.5 text-xs font-bold text-[#35457e]">
            {item}
          </span>
          {index < items.length - 1 ? (
            <ArrowRight
              className="h-3.5 w-3.5 text-[#a87922]"
              aria-hidden="true"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ModuleContent({ module }: { module: CourseModule }) {
  return (
    <div className="pb-4">
      <div
        className={cn(
          "grid gap-x-8 gap-y-7 border-t border-[#9f8c65]/35 pt-6",
          module.groups.length > 1 && "md:grid-cols-2",
        )}
      >
        {module.groups.map((group) => (
          <div key={group.title}>
            <h4 className="font-heading text-brand-navy text-lg font-bold sm:text-xl">
              {group.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {group.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2.5 text-sm leading-6 text-[#505b75]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a87922]"
                    aria-hidden="true"
                  />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            {group.miniFlow ? <MiniFlow items={group.miniFlow} /> : null}
          </div>
        ))}
      </div>
      {module.scheduleHighlights ? (
        <div className="mt-7 grid border border-[#9f8c65]/35 sm:grid-cols-3 sm:divide-x sm:divide-[#9f8c65]/35">
          {module.scheduleHighlights.map((item) => (
            <div
              key={item.title}
              className="border-b border-[#9f8c65]/35 p-4 last:border-b-0 sm:border-b-0"
            >
              <p className="font-heading text-brand-navy font-bold">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-[#59637b]">{item.text}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="bg-brand-navy mt-7 px-5 py-5 text-white">
        <p className="text-brand-gold text-xs font-bold tracking-[0.12em] uppercase">
          {module.highlightLabel}
        </p>
        <p className="mt-2 text-sm leading-7 text-[#d5d8e8] sm:text-base">
          {module.highlight}
        </p>
      </div>
    </div>
  );
}

function CurriculumSection() {
  return (
    <section
      id="curriculum"
      className="dossier-field scroll-mt-24 py-20 sm:py-28"
    >
      <div className="section-shell grid gap-12 xl:grid-cols-[330px_1fr]">
        <div className="xl:sticky xl:top-28 xl:self-start">
          <SectionHeading
            title="৫টি Module—একটি Complete Return File"
            description="Compliance ও document verification দিয়ে শুরু করে complex income computation, wealth reconciliation এবং final E-Return submission পর্যন্ত।"
          />
          <div className="mt-8 border-y border-[#9f8c65]/45 py-5 text-sm leading-7 text-[#59637b]">
            {practicalReturnCourse.hero.stats.map((stat) => (
              <div key={stat.label} className="flex justify-between gap-4 py-1">
                <span>{stat.label}</span>
                <strong className="text-brand-navy">{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="module-01"
          className="space-y-4"
        >
          {practicalReturnCourse.modules.map((module) => (
            <AccordionItem
              key={module.number}
              value={`module-${module.number}`}
              className="overflow-hidden border border-[#9f8c65]/50 bg-[#f8f1e6] px-5 shadow-[0_18px_40px_-34px_rgba(17,24,68,.72)] sm:px-7"
            >
              <AccordionTrigger className="py-6 text-left hover:no-underline">
                <span className="flex min-w-0 items-start gap-4 pr-4">
                  <span className="font-serif text-3xl font-bold text-[#9b6d17]">
                    {module.number}
                  </span>
                  <span>
                    <span className="font-heading text-brand-navy block text-xl leading-snug font-bold sm:text-2xl">
                      {module.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 font-normal text-[#59637b]">
                      {module.subtitle}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ModuleContent module={module} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section className="bg-brand-navy py-20 text-white sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <SectionHeading
          inverse
          title="কোর্স শেষে আপনার file হবে submission-ready"
          description="একটি real client-এর return documents থেকে final review ও submission পর্যন্ত independently handle করার workflow আয়ত্ত করার লক্ষ্য থাকবে।"
        />
        <div className="grid gap-x-8 border-y border-white/20 md:grid-cols-2">
          {practicalReturnCourse.outcomes.map((outcome) => {
            const Icon = icons[outcome.icon];
            return (
              <div
                key={outcome.title}
                className="grid grid-cols-[40px_1fr] gap-4 border-b border-white/15 py-6 odd:md:pr-8 even:md:pl-8"
              >
                <Icon className="text-brand-gold h-6 w-6" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-xl leading-snug font-bold">
                    {outcome.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#c7cbe0]">
                    {outcome.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EnrollmentSection() {
  const offer = practicalReturnCourse.offer;
  return (
    <section
      id="enrollment"
      className="dossier-paper scroll-mt-24 py-20 sm:py-28"
    >
      <div className="section-shell">
        <div className="mx-auto grid max-w-6xl overflow-hidden border border-[#9f8c65]/55 bg-[#f8f0e4] shadow-[0_32px_80px_-48px_rgba(17,24,68,.75)] lg:grid-cols-[1.15fr_.85fr]">
          <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <SectionHeading
              title="Complete client-return workflow-এ ভর্তি হোন"
              description={practicalReturnCourse.name}
            />
            <div className="mt-8 grid gap-x-6 border-y border-[#9f8c65]/40 sm:grid-cols-2">
              {[
                "৫টি structured practical module",
                "Paper Return + NBR E-Return workflow",
                `Assessment Year ${practicalReturnCourse.assessmentYear}`,
                "Documents থেকে final submission journey",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border-b border-[#9f8c65]/30 py-4 last:border-b-0"
                >
                  <CircleCheckBig
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#a87922]"
                    aria-hidden="true"
                  />
                  <span className="text-brand-navy font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="case-folder relative flex flex-col justify-center px-6 py-12 text-white sm:px-10 lg:px-12">
            {offer.price !== undefined ? (
              <p className="font-heading text-brand-gold text-5xl font-extrabold">
                ৳ {offer.price.toLocaleString("bn-BD")}
              </p>
            ) : (
              <p className="font-heading text-3xl font-bold">
                Course access শুরু করুন
              </p>
            )}
            <p className="mt-4 text-sm leading-7 text-[#d7daea]">
              Existing secure checkout, server verification এবং dashboard
              enrollment flow ব্যবহার হবে।
            </p>
            <EnrollmentButton
              label="এখনই ভর্তি হোন"
              gold
              className="mt-7 w-full sm:h-14 sm:text-lg"
            />
            {offer.registrationDeadline ? (
              <p className="mt-3 text-center text-sm text-[#c7cbe0]">
                Registration deadline: {offer.registrationDeadline}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function RegistrationSection() {
  return (
    <section className="dossier-field py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          title="রেজিস্ট্রেশন থেকে Dashboard—৫টি verified step"
          description="Associates Academy-এর existing secure enrollment flow অনুসরণ করুন।"
        />
        <ol className="mt-12 grid border-y border-[#9f8c65]/45 md:grid-cols-5 md:divide-x md:divide-[#9f8c65]/35">
          {registrationSteps.map(([title, text], index) => (
            <li
              key={title}
              className="border-b border-[#9f8c65]/35 px-5 py-7 last:border-b-0 md:border-b-0"
            >
              <span className="font-serif text-3xl font-bold text-[#9b6d17]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-brand-navy mt-5 text-lg font-bold">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#59637b]">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="dossier-paper py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <SectionHeading
          title="প্রায়ই জিজ্ঞাসিত প্রশ্ন"
          description="Course scope, Paper Return, E-Return এবং practical outcome সম্পর্কে প্রয়োজনীয় উত্তর।"
        />
        <Accordion
          type="single"
          collapsible
          className="border-y border-[#9f8c65]/50"
        >
          {practicalReturnCourse.faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index + 1}`}
              className="border-[#9f8c65]/35"
            >
              <AccordionTrigger className="font-heading text-brand-navy py-5 text-left text-base font-bold hover:no-underline sm:text-lg">
                <span className="flex items-start gap-4 pr-4">
                  <span className="font-serif text-[#9b6d17]">
                    Q{String(index + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-12 text-sm leading-7 text-[#505b75] sm:text-base sm:leading-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function PracticalReturnCourseLanding() {
  return (
    <div className="course-dossier overflow-x-clip">
      <HeroSection />
      <WorkflowAtlas />
      <ProblemLedger />
      <AudienceAndSkills />
      <InstructorSection />
      <CurriculumSection />
      <OutcomesSection />
      <EnrollmentSection />
      <RegistrationSection />
      <FaqSection />
      <section className="dossier-field px-4 py-20 sm:py-28">
        <div className="case-folder mx-auto max-w-6xl px-6 py-12 text-center text-white shadow-[0_34px_80px_-44px_rgba(17,24,68,.85)] sm:px-10 sm:py-16">
          <FileCheck2
            className="text-brand-gold mx-auto h-9 w-9"
            aria-hidden="true"
          />
          <h2 className="font-heading mx-auto mt-5 max-w-4xl text-3xl leading-tight font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            একটি Client-এর Documents হাতে নিয়ে Complete Return File করতে
            প্রস্তুত?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#d7daea] sm:text-lg">
            Income identify করা থেকে calculation, reconciliation, Paper Return
            এবং NBR E-Return submission পর্যন্ত পুরো practical process একসঙ্গে
            শিখুন।
          </p>
          <EnrollmentButton
            label="Practical Course-এ ভর্তি হোন"
            gold
            className="mt-8 w-full sm:w-auto"
          />
        </div>
      </section>
    </div>
  );
}
