"use client";

import { useActionState, useState } from "react";
import {
  Check,
  FileCheck2,
  LoaderCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";
import {
  initialTaxBriefActionState,
  subscribeToTaxBrief,
} from "@/app/(marketing)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const checklistProfiles = {
  salaried: {
    label: "Salaried",
    description: "চাকরি ও salary income",
    items: [
      "Salary certificate ও মাসভিত্তিক salary statement",
      "Bank statement এবং source tax-এর প্রমাণ",
      "Investment ও tax rebate supporting documents",
      "সম্পদ, দায় ও lifestyle expense-এর তথ্য",
    ],
  },
  business: {
    label: "Business",
    description: "ব্যবসা ও trade income",
    items: [
      "Financial statements, ledger ও bank statement",
      "Trade license, TIN এবং business registration records",
      "TDS/VDS certificates ও challan references",
      "Assets, liabilities, capital ও drawings-এর working",
    ],
  },
  professional: {
    label: "Professional",
    description: "স্বাধীন professional practice",
    items: [
      "Professional receipts ও expense working",
      "Bank statement এবং client deduction certificates",
      "Practice-related asset ও liability information",
      "Investment, tax payment ও previous return records",
    ],
  },
} as const;

type ChecklistProfile = keyof typeof checklistProfiles;

export function ReturnChecklistBuilder() {
  const [profile, setProfile] = useState<ChecklistProfile>("salaried");
  const active = checklistProfiles[profile];

  return (
    <div className="course-panel-shadow gradient-navy course-bg-dots-navy overflow-hidden rounded-3xl border border-white/10 text-white">
      <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-r lg:border-b-0">
          <span className="bg-brand-gold/15 text-brand-gold inline-flex h-11 w-11 items-center justify-center rounded-xl">
            <FileCheck2 aria-hidden="true" className="h-5 w-5" />
          </span>
          <p className="text-brand-gold mt-6 text-xs font-bold tracking-[0.16em] uppercase">
            LIVE CHECKLIST BUILDER
          </p>
          <h3 className="font-heading mt-3 text-3xl leading-tight font-bold sm:text-4xl">
            আপনার Return Filing Checklist তৈরি করুন
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/68">
            আপনার income profile নির্বাচন করুন। শুরু করার জন্য একটি concise
            document checklist সঙ্গে সঙ্গে দেখুন।
          </p>

          <div
            className="mt-7 grid gap-2"
            role="group"
            aria-label="Income profile"
          >
            {(Object.keys(checklistProfiles) as ChecklistProfile[]).map(
              (key) => {
                const item = checklistProfiles[key];
                const selected = key === profile;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setProfile(key)}
                    className={cn(
                      "focus-ring flex min-h-14 items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors",
                      selected
                        ? "border-brand-gold/60 bg-brand-gold/12"
                        : "border-white/12 bg-white/[0.055] hover:bg-white/10",
                    )}
                  >
                    <span>
                      <span className="block font-semibold">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-white/55">
                        {item.description}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full border",
                        selected
                          ? "border-brand-gold bg-brand-gold text-brand-navy"
                          : "border-white/18 text-transparent",
                      )}
                    >
                      <Check aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div className="text-brand-navy bg-white p-6 sm:p-8" aria-live="polite">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-brand-indigo text-xs font-bold tracking-[0.14em] uppercase">
                {active.label} Checklist
              </p>
              <h4 className="font-heading mt-2 text-2xl font-bold">
                প্রস্তুত রাখুন
              </h4>
            </div>
            <span className="border-brand-gold/30 bg-brand-gold/10 text-brand-navy rounded-lg border px-2.5 py-1 text-xs font-bold">
              {active.items.length} items
            </span>
          </div>
          <ol className="mt-6 space-y-3">
            {active.items.map((item, index) => (
              <li
                key={item}
                className="border-brand-navy/10 bg-brand-cream/45 flex gap-3 rounded-xl border p-4"
              >
                <span className="bg-brand-navy text-brand-gold grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pt-0.5 text-sm leading-6">{item}</span>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-5 flex gap-2 text-xs leading-5">
            <ShieldCheck
              aria-hidden="true"
              className="text-brand-indigo mt-0.5 h-4 w-4 shrink-0"
            />
            এটি একটি indicative starter checklist; আপনার return profile অনুযায়ী
            অতিরিক্ত document প্রয়োজন হতে পারে।
          </p>
        </div>
      </div>
    </div>
  );
}

const interestOptions = [
  ["income-tax", "Income Tax"],
  ["vat", "VAT"],
  ["corporate-compliance", "Corporate Compliance"],
  ["courses-workshops", "Courses & Workshops"],
] as const;

export function TaxBriefSignup() {
  const [state, formAction, pending] = useActionState(
    subscribeToTaxBrief,
    initialTaxBriefActionState,
  );

  return (
    <form
      action={formAction}
      className="mt-8"
      aria-label="Associates Tax Brief signup"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="tax-brief-email">
          আপনার Email Address
        </label>
        <div className="relative">
          <Mail
            aria-hidden="true"
            className="text-brand-indigo absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
          />
          <Input
            id="tax-brief-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="আপনার Email Address"
            className="border-brand-navy/15 h-13 bg-white pl-12 text-base"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="clicky h-13 px-6"
        >
          {pending ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : null}
          Tax Brief-এ যুক্ত হোন
        </Button>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">আমি update চাই:</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interestOptions.map(([value, label], index) => (
            <label
              key={value}
              className="has-checked:border-brand-indigo has-checked:bg-brand-indigo/8 focus-within:ring-brand-indigo/55 border-brand-navy/12 flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border bg-white/70 px-3.5 py-2 text-sm font-semibold focus-within:ring-2"
            >
              <input
                type="checkbox"
                name="interests"
                value={value}
                defaultChecked={index === 0}
                className="accent-brand-indigo h-4 w-4"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="tax-brief-website">Website</label>
        <input
          id="tax-brief-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="text-muted-foreground mt-5 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>No spam • প্রয়োজনীয় update-ই শুধু</p>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "font-semibold",
            state.status === "success" && "text-success",
            state.status === "error" && "text-destructive",
          )}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
