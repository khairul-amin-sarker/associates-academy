import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  Check,
  ClipboardCheck,
  CircleCheckBig,
  FileCheck2,
  Files,
  FileText,
  Landmark,
  Paperclip,
  ReceiptText,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { PracticalReturnCountdown } from "@/components/marketing/practical-return-countdown";
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

const iconFallbacks: Partial<Record<CourseIconName, LucideIcon>> = {
  BriefcaseBusiness,
  Calculator,
  CircleCheckBig,
  FileCheck2,
  Files,
  FileText,
  Scale,
  ShieldCheck,
};

const returnSystem = [
  "Client Documents",
  "Income Identify",
  "সঠিক Head-এ Classify",
  "Income Compute",
  "Tax / Rebate হিসাব",
  "TDS / Advance Tax মিলানো",
  "IT10B + IT10BB",
  "Paper Return",
  "NBR e-Return Submission",
] as const;

const portalLayers = [
  "Documents",
  "Working Paper",
  "Tax Computation",
  "IT10B / IT10BB",
  "NBR e-Return",
] as const;

const portalLayerNotes = [
  "Income ও Financial Information-এর Source",
  "Raw Information থেকে Verified Figure",
  "Income, Tax, Rebate ও Adjustment",
  "Assets, Liabilities ও Family Expenditure",
  "Final Entry ও Submission",
] as const;

const heroStatIcons = [Files, FileCheck2, Landmark, BriefcaseBusiness] as const;

const audienceGroups = [
  {
    icon: BriefcaseBusiness,
    title: "Tax Practice শুরু করতে চান",
    description:
      "Theory জানেন, কিন্তু Client-এর File হাতে পেলে কোথা থেকে শুরু করবেন সেটা পরিষ্কার নয়।",
    roles: ["নতুন Tax Practitioner", "Tax / Accounting / Law Learner"],
  },
  {
    icon: Calculator,
    title: "Accounts বা Finance-এ কাজ করেন",
    description:
      "Income, TDS, Investment ও Financial Information Return-এর জন্য কীভাবে Verify করতে হয়—তা আরও ভালোভাবে শিখতে চান।",
    roles: [
      "Accounts Professional",
      "Finance Professional",
      "Compliance Staff",
    ],
  },
  {
    icon: ShieldCheck,
    title: "ইতোমধ্যে Return Prepare করেন",
    description:
      "Paper Return থেকে আরও structuredভাবে NBR e-Return Prepare ও Review করতে চান।",
    roles: [
      "Existing Return Preparer",
      "Tax Professional",
      "Client Return Handler",
    ],
  },
] as const;

const clientJourney = [
  [
    "Client-এর Information ও Documents নেব",
    "কী তথ্য আছে এবং কী তথ্য Missing—তা Check করা",
  ],
  [
    "সব Income Source আলাদা করব",
    "Salary, Rent, Business, Investment বা অন্য Income Identify করা",
  ],
  [
    "সঠিক Income Head নির্ধারণ করব",
    "প্রতিটি Income-এর Nature অনুযায়ী Classification করা",
  ],
  [
    "Head-wise Computation তৈরি করব",
    "Taxable Income এবং Relevant Tax Treatment বের করা",
  ],
  [
    "Tax, Rebate ও TDS মিলাব",
    "Final Tax Liability ও Available Credit Reconcile করা",
  ],
  [
    "IT10B ও IT10BB Prepare করব",
    "Income, Expense, Assets ও Liabilities-এর Consistency Check করা",
  ],
  ["Paper Return Prepare করব", "Working Figures Return Form-এ Translate করা"],
  [
    "NBR e-Return Submit করব",
    "Final Review শেষে Portal Entry, Submission ও Required Records সংগ্রহ করা",
  ],
] as const;

const reviewItems = [
  "সব income identify হয়েছে?",
  "সঠিক income head-এ classify হয়েছে?",
  "Supporting documents consistent?",
  "TDS / Advance Tax reflected?",
  "Rebate correctly calculated?",
  "IT10B complete?",
  "IT10BB complete?",
  "Tax payment matched?",
  "Assets / expenditure reconciled?",
  "কোনো information missing?",
] as const;

const registrationSteps = [
  ["Course Select", "“এখনই ভর্তি হোন” Button থেকে Enrollment শুরু করুন।"],
  [
    "Login / Register",
    "নিজের Account-এ Login করুন অথবা নতুন Account তৈরি করুন।",
  ],
  ["Checkout", "প্রয়োজনীয় তথ্য দিয়ে Enrollment Request Complete করুন।"],
  ["Payment", "PayStation-এর Secure Payment Gateway দিয়ে Payment করুন।"],
  [
    "Course Access",
    "Payment Server Verification সফল হলে Dashboard-এ Course Access চালু হবে।",
  ],
] as const;

const anatomyLabels = [
  "Basic Information",
  "Income Computation",
  "TDS / AIT",
  "Tax Rebate",
  "IT10B",
  "IT10BB",
  "Tax Payment",
  "Paper Return",
  "E-Return",
  "Acknowledgement",
] as const;

function SectionHeading({
  title,
  description,
  className,
  inverse = false,
}: {
  title: string;
  description?: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2
        className={cn(
          "font-heading text-3xl leading-[1.2] font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-[2.8rem] lg:leading-[1.16]",
          inverse ? "text-white" : "text-brand-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-8 sm:text-lg",
            inverse ? "text-white/72" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function EnrollButton({
  label = "কোর্সে ভর্তি হোন",
  inverse = false,
  className,
}: {
  label?: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Button
      size="lg"
      asChild
      className={cn(
        "clicky min-h-12 rounded-xl px-6 font-bold",
        inverse && "bg-brand-gold text-brand-navy hover:bg-brand-gold/90",
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

function ReturnCaseVisual() {
  const sections = [
    "Client Information",
    "Income Heads",
    "Tax Computation",
    "IT10B / IT10BB",
    "TDS / AIT",
    "Final Submission",
  ];

  return (
    <div className="relative mx-auto min-h-[450px] w-full max-w-[560px] sm:min-h-[535px]">
      <div
        className="border-brand-navy/10 bg-brand-navy/4 absolute inset-x-1 top-7 bottom-0 rounded-[1.75rem] border"
        aria-hidden="true"
      />
      <div
        className="border-brand-navy/10 bg-card absolute top-4 right-12 left-16 h-[78%] -rotate-3 rounded-xl border p-7 shadow-[0_24px_56px_-38px_rgba(17,24,68,0.48)]"
        aria-hidden="true"
      >
        <div className="border-brand-navy/10 flex items-center justify-between border-b pb-3">
          <span className="font-heading text-brand-navy text-sm font-bold">
            PAPER RETURN
          </span>
          <span className="text-muted-foreground text-[10px] tracking-[0.16em]">
            FORM · 2026
          </span>
        </div>
        <div className="mt-5 space-y-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "bg-brand-navy/8 h-px",
                index % 3 === 2 ? "w-2/3" : "w-full",
              )}
            />
          ))}
        </div>
      </div>

      <div className="bg-brand-navy course-bg-dots-navy absolute inset-x-3 top-16 bottom-3 rotate-1 rounded-2xl shadow-[0_32px_70px_-35px_rgba(17,24,68,0.68)]">
        <div className="bg-brand-indigo absolute -top-5 left-8 rounded-t-lg px-5 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase shadow-sm">
          Taxpayer Case File
        </div>
        <div className="absolute top-8 right-0 flex flex-col gap-2">
          {["A", "B", "C"].map((tab) => (
            <span
              key={tab}
              className="bg-brand-gold text-brand-navy rounded-l-md px-2.5 py-2 text-[10px] font-extrabold"
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="border-brand-gold/70 absolute top-5 left-6 h-2 w-28 rounded-full border-t" />
      </div>

      <div className="dossier-settle border-brand-navy/10 bg-card absolute top-24 right-8 bottom-3 left-7 -rotate-1 overflow-hidden rounded-xl border p-5 shadow-[0_28px_60px_-30px_rgba(17,24,68,0.66)] sm:right-14 sm:left-12 sm:p-7">
        <Paperclip
          className="text-brand-gold absolute top-4 right-20 h-8 w-8 rotate-12"
          strokeWidth={1.4}
          aria-hidden="true"
        />
        <div className="border-brand-navy/10 flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <p className="text-brand-indigo text-[10px] font-bold tracking-[0.15em] uppercase">
              Assessment Dossier
            </p>
            <p className="font-heading text-brand-navy mt-1 text-xl font-extrabold sm:text-2xl">
              Client Return File
            </p>
          </div>
          <div className="border-brand-gold text-brand-gold grid h-14 w-14 shrink-0 -rotate-6 place-items-center rounded-full border text-center text-[9px] leading-3 font-extrabold shadow-[inset_0_0_0_4px_var(--card),inset_0_0_0_5px_var(--brand-gold)]">
            AY
            <br />
            2026–27
          </div>
        </div>
        <div className="mt-3">
          {sections.map((section, index) => (
            <div
              key={section}
              className="border-brand-navy/10 flex items-center gap-3 border-b py-2.5 sm:py-3"
            >
              <span className="text-brand-indigo font-mono text-[10px] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-brand-navy flex-1 text-sm font-semibold sm:text-base">
                {section}
              </span>
              <Check className="text-success h-4 w-4" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-muted-foreground text-[10px] font-semibold tracking-[0.1em] uppercase">
            Evidence indexed · figures reconciled
          </span>
          <span className="border-success/30 bg-success/8 text-success inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold whitespace-nowrap">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Ready for E-Return
          </span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="home-paper-dots bg-brand-cream overflow-hidden py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.06fr_.94fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap gap-2">
              {[
                practicalReturnCourse.financeAct,
                `AY ${practicalReturnCourse.assessmentYear}`,
              ].map((item) => (
                <span
                  key={item}
                  className="border-brand-navy/12 bg-card text-brand-navy rounded-full border px-3 py-1.5 text-xs font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="font-heading text-brand-indigo mt-7 text-lg font-bold sm:text-xl">
              {practicalReturnCourse.name}
            </p>
            <h1 className="font-heading text-brand-navy mt-4 max-w-none text-[2.55rem] leading-[1.13] font-extrabold tracking-[-0.025em] sm:max-w-[14ch] sm:text-[3.25rem] sm:leading-[1.11] lg:max-w-[13ch] lg:text-[3.55rem]">
              <span className="block">“Paper Return” থেকে “NBR e-Return”—</span>
              <span className="mt-1 block">
                একটি Client Case শুরু থেকে শেষ পর্যন্ত হাতে-কলমে শিখুন
              </span>
            </h1>
            <p className="text-muted-foreground mt-7 max-w-[65ch] text-base leading-[1.9] whitespace-pre-line sm:text-[1.08rem]">
              {practicalReturnCourse.hero.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <EnrollButton className="w-full sm:w-auto" />
              <Button
                size="lg"
                variant="outline"
                asChild
                className="clicky border-brand-navy/20 bg-card min-h-12 w-full rounded-xl px-6 font-bold sm:w-auto"
              >
                <Link href="#curriculum">
                  সম্পূর্ণ curriculum
                  <ArrowDown aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <ReturnCaseVisual />
        </div>

        <dl className="border-brand-navy/10 bg-card mt-12 grid overflow-hidden rounded-2xl border shadow-[0_18px_48px_-38px_rgba(17,24,68,0.42)] sm:grid-cols-2 lg:grid-cols-4">
          {practicalReturnCourse.hero.stats.map((stat, index) => {
            const Icon = heroStatIcons[index];
            return (
              <div
                key={stat.label}
                className={cn(
                  "flex min-h-18 items-center gap-3 px-5 py-4",
                  index > 0 &&
                    "border-brand-navy/10 border-t sm:border-t-0 sm:border-l",
                  index === 2 && "sm:border-l-0 lg:border-l",
                )}
              >
                <Icon
                  className="text-brand-indigo h-4.5 w-4.5 shrink-0"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <dt className="text-muted-foreground text-xs sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="font-heading text-brand-navy mt-0.5 text-lg font-extrabold whitespace-nowrap">
                    {stat.value}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function EditorialProblemSection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Return Filing-এ সবচেয়ে বেশি ভুল হয় Portal-এর আগেই"
          description="Portal-এ তথ্য বসানো তুলনামূলক সহজ। কঠিন হলো—কোন তথ্যটি সঠিক, কোন Income কোন Head-এ যাবে, কোন Document দরকার এবং সব হিসাব একে অন্যের সঙ্গে মিলছে কি না—সেটা ঠিক করা।"
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <article className="border-brand-navy/12 border-y py-8 sm:py-10">
            <Files className="text-brand-indigo h-8 w-8" aria-hidden="true" />
            <h3 className="font-heading text-brand-navy mt-7 text-3xl leading-tight font-extrabold sm:text-4xl">
              কোন Document কেন লাগবে?
            </h3>
            <p className="text-muted-foreground mt-5 max-w-xl text-base leading-8">
              {practicalReturnCourse.problems[0].text}
            </p>
          </article>
          <div className="divide-brand-navy/10 divide-y">
            {practicalReturnCourse.problems.slice(1).map((problem) => (
              <article
                key={problem.title}
                className="py-5 first:pt-0 last:pb-0"
              >
                <h3 className="font-heading text-brand-navy text-xl font-bold">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm leading-6">
                  {problem.text}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="border-brand-gold/40 bg-brand-gold/8 mt-12 flex items-start gap-4 border-y px-1 py-5 sm:px-5">
          <Scale
            className="text-brand-gold mt-1 h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          <p className="font-heading text-brand-navy text-xl font-bold sm:text-2xl">
            সঠিক Return মানে শুধু সঠিক Tax Calculation নয়—Documents, Income,
            Tax, Expenditure ও Assets সবকিছুর মধ্যে মিল থাকা।
          </p>
        </div>
      </div>
    </section>
  );
}

function ReturnSystemFlow() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="একটি Income Tax Return আসলে এভাবেই তৈরি হয়"
          description="একটি Return একবারে তৈরি হয় না। Client-এর Documents থেকে শুরু করে ধাপে ধাপে তথ্য যাচাই, হিসাব ও Review করে Final Return তৈরি করতে হয়।"
        />
        <div className="border-brand-navy/10 bg-card relative mt-12 overflow-hidden border px-5 py-8 shadow-[0_22px_60px_-44px_rgba(17,24,68,0.65)] sm:px-8 lg:px-10 lg:py-12">
          <div
            className="bg-brand-indigo/25 absolute top-12 bottom-12 left-[2.45rem] w-px lg:top-[4.2rem] lg:right-16 lg:bottom-auto lg:left-16 lg:h-px lg:w-auto"
            aria-hidden="true"
          />
          <ol className="relative grid gap-7 lg:grid-cols-9 lg:gap-3">
            {returnSystem.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[40px_1fr] items-center gap-4 lg:flex lg:flex-col lg:text-center"
              >
                <span className="bg-card border-brand-indigo text-brand-indigo grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 text-xs font-extrabold tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-brand-navy text-sm leading-5 font-semibold lg:mt-4">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <div className="border-brand-navy/10 text-muted-foreground mt-9 flex items-center gap-3 border-t pt-6 text-sm leading-6 lg:mt-11">
            <FileText
              className="text-brand-indigo h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            Source document থেকে acknowledgement—একটি Client Return-এর পুরো পথ।
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalIsLastStep() {
  return (
    <section className="bg-brand-cream py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <SectionHeading
          title="NBR e-Return Portal হলো শেষ ধাপ—Return Preparation শুরু হয় Documents থেকে"
          description="Portal-এ Final Figure বসানোর আগে সেই Figure কোথা থেকে এলো, কেন এলো এবং Document-এর সঙ্গে মিলছে কি না—এটাই Return Preparation-এর আসল কাজ।"
        />
        <div className="relative mx-auto h-[440px] w-full max-w-[480px]">
          <div
            className="border-brand-navy/10 bg-card/45 absolute inset-x-4 top-4 bottom-4 rounded-[1.5rem] border"
            aria-hidden="true"
          />
          {portalLayers.map((layer, index) => (
            <div
              key={layer}
              className={cn(
                "border-brand-navy/12 bg-card absolute right-0 left-0 flex h-28 items-center overflow-hidden rounded-xl border px-6 shadow-[0_18px_42px_-32px_rgba(17,24,68,0.5)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_52px_-34px_rgba(17,24,68,0.6)]",
                index === portalLayers.length - 1 &&
                  "bg-brand-navy course-bg-dots-navy border-brand-navy text-white",
              )}
              style={{
                top: `${index * 68}px`,
                left: `${index * 10}px`,
                right: `${(portalLayers.length - index - 1) * 10}px`,
                zIndex: index + 1,
              }}
            >
              <span
                className={cn(
                  "absolute inset-y-0 left-0 w-1",
                  index === portalLayers.length - 1
                    ? "bg-brand-gold"
                    : "bg-brand-indigo/25",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "font-mono text-xs tabular-nums",
                  index === portalLayers.length - 1
                    ? "text-brand-gold"
                    : "text-brand-indigo",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="ml-4 min-w-0">
                <span className="font-heading block text-xl font-extrabold sm:text-2xl">
                  {layer}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[10px] font-semibold tracking-[0.08em] uppercase",
                    index === portalLayers.length - 1
                      ? "text-white/55"
                      : "text-muted-foreground",
                  )}
                >
                  {portalLayerNotes[index]}
                </span>
              </span>
              <ArrowDown
                className={cn(
                  "ml-auto h-4 w-4",
                  index === portalLayers.length - 1
                    ? "text-brand-gold"
                    : "text-brand-indigo",
                )}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-heading text-brand-navy border-brand-gold/40 mt-10 border-y py-5 text-center text-xl font-extrabold sm:text-2xl">
          এই কোর্সে Portal-এর Button নয়—Portal-এ দেওয়ার সঠিক Figure কীভাবে তৈরি
          করবেন, সেটাই আগে শেখানো হবে।
        </p>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="এই কোর্সটি আপনার জন্য, যদি—"
          description="আপনি Beginner হন বা আগে থেকেই Accounts/Tax-এর কাজ করেন—লক্ষ্য যদি হয় একটি Client-এর Return সঠিকভাবে Prepare ও Submit করা, তাহলে এই কোর্সটি আপনার কাজে আসবে।"
          className="mx-auto text-center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {audienceGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article
                key={group.title}
                className="border-brand-navy/10 bg-card hover:border-brand-indigo/20 flex h-full flex-col rounded-2xl border p-7 shadow-[0_18px_48px_-40px_rgba(17,24,68,0.55)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_24px_56px_-40px_rgba(17,24,68,0.65)] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-brand-indigo/8 text-brand-indigo grid h-11 w-11 place-items-center rounded-xl">
                    <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <span className="text-brand-blue/70 font-mono text-[10px] tabular-nums">
                    PROFILE
                  </span>
                </div>
                <h3 className="font-heading text-brand-navy mt-7 text-2xl leading-[1.18] font-extrabold">
                  {group.title}
                </h3>
                <p className="text-muted-foreground mt-4 text-sm leading-7">
                  {group.description}
                </p>
                <div className="border-brand-navy/10 mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t pt-5">
                  {group.roles.map((role) => (
                    <span
                      key={role}
                      className="text-brand-indigo text-xs font-semibold"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapabilityMatrix() {
  const columns = [
    ["Preparation", practicalReturnCourse.skills.slice(0, 5)],
    ["Filing & Reconciliation", practicalReturnCourse.skills.slice(5)],
  ] as const;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="এই কোর্সে আপনি কোন কোন কাজ হাতে-কলমে শিখবেন?"
          description="একটি Return Prepare করতে যেসব Skill একসঙ্গে প্রয়োজন, সেগুলো আলাদা আলাদা নয়—একটি Client Case-এর মধ্যেই Practice করা হবে।"
        />
        <div className="border-brand-navy/10 bg-card mt-12 grid rounded-2xl border p-6 shadow-[0_24px_64px_-48px_rgba(17,24,68,0.58)] sm:p-9 lg:grid-cols-2 lg:p-12">
          {columns.map(([title, items], columnIndex) => (
            <div
              key={title}
              className={cn(
                columnIndex === 1 &&
                  "border-brand-navy/10 mt-10 border-t pt-10 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12",
                columnIndex === 0 && "lg:pr-12",
              )}
            >
              <h3 className="font-heading text-brand-navy flex items-center gap-3 text-2xl font-extrabold">
                <span
                  className="bg-brand-gold h-1.5 w-7 rounded-full"
                  aria-hidden="true"
                />
                {title}
              </h3>
              <div className="divide-brand-navy/10 mt-5 divide-y">
                {items.map((skill) => {
                  const Icon = iconFallbacks[skill.icon] ?? FileCheck2;
                  return (
                    <div
                      key={skill.title}
                      className="flex gap-4 py-4.5 first:pt-0"
                    >
                      <span className="bg-brand-indigo/7 text-brand-indigo mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="text-brand-navy font-semibold">
                          {skill.title}
                        </h4>
                        <p className="text-muted-foreground mt-1 text-sm leading-6">
                          {skill.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Instructor() {
  return (
    <section id="instructor" className="bg-brand-cream py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-brand-navy/10 bg-card grid overflow-hidden rounded-3xl border shadow-[0_28px_70px_-42px_rgba(17,24,68,0.52)] lg:grid-cols-[.4fr_.6fr]">
          <div className="bg-brand-navy course-bg-dots-navy relative min-h-[440px] overflow-hidden lg:min-h-[590px]">
            <div
              className="border-brand-gold/35 absolute inset-5 z-10 rounded-2xl border"
              aria-hidden="true"
            />
            <div
              className="bg-brand-navy/12 absolute inset-x-8 bottom-7 z-10 h-px"
              aria-hidden="true"
            />
            <Image
              src="/brand/founder.png"
              alt="Mohammad Khairul Amin Sarker"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover object-top"
            />
          </div>
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-brand-indigo text-xs font-bold tracking-[0.16em] uppercase">
              Your Instructor
            </p>
            <h2 className="font-heading text-brand-navy mt-4 text-4xl leading-tight font-extrabold sm:text-5xl">
              Mohammad Khairul Amin Sarker
            </h2>
            <p className="text-brand-indigo mt-3 text-lg font-bold">
              LLB · MBA · CA-CC
            </p>
            <p className="text-muted-foreground mt-1 font-semibold">
              Income Tax Lawyer · Trainer · CEO, Associates Academy
            </p>
            <div className="border-brand-navy/10 bg-brand-cream mt-8 grid overflow-hidden rounded-2xl border sm:grid-cols-[120px_1fr]">
              <div className="bg-brand-navy course-bg-dots-navy grid min-h-28 place-items-center px-5 py-6 text-center text-white">
                <div>
                  <p className="font-heading text-brand-gold text-4xl font-extrabold tabular-nums">
                    13+
                  </p>
                  <p className="mt-1 text-[10px] font-bold tracking-[0.14em] text-white/60 uppercase">
                    Years
                  </p>
                </div>
              </div>
              <div className="divide-brand-navy/10 flex flex-col justify-center divide-y px-6 py-4">
                <p className="text-brand-navy py-2 text-sm font-bold">
                  13 years plus experience
                </p>
                <p className="text-brand-navy py-2 text-sm font-bold">
                  13 years plus income tax practice
                </p>
              </div>
            </div>
            <div className="border-brand-gold/45 mt-8 border-y py-7">
              <p className="font-heading text-brand-navy text-2xl leading-snug font-extrabold sm:text-3xl">
                Return Preparation সবচেয়ে ভালো শেখা যায় একটি বাস্তব Client Case
                শুরু থেকে শেষ পর্যন্ত করলে।
              </p>
            </div>
            <p className="text-muted-foreground mt-7 max-w-2xl text-base leading-8">
              Client-এর Documents হাতে পাওয়ার পর একজন Practitioner বাস্তবে
              কীভাবে কাজটি এগিয়ে নেন—সেটিই Income Tax practice-এর perspective
              থেকে দেখানো হবে।
            </p>
            <div className="text-brand-navy mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
              <span>Income Tax Practice</span>
              <span>Client Return Preparation</span>
              <span>Paper Return &amp; NBR e-Return</span>
              <span>Return Review &amp; Reconciliation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModuleBody({ module }: { module: CourseModule }) {
  return (
    <div className="border-brand-navy/10 grid gap-9 border-t px-1 pt-8 pb-4 sm:px-2 lg:grid-cols-[.34fr_.66fr] lg:gap-12">
      <div>
        <p className="text-muted-foreground text-base leading-7">
          {module.subtitle}
        </p>
        <div className="border-brand-indigo/18 bg-brand-indigo/5 mt-7 rounded-xl border p-5">
          <p className="text-brand-indigo text-xs font-bold tracking-[0.12em] uppercase">
            {module.highlightLabel}
          </p>
          <p className="text-brand-navy mt-3 text-sm leading-7 font-medium">
            {module.highlight}
          </p>
        </div>
      </div>
      <div className="divide-brand-navy/10 divide-y">
        {module.groups.map((group) => (
          <section key={group.title} className="py-7 first:pt-0 last:pb-0">
            <h4 className="font-heading text-brand-navy text-xl font-extrabold">
              {group.title}
            </h4>
            <ul className="mt-4 grid gap-x-9 gap-y-2.5 sm:grid-cols-2">
              {group.topics.map((topic) => (
                <li
                  key={topic}
                  className="text-muted-foreground flex items-start gap-2.5 text-sm leading-[1.65]"
                >
                  <span className="bg-brand-indigo mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            {group.miniFlow ? (
              <div className="border-brand-navy/10 text-brand-indigo mt-5 flex flex-wrap items-center gap-2 border-t pt-4 text-xs font-semibold">
                {group.miniFlow.map((item, index) => (
                  <span key={item} className="flex items-center gap-2">
                    {item}
                    {index < group.miniFlow!.length - 1 ? (
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : null}
                  </span>
                ))}
              </div>
            ) : null}
          </section>
        ))}
        {module.scheduleHighlights ? (
          <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:gap-0">
            {module.scheduleHighlights.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "sm:flex-1",
                  index > 0 && "sm:border-brand-navy/10 sm:border-l sm:pl-5",
                )}
              >
                <p className="text-brand-navy text-sm font-bold">
                  {item.title}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Curriculum() {
  return (
    <section id="curriculum" className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="৫টি Module—একটি Client Return, শুরু থেকে Final Submission পর্যন্ত"
          description="প্রতিটি Module আলাদা Topic নয়। এক Module-এ যা শিখবেন, পরের Module-এ সেটাই ব্যবহার করে Client-এর Return আরও এগিয়ে নেওয়া হবে।"
        />
        <Accordion
          type="single"
          collapsible
          defaultValue="module-01"
          className="mt-12"
        >
          {practicalReturnCourse.modules.map((module) => (
            <AccordionItem
              key={module.number}
              value={`module-${module.number}`}
              className="group border-brand-navy/12 bg-card hover:border-brand-indigo/20 data-[state=open]:border-brand-indigo/25 mb-4 overflow-hidden rounded-2xl border px-5 shadow-[0_14px_38px_-34px_rgba(17,24,68,0.48)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_46px_-34px_rgba(17,24,68,0.58)] data-[state=open]:shadow-[0_22px_52px_-36px_rgba(17,24,68,0.62)] sm:px-7"
            >
              <AccordionTrigger className="focus-visible:ring-brand-indigo/35 [&>svg]:text-brand-indigo py-6 text-left hover:no-underline focus-visible:ring-2 focus-visible:ring-inset sm:py-7 [&>svg]:h-5 [&>svg]:w-5">
                <div className="grid flex-1 grid-cols-[48px_1fr] items-center gap-4 pr-5 sm:grid-cols-[64px_1fr_auto] sm:gap-5">
                  <span className="font-heading bg-brand-indigo/7 text-brand-indigo group-data-[state=open]:bg-brand-navy group-data-[state=open]:text-brand-gold grid h-11 w-11 place-items-center rounded-xl text-xl font-extrabold tabular-nums transition-colors sm:h-12 sm:w-12 sm:text-2xl">
                    {module.number}
                  </span>
                  <span className="font-heading text-brand-navy text-xl leading-tight font-extrabold sm:text-2xl">
                    {module.title}
                  </span>
                  <span className="text-muted-foreground hidden max-w-48 text-right text-xs leading-5 font-medium sm:block">
                    {module.subtitle}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ModuleBody module={module} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinancialConsistency() {
  return (
    <section className="bg-brand-navy course-bg-dots-navy py-18 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.045] px-6 py-10 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.55)] sm:px-10 sm:py-12 lg:px-14">
          <div
            className="bg-brand-gold/70 absolute inset-x-0 top-0 h-px"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-brand-gold text-xs font-bold tracking-[0.16em] uppercase">
                Financial consistency test
              </p>
              <h2 className="font-heading mt-3 max-w-3xl text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
                Income → Tax → Expenditure → Assets
              </h2>
            </div>
            <Scale
              className="text-brand-gold h-11 w-11 shrink-0"
              strokeWidth={1.35}
              aria-hidden="true"
            />
          </div>

          <div className="mt-9 grid items-center gap-7 lg:grid-cols-[1fr_auto_1.15fr] lg:gap-10">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-white/45 uppercase">
                Available sources
              </p>
              <p className="font-heading mt-3 text-3xl leading-[1.12] font-extrabold sm:text-4xl">
                Income + Other Explained Sources
              </p>
            </div>
            <div className="border-brand-gold text-brand-gold mx-auto grid h-14 w-14 place-items-center rounded-full border text-3xl font-extrabold shadow-[inset_0_0_0_5px_var(--brand-navy),inset_0_0_0_6px_var(--brand-gold)]">
              =
            </div>
            <div className="lg:border-l lg:border-white/10 lg:pl-10">
              <p className="text-xs font-bold tracking-[0.14em] text-white/45 uppercase">
                Financial application
              </p>
              <p className="font-heading mt-3 text-3xl leading-[1.12] font-extrabold sm:text-4xl">
                Tax + Family Expenditure
                <span className="text-brand-gold mx-2">+</span>
                Asset Growth
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              Return Preparation শুধু Income Calculate করা নয়। একজন Taxpayer-এর
              Income, Tax Payment, Family Expenditure এবং Assets-এর পরিবর্তনের
              মধ্যে যুক্তিসংগত সম্পর্ক থাকা প্রয়োজন।
            </p>
            <span className="border-brand-gold/40 text-brand-gold inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Return-এর Cross-check
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReturnFileAnatomy() {
  const renderAnnotations = (
    items: readonly string[],
    start: number,
    reverse = false,
  ) => (
    <div className="space-y-5 sm:space-y-6">
      {items.map((item, index) => (
        <div
          key={item}
          className={cn(
            "flex items-center gap-3",
            reverse
              ? "lg:flex-row-reverse lg:justify-end"
              : "lg:justify-end lg:text-right",
          )}
        >
          <span className="text-brand-navy text-sm font-semibold sm:text-base">
            {item}
          </span>
          <span className="bg-brand-indigo/30 hidden h-px flex-1 lg:block" />
          <span className="border-brand-indigo bg-card text-brand-indigo grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[10px] font-bold tabular-nums shadow-sm">
            {String(start + index).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-brand-cream py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="একটি Complete Return File-এ শুধু Return Form থাকে না"
          description="ভালোভাবে Prepare করা একটি Client File-এ Final Return-এর পাশাপাশি সেই Return-এর পেছনের Evidence ও Calculation-ও গুছিয়ে থাকা উচিত।"
          className="mx-auto text-center"
        />
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_340px_1fr] lg:gap-8">
          {renderAnnotations(anatomyLabels.slice(0, 5), 1)}
          <div className="relative mx-auto h-[430px] w-[320px] max-w-full">
            <div className="bg-brand-indigo/16 absolute inset-x-6 top-0 h-[385px] rotate-3 rounded-xl" />
            <div className="bg-brand-navy course-bg-dots-navy absolute inset-x-0 top-8 bottom-0 -rotate-2 rounded-2xl shadow-[0_34px_70px_-36px_rgba(17,24,68,0.72)]">
              <div className="bg-brand-gold text-brand-navy absolute -top-4 left-6 rounded-t-md px-5 py-2 text-[10px] font-extrabold tracking-[0.12em] uppercase">
                Client File
              </div>
            </div>
            <div className="border-brand-navy/10 bg-card absolute inset-x-6 top-16 bottom-6 rounded-xl border p-7 shadow-[0_20px_44px_-34px_rgba(17,24,68,0.55)]">
              <Paperclip
                className="text-brand-gold absolute top-5 right-6 h-7 w-7 rotate-12"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <p className="text-brand-indigo text-[10px] font-bold tracking-[0.15em] uppercase">
                Complete Return
              </p>
              <h3 className="font-heading text-brand-navy mt-2 text-3xl font-extrabold">
                Taxpayer Dossier
              </h3>
              <div className="border-brand-navy/10 mt-6 space-y-4 border-y py-5">
                {[
                  "Evidence Index",
                  "Working Computation",
                  "Statements",
                  "Submission Record",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="text-brand-navy flex items-center gap-3 text-sm font-semibold"
                  >
                    <span className="text-brand-indigo font-mono text-[9px] tabular-nums">
                      0{index + 1}
                    </span>
                    {item}
                    <Check
                      className="text-success ml-auto h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
              <div className="border-brand-gold text-brand-gold mx-auto mt-7 grid h-17 w-17 -rotate-6 place-items-center rounded-full border text-center text-[9px] leading-3 font-extrabold shadow-[inset_0_0_0_5px_var(--card),inset_0_0_0_6px_var(--brand-gold)]">
                REVIEWED
                <br />
                AY 26–27
              </div>
            </div>
          </div>
          {renderAnnotations(anatomyLabels.slice(5), 6, true)}
        </div>
      </div>
    </section>
  );
}

function ClientJourney() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Course-এ একটি Client File আমরা এভাবেই এগোবো"
          description="Documents থেকে Final Submission পর্যন্ত একটি Client Case ধাপে ধাপে Prepare, Check ও Review করা হবে।"
        />
        <div className="relative mt-14">
          <div
            className="bg-brand-indigo/25 absolute top-4 bottom-4 left-4 w-px lg:top-4 lg:right-4 lg:bottom-auto lg:left-4 lg:h-px lg:w-auto"
            aria-hidden="true"
          />
          <ol className="relative grid gap-9 lg:grid-cols-8 lg:gap-5">
            {clientJourney.map(([title, text], index) => (
              <li
                key={title}
                className="grid grid-cols-[32px_1fr] gap-4 lg:block"
              >
                <span className="bg-card border-brand-indigo text-brand-indigo ring-background grid h-8 w-8 place-items-center rounded-full border-2 text-[10px] font-extrabold tabular-nums ring-4">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-8">
                  <p className="text-brand-indigo text-[11px] font-bold tracking-[0.12em] uppercase">
                    Stage {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-heading text-brand-navy mt-2 text-[1.15rem] leading-[1.2] font-extrabold">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mt-2.5 text-sm leading-6">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ReturnReviewPanel() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          title="Submit চাপার আগে এই ১০টি প্রশ্নের উত্তর মিলতে হবে"
          description="একজন ভালো Return Preparer শুধু Data Entry করেন না—Submit করার আগে পুরো Return-টা আবার একজন Reviewer-এর মতো দেখেন।"
        />
        <div className="border-brand-navy/10 bg-card mt-12 grid overflow-hidden rounded-2xl border shadow-[0_28px_68px_-46px_rgba(17,24,68,0.55)] lg:grid-cols-[1fr_310px]">
          <div className="relative p-6 sm:p-9 lg:p-11">
            <div
              className="border-brand-navy/8 absolute inset-x-6 top-0 h-px sm:inset-x-9"
              aria-hidden="true"
            />
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {reviewItems.map((item) => (
                <li
                  key={item}
                  className="text-brand-navy flex items-start gap-3 text-sm leading-6"
                >
                  <span className="border-success/40 bg-success/6 text-success mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-brand-cream home-paper-dots border-brand-navy/10 grid min-h-72 place-items-center border-t p-8 lg:border-t-0 lg:border-l">
            <div className="border-brand-indigo text-brand-indigo grid h-48 w-48 -rotate-4 place-items-center rounded-full border-2 text-center shadow-[inset_0_0_0_8px_var(--brand-cream),inset_0_0_0_9px_var(--brand-indigo),0_18px_40px_-30px_rgba(17,24,68,0.55)]">
              <div>
                <ClipboardCheck
                  className="mx-auto mb-3 h-6 w-6"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <p className="text-xs font-bold tracking-[0.16em] uppercase">
                  Final Review
                </p>
                <p className="font-heading text-brand-navy mt-2 text-2xl leading-none font-extrabold">
                  Ready to
                  <br />
                  Submit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Transformation() {
  const columns = [
    [
      "Course-এর আগে",
      [
        "Client Documents আছে, কিন্তু কোথা থেকে শুরু করবেন পরিষ্কার নয়",
        "Income Head নিয়ে Confusion",
        "Portal-এর ওপর বেশি Dependence",
        "TDS, Assets ও Expenses মিলাতে সমস্যা",
        "Final Review-এর নির্দিষ্ট Checklist নেই",
      ],
    ],
    [
      "Course-এর পরে",
      [
        "Client File শুরু করার Clear Sequence",
        "Evidence দেখে Income Classification",
        "Head-wise Tax Computation",
        "IT10B / IT10BB Reconciliation",
        "Paper Return + NBR e-Return Submission Process",
      ],
    ],
  ] as const;

  return (
    <section className="bg-brand-cream py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="এখন যদি Return Preparation জটিল মনে হয়—লক্ষ্য হলো এটাকে ধাপে ধাপে আনা"
          description="Client Documents থেকে Final Submission পর্যন্ত কাজটি পরিষ্কার ধাপে ভাগ করে Practice করা হবে।"
          className="mx-auto text-center"
        />
        <div className="border-brand-navy/10 bg-card mt-12 grid items-stretch overflow-hidden rounded-2xl border shadow-[0_22px_56px_-44px_rgba(17,24,68,0.5)] lg:grid-cols-[1fr_92px_1fr]">
          {columns.map(([title, items], columnIndex) => (
            <div
              key={title}
              className={cn(
                "p-7 sm:p-10",
                columnIndex === 0 ? "bg-card" : "bg-brand-indigo/7",
                columnIndex === 1 && "order-3 lg:order-none lg:col-start-3",
              )}
            >
              <h3 className="font-heading text-brand-navy text-3xl font-extrabold">
                {title}
              </h3>
              <ul className="divide-brand-navy/10 mt-6 divide-y">
                {items.map((item) => (
                  <li
                    key={item}
                    className="text-brand-navy flex items-center gap-3 py-3.5 text-sm font-medium"
                  >
                    {columnIndex === 0 ? (
                      <span className="border-brand-blue h-2.5 w-2.5 shrink-0 rounded-full border" />
                    ) : (
                      <Check
                        className="text-success h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ArrowRight
            className="text-brand-gold order-2 mx-auto hidden h-8 w-8 self-center lg:order-none lg:col-start-2 lg:row-start-1 lg:block"
            aria-hidden="true"
          />
          <div
            className="border-brand-navy/10 bg-brand-cream order-2 flex items-center justify-center border-y py-4 lg:hidden"
            aria-hidden="true"
          >
            <ArrowDown className="text-brand-gold h-7 w-7" />
          </div>
        </div>
        <p className="border-brand-gold/45 font-heading text-brand-navy mt-8 border-y py-5 text-center text-xl font-extrabold sm:text-2xl">
          Goal: একটি Client-এর Return Documents থেকে Final Submission পর্যন্ত
          নিজে Prepare ও Review করার Practical Process তৈরি করা
        </p>
      </div>
    </section>
  );
}

function Enrollment({
  commerce,
}: {
  commerce: { price: number; regularPrice: number | null } | null;
}) {
  const offer = practicalReturnCourse.offer;
  const discount =
    commerce?.regularPrice && commerce.regularPrice > commerce.price
      ? commerce.regularPrice - commerce.price
      : null;
  const facts = [
    ["Course", practicalReturnCourse.name],
    ["Scope", "Paper Return + NBR E-Return"],
    ["Assessment Year", practicalReturnCourse.assessmentYear],
    ["Legal basis", practicalReturnCourse.financeAct],
    [
      "Curriculum",
      `${practicalReturnCourse.modules.length}টি practical module`,
    ],
  ] as const;
  const includes = [
    "Document Verification ও Income Classification",
    "7 Heads of Income",
    "Head-wise Income ও Tax Computation",
    "Tax Rebate ও TDS / Advance Tax Adjustment",
    "IT10B ও IT10BB",
    "Tax Payment / A-Challan",
    "Paper Return Preparation",
    "NBR e-Return Entry",
    "Final Review & Submission",
  ];

  return (
    <section id="enrollment" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="border-brand-navy/10 bg-card overflow-hidden rounded-3xl border shadow-[0_30px_72px_-46px_rgba(17,24,68,0.62)]">
          <div className="bg-brand-navy course-bg-dots-navy flex flex-col gap-6 px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9 lg:px-12 lg:py-10">
            <div>
              <p className="text-brand-gold text-xs font-bold tracking-[0.15em] uppercase">
                Course Enrollment
              </p>
              <h2 className="font-heading mt-2 text-3xl font-extrabold sm:text-4xl">
                Paper Return + NBR e-Return—একসঙ্গে শিখুন
              </h2>
            </div>
            {commerce ? (
              <div className="text-right">
                <p className="font-heading text-brand-gold text-4xl font-extrabold">
                  ৳ {commerce.price.toLocaleString("bn-BD")}
                </p>
                {commerce.regularPrice ? (
                  <p className="mt-1 text-xs font-semibold text-white/70">
                    নিয়মিত ৳ {commerce.regularPrice.toLocaleString("bn-BD")}
                    {discount
                      ? ` · ৳ ${discount.toLocaleString("bn-BD")} ছাড়`
                      : ""}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="border-brand-gold/35 text-brand-gold flex h-14 w-14 shrink-0 items-center justify-center rounded-full border shadow-[inset_0_0_0_5px_var(--brand-navy),inset_0_0_0_6px_var(--brand-gold)]">
                <ReceiptText
                  className="h-6 w-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-2 lg:gap-14 lg:p-12">
            <div>
              <h3 className="font-heading text-brand-navy text-2xl font-extrabold">
                Course facts
              </h3>
              <dl className="divide-brand-navy/10 mt-5 divide-y">
                {facts.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[110px_1fr] gap-4 py-3.5 text-sm"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="text-brand-navy font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-heading text-brand-navy text-2xl font-extrabold">
                Course includes
              </h3>
              <ul className="mt-5 space-y-4">
                {includes.map((item) => (
                  <li
                    key={item}
                    className="text-brand-navy flex items-start gap-3 text-sm leading-6"
                  >
                    <CircleCheckBig
                      className="text-brand-indigo mt-0.5 h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              {offer.offerEndsAt ? (
                <div className="border-brand-navy/10 mt-7 border-t pt-6">
                  <PracticalReturnCountdown endsAt={offer.offerEndsAt} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="border-brand-navy/10 bg-brand-cream/45 border-t p-6 sm:p-8 lg:px-12">
            <EnrollButton
              className="w-full sm:w-auto sm:min-w-64"
              label="এখনই ভর্তি হোন"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Registration() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="ভর্তি হতে কী করতে হবে?"
          description="Enrollment থেকে Payment এবং Course Access—পুরো প্রক্রিয়াটি কয়েকটি সহজ ধাপে সম্পন্ন হবে।"
        />
        <div className="relative mt-12">
          <div
            className="bg-brand-indigo/25 absolute top-5 bottom-5 left-5 w-px lg:top-5 lg:right-5 lg:bottom-auto lg:left-5 lg:h-px lg:w-auto"
            aria-hidden="true"
          />
          <ol className="relative grid gap-9 lg:grid-cols-5 lg:gap-7">
            {registrationSteps.map(([title, text], index) => (
              <li
                key={title}
                className="grid grid-cols-[40px_1fr] gap-4 lg:block"
              >
                <span className="bg-brand-navy text-brand-gold ring-background grid h-10 w-10 place-items-center rounded-full text-xs font-bold tabular-nums shadow-[0_10px_24px_-16px_rgba(17,24,68,0.75)] ring-4">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-8">
                  <h3 className="font-heading text-brand-navy text-xl leading-tight font-extrabold">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="bg-brand-cream py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          title="সাধারণ প্রশ্ন"
          description="Course scope, Paper Return, NBR e-Return, Income Heads, Tax Rebate এবং Final Submission সম্পর্কে প্রয়োজনীয় উত্তর।"
        />
        <Accordion
          type="single"
          collapsible
          className="border-brand-navy/12 bg-card mt-10 overflow-hidden rounded-2xl border px-5 sm:px-7"
        >
          {practicalReturnCourse.faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="border-brand-navy/10 data-[state=open]:bg-brand-cream/35"
            >
              <AccordionTrigger className="font-heading text-brand-navy hover:text-brand-indigo [&>svg]:text-brand-indigo py-5.5 text-left text-lg leading-snug font-bold hover:no-underline sm:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground max-w-3xl pb-6 text-sm leading-7 sm:text-base sm:leading-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="bg-brand-navy course-bg-dots-navy relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 px-6 py-14 text-center text-white shadow-[0_32px_74px_-40px_rgba(17,24,68,0.7)] sm:px-10 sm:py-18 lg:py-20">
        <span
          className="bg-brand-gold absolute top-0 left-1/2 h-1 w-24 -translate-x-1/2"
          aria-hidden="true"
        />
        <h2 className="font-heading mx-auto max-w-4xl text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
          Client-এর Documents হাতে পেলে—Return কোথা থেকে শুরু করবেন, সেটা যেন আর
          ভাবতে না হয়
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
          Documents যাচাই থেকে Tax Computation, IT10B, IT10BB, Paper Return এবং
          Final NBR e-Return Submission—পুরো Process একটি Client Case ধরে
          হাতে-কলমে শিখুন।
        </p>
        <EnrollButton inverse className="mt-8" label="এখনই কোর্সে ভর্তি হোন" />
      </div>
    </section>
  );
}

export function PracticalReturnCoursePage({
  commerce,
}: {
  commerce: { price: number; regularPrice: number | null } | null;
}) {
  return (
    <main className="overflow-hidden">
      <Hero />
      <EditorialProblemSection />
      <ReturnSystemFlow />
      <PortalIsLastStep />
      <Audience />
      <CapabilityMatrix />
      <Instructor />
      <Curriculum />
      <FinancialConsistency />
      <ReturnFileAnatomy />
      <ClientJourney />
      <ReturnReviewPanel />
      <Transformation />
      <Enrollment commerce={commerce} />
      <Registration />
      <Faq />
      <FinalCta />
    </main>
  );
}
