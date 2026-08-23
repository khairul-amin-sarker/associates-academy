"use client";

import React, { useEffect, useState } from "react";
import { Clock, Radio } from "lucide-react";

type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
};

function calculateTimeRemaining(targetIso: string): RemainingTime {
  const targetTime = new Date(targetIso).getTime();
  const now = Date.now();
  const diffMs = targetTime - now;

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isStarted: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isStarted: false,
  };
}

function toBnNumber(val: number): string {
  return val.toLocaleString("bn-BD", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

export function WorkshopCountdown({
  targetIso = "2026-08-26T21:00:00+06:00",
  className = "",
}: {
  targetIso?: string;
  className?: string;
}) {
  const [time, setTime] = useState<RemainingTime | null>(null);

  useEffect(() => {
    const tick = () => {
      setTime(calculateTimeRemaining(targetIso));
    };

    const timer = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [targetIso]);

  const units = [
    { label: "দিন", value: time ? time.days : 0 },
    { label: "ঘণ্টা", value: time ? time.hours : 0 },
    { label: "মিনিট", value: time ? time.minutes : 0 },
    { label: "সেকেন্ড", value: time ? time.seconds : 0 },
  ] as const;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/12 bg-brand-navy p-4 text-white shadow-md ${className}`}
      aria-label="Workshop countdown timer"
    >
      {/* Subtle dotted background */}
      <div
        className="course-bg-dots-navy pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
            </span>
            <p className="text-xs font-semibold tracking-wide text-white/90">
              {time?.isStarted ? "Live Session" : "Workshop শুরু হতে বাকি"}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-white/70 font-mono">
            <Clock className="h-3 w-3 text-brand-gold" />
            <span>২৬ আগস্ট, রাত ৯:০০</span>
          </div>
        </div>

        {time?.isStarted ? (
          <div className="mt-3.5 flex items-center justify-center gap-2.5 rounded-xl bg-white/10 py-3 text-center">
            <Radio className="h-4 w-4 animate-pulse text-brand-gold" />
            <span className="font-heading text-lg font-bold text-brand-gold">
              Workshop শুরু হয়েছে — Google Meet-এ সরাসরি যুক্ত হোন
            </span>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center rounded-xl border border-white/8 bg-white/6 py-2 px-1 text-center sm:py-2.5"
              >
                <span className="font-heading text-2xl font-extrabold text-brand-gold sm:text-3xl leading-none">
                  {time ? toBnNumber(unit.value) : "--"}
                </span>
                <span className="mt-1 text-[11px] font-medium text-white/70 sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
