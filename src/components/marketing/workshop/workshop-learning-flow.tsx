import React from "react";
import { GitCommitHorizontal, Quote } from "lucide-react";
import { workshopLearningSteps } from "@/lib/content/workshop";

export function WorkshopLearningFlow() {
  return (
    <section className="relative border-t border-brand-navy/10 bg-[#f8f3eb] py-14 sm:py-20">
      <div className="section-shell">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white/80 px-3 py-1 text-xs font-bold text-brand-navy">
            <GitCommitHorizontal className="h-3.5 w-3.5 text-brand-gold" />
            <span className="tracking-[0.14em] uppercase text-[11px]">
              END-TO-END WORKFLOW
            </span>
          </div>

          <h2 className="font-heading mt-4 text-2xl leading-tight font-extrabold text-brand-navy sm:text-3xl lg:text-4xl">
            Workshop শেষে আপনি কী বুঝতে পারবেন
          </h2>

          <p className="mt-3 text-base text-brand-navy/80 sm:text-lg">
            Return Preparation-এর শুরু থেকে শেষ পর্যন্ত পুরো ক্রমানুসারে (sequence) প্রতিটা ধাপের সম্পর্ক পরিষ্কার হবে।
          </p>
        </div>

        {/* 9-Step Responsive Connected Timeline */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {workshopLearningSteps.map((step, idx) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-2xl border border-brand-navy/12 bg-[#fffdf9] p-5 shadow-2xs transition-all duration-200 hover:border-brand-indigo/30 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-heading flex h-8 w-8 items-center justify-center rounded-xl bg-brand-navy text-sm font-extrabold text-brand-gold">
                    {step.number}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-brand-indigo">
                    Step {idx + 1} of 9
                  </span>
                </div>

                <h3 className="font-heading mt-3.5 text-base font-bold text-brand-navy sm:text-lg">
                  {step.title}
                </h3>
              </div>

              <p className="mt-3 border-t border-brand-navy/8 pt-2.5 text-xs text-brand-navy/70">
                {step.note}
              </p>
            </div>
          ))}
        </div>

        {/* Highlighted Navy Quote Callout */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-brand-navy/15 bg-brand-navy p-6 text-white shadow-lift sm:p-8 lg:p-10">
          <div
            className="course-bg-dots-navy pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-center text-center">
            <Quote className="h-8 w-8 text-brand-gold opacity-80" />
            <blockquote className="font-heading mt-4 max-w-3xl text-xl leading-relaxed font-bold text-white sm:text-2xl lg:text-3xl">
              “Portal-এ তথ্য বসানোই Return Preparation নয়—সঠিক তথ্য সঠিকভাবে প্রস্তুত করাই আসল skill।”
            </blockquote>
            <p className="mt-3 text-sm text-white/70">
              — Mohammad Khairul Amin Sarker, Founder & Lead Instructor, Associates Academy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
