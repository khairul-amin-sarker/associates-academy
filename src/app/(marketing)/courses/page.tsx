import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FileCheck2,
  Files,
  Users,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultCourse } from "@/lib/content/defaults";
import {
  practicalReturnCourse,
  practicalReturnCoursePath,
} from "@/lib/content/practical-return-course";

export const metadata: Metadata = {
  title: "কোর্সসমূহ | Associates Academy",
  description:
    "Associates Academy-এর professional learning programs। Income Tax Act, Return Filing—প্রতিটি program আইন, calculation ও compliance-কে একটি clear learning journey-তে সাজায়।",
};

/* ─────────────────────────────────────────────
   Eyebrow pill (white translucent, warm border)
───────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#ded4c5] bg-white/70 px-3 py-1 shadow-sm">
      <span
        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: "var(--brand-gold)" }}
        aria-hidden="true"
      />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.16em]"
        style={{ color: "var(--brand-navy)" }}
      >
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature chip row item
───────────────────────────────────────────── */
function FeatureChip({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm"
      style={{ color: "var(--brand-blue)" }}
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Scope tag pill
───────────────────────────────────────────── */
function ScopeTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold"
      style={{
        borderColor: "var(--border)",
        color: "var(--brand-indigo)",
        backgroundColor: "color-mix(in srgb, var(--brand-indigo) 6%, transparent)",
      }}
    >
      {label}
    </span>
  );
}

export default function CoursesPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-14 sm:py-20"
        style={{ backgroundColor: "var(--brand-cream)" }}
      >
        {/* subtle dot texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgb(17 24 68 / 0.07) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden="true"
        />

        <div className="section-shell relative">
          <Eyebrow>Academy Programs</Eyebrow>

          <h1
            className="font-heading mt-5 text-[2.25rem] font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.25rem]"
            style={{ color: "var(--brand-navy)" }}
          >
            Professional learning,{" "}
            <span className="relative inline-block">
              structured for practice
              {/* gold underline accent */}
              <span
                className="pointer-events-none absolute bottom-1 left-0 h-[6px] w-full rounded-sm"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--brand-gold) 38%, transparent)",
                  zIndex: -1,
                }}
                aria-hidden="true"
              />
            </span>
          </h1>

          <p
            className="mt-5 max-w-2xl text-base leading-[1.75] sm:text-lg"
            style={{ color: "var(--brand-blue)" }}
          >
            প্রতিটি program আইন, calculation, compliance এবং professional
            outcome-কে একটি clear learning journey-তে সাজায়।
          </p>

          {/* Stats strip */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { value: "২টি", label: "Active Program" },
              { value: "Live + Recorded", label: "Class Format" },
              { value: "Certificate", label: "সহ প্রতিটি কোর্সে" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span
                  className="font-heading text-base font-bold sm:text-lg"
                  style={{ color: "var(--brand-navy)" }}
                >
                  {stat.value}
                </span>
                <span className="text-sm" style={{ color: "var(--brand-blue)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cards ────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-2">

            {/* ── Card 1: Fundamentals ── */}
            <article
              className="course-card-lift overflow-hidden rounded-2xl border course-card-shadow"
              style={{ borderColor: "color-mix(in srgb, var(--brand-navy) 12%, transparent)" }}
            >
              {/* Dark header */}
              <div
                className="gradient-navy course-bg-dots-navy relative p-6 sm:p-7"
              >
                {/* gold glow blob */}
                <div
                  className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--brand-gold) 18%, transparent) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-4">
                  {/* Enrollment badge */}
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{
                      backgroundColor: "var(--brand-gold)",
                      color: "var(--brand-navy)",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-current"
                      aria-hidden="true"
                    />
                    Enrollment open
                  </span>
                  <BookOpen
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: "var(--brand-gold)" }}
                    aria-hidden="true"
                  />
                </div>

                <h2
                  className="font-heading relative mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl"
                >
                  {defaultCourse.title}
                </h2>
                <p className="relative mt-2 text-sm leading-relaxed text-white/65">
                  {defaultCourse.subtitle}
                </p>
              </div>

              {/* White body */}
              <div className="p-6 sm:p-7">
                {/* Feature chips */}
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  <FeatureChip icon={CalendarDays} label="Live cohort" />
                  <FeatureChip icon={Clock3} label="Recorded access" />
                  <FeatureChip icon={Users} label="৬টি Module" />
                </div>

                {/* Scope tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {defaultCourse.scope.map((s) => (
                    <ScopeTag key={s} label={s} />
                  ))}
                </div>

                {/* Divider */}
                <div
                  className="my-5 border-t"
                  style={{ borderColor: "var(--border)" }}
                />

                {/* Price + CTA */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--brand-blue)" }}
                    >
                      Program fee
                    </p>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      <p
                        className="font-heading text-3xl font-bold"
                        style={{ color: "var(--brand-navy)" }}
                      >
                        ৳{defaultCourse.price.toLocaleString("bn-BD")}
                      </p>
                      {defaultCourse.compareAtPrice && (
                        <p
                          className="text-sm line-through"
                          style={{ color: "var(--brand-blue)" }}
                        >
                          ৳{defaultCourse.compareAtPrice.toLocaleString("bn-BD")}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    asChild
                    className="clicky flex-shrink-0 rounded-xl"
                    style={{
                      backgroundColor: "var(--brand-navy)",
                      color: "#fff",
                    }}
                  >
                    <Link href="/courses/income-tax-working-framework">
                      বিস্তারিত
                      <ArrowRight
                        className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>

            {/* ── Card 2: Practical Return ── */}
            <article
              className="course-card-lift overflow-hidden rounded-2xl border course-card-shadow"
              style={{ borderColor: "color-mix(in srgb, var(--brand-navy) 12%, transparent)" }}
            >
              {/* Dark header */}
              <div className="gradient-navy course-bg-dots-navy relative p-6 sm:p-7">
                {/* indigo glow blob */}
                <div
                  className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--brand-indigo) 28%, transparent) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-4">
                  {/* Program badge */}
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/90"
                    style={{
                      backgroundColor: "rgb(255 255 255 / 0.1)",
                      borderColor: "rgb(255 255 255 / 0.15)",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "var(--brand-gold)" }}
                      aria-hidden="true"
                    />
                    Practical filing program
                  </span>
                  <FileCheck2
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: "var(--brand-gold)" }}
                    aria-hidden="true"
                  />
                </div>

                <h2 className="font-heading relative mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {practicalReturnCourse.name}
                </h2>
                <p className="relative mt-2 text-sm leading-relaxed text-white/65">
                  Documents থেকে Final Submission পর্যন্ত complete practical
                  return filing workflow।
                </p>
              </div>

              {/* White body */}
              <div className="p-6 sm:p-7">
                {/* Feature chips */}
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  <FeatureChip icon={Files} label="Paper + E-Return" />
                  <FeatureChip
                    icon={CalendarDays}
                    label={`${practicalReturnCourse.offer.classCount}টি Live Class`}
                  />
                  <FeatureChip icon={Clock3} label="Recorded access" />
                </div>

                {/* Scope tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {practicalReturnCourse.system.items.map((item) => (
                    <ScopeTag key={item.title} label={item.title} />
                  ))}
                </div>

                {/* Divider */}
                <div
                  className="my-5 border-t"
                  style={{ borderColor: "var(--border)" }}
                />

                {/* Price + CTA */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--brand-blue)" }}
                    >
                      Program fee
                    </p>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      <p
                        className="font-heading text-3xl font-bold"
                        style={{ color: "var(--brand-navy)" }}
                      >
                        ৳{practicalReturnCourse.offer.price.toLocaleString("bn-BD")}
                      </p>
                      {practicalReturnCourse.offer.originalPrice && (
                        <p
                          className="text-sm line-through"
                          style={{ color: "var(--brand-blue)" }}
                        >
                          ৳{practicalReturnCourse.offer.originalPrice.toLocaleString("bn-BD")}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    asChild
                    className="clicky flex-shrink-0 rounded-xl"
                    style={{
                      backgroundColor: "var(--brand-navy)",
                      color: "#fff",
                    }}
                  >
                    <Link href={practicalReturnCoursePath}>
                      বিস্তারিত
                      <ArrowRight
                        className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Closing CTA band ─────────────────────────────── */}
      <section
        className="py-12 sm:py-16"
        style={{ backgroundColor: "var(--brand-cream)" }}
      >
        <div className="section-shell">
          <div
            className="gradient-navy course-bg-dots-navy relative overflow-hidden rounded-3xl px-8 py-10 sm:px-12 sm:py-12 course-panel-shadow"
          >
            {/* decorative glow */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand-gold) 14%, transparent) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--brand-gold)" }}
                >
                  সহায়তা প্রয়োজন?
                </p>
                <h2
                  className="font-heading mt-2 text-xl font-bold text-white sm:text-2xl"
                >
                  কোন কোর্সটি আপনার জন্য উপযুক্ত?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  কোর্স নির্বাচনে সাহায্য লাগলে WhatsApp-এ যোগাযোগ করুন।
                  আমরা আপনার প্রয়োজন অনুযায়ী সঠিক program suggest করতে
                  পারব।
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  className="clicky rounded-xl font-semibold"
                  style={{
                    backgroundColor: "var(--brand-gold)",
                    color: "var(--brand-navy)",
                  }}
                >
                  <a
                    href="https://wa.me/8801712192758"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    WhatsApp করুন
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="clicky rounded-xl border text-white/80 hover:text-white"
                  style={{ borderColor: "rgb(255 255 255 / 0.15)" }}
                >
                  <Link href="/resources">
                    Free Resources দেখুন
                    <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
