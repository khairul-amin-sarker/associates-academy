import React from "react";
import { CheckCircle2, FileCheck2, Lock, Sparkles } from "lucide-react";

export function EReturnPreviewFrame({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-3xl border border-[#ded4c5] bg-[#fffdf9] p-3 sm:p-4 md:p-5 shadow-[0_20px_40px_-24px_rgb(17_24_68_/_35%)] ${className}`}
    >
      {/* Decorative corner accent */}
      <div
        className="pointer-events-none absolute -top-1.5 -right-1.5 h-6 w-6 rounded-tr-xl border-t-2 border-r-2 border-brand-gold"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-6 w-6 rounded-bl-xl border-b-2 border-l-2 border-brand-gold"
        aria-hidden="true"
      />

      {/* Browser mockup window frame */}
      <div className="overflow-hidden rounded-2xl border border-brand-navy/12 bg-white shadow-sm">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between border-b border-brand-navy/10 bg-[#f4ece0] px-3 py-2 sm:px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e76e55]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5fc054]" />
          </div>

          <div className="flex max-w-[260px] flex-1 items-center justify-center gap-1.5 truncate rounded-lg border border-brand-navy/10 bg-white/85 px-2.5 py-1 text-[11px] font-mono text-brand-navy/70 sm:max-w-xs">
            <Lock className="h-3 w-3 text-emerald-600 shrink-0" />
            <span className="truncate">etaxnbr.gov.bd/eReturn/assessment</span>
          </div>

          <span className="rounded bg-brand-navy/8 px-1.5 py-0.5 text-[10px] font-semibold text-brand-navy/70 uppercase">
            LIVE DEMO
          </span>
        </div>

        {/* NBR e-Return Simulation Layout */}
        <div className="bg-[#fcfaf6] p-3.5 sm:p-5">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-navy/10 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white">
                  NBR
                </span>
                <span className="font-heading text-sm font-bold text-brand-navy sm:text-base">
                  NBR e-Return Portal — Assessment & Computation
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-brand-indigo">
                Assessment Year: 2025–2026 • Individual Taxpayer Workflow
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Verified Structure
            </div>
          </div>

          {/* Workflow Stepper Bar */}
          <div className="mt-3 grid grid-cols-5 gap-1 text-center font-heading text-[10px] sm:text-xs">
            {[
              { label: "1. Assessment", active: true },
              { label: "2. Income", active: true },
              { label: "3. Rebate", active: true },
              { label: "4. IT-10B", active: true },
              { label: "5. Review", active: false },
            ].map((step) => (
              <div
                key={step.label}
                className={`truncate rounded-lg py-1.5 px-1 font-semibold ${
                  step.active
                    ? "bg-brand-navy text-white shadow-xs"
                    : "border border-brand-navy/10 bg-white text-brand-navy/60"
                }`}
              >
                {step.label}
              </div>
            ))}
          </div>

          {/* Portal Content Grid */}
          <div className="mt-3.5 space-y-2.5">
            {/* Step: Income Identification */}
            <div className="rounded-xl border border-brand-navy/10 bg-white p-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-navy">
                  Heads of Income — Data Mapping
                </span>
                <span className="font-mono text-[11px] text-emerald-700 font-bold">
                  Auto Reconciled
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                <div className="rounded-md border border-brand-navy/8 bg-[#f9f6f0] p-1.5">
                  <p className="text-brand-navy/65">Salaries (Sec 32)</p>
                  <p className="font-mono font-bold text-brand-navy">৳ ৮,৫০,০০০</p>
                </div>
                <div className="rounded-md border border-brand-navy/8 bg-[#f9f6f0] p-1.5">
                  <p className="text-brand-navy/65">Financial Assets</p>
                  <p className="font-mono font-bold text-brand-navy">৳ ১,২০,০০০</p>
                </div>
                <div className="col-span-2 rounded-md border border-brand-gold/30 bg-brand-gold/8 p-1.5 sm:col-span-1">
                  <p className="text-brand-gold font-medium">TDS Adjusted</p>
                  <p className="font-mono font-bold text-brand-navy">৳ ১৮,৫০০</p>
                </div>
              </div>
            </div>

            {/* Step: Statement of Assets & Liabilities (IT-10B) */}
            <div className="rounded-xl border border-brand-indigo/20 bg-brand-indigo/5 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-navy">
                  IT-10B Wealth & Family Expense Consistency
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-brand-indigo/15 px-1.5 py-0.5 text-[10px] font-bold text-brand-indigo">
                  <Sparkles className="h-2.5 w-2.5" />
                  Key Practical Logic
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-brand-indigo/90">
                Income + Accretion = Net Wealth Change + Family Expenses
              </p>
            </div>

            {/* Step: Final Verification Bar */}
            <div className="flex items-center justify-between rounded-xl border border-emerald-600/20 bg-emerald-500/8 px-3 py-2 text-xs">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-emerald-700 shrink-0" />
                <span className="font-semibold text-emerald-950 text-[11px] sm:text-xs">
                  Paper Return to e-Return Mapping Ready
                </span>
              </div>
              <span className="rounded-md bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white">
                100% Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption beneath framed visual */}
      <p className="mt-3 text-center text-xs font-semibold text-brand-navy/70">
        NBR E-Return-এর বাস্তব workflow বুঝুন
      </p>
    </div>
  );
}
