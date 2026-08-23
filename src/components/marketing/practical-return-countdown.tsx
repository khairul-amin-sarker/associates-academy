"use client";

import { useEffect, useState } from "react";

type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemainingTime(endsAt: string): RemainingTime {
  const milliseconds = Math.max(0, new Date(endsAt).getTime() - Date.now());
  const totalSeconds = Math.floor(milliseconds / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function PracticalReturnCountdown({ endsAt }: { endsAt: string }) {
  const [remaining, setRemaining] = useState<RemainingTime | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemainingTime(endsAt));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [endsAt]);

  if (!remaining) return null;

  const tiles = [
    [remaining.days, "দিন"],
    [remaining.hours, "ঘণ্টা"],
    [remaining.minutes, "মিনিট"],
    [remaining.seconds, "সেকেন্ড"],
  ] as const;

  return (
    <div aria-label="Offer countdown">
      <p className="text-brand-gold text-xs font-bold tracking-[0.14em] uppercase">
        Offer ends in
      </p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {tiles.map(([value, label]) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-white/[0.08] p-3 text-center"
          >
            <p className="font-heading text-2xl font-bold">
              {value.toLocaleString("bn-BD", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </p>
            <p className="mt-1 text-[11px] text-white/60">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
