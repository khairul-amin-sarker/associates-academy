"use client";

import React from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { workshopConfig } from "@/lib/content/workshop";
import { GoogleMeetIcon } from "./google-meet-icon";

export function WorkshopEventPanel() {
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
    <section className="relative border-t border-brand-navy/10 bg-white py-14 sm:py-16">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-3xl border border-brand-navy/20 bg-brand-navy p-6 text-white shadow-lift sm:p-10 lg:p-12">
          {/* Dot background texture */}
          <div
            className="course-bg-dots-navy pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase">
                SCHEDULE & TIMING
              </span>

              <h2 className="font-heading mt-3 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                Workshop কখন?
              </h2>

              <p className="mt-3 text-sm text-white/75 sm:text-base leading-relaxed">
                লাইভ সেশনে সরাসরি যুক্ত হতে এখনই আপনার সিট বুক করে রাখুন।
              </p>

              {/* Event Information Blocks */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/12 bg-white/6 p-3.5">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <CalendarDays className="h-4 w-4 text-brand-gold" />
                    <span>তারিখ</span>
                  </div>
                  <p className="mt-1 font-heading text-base font-bold text-white sm:text-lg">
                    {workshopConfig.dateBangla}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/12 bg-white/6 p-3.5">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Clock className="h-4 w-4 text-brand-gold" />
                    <span>সময়</span>
                  </div>
                  <p className="mt-1 font-heading text-base font-bold text-white sm:text-lg">
                    {workshopConfig.timeBangla}
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl border border-white/12 bg-white/6 p-3.5 sm:col-span-1">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <GoogleMeetIcon className="h-4 w-4" />
                    <span>প্ল্যাটফর্ম</span>
                  </div>
                  <p className="mt-1 font-heading text-base font-bold text-white sm:text-lg">
                    {workshopConfig.platform}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-white/65">
                রেজিস্ট্রেশনের পর Workshop access / joining information আপনার দেওয়া যোগাযোগের মাধ্যমে জানানো হবে।
              </p>
            </div>

            {/* CTA action card */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/8 p-6 text-center backdrop-blur-xs sm:p-8">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                {workshopConfig.priceLabel} Live Workshop
              </span>

              <p className="font-heading mt-4 text-xl font-bold text-white sm:text-2xl">
                কোনো ফি ছাড়াই পুরো রিটার্ন প্রিপারেশন শিখুন
              </p>

              <Button
                asChild
                size="lg"
                className="clicky mt-6 h-13 w-full rounded-2xl bg-white text-brand-navy hover:bg-brand-cream text-base font-bold shadow-lg shadow-black/20"
              >
                <a
                  href="#free-registration"
                  onClick={handleScrollToRegistration}
                  className="flex items-center justify-center gap-2"
                >
                  <span>ফ্রি সিট বুক করুন</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-white/70">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                <span>কোনো পাসওয়ার্ড বা কার্ডের প্রয়োজন নেই</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
