"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { workshopConfig } from "@/lib/content/workshop";

export function WorkshopStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling down past initial hero (e.g. 450px)
      const shouldShow = window.scrollY > 450;

      // Hide if the registration form is in viewport
      const formEl = document.getElementById("free-registration");
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        const isInViewport =
          rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          setVisible(false);
          return;
        }
      }

      setVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToRegistration = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("free-registration");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block border-t border-brand-navy/15 bg-white/95 px-4 py-3 shadow-[0_-8px_20px_rgb(0_0_0_/_0.08)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-heading text-sm font-bold text-brand-navy truncate">
            {workshopConfig.dateBangla}, {workshopConfig.timeBangla}
          </p>
          <p className="font-heading text-xs font-bold text-emerald-700 truncate">
            ১০০% ফ্রি লাইভ সেশন
          </p>
        </div>

        <Button
          asChild
          size="sm"
          className="clicky shrink-0 rounded-xl bg-brand-navy px-5 font-bold text-white shadow-md shadow-brand-navy/20"
        >
          <a
            href="#free-registration"
            onClick={handleScrollToRegistration}
            className="flex items-center gap-1.5 text-xs font-bold"
          >
            <span>{workshopConfig.primaryCta}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}
