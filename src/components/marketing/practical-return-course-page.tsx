import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  Check,
  CircleCheck,
  FileCheck2,
  Files,
  FileText,
  Landmark,
  Layers,
  Scale,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
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

const iconMap: Record<CourseIconName, LucideIcon> = {
  BadgeCheck,
  BadgePercent: ShieldCheck,
  BriefcaseBusiness,
  Calculator,
  ChartNoAxesCombined: Scale,
  Check,
  CircleCheckBig: CircleCheck,
  FileCheck2,
  Files,
  FileText,
  Landmark,
  ReceiptText: FileText,
  Scale,
  SearchCheck: ShieldCheck,
  ShieldCheck,
  UserCheck,
  Users: UserCheck,
  WalletCards: Layers,
};

type PracticalCourseCommerce = {
  price: number;
  regularPrice: number | null;
};

// Section Heading Helper
function SectionTitle({
  title,
  description,
  inverse = false,
  className,
  centered = false,
}: {
  title: string;
  description?: string;
  inverse?: boolean;
  className?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <h2
        className={cn(
          "font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-[2rem] lg:leading-[1.2]",
          inverse ? "text-white" : "text-brand-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed sm:text-base",
            inverse ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

// 1. HERO SECTION (Dominant E-Return, Supporting Paper Return)
function CourseHero() {
  const { hero } = practicalReturnCourse;

  return (
    <section className="relative overflow-hidden bg-brand-cream/60 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left Column: Heading & Information */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white/80 px-3.5 py-1 text-xs font-semibold text-brand-navy shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              {hero.badge}
            </div>

            <h1 className="font-heading mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18]">
              {hero.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed font-semibold text-brand-navy/90 sm:text-lg">
              {hero.descriptionParagraph1}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
              {hero.descriptionParagraph2}
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-brand-indigo sm:text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-gold shrink-0" />
              <span>{hero.quickInfo}</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                size="lg"
                asChild
                className="clicky min-h-12 rounded-xl bg-brand-navy px-7 text-base font-bold text-white shadow-md hover:bg-brand-navy/95"
              >
                <Link href={practicalReturnCheckoutPath}>
                  {hero.primaryCta}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="clicky min-h-12 rounded-xl border-brand-navy/20 bg-white/80 px-6 text-sm font-semibold text-brand-navy hover:bg-white"
              >
                <Link href="#curriculum">
                  {hero.secondaryCta}
                  <ArrowDown className="ml-1.5 h-4 w-4 text-brand-indigo" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Refined Image Hierarchy (E-Return Primary ~70%, Paper Return Supporting ~42%) */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Layered Composition */}
            <div className="relative h-[320px] xs:h-[360px] sm:h-[400px] lg:h-[440px] w-full">
              {/* Paper Return Image (Supporting document: smaller ~42%, lower-left, behind) */}
              <div className="absolute bottom-2 left-0 z-10 w-[42%] sm:w-[40%] lg:w-[42%] -rotate-1 transition-transform duration-300 hover:rotate-0">
                <div className="overflow-hidden rounded-xl border border-brand-navy/15 bg-white p-1.5 shadow-[0_12px_28px_-12px_rgba(15,30,54,0.2)]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-amber-50/50">
                    <Image
                      src={hero.images.paperReturn}
                      alt="NBR Paper Return Form IT-11GA"
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <p className="mt-1 text-center text-[10px] sm:text-[11px] font-semibold text-brand-navy/75">
                    Paper Return (IT-11GA)
                  </p>
                </div>
              </div>

              {/* NBR E-Return Portal (Primary dominant hero image: ~70-72%, upper-right, in foreground) */}
              <div className="absolute top-0 right-0 z-20 w-[72%] sm:w-[70%] lg:w-[72%] transition-transform duration-300 hover:-translate-y-1">
                <div className="overflow-hidden rounded-2xl border border-brand-navy/20 bg-white p-2 sm:p-2.5 shadow-[0_24px_54px_-18px_rgba(15,30,54,0.32)] ring-1 ring-brand-navy/5">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-50">
                    <Image
                      src={hero.images.eReturnPortal}
                      alt="NBR E-Return Portal Assessment Year 2026-2027"
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 34vw"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between px-1.5">
                    <span className="text-[11px] sm:text-xs font-bold text-brand-navy">
                      NBR E-Return Portal
                    </span>
                    <span className="rounded-full bg-brand-navy/8 px-2 py-0.5 text-[10px] font-semibold text-brand-indigo">
                      AY 2026–2027
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. COMPLETE RETURN PREPARATION FLOW (Deliberate 4 + 2 Connected Sequence)
function CourseWorkflow() {
  const { workflow } = practicalReturnCourse;

  return (
    <section className="border-y border-brand-navy/10 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-heading text-xl font-bold text-brand-navy sm:text-2xl">
            {workflow.title}
          </h2>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            {workflow.supportingSentence}
          </p>
        </div>

        {/* Desktop & Laptop: Deliberate 4 + 2 Connected Sequence */}
        <div className="mt-7 hidden sm:flex flex-col items-center gap-3">
          {/* Row 1: Steps 1 -> 2 -> 3 -> 4 */}
          <div className="flex items-center justify-center gap-2 lg:gap-3">
            {workflow.steps.slice(0, 4).map((step, idx) => (
              <div key={step.id} className="flex items-center gap-2 lg:gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-brand-navy/12 bg-brand-cream/40 px-3.5 py-2 text-xs font-semibold text-brand-navy lg:text-sm shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-brand-gold">
                    {step.id}
                  </span>
                  <span>{step.label}</span>
                </div>
                {idx < 3 && (
                  <ArrowRight className="h-3.5 w-3.5 text-brand-indigo/60" />
                )}
              </div>
            ))}
          </div>

          {/* Connected Downward Transition from Step 4 toward Step 5 */}
          <div className="flex w-full max-w-2xl items-center justify-end pr-8 lg:pr-14">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-indigo/80 bg-brand-cream/60 px-2.5 py-0.5 rounded-full border border-brand-navy/10">
              <span>Next</span>
              <ArrowDown className="h-3.5 w-3.5 text-brand-indigo" />
            </div>
          </div>

          {/* Row 2: Steps 5 -> 6 (Balanced continuation) */}
          <div className="flex items-center justify-center gap-2 lg:gap-3">
            {workflow.steps.slice(4).map((step, idx) => (
              <div key={step.id} className="flex items-center gap-2 lg:gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-brand-navy/12 bg-brand-cream/40 px-3.5 py-2 text-xs font-semibold text-brand-navy lg:text-sm shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-brand-gold">
                    {step.id}
                  </span>
                  <span>{step.label}</span>
                </div>
                {idx < 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-brand-indigo/60" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Sequence */}
        <div className="mt-5 flex flex-col gap-2 sm:hidden">
          {workflow.steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-1.5">
              <div className="flex w-full items-center gap-2.5 rounded-xl border border-brand-navy/12 bg-brand-cream/40 px-3.5 py-2 text-xs font-semibold text-brand-navy">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-brand-gold">
                  {step.id}
                </span>
                <span>{step.label}</span>
              </div>
              {idx < workflow.steps.length - 1 && (
                <ArrowDown className="h-3 w-3 text-brand-indigo/50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. PRACTICAL COURSE SYSTEM
function CourseSystem() {
  const { system } = practicalReturnCourse;

  return (
    <section className="bg-background py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title={system.title} centered className="mb-7" />

        <div className="rounded-2xl border border-brand-navy/10 bg-card p-5 shadow-sm sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-brand-navy/10">
            {system.items.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Files;
              return (
                <div
                  key={item.title}
                  className={cn(
                    "flex flex-col",
                    index > 0 && "lg:pl-6",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-indigo/10 text-brand-indigo">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="font-heading text-base font-bold text-brand-navy">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. COURSE INFORMATION (Human Narrative Copy + Factual Info Panel)
function CourseInfo({
  currentPrice,
  regularPrice,
}: {
  currentPrice: number;
  regularPrice: number;
}) {
  const { information, offer } = practicalReturnCourse;

  return (
    <section className="border-t border-brand-navy/10 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title={information.title} className="mb-8" />

        <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:gap-12 items-start">
          {/* Left Side: Thoughtful Human Narrative Explaining Course Philosophy (63-67% width) */}
          <div className="space-y-5 text-sm leading-relaxed text-brand-navy/90 sm:text-[1rem] sm:leading-8">
            {information.paragraphs.map((para, idx) => (
              <p key={idx} className="text-justify sm:text-left">
                {para}
              </p>
            ))}
          </div>

          {/* Right Side: Quick Factual Data Panel (33-37% width) */}
          <div className="flex flex-col justify-between rounded-2xl border border-brand-navy/12 bg-brand-cream/50 p-6 shadow-xs sm:p-7 sticky top-24">
            <div>
              <div className="flex items-center justify-between border-b border-brand-navy/10 pb-4">
                <span className="text-xs font-bold tracking-wider text-brand-indigo uppercase">
                  Batch Overview
                </span>
                <span className="rounded-full bg-brand-navy px-2.5 py-0.5 text-xs font-bold text-brand-gold">
                  {offer.batchName}
                </span>
              </div>

              <div className="mt-5 divide-y divide-brand-navy/10 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-muted-foreground">কোর্স শুরু</span>
                  <span className="font-semibold text-brand-navy">{offer.startDate}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-muted-foreground">ক্লাস সংখ্যা</span>
                  <span className="font-semibold text-brand-navy">৫টি Live Class (১.৫–২ ঘণ্টা)</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-muted-foreground">সময় ও মাধ্যম</span>
                  <span className="font-semibold text-brand-navy">{offer.classTime} · {offer.platform}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-muted-foreground">অ্যাক্সেস</span>
                  <span className="font-semibold text-brand-navy">Live + Recorded Class</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-muted-foreground">অ্যাসেসমেন্ট বর্ষ</span>
                  <span className="font-semibold text-brand-navy">AY 2026–2027</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-muted-foreground">রেগুলার ফি</span>
                  <span className="font-semibold line-through text-muted-foreground">
                    ৳{regularPrice.toLocaleString("bn-BD")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-brand-navy font-bold">বর্তমান অফার ফি</span>
                  <span className="font-heading text-lg font-extrabold text-brand-navy">
                    ৳{currentPrice.toLocaleString("bn-BD")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-muted-foreground">অফার শেষ</span>
                  <span className="font-semibold text-brand-indigo">{offer.registrationDeadline || "28 August 2026"}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-muted-foreground">সনদপত্র</span>
                  <span className="font-semibold text-brand-navy">Verified Certificate</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-brand-navy/10 pt-5">
              <Button
                asChild
                className="clicky w-full rounded-xl bg-brand-navy py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-navy/95"
              >
                <Link href={practicalReturnCheckoutPath}>
                  কোর্সে ভর্তি হোন
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. STUDENT REVIEWS SECTION
function StudentReviews() {
  const { reviews } = practicalReturnCourse;

  return (
    <section className="border-t border-brand-navy/10 bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          title="শিক্ষার্থীদের অভিজ্ঞতা"
          description="Associates Academy-এর training ও class সম্পর্কে অংশগ্রহণকারী শিক্ষার্থীদের বাস্তব feedback।"
          centered
          className="mb-8"
        />

        {reviews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col justify-between rounded-xl border border-brand-navy/10 bg-card p-5 shadow-xs"
              >
                <p className="text-sm leading-relaxed text-brand-navy/90">
                  “{review.quote}”
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-brand-navy/10 pt-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo/10 text-xs font-bold text-brand-indigo">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">{review.name}</p>
                    <p className="text-[11px] text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl border border-brand-navy/10 bg-card p-6 text-center shadow-xs sm:p-8">
            <ShieldCheck className="mx-auto h-8 w-8 text-brand-indigo/80" />
            <h3 className="font-heading mt-3 text-base font-bold text-brand-navy sm:text-lg">
              বাস্তব ও ভেরিফায়েড রিভিউ নীতিমালা
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Associates Academy কোনো কাল্পনিক বা AI-নির্মিত রিভিউ প্রকাশ করে না। কোর্সের
              অংশগ্রহণকারী শিক্ষার্থীদের বাস্তব WhatsApp ফিডব্যাক ও মতামত যাচাই সাপেক্ষে প্রকাশ করা
              হয়।
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// 6. COURSE CERTIFICATE SECTION
function CourseCertificate() {
  const { certificate } = practicalReturnCourse;

  return (
    <section className="border-t border-brand-navy/10 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title={certificate.title} className="mb-8" />

        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left: Real Certificate Image */}
          <div className="relative overflow-hidden rounded-2xl border border-brand-navy/15 bg-brand-cream/30 p-2 shadow-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-amber-50/40">
              <Image
                src={certificate.image}
                alt="Associates Academy Course Completion Certificate"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <div className="mt-2 flex items-center justify-between px-2 text-xs font-semibold text-brand-navy">
              <span className="inline-flex items-center gap-1 text-brand-indigo">
                <BadgeCheck className="h-4 w-4 text-brand-gold" />
                {certificate.badge}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Authentic Associates Academy Credential
              </span>
            </div>
          </div>

          {/* Right: Requirements & Verification System */}
          <div className="space-y-6">
            <div className="space-y-3 text-sm leading-relaxed text-brand-navy/90 sm:text-[0.95rem]">
              {certificate.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-success" />
                  <span>{req}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 p-5 sm:p-6">
              <h3 className="font-heading text-base font-bold text-brand-navy sm:text-lg">
                {certificate.verificationSystem.title}
              </h3>
              <div className="mt-2.5 space-y-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {certificate.verificationSystem.description.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-brand-gold/40 bg-brand-gold/10 px-3.5 py-2.5 text-xs font-bold text-brand-navy sm:text-[0.85rem]">
                {certificate.verificationSystem.highlight}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 7. WHO THIS COURSE IS FOR
function CourseAudience() {
  const { audience } = practicalReturnCourse;

  return (
    <section className="border-t border-brand-navy/10 bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          title="যাদের জন্য এই কোর্স"
          centered
          className="mb-8"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? UserCheck;
            return (
              <div
                key={item.title}
                className={cn(
                  "rounded-2xl border border-brand-navy/10 bg-card p-5 shadow-xs transition-shadow hover:shadow-sm",
                  idx === 4 && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-brand-navy">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 8. PRACTICAL LEARNING SECTION
function PracticalLearning() {
  const { practicalLearning } = practicalReturnCourse;

  return (
    <section className="border-t border-brand-navy/10 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          title={practicalLearning.title}
          description="কোর্সে তত্ত্বের পাশাপাশি নিচে উল্লেখিত রিটার্ন ফাইল প্রস্তুতের প্রতিটি কাজ সরাসরি অনুশীলন করবেন।"
          className="mb-8"
        />

        <div className="rounded-2xl border border-brand-navy/10 bg-brand-cream/30 p-5 sm:p-8">
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {practicalLearning.items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-brand-navy sm:text-sm"
              >
                <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-indigo/15 text-brand-indigo">
                  <Check className="h-3 w-3 text-brand-navy font-bold" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// 9. INSTRUCTOR SECTION
function InstructorSection() {
  const { instructor } = practicalReturnCourse;

  return (
    <section className="border-t border-brand-navy/10 bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title={instructor.title} className="mb-8" />

        <div className="overflow-hidden rounded-2xl border border-brand-navy/12 bg-card shadow-xs">
          <div className="grid lg:grid-cols-[280px_1fr]">
            {/* Instructor Image */}
            <div className="relative aspect-[4/5] w-full bg-brand-navy sm:aspect-[1/1] lg:aspect-auto">
              <Image
                src={instructor.image}
                alt={instructor.name}
                fill
                sizes="(max-width: 1024px) 100vw, 280px"
                className="object-cover object-top"
              />
            </div>

            {/* Instructor Info */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-brand-indigo/10 px-2.5 py-1 text-xs font-bold text-brand-indigo">
                    {instructor.role}
                  </span>
                  <span className="rounded-md bg-brand-gold/20 px-2.5 py-1 text-xs font-bold text-brand-navy">
                    {instructor.credentials}
                  </span>
                </div>

                <h3 className="font-heading mt-3 text-2xl font-extrabold text-brand-navy sm:text-3xl">
                  {instructor.name}
                </h3>

                <p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
                  {instructor.position} · {instructor.experience}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-brand-navy/90 sm:text-base">
                  {instructor.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-brand-navy/10 pt-4 text-xs font-semibold text-brand-indigo">
                <span className="rounded-lg bg-brand-cream/80 px-3 py-1.5">
                  Income Tax Practice
                </span>
                <span className="rounded-lg bg-brand-cream/80 px-3 py-1.5">
                  Paper Return & NBR E-Return
                </span>
                <span className="rounded-lg bg-brand-cream/80 px-3 py-1.5">
                  Reconciliation & Audit Defense
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 10. COURSE CURRICULUM SECTION
function CourseCurriculum() {
  const { curriculum } = practicalReturnCourse;

  return (
    <section id="curriculum" className="border-t border-brand-navy/10 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          title={curriculum.title}
          description={curriculum.description}
          className="mb-8"
        />

        <Accordion
          type="single"
          collapsible
          defaultValue="module-01"
          className="space-y-3.5"
        >
          {curriculum.modules.map((mod: CourseModule) => (
            <AccordionItem
              key={mod.number}
              value={`module-${mod.number}`}
              className="overflow-hidden rounded-2xl border border-brand-navy/12 bg-card px-5 shadow-xs transition-colors data-[state=open]:border-brand-indigo/40 data-[state=open]:bg-brand-cream/20 sm:px-6"
            >
              <AccordionTrigger className="py-4.5 hover:no-underline sm:py-5 [&[data-state=open]>div>span:first-child]:bg-brand-navy [&[data-state=open]>div>span:first-child]:text-brand-gold">
                <div className="flex flex-1 items-start gap-4 text-left sm:items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-indigo/10 text-sm font-extrabold text-brand-indigo transition-colors sm:h-10 sm:w-10 sm:text-base">
                    {mod.number}
                  </span>
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-base font-bold text-brand-navy sm:text-lg">
                        Module {mod.number}: {mod.title}
                      </h3>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1 sm:text-sm">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t border-brand-navy/10 pt-4 pb-5">
                <div className="space-y-4">
                  {/* Groups */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {mod.groups.map((group) => (
                      <div
                        key={group.title}
                        className="rounded-xl border border-brand-navy/8 bg-white/70 p-4"
                      >
                        <h4 className="font-heading text-xs font-bold text-brand-indigo uppercase tracking-wider">
                          {group.title}
                        </h4>
                        <ul className="mt-2.5 space-y-1.5">
                          {group.topics.map((topic) => (
                            <li
                              key={topic}
                              className="flex items-start gap-2 text-xs leading-relaxed text-brand-navy/90"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-indigo" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div className="flex items-start gap-2.5 rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-3.5 text-xs leading-relaxed font-medium text-brand-navy">
                    <span className="font-bold shrink-0 text-brand-navy">Outcome:</span>
                    <span>{mod.highlight}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// 11. FAQ SECTION
function CourseFaq() {
  const { faqs } = practicalReturnCourse;

  return (
    <section id="faq" className="border-t border-brand-navy/10 bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle
          title="সাধারণ জিজ্ঞাসা"
          description="কোর্স সম্পর্কিত প্রয়োজনীয় তথ্যের উত্তর।"
          centered
          className="mb-8"
        />

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-xl border border-brand-navy/12 bg-card px-5 shadow-xs"
            >
              <AccordionTrigger className="py-4 text-left font-heading text-sm font-bold text-brand-navy hover:no-underline sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs leading-relaxed text-muted-foreground pb-4 sm:text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// 12. FINAL ENROLLMENT SECTION (Integrated Balanced Two-Column Panel)
function EnrollmentSection({
  currentPrice,
  regularPrice,
}: {
  currentPrice: number;
  regularPrice: number;
}) {
  const { offer, name } = practicalReturnCourse;
  const discount = regularPrice > currentPrice ? regularPrice - currentPrice : 0;

  return (
    <section id="enrollment" className="border-t border-brand-navy/10 bg-brand-navy py-12 text-white sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Integrated Two-Column Enrollment Container */}
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 lg:p-10 shadow-xl backdrop-blur-xs">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            {/* Left Column: Course Overview & Highlights */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3.5 py-1 text-xs font-bold text-brand-gold">
                <span>{offer.batchName}</span>
                <span className="h-1 w-1 rounded-full bg-brand-gold" />
                <span>{offer.classSchedule}</span>
              </div>

              <h2 className="font-heading mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white">
                {name}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                Client documents থেকে শুরু করে Head-wise computation, Tax Rebate, TDS সমন্বয়, IT10B, IT10BB, Paper Return এবং NBR E-Return preparation—হাতে-কলমে শিখুন।
              </p>

              {/* 3 Subtle Supporting Facts */}
              <div className="mt-6 flex flex-wrap gap-2.5 text-xs text-white/80">
                <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-brand-gold" />
                  AY 2026–2027 (Finance Act 2026)
                </span>
                <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-brand-gold" />
                  Paper Return + NBR E-Return
                </span>
                <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-brand-gold" />
                  Verified Completion Certificate
                </span>
              </div>
            </div>

            {/* Right Column: Pricing & Action Box */}
            <div className="flex flex-col justify-center rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:p-7 text-center lg:text-left">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between lg:flex-col lg:items-start">
                <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                  বর্তমান Course Fee
                </span>
                <div className="flex items-baseline justify-center gap-3 lg:justify-start">
                  <span className="font-heading text-4xl sm:text-5xl font-extrabold text-brand-gold">
                    ৳{currentPrice.toLocaleString("bn-BD")}
                  </span>
                  <span className="text-sm font-medium line-through text-white/50">
                    ৳{regularPrice.toLocaleString("bn-BD")}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 inline-flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-brand-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                <span>
                  ৳{discount.toLocaleString("bn-BD")} ছাড় · {offer.registrationDeadline ? `${offer.registrationDeadline} পর্যন্ত` : "অফার চলাকালীন"}
                </span>
              </div>

              <div className="mt-5">
                <Button
                  size="lg"
                  asChild
                  className="clicky w-full min-h-12 rounded-xl bg-brand-gold text-base font-bold text-brand-navy shadow-lg hover:bg-brand-gold/90"
                >
                  <Link href={practicalReturnCheckoutPath}>
                    কোর্সে ভর্তি হোন
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <p className="mt-3 text-center lg:text-left text-[11px] text-white/65">
                {offer.supportText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// MAIN PAGE COMPONENT
export function PracticalReturnCoursePage({
  commerce,
}: {
  commerce: PracticalCourseCommerce | null;
}) {
  const currentPrice = commerce?.price ?? practicalReturnCourse.offer.price;
  const regularPrice =
    commerce?.regularPrice ?? practicalReturnCourse.offer.originalPrice;

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section (Dominant E-Return, Supporting Paper Return) */}
      <CourseHero />

      {/* 2. Compact Return Preparation Workflow (4 + 2 Sequence) */}
      <CourseWorkflow />

      {/* 3. Practical Course System */}
      <CourseSystem />

      {/* 4. Course Information (Human Narrative Copy + Quick Facts Panel) */}
      <CourseInfo currentPrice={currentPrice} regularPrice={regularPrice} />

      {/* 5. Student Reviews */}
      <StudentReviews />

      {/* 6. Course Certificate */}
      <CourseCertificate />

      {/* 7. Who This Course Is For */}
      <CourseAudience />

      {/* 8. Practical Learning */}
      <PracticalLearning />

      {/* 9. Instructor Section */}
      <InstructorSection />

      {/* 10. Course Curriculum (5 Compact Modules) */}
      <CourseCurriculum />

      {/* 11. FAQ */}
      <CourseFaq />

      {/* 12. Final Enrollment CTA (Two-Column Balanced Container) */}
      <EnrollmentSection currentPrice={currentPrice} regularPrice={regularPrice} />
    </main>
  );
}
