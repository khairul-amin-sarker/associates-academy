"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  workshopConfig,
  workshopTrustPoints,
} from "@/lib/content/workshop";

export function WorkshopFinalCta() {
  const handleScrollToRegistration = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const el = document.getElementById("free-registration");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden border-t border-brand-navy/20 bg-brand-navy py-16 text-white sm:py-24">
      {/* Background Dots Texture */}
      <div
        className="course-bg-dots-navy pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <div
        className="bg-brand-indigo/20 pointer-events-none absolute -top-24 right-[10%] h-80 w-80 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-brand-gold text-xs font-bold tracking-[0.22em] uppercase">
            FREE LIVE REGISTRATION
          </span>

          <h2 className="font-heading mt-4 text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
            এখনই আপনার সিট নিশ্চিত করুন
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            রেজিস্ট্রেশন সম্পূর্ণ ফ্রি। Paper Return থেকে NBR E-Return পর্যন্ত Complete Return Preparation-এর পুরো picture একটি Live Workshop-এ বুঝুন।
          </p>

          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {workshopTrustPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold text-white/90 sm:text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="clicky h-14 min-w-[240px] rounded-2xl bg-white text-brand-navy hover:bg-brand-cream px-8 text-base font-bold shadow-xl shadow-black/30"
            >
              <a
                href="#free-registration"
                onClick={handleScrollToRegistration}
                className="flex items-center gap-2"
              >
                <span>{workshopConfig.primaryCta}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <p className="text-xs text-white/60">
              {workshopConfig.dateBangla} • {workshopConfig.timeBangla} • {workshopConfig.platform}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
