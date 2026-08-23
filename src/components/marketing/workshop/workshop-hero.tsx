"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  workshopConfig,
  workshopEventTiles,
} from "@/lib/content/workshop";
import { EReturnPreviewFrame } from "./e-return-preview-frame";
import { GoogleMeetIcon } from "./google-meet-icon";
import { WorkshopCountdown } from "./workshop-countdown";

export function WorkshopHero() {
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
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20">
      {/* Background dot pattern */}
      <div
        className="home-paper-dots pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <div
        className="bg-brand-indigo/10 pointer-events-none absolute -top-24 right-[5%] h-80 w-80 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.14fr_0.86fr] lg:gap-12 xl:gap-16">
          {/* Left Column: Workshop Information & Action */}
          <div className="flex flex-col items-start">
            {/* Live Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white/90 px-3.5 py-1 text-xs font-bold text-brand-navy shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="tracking-[0.14em] uppercase text-[11px]">
                {workshopConfig.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading mt-5 text-3xl leading-[1.18] font-extrabold tracking-tight text-brand-navy sm:text-4xl sm:leading-[1.15] lg:text-5xl xl:text-[54px] xl:leading-[1.12]">
              <span className="text-brand-navy">Paper Return</span> থেকে{" "}
              <span className="text-brand-navy underline decoration-brand-gold decoration-4 underline-offset-6">
                NBR E-Return
              </span>{" "}
              — Complete Return Preparation বুঝুন হাতে-কলমে
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base leading-relaxed text-brand-navy/85 sm:text-lg sm:leading-8 max-w-2xl">
              {workshopConfig.subtitle}
            </p>

            {/* Event Info Strip */}
            <div className="mt-7 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {workshopEventTiles.map((tile) => (
                <div
                  key={tile.label}
                  className={`flex flex-col justify-center rounded-2xl border p-3 shadow-2xs ${
                    tile.isGoogleMeet
                      ? "border-brand-indigo/35 bg-white/95 ring-1 ring-brand-indigo/20"
                      : "border-brand-navy/12 bg-white/80"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-indigo">
                    {tile.isGoogleMeet ? (
                      <GoogleMeetIcon className="h-4 w-4" />
                    ) : tile.icon ? (
                      <tile.icon className="h-4 w-4 text-brand-indigo" />
                    ) : null}
                    <span className="text-brand-navy/70 text-[11px] sm:text-xs">
                      {tile.label}
                    </span>
                  </div>
                  <span className="mt-1 font-heading text-sm font-bold text-brand-navy sm:text-base truncate">
                    {tile.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary Hero CTA Block */}
            <div className="mt-8 flex w-full flex-col sm:flex-row sm:items-center gap-4">
              <Button
                asChild
                size="lg"
                className="clicky h-13 px-8 text-base font-bold shadow-md shadow-brand-navy/20 w-full sm:w-auto"
              >
                <a
                  href="#free-registration"
                  onClick={handleScrollToRegistration}
                  className="flex items-center justify-center gap-2"
                >
                  <span>{workshopConfig.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <div className="flex items-center gap-2 text-xs text-brand-navy/75 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>{workshopConfig.ctaMicrocopy}</span>
              </div>
            </div>

            {/* Realtime Bengali Countdown Timer */}
            <div className="mt-6 w-full max-w-xl">
              <WorkshopCountdown targetIso={workshopConfig.startsAt} />
            </div>
          </div>

          {/* Right Column (Desktop) / Below on Mobile: E-Return Screenshot & Visual Frame */}
          <div className="w-full lg:sticky lg:top-24">
            <EReturnPreviewFrame />
          </div>
        </div>
      </div>
    </section>
  );
}
