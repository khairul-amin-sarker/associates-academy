import React from "react";
import Image from "next/image";
import {
  Award,
  BookOpenCheck,
  Scale,
} from "lucide-react";
import { workshopInstructor } from "@/lib/content/workshop";

export function WorkshopInstructor() {
  return (
    <section className="relative border-t border-brand-navy/10 bg-[#f8f3eb] py-14 sm:py-20">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 xl:gap-16">
          {/* Left: Instructor Photograph */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-brand-navy/15 bg-brand-navy shadow-lift">
              <Image
                src={workshopInstructor.imageSrc}
                alt={workshopInstructor.name}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

              {/* Bottom Photo Pill */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-brand-navy/85 p-3 text-white backdrop-blur-sm">
                <p className="font-heading text-sm font-bold text-brand-gold">
                  {workshopInstructor.experienceStatement}
                </p>
                <p className="text-[11px] text-white/80">
                  Dhaka Taxes Bar Association Member
                </p>
              </div>
            </div>
          </div>

          {/* Right: Credentials, Philosophy & Bio */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white/80 px-3 py-1 text-xs font-bold text-brand-navy">
              <Award className="h-3.5 w-3.5 text-brand-gold" />
              <span className="tracking-[0.14em] uppercase text-[11px]">
                INSTRUCTOR PROFILE
              </span>
            </div>

            <h2 className="font-heading mt-4 text-2xl leading-tight font-extrabold text-brand-navy sm:text-3xl lg:text-4xl">
              আপনার প্রশিক্ষক
            </h2>

            <div className="mt-4">
              <h3 className="font-heading text-xl font-bold text-brand-navy sm:text-2xl">
                {workshopInstructor.name}
              </h3>
              <p className="text-sm font-semibold text-brand-indigo sm:text-base">
                {workshopInstructor.subtitle} • {workshopInstructor.credentials}
              </p>
            </div>

            <p className="mt-5 text-base leading-relaxed text-brand-navy/80 sm:text-lg sm:leading-8">
              {workshopInstructor.introCopy}
            </p>

            {/* Credibility and Affiliations Grid */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-brand-navy/10 bg-white p-3.5 shadow-2xs">
                <Scale className="mt-0.5 h-5 w-5 shrink-0 text-brand-indigo" />
                <div>
                  <p className="text-xs font-bold text-brand-navy">
                    Dhaka Taxes Bar Association
                  </p>
                  <p className="text-[11px] text-brand-navy/70">
                    সম্মানিত সদস্য ও নিয়মিত প্র্যাকটিস
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-brand-navy/10 bg-white p-3.5 shadow-2xs">
                <BookOpenCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-indigo" />
                <div>
                  <p className="text-xs font-bold text-brand-navy">
                    Associates Academy
                  </p>
                  <p className="text-[11px] text-brand-navy/70">
                    Founder & Lead Tax Trainer
                  </p>
                </div>
              </div>
            </div>

            {/* Practical Education Stance */}
            <div className="mt-6 rounded-2xl border border-emerald-600/20 bg-emerald-500/8 p-4 text-xs font-medium text-emerald-950 sm:text-sm">
              ✨ মূল লক্ষ্য: মুখস্থ আইন নয়, ক্লায়েন্টের আসল ডকুমেন্ট দেখে রিটার্নের সঠিক খসড়া তৈরি ও পোর্টালে নিখুঁত এন্ট্রি দেওয়া শেখানো।
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
