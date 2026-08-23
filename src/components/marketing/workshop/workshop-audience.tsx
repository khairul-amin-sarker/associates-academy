import React from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  UserCheck,
  Users,
} from "lucide-react";
import { workshopAudienceData } from "@/lib/content/workshop";

export function WorkshopAudience() {
  const { panelA, panelB, bridgeMessage } = workshopAudienceData;

  return (
    <section className="relative border-t border-brand-navy/10 bg-white py-14 sm:py-20">
      <div className="section-shell">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-brand-cream/60 px-3 py-1 text-xs font-bold text-brand-navy">
            <Users className="h-3.5 w-3.5 text-brand-gold" />
            <span className="tracking-[0.14em] uppercase text-[11px]">
              TARGET AUDIENCE
            </span>
          </div>

          <h2 className="font-heading mt-4 text-2xl leading-tight font-extrabold text-brand-navy sm:text-3xl lg:text-4xl">
            এই Workshop কাদের জন্য?
          </h2>

          <p className="mt-3 text-base text-brand-navy/80 sm:text-lg">
            সাধারণ করদাতা থেকে শুরু করে একাউন্টস ও ট্যাক্স প্রফেশনাল—সবার জন্যই রিটার্ন প্রস্তুতের বাস্তব জ্ঞান।
          </p>
        </div>

        {/* Two Major Audience Panels */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Panel A: Individual Taxpayer */}
          <div className="flex flex-col justify-between rounded-3xl border border-brand-navy/12 bg-[#fffdf9] p-6 shadow-soft sm:p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-indigo/20 bg-brand-indigo/10 px-3 py-1 text-xs font-bold text-brand-indigo">
                  <UserCheck className="h-3.5 w-3.5" />
                  {panelA.tag}
                </span>
                <span className="font-mono text-xs font-semibold text-brand-navy/50">
                  Group 01
                </span>
              </div>

              <h3 className="font-heading mt-4 text-xl font-bold text-brand-navy sm:text-2xl">
                {panelA.title}
              </h3>

              <p className="mt-2 text-sm text-brand-navy/70">
                যাঁরা নিজের রিটার্ন নিজে বুঝে ফাইল করতে চান অথবা অন্যের প্রস্তুতকৃত রিটার্ন সঠিকভাবে যাচাই করতে চান:
              </p>

              <ul className="mt-6 space-y-3">
                {panelA.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-brand-navy/85 sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-[#f8f4ec] p-4 text-xs font-medium text-brand-navy/80">
              💡 সুবিধা: Salary, Bank Interest, Rebate ও Family Expense কীভাবে সাজাতে হয় তা সহজে আয়ত্ত করতে পারবেন।
            </div>
          </div>

          {/* Panel B: Tax & Accounts Professionals */}
          <div className="flex flex-col justify-between rounded-3xl border border-brand-indigo/30 bg-[#fcfbfa] p-6 shadow-soft sm:p-8 ring-1 ring-brand-indigo/15">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy/20 bg-brand-navy px-3 py-1 text-xs font-bold text-brand-gold">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  {panelB.tag}
                </span>
                <span className="font-mono text-xs font-semibold text-brand-navy/50">
                  Group 02
                </span>
              </div>

              <h3 className="font-heading mt-4 text-xl font-bold text-brand-navy sm:text-2xl">
                {panelB.title}
              </h3>

              <p className="mt-2 text-sm text-brand-navy/70">
                যাঁরা ক্লায়েন্টের রিটার্ন প্রস্তুত করেন বা ট্যাক্স প্র্যাকটিসকে আরও প্রফেশনাল ও সিস্টেমেটিক করতে চান:
              </p>

              <ul className="mt-6 space-y-3">
                {panelB.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-brand-navy/85 sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-indigo" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-brand-indigo/15 bg-brand-indigo/8 p-4 text-xs font-medium text-brand-navy/80">
              💼 সুবিধা: Client Documentation থেকে শুরু করে IT-10B Wealth Reconciliation ও Portal Entry-এর ধারাবাহিক প্রসেস।
            </div>
          </div>
        </div>

        {/* Bridge Unifying Statement */}
        <div className="mt-10 rounded-2xl border border-brand-navy/12 bg-[#f4ece0] p-4 text-center sm:p-5">
          <p className="text-sm font-semibold text-brand-navy sm:text-base">
            {bridgeMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
