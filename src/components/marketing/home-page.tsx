import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarClock,
  Check,
  ChevronDown,
  CircleDot,
  FileCheck2,
  FileSearch,
  FileText,
  FolderOpen,
  GraduationCap,
  Landmark,
  Lightbulb,
  Mail,
  ReceiptText,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { ReturnChecklistBuilder, TaxBriefSignup } from "./home-interactions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { defaultCourse, type HomePageContent } from "@/lib/content/defaults";

const shell = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

const trustItems = [
  "Live Classes",
  "Recorded Access",
  "Practical Resources",
  "Professional Certificate",
] as const;

const learningAreas = [
  {
    icon: Scale,
    title: "Income Tax",
    text: "Income Tax Act, Return Filing, E-Return, TDS, Tax Planning ও Assessment।",
    href: "/courses",
    index: "01",
  },
  {
    icon: ReceiptText,
    title: "VAT",
    text: "VAT & SD Act, Return, Mushak, Compliance ও practical VAT work।",
    href: "/resources",
    index: "02",
  },
  {
    icon: Building2,
    title: "Corporate & Legal Compliance",
    text: "RJSC, business documentation ও regulatory compliance-এর structured guidance।",
    href: "/resources",
    index: "03",
  },
  {
    icon: BriefcaseBusiness,
    title: "Professional Development",
    text: "Documentation, client handling, practical skills ও professional resources।",
    href: "/resources",
    index: "04",
  },
] as const;

const secondaryPrograms = [
  {
    icon: FileCheck2,
    eyebrow: "PRACTICAL PROGRAM",
    title: "Paper Return & E-Return Filing",
    text: "Documents থেকে final submission পর্যন্ত practical return workflow।",
    href: "/courses/practical-paper-return-e-return-filing",
    cta: "Program দেখুন",
  },
  {
    icon: BookOpen,
    eyebrow: "RECORDED RESOURCE",
    title: "Professional eBook",
    text: "Reference-friendly income tax learning resource ও internal previews।",
    href: "/ebook",
    cta: "eBook দেখুন",
  },
  {
    icon: Users,
    eyebrow: "FREE LEARNING",
    title: "Workshop Experience",
    text: "Associates Academy-এর guided learning experience দেখার একটি সহজ পথ।",
    href: "/workshop",
    cta: "Workshop দেখুন",
  },
] as const;

const audiences = [
  {
    icon: GraduationCap,
    title: "নতুন Tax Learner",
    text: "আইন ও return filing-এর structured foundation তৈরি করতে।",
  },
  {
    icon: Calculator,
    title: "Accountant / Finance Professional",
    text: "কাজের পাশাপাশি tax compliance skill আরও শক্তিশালী করতে।",
  },
  {
    icon: Landmark,
    title: "Tax Practitioner",
    text: "Updated law, practical procedure ও professional resources-এর জন্য।",
  },
  {
    icon: Building2,
    title: "Business Owner",
    text: "নিজের business-এর tax ও compliance আরও ভালোভাবে বুঝতে।",
  },
] as const;

const reasons = [
  {
    icon: Target,
    title: "Practical First",
    text: "বাস্তব return, computation, document ও scenario দিয়ে শেখানো।",
  },
  {
    icon: Scale,
    title: "Law + Application",
    text: "আইনের provision কোথায় এবং কীভাবে প্রয়োগ হয়—দুটো একসঙ্গে।",
  },
  {
    icon: CalendarClock,
    title: "Updated Content",
    text: "Finance Act, SRO, Rules ও regulatory change-এর আলোকে content।",
  },
  {
    icon: FolderOpen,
    title: "Structured Framework",
    text: "বিচ্ছিন্ন information নয়—একটি logical learning sequence।",
  },
  {
    icon: FileText,
    title: "Professional Resources",
    text: "Checklist, template, illustration ও reference material।",
  },
  {
    icon: BookOpenCheck,
    title: "After-Class Access",
    text: "Program অনুযায়ী recording ও supporting material দিয়ে পুনরায় শেখা।",
  },
] as const;

const toolPreviews = [
  {
    icon: Calculator,
    title: "Income Tax Calculator",
    text: "Income ও eligible investment থেকে indicative tax working।",
  },
  {
    icon: ReceiptText,
    title: "Tax Rebate Calculator",
    text: "Eligible investment অনুযায়ী indicative rebate estimate।",
  },
  {
    icon: Search,
    title: "TDS / Source Tax Finder",
    text: "Payment type থেকে applicable section, rate ও reference।",
  },
  {
    icon: CalendarClock,
    title: "Tax Deadline Tracker",
    text: "Return, withholding ও VAT-এর গুরুত্বপূর্ণ compliance timeline।",
  },
] as const;

const processSteps = [
  ["01", "আইন জানুন", "Applicable law ও মূল provision চিনুন"],
  ["02", "Concept বুঝুন", "Provision-এর logic ও context পরিষ্কার করুন"],
  [
    "03",
    "বাস্তব উদাহরণ দেখুন",
    "Document, computation ও scenario analyse করুন",
  ],
  ["04", "নিজে Practice করুন", "Checklist ও framework ধরে working তৈরি করুন"],
  ["05", "Profession-এ Apply করুন", "নিজের কাজ ও client context-এ প্রয়োগ করুন"],
] as const;

const resourceCategories = [
  [
    CalendarClock,
    "Tax Updates",
    "Finance Act, SRO ও গুরুত্বপূর্ণ পরিবর্তনের concise update।",
  ],
  [
    FileSearch,
    "Practical Guides",
    "Return, TDS, computation ও compliance-এর step-by-step guide।",
  ],
  [
    FileCheck2,
    "Templates & Checklists",
    "Professional কাজের জন্য ready reference ও working aids।",
  ],
  [
    Lightbulb,
    "Articles & Insights",
    "Tax ও compliance বিষয়ে explanatory, context-rich content।",
  ],
  [
    BookOpen,
    "E-books",
    "গুরুত্বপূর্ণ topic নিয়ে deep-dive learning resources।",
  ],
] as const;

const knowledgeTopics = [
  {
    type: "UPDATE EXPLAINER",
    title: "Finance Act-এর পরিবর্তন কীভাবে practical working-এ ধরবেন",
    text: "আইনের change থেকে computation ও return impact পর্যন্ত একটি clear reading path।",
  },
  {
    type: "PRACTICAL CHECKLIST",
    title: "E-Return জমা দেওয়ার আগে কোন বিষয়গুলো যাচাই করবেন",
    text: "Document, income disclosure, tax payment ও final review-এর essential checkpoints।",
  },
  {
    type: "CONCEPT CLARITY",
    title: "Source Tax ও Advance Tax—পার্থক্যটি working-এ বুঝুন",
    text: "দুটি concept-এর purpose, treatment ও practical reconciliation বোঝার framework।",
  },
] as const;

const faqs = [
  {
    question: "Associates Academy কি শুধুমাত্র Tax Professionals-এর জন্য?",
    answer:
      "না। নতুন learner, accountant, finance professional, tax practitioner এবং business owner—প্রত্যেকে নিজের প্রয়োজন অনুযায়ী program বা resource বেছে নিতে পারেন।",
  },
  {
    question: "Classes কি Live নাকি Recorded?",
    answer:
      "Program অনুযায়ী format আলাদা হতে পারে। যে program-এ live class, recording বা supporting material আছে, তার landing page-এ সেই তথ্য স্পষ্টভাবে দেওয়া থাকে।",
  },
  {
    question: "কোর্স শেষে Certificate পাওয়া যায়?",
    answer:
      "Certificate availability program-specific। যে program-এ certificate configured আছে, তার offer details-এ সেটি উল্লেখ থাকে এবং verification system-এ যাচাই করা যায়।",
  },
  {
    question: "কোর্সের materials পরে পাওয়া যাবে?",
    answer:
      "Access period ও material availability প্রতিটি program-এর নিজস্ব details অনুযায়ী নির্ধারিত হয়। Enrollment-এর আগে সংশ্লিষ্ট program page দেখুন।",
  },
  {
    question: "আমি একদম beginner হলে course করতে পারব?",
    answer:
      "Beginner-friendly program-এ foundation থেকে sequence তৈরি করা হয়। তবে নিজের level-এর সঙ্গে মিলিয়ে program outcome ও audience section দেখে সিদ্ধান্ত নেওয়াই ভালো।",
  },
  {
    question: "নতুন course বা Tax update সম্পর্কে কীভাবে জানতে পারি?",
    answer:
      "Associates Tax Brief-এ আপনার পছন্দের interest নির্বাচন করে যুক্ত হলে relevant update ও নতুন learning resource সম্পর্কে জানতে পারবেন।",
  },
] as const;

export function HomePage({ content }: { content: HomePageContent }) {
  return (
    <div className="associates-home overflow-hidden">
      <section className="home-paper-dots relative py-12 sm:py-16 lg:py-20">
        <div
          className={`${shell} grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12`}
        >
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 className="font-heading text-brand-navy mt-5 max-w-3xl text-[2.65rem] leading-[1.08] font-extrabold tracking-[-0.025em] sm:text-[3.45rem] lg:text-[3.85rem]">
              {content.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-[65ch] text-base leading-8 sm:text-lg">
              {content.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="clicky shadow-brand-navy/15 h-13 px-7 text-base shadow-lg"
              >
                <Link href="/courses">
                  {content.primaryCta}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="clicky border-brand-navy/20 h-13 bg-white/75 px-7 text-base"
              >
                <Link href="/resources">{content.secondaryCta}</Link>
              </Button>
            </div>
            <div className="text-brand-indigo mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {["Case-based learning", "Practical filing", "Updated law"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="text-brand-indigo h-4 w-4"
                    />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <LearningMap />
        </div>
      </section>

      <section
        className="border-brand-navy/10 border-y bg-white/82"
        aria-label="Learning features"
      >
        <div
          className={`${shell} divide-brand-navy/10 grid grid-cols-2 divide-x divide-y sm:grid-cols-4 sm:divide-y-0`}
        >
          {trustItems.map((item) => (
            <div
              key={item}
              className="text-brand-navy flex min-h-20 items-center justify-center gap-2 px-3 py-4 text-center text-sm font-semibold"
            >
              <BadgeCheck
                aria-hidden="true"
                className="text-brand-indigo h-4 w-4 shrink-0"
              />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div
          className={`${shell} grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14`}
        >
          <div>
            <SectionHeading
              eyebrow="ABOUT ASSOCIATES ACADEMY"
              title="Professional knowledge-কে practical skill-এ রূপান্তর করাই আমাদের লক্ষ্য"
            />
            <div className="text-muted-foreground mt-6 max-w-[68ch] space-y-4 text-base leading-8">
              <p>
                Associates Academy একটি professional learning platform, যেখানে
                বাংলাদেশের আয়কর, VAT, corporate compliance এবং সংশ্লিষ্ট
                professional practice বিষয়ে structured ও practical training
                প্রদান করা হয়।
              </p>
              <p>
                আমাদের লক্ষ্য শুধু আইন বা section মুখস্থ করানো নয়। একজন learner
                যেন আইন বুঝতে পারেন, বাস্তব document analyse করতে পারেন এবং
                নিজের professional কাজে সেই knowledge confidently প্রয়োগ করতে
                পারেন—সেইভাবেই learning system তৈরি।
              </p>
            </div>
          </div>
          <div className="course-card-shadow border-brand-navy/10 rounded-3xl border bg-white p-6 sm:p-8">
            <p className="text-brand-indigo text-xs font-bold tracking-[0.16em] uppercase">
              THE PRACTICAL BRIDGE
            </p>
            <ol className="mt-6 space-y-3">
              {processSteps.map(([number, title], index) => (
                <li
                  key={number}
                  className="border-brand-navy/9 bg-brand-cream/45 relative flex items-center gap-4 rounded-xl border p-3.5"
                >
                  {index < processSteps.length - 1 ? (
                    <span
                      className="bg-brand-gold/55 absolute top-full left-[1.85rem] h-3 w-px"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="bg-brand-navy text-brand-gold grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold">
                    {number}
                  </span>
                  <span className="font-heading text-lg font-bold">
                    {title}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="text-brand-indigo ml-auto h-4 w-4"
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        className="border-brand-navy/8 border-y bg-white/76 py-16 sm:py-20"
        id="learning-areas"
      >
        <div className={shell}>
          <SectionHeading
            eyebrow="LEARNING AREAS"
            title="আমরা কী শেখাই"
            description="Tax ও compliance learning-কে চারটি clear professional area-তে সাজানো হয়েছে।"
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {learningAreas.map(({ icon: Icon, title, text, href, index }) => (
              <Link
                key={title}
                href={href}
                className="course-card-lift focus-ring group border-brand-navy/10 rounded-2xl border bg-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="bg-brand-indigo/10 text-brand-indigo grid h-12 w-12 place-items-center rounded-xl">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-brand-indigo font-mono text-xs">
                    {index}
                  </span>
                </div>
                <h3 className="font-heading mt-6 text-2xl font-bold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-[54ch] text-sm leading-6">
                  {text}
                </p>
                <span className="text-brand-indigo mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  Explore area{" "}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" id="programs">
        <div className={shell}>
          <SectionHeading
            eyebrow="CURRENT & FEATURED PROGRAMS"
            title="বর্তমানে শেখার যে পথগুলো খোলা আছে"
            description="একটি flagship framework-এর সঙ্গে practical course, eBook এবং workshop experience।"
          />
          <div className="course-panel-shadow border-brand-navy/10 mt-9 overflow-hidden rounded-3xl border bg-white">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="gradient-navy course-bg-dots-navy p-7 text-white sm:p-9">
                <Badge className="bg-brand-gold text-brand-navy hover:bg-brand-gold">
                  Featured program
                </Badge>
                <h3 className="font-heading mt-6 text-3xl leading-tight font-bold sm:text-4xl">
                  {defaultCourse.title}
                </h3>
                <p className="mt-3 text-white/65">{defaultCourse.subtitle}</p>
                <div className="mt-8 flex items-end gap-3">
                  <span className="font-heading text-4xl font-bold">
                    ৳ {defaultCourse.price.toLocaleString("bn-BD")}
                  </span>
                  <span className="mb-1 text-sm text-white/45 line-through">
                    ৳ {defaultCourse.compareAtPrice.toLocaleString("bn-BD")}
                  </span>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="clicky text-brand-navy mt-8 bg-white hover:bg-white/90"
                >
                  <Link href="/courses/income-tax-working-framework">
                    Program details <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-brand-indigo text-xs font-bold tracking-[0.16em] uppercase">
                  COMPLETE SCOPE
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {defaultCourse.scope.map((item, index) => (
                    <div
                      key={item}
                      className="border-brand-navy/10 bg-brand-cream/50 flex items-center gap-3 rounded-xl border p-3.5"
                    >
                      <span className="text-brand-indigo font-mono text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-6 text-sm leading-7">
                  আইন থেকে return—একটি repeatable working framework-এ সাজানো
                  professional learning journey।
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {secondaryPrograms.map(
              ({ icon: Icon, eyebrow, title, text, href, cta }) => (
                <article
                  key={title}
                  className="course-card-lift border-brand-navy/10 rounded-2xl border bg-white p-5"
                >
                  <span className="bg-brand-navy text-brand-gold grid h-11 w-11 place-items-center rounded-xl">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className="text-brand-indigo mt-5 text-[0.68rem] font-bold tracking-[0.14em]">
                    {eyebrow}
                  </p>
                  <h3 className="font-heading mt-2 text-xl font-bold">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {text}
                  </p>
                  <Button
                    variant="link"
                    asChild
                    className="text-brand-indigo mt-4 h-auto p-0"
                  >
                    <Link href={href}>
                      {cta}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="border-brand-navy/8 bg-brand-cream/72 border-y py-16 sm:py-20">
        <div className={shell}>
          <SectionHeading
            eyebrow="WHO IT IS FOR"
            title="আপনার Professional Journey-এর কোন পর্যায়ে আছেন?"
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="course-card-lift border-brand-navy/10 rounded-2xl border bg-white/90 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-brand-navy text-brand-gold grid h-11 w-11 place-items-center rounded-xl">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-brand-indigo font-mono text-xs">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-heading mt-5 text-xl leading-tight font-bold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/78 py-16 sm:py-20">
        <div className={shell}>
          <SectionHeading
            eyebrow="WHY ASSOCIATES ACADEMY"
            title="এখানে শুধু Lecture নয়"
            description="Professional কাজের জন্য যে gapগুলো গুরুত্বপূর্ণ, learning experience সেগুলোকে একসঙ্গে address করে।"
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="course-card-lift border-brand-navy/10 rounded-2xl border bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-brand-indigo/10 text-brand-indigo grid h-11 w-11 place-items-center rounded-xl">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-brand-indigo font-mono text-xs">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-heading mt-5 text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="home-paper-dots border-brand-navy/8 border-y py-16 sm:py-20"
        id="tax-tools"
      >
        <div className={shell}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="INTERACTIVE TAX TOOLS"
              title="শেখার পাশাপাশি কাজে লাগবে এমন tools"
              description="একটি live checklist builder এখনই ব্যবহার করুন; আরও focused tools ধাপে ধাপে যোগ হবে।"
            />
            <Badge
              variant="outline"
              className="border-brand-gold/45 text-brand-indigo w-fit bg-white/70"
            >
              Useful, not decorative
            </Badge>
          </div>
          <div className="mt-9">
            <ReturnChecklistBuilder />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {toolPreviews.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="border-brand-navy/10 rounded-2xl border bg-white/88 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <Icon
                    aria-hidden="true"
                    className="text-brand-indigo h-5 w-5"
                  />
                  <span className="bg-brand-cream text-brand-indigo rounded-md px-2 py-1 text-[0.65rem] font-bold tracking-[0.08em] uppercase">
                    শীঘ্রই
                  </span>
                </div>
                <h3 className="font-heading mt-4 text-lg leading-tight font-bold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/78 py-16 sm:py-20" id="learning-process">
        <div className={shell}>
          <SectionHeading
            eyebrow="LEARNING PROCESS"
            title="আইন থেকে professional application—একটি clear sequence"
            description="একই learning flow বারবার ব্যবহার করা যায়—নতুন topic শেখা থেকে বাস্তব working তৈরি পর্যন্ত।"
          />
          <ol className="relative mt-10 grid gap-4 lg:grid-cols-5">
            {processSteps.map(([number, title, text], index) => (
              <li
                key={number}
                className="border-brand-navy/10 relative rounded-2xl border bg-white p-5"
              >
                {index < processSteps.length - 1 ? (
                  <span
                    className="bg-brand-gold/65 absolute top-9 -right-3 z-10 hidden h-px w-6 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="bg-brand-navy text-brand-gold grid h-10 w-10 place-items-center rounded-xl font-mono text-xs font-bold">
                  {number}
                </span>
                <h3 className="font-heading mt-5 text-xl leading-tight font-bold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-brand-navy/8 bg-brand-cream/72 border-y py-16 sm:py-20">
        <div
          className={`${shell} border-brand-navy/10 grid overflow-hidden rounded-3xl border bg-white lg:grid-cols-[0.7fr_1.3fr]`}
        >
          <div className="gradient-navy course-bg-dots-navy relative min-h-[340px] overflow-hidden lg:min-h-[540px]">
            <Image
              src="/brand/founder.png"
              alt={content.founderName}
              fill
              sizes="(max-width: 1024px) 100vw, 36vw"
              className="object-cover object-top opacity-92"
            />
            <div className="from-brand-navy via-brand-navy/60 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-6 pt-24 text-white">
              <p className="font-heading text-2xl font-bold">
                {content.founderName}
              </p>
              <p className="mt-1 text-sm text-white/68">
                {content.founderTitle}
              </p>
            </div>
          </div>
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="text-brand-indigo text-xs font-bold tracking-[0.16em] uppercase">
              FOUNDER & LEARNING PHILOSOPHY
            </p>
            <h2 className="font-heading mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">
              একটি বাস্তব অভিজ্ঞতাভিত্তিক Learning Philosophy
            </h2>
            <blockquote className="border-brand-gold text-brand-navy mt-6 border-l-2 pl-5 text-lg leading-8">
              “শুধু আইন জানা যথেষ্ট নয়; সেই আইন বাস্তব পরিস্থিতিতে সঠিকভাবে
              প্রয়োগ করতে পারাটাই আসল skill।”
            </blockquote>
            <p className="text-muted-foreground mt-6 text-base leading-8">
              {content.founderBio}
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-8">
              Associates Academy সেই knowledge-to-practice gap পূরণের লক্ষ্যেই
              একটি structured professional learning ecosystem তৈরি করছে।
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                "Practical clarity",
                "Updated framework",
                "Learner-first teaching",
              ].map((item) => (
                <div
                  key={item}
                  className="border-brand-navy/10 bg-brand-cream/48 rounded-xl border p-4 text-sm font-semibold"
                >
                  <Lightbulb
                    aria-hidden="true"
                    className="text-brand-indigo mb-3 h-5 w-5"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/78 py-16 sm:py-20">
        <div className={shell}>
          <SectionHeading
            eyebrow="LEARNING TRUST"
            title="সংখ্যা নয়—যে principles আমরা প্রকাশ্যে commit করি"
            description="Verified learner data বা genuine testimonial publish না হওয়া পর্যন্ত কোনো fabricated counter বা review দেখানো হবে না।"
          />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <TrustCard
              icon={Target}
              title="Application-focused"
              text="প্রতিটি topic-এর professional use ও working outcome স্পষ্ট রাখা।"
            />
            <TrustCard
              icon={BadgeCheck}
              title="Truthful by design"
              text="Unverified result, testimonial, urgency বা learner number publish না করা।"
            />
            <TrustCard
              icon={ShieldCheck}
              title="Structured access"
              text="Program অনুযায়ী পরিষ্কার content, access ও support information দেখানো।"
            />
          </div>
        </div>
      </section>

      <section
        className="border-brand-navy/8 bg-brand-cream/72 border-y py-16 sm:py-20"
        id="resources"
      >
        <div className={shell}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="PRACTICAL RESOURCES LIBRARY"
              title="শেখা Course-এ শেষ হয় না"
              description="Update, guide, checklist, article ও deep-dive resource—প্রয়োজনের সময় ফিরে আসার মতো একটি library।"
            />
            <Button variant="outline" asChild className="clicky w-fit bg-white">
              <Link href="/resources">
                সব Resources দেখুন <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {resourceCategories.map(([Icon, title, text], index) => (
              <article
                key={title}
                className="course-card-lift border-brand-navy/10 rounded-2xl border bg-white p-5 sm:first:col-span-2 lg:first:col-span-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-brand-indigo/10 text-brand-indigo grid h-10 w-10 place-items-center rounded-xl">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-brand-indigo font-mono text-xs">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-heading mt-5 text-xl leading-tight font-bold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {text}
                </p>
              </article>
            ))}
          </div>

          <div className="home-paper-dots border-brand-navy/10 mt-6 flex flex-col gap-6 rounded-3xl border bg-white/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-brand-indigo text-xs font-bold tracking-[0.15em] uppercase">
                START FREE
              </p>
              <h3 className="font-heading mt-2 text-2xl font-bold">
                শেখা শুরু করতে এখনই Course কেনার প্রয়োজন নেই
              </h3>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">
                Free guide, article, tax update ও professional resource দিয়ে
                learning experience দেখুন।
              </p>
            </div>
            <Button asChild className="clicky shrink-0">
              <Link href="/resources">
                Free Resources Explore করুন <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white/78 py-16 sm:py-20">
        <div className={shell}>
          <SectionHeading
            eyebrow="KNOWLEDGE HUB"
            title="নতুন কী শিখবেন?"
            description="Knowledge Hub-এর জন্য প্রস্তুত করা practical learning topics—resource publish হলে library-তে পাওয়া যাবে।"
          />
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {knowledgeTopics.map((topic, index) => (
              <article
                key={topic.title}
                className="course-card-lift border-brand-navy/10 flex min-h-64 flex-col rounded-2xl border bg-white p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-brand-indigo text-[0.68rem] font-bold tracking-[0.14em]">
                    {topic.type}
                  </span>
                  <span className="text-brand-indigo font-mono text-xs">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-heading mt-6 text-2xl leading-tight font-bold">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {topic.text}
                </p>
                <div className="text-brand-indigo mt-auto pt-6 text-sm font-semibold">
                  Resource roadmap
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-brand-navy/8 bg-brand-cream/72 border-y py-16 sm:py-20"
        id="tax-brief"
      >
        <div className={shell}>
          <div className="course-panel-shadow home-paper-dots border-brand-navy/10 mx-auto max-w-4xl rounded-3xl border bg-white/86 p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <span className="bg-brand-navy text-brand-gold grid h-12 w-12 place-items-center rounded-xl">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="text-brand-indigo mt-5 text-xs font-bold tracking-[0.16em] uppercase">
                  ASSOCIATES TAX BRIEF
                </p>
                <h2 className="font-heading mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">
                  গুরুত্বপূর্ণ Tax Update আর miss করবেন না
                </h2>
              </div>
              <div>
                <p className="text-muted-foreground text-base leading-8">
                  Income Tax, VAT, Finance Act, SRO, practical filing guide এবং
                  নতুন learning resource—সংক্ষিপ্ত ও প্রয়োজনীয় update সরাসরি
                  inbox-এ পান।
                </p>
                <TaxBriefSignup />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/78 py-16 sm:py-20" id="faq">
        <div className={`${shell} max-w-4xl`}>
          <SectionHeading
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="শুরু করার আগে সাধারণ কিছু প্রশ্ন"
          />
          <div className="border-brand-navy/10 mt-9 overflow-hidden rounded-2xl border bg-white">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group border-brand-navy/10 border-b last:border-b-0"
              >
                <summary className="focus-ring flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-semibold marker:content-none sm:px-6">
                  <span>{item.question}</span>
                  <span className="bg-brand-indigo/10 text-brand-indigo grid h-8 w-8 shrink-0 place-items-center rounded-full">
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                    />
                  </span>
                </summary>
                <div className="text-muted-foreground px-5 pb-5 text-sm leading-7 sm:px-6 sm:pb-6">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 sm:py-20">
        <div className="gradient-navy course-bg-dots-navy course-panel-shadow mx-auto max-w-4xl rounded-3xl p-7 text-center text-white sm:p-11">
          <Badge className="text-brand-gold border border-white/15 bg-white/10 hover:bg-white/10">
            YOUR NEXT STEP
          </Badge>
          <h2 className="font-heading mx-auto mt-5 max-w-3xl text-3xl leading-tight font-extrabold sm:text-5xl">
            আপনার Professional Learning Journey আজই শুরু করুন
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68">
            আয়কর ও professional compliance শুধু পড়ুন না—structuredভাবে বুঝুন,
            practice করুন এবং বাস্তবে প্রয়োগ করুন।
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="clicky bg-brand-gold text-brand-navy hover:bg-brand-gold/92"
            >
              <Link href="/courses">
                Learning Programs দেখুন <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="clicky border-white/22 bg-white/8 text-white hover:bg-white/14 hover:text-white"
            >
              <Link href="/resources">Free Resources দেখুন</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function LearningMap() {
  const steps = [
    [Scale, "আইন জানুন", "Law & reference"],
    [Lightbulb, "Concept বুঝুন", "Clarity & context"],
    [FileSearch, "উদাহরণ দেখুন", "Case & document"],
    [FileCheck2, "Practice করুন", "Working & checklist"],
    [BriefcaseBusiness, "Apply করুন", "Professional use"],
  ] as const;

  return (
    <div className="course-panel-shadow gradient-navy course-bg-dots-navy relative rounded-3xl border border-white/10 p-6 text-white sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-brand-gold text-xs font-bold tracking-[0.15em] uppercase">
            ASSOCIATES ACADEMY
          </p>
          <h2 className="font-heading mt-2 text-3xl font-bold">
            Professional Learning Map
          </h2>
        </div>
        <Sparkles aria-hidden="true" className="text-brand-gold h-6 w-6" />
      </div>
      <ol className="mt-7 space-y-2.5">
        {steps.map(([Icon, title, meta], index) => (
          <li
            key={title}
            className={`relative flex items-center gap-3 rounded-xl border p-3.5 ${index === steps.length - 1 ? "border-brand-gold/45 bg-brand-gold/12" : "border-white/10 bg-white/[0.055]"}`}
          >
            {index < steps.length - 1 ? (
              <span
                className="absolute top-full left-[2rem] h-2.5 w-px bg-white/20"
                aria-hidden="true"
              />
            ) : null}
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${index === steps.length - 1 ? "bg-brand-gold text-brand-navy" : "text-brand-gold bg-white/10"}`}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
            </span>
            <div>
              <p className="font-heading text-lg font-bold">{title}</p>
              <p className="text-xs text-white/50">{meta}</p>
            </div>
            <span className="ml-auto font-mono text-[0.65rem] text-white/32">
              0{index + 1}
            </span>
          </li>
        ))}
      </ol>
      <div className="border-brand-navy/10 text-brand-navy absolute -bottom-5 left-6 rotate-[-1.5deg] rounded-xl border bg-white px-4 py-2.5 text-xs font-semibold shadow-lg sm:left-8">
        Law → Concept → Practice → Profession
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-brand-gold/40 text-brand-indigo inline-flex items-center gap-2 rounded-full border bg-white/72 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.13em] uppercase shadow-sm">
      <CircleDot
        aria-hidden="true"
        className="fill-brand-gold text-brand-gold h-3 w-3"
      />
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-brand-indigo text-xs font-bold tracking-[0.16em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-brand-navy mt-3 text-3xl leading-[1.16] font-extrabold tracking-[-0.015em] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-4 max-w-[65ch] text-base leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function TrustCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article className="border-brand-navy/10 rounded-2xl border bg-white p-6 text-center">
      <span className="bg-brand-indigo/10 text-brand-indigo mx-auto grid h-12 w-12 place-items-center rounded-xl">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <h3 className="font-heading mt-5 text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-6">{text}</p>
    </article>
  );
}
