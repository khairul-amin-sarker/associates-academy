"use client";

import React, { useActionState, useEffect } from "react";
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  LoaderCircle,
  Lock,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  workshopConfig,
  workshopIntentOptions,
} from "@/lib/content/workshop";
import {
  registerForWorkshopAction,
  type WorkshopActionState,
} from "@/app/(marketing)/workshop/actions";
import { trackAnalyticsEvent } from "@/components/analytics/analytics-runtime";
import { WhatsAppIcon } from "./whatsapp-icon";

const initialWorkshopActionState: WorkshopActionState = {
  status: "idle",
  message: "",
};

interface WorkshopRegistrationFormProps {
  initialWorkshop?: {
    status?: "draft" | "registration_open" | "registration_closed" | "live" | "completed" | "cancelled";
    registrationEnabled?: boolean;
    startsAt?: string | null;
  };
}

export function WorkshopRegistrationForm({ initialWorkshop }: WorkshopRegistrationFormProps = {}) {
  const [state, formAction, pending] = useActionState(
    registerForWorkshopAction,
    initialWorkshopActionState,
  );

  useEffect(() => {
    if (state.status === "success") {
      trackAnalyticsEvent("workshop_registration", {
        workshop_id: workshopConfig.id,
        registration_code: state.registrationCode,
        intent: state.submittedData?.workshopIntent,
      });
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: workshopConfig.title,
          content_category: "Workshop Registration",
          value: 0,
          currency: "BDT",
        });
      }
    }
  }, [state.status, state.registrationCode, state.submittedData]);

  const isClosed =
    state.status === "closed" ||
    initialWorkshop?.registrationEnabled === false ||
    initialWorkshop?.status === "registration_closed" ||
    initialWorkshop?.status === "cancelled";

  const isCompleted =
    initialWorkshop?.status === "completed";

  const isCapacityReached =
    state.status === "capacity_reached";

  const handleFormSubmit = (formData: FormData) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      formData.set("utmSource", params.get("utm_source") || "");
      formData.set("utmMedium", params.get("utm_medium") || "");
      formData.set("utmCampaign", params.get("utm_campaign") || "");
      formData.set("utmContent", params.get("utm_content") || "");
      formData.set("utmTerm", params.get("utm_term") || "");
      formData.set("utmAudience", params.get("utm_audience") || "");
      formData.set("landingPageUrl", window.location.href);
      formData.set("referrer", document.referrer || "");
    }
    formData.set("workshopId", workshopConfig.id);
    formAction(formData);
  };

  return (
    <section
      id="free-registration"
      className="scroll-mt-24 border-t border-brand-navy/10 bg-[#f8f3eb] py-14 sm:py-20"
      aria-label="Workshop Registration Section"
    >
      <div className="section-shell">
        <div className="mx-auto max-w-3xl">
          {/* Centered Elevated Paper Registration Card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#ded4c5] bg-[#fffdf9] p-6 shadow-lift sm:p-10 md:p-12">
            {/* Top Navy Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-brand-navy" />

            {/* Header / Intro */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy/15 bg-brand-cream px-3 py-1 text-xs font-bold text-brand-navy uppercase tracking-wider">
                <Users className="h-3.5 w-3.5 text-brand-indigo" />
                FREE REGISTRATION
              </span>

              <h2 className="font-heading mt-3 text-2xl font-extrabold text-brand-navy sm:text-3xl lg:text-4xl">
                Free Workshop-এ রেজিস্ট্রেশন করুন
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-brand-navy/75 sm:text-base">
                শুধু নিচের তথ্যগুলো পূরণ করুন। রেজিস্ট্রেশন সম্পন্ন হলে Workshop-এর access information পাবেন।
              </p>
            </div>

            {/* Closed / Capacity Full Notice */}
            {isClosed || isCompleted || isCapacityReached ? (
              <div className="mt-8 rounded-2xl border border-amber-600/30 bg-amber-500/10 p-6 sm:p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-600/20 text-amber-900">
                  <AlertCircle className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-heading mt-3 text-xl font-bold text-brand-navy">
                  {isCompleted
                    ? "এই Workshop-টি সম্পন্ন হয়েছে"
                    : isCapacityReached
                      ? "সকল সিট পূর্ণ হয়েছে"
                      : "এই Workshop-এর Registration বন্ধ হয়েছে"}
                </h3>
                <p className="mt-2 text-sm text-brand-navy/75 max-w-md mx-auto">
                  {state.message ||
                    (isCompleted
                      ? "Workshop-টি সফলভাবে সম্পন্ন হয়েছে। পরবর্তী ফ্রি সেশনের জন্য আমাদের সাথে থাকুন।"
                      : isCapacityReached
                        ? "এই Workshop-এর সকল নির্ধারিত সিট বুকিং শেষ হয়েছে।"
                        : "বর্তমানে এই সেশনের রেজিস্ট্রেশন গ্রহণ বন্ধ আছে।")}
                </p>
              </div>
            ) : state.status === "success" ? (
              <div
                className="mt-8 rounded-2xl border border-emerald-600/30 bg-emerald-500/10 p-6 sm:p-8 text-center"
                role="status"
                aria-live="polite"
              >
                {/* Status Pill */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700/15 border border-emerald-700/30 px-3 py-1 text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                  REGISTRATION CONFIRMED
                </span>

                <h3 className="font-heading mt-3 text-2xl font-extrabold text-emerald-950 sm:text-3xl">
                  রেজিস্ট্রেশন সম্পন্ন হয়েছে
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-emerald-900 sm:text-base font-medium">
                  আপনার Free Live Workshop-এর সিট নিশ্চিত হয়েছে।
                </p>

                {/* Event summary pill */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-brand-navy">
                  <span className="rounded-lg bg-white/90 px-2.5 py-1 border border-emerald-600/20">
                    📅 ২৬ আগস্ট ২০২৬
                  </span>
                  <span className="rounded-lg bg-white/90 px-2.5 py-1 border border-emerald-600/20">
                    ⏰ রাত ৯টা
                  </span>
                  <span className="rounded-lg bg-white/90 px-2.5 py-1 border border-emerald-600/20">
                    💻 Google Meet
                  </span>
                  <span className="rounded-lg bg-emerald-700 text-white px-2.5 py-1">
                    Free Live Workshop
                  </span>
                </div>

                {/* Registration ID & Confirmation target */}
                <div className="mt-4 inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-xl border border-emerald-700/25 bg-white/95 px-4 py-2.5 shadow-2xs">
                  <span className="text-xs font-medium text-brand-navy/70">
                    Registration ID:
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-emerald-950 bg-emerald-500/15 px-2.5 py-0.5 rounded-md">
                    {state.registrationCode || state.submittedData?.registrationCode || "WS26-CONFIRMED"}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-emerald-950/80 leading-relaxed max-w-md mx-auto">
                  Workshop-এর joining information এবং প্রয়োজনীয় reminder আপনার দেওয়া যোগাযোগের মাধ্যমে জানানো হবে।
                </p>

                {/* Google Calendar Add Button */}
                <div className="mt-4 flex justify-center">
                  <a
                    href={state.googleCalendarUrl || "https://calendar.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clicky inline-flex items-center gap-2 rounded-xl border border-brand-navy/20 bg-white px-4 py-2 text-xs font-bold text-brand-navy shadow-xs hover:bg-brand-cream/60 transition-colors"
                  >
                    <span>📅 Google Calendar-এ যুক্ত করুন</span>
                  </a>
                </div>

                {/* Mandatory WhatsApp Community — clean card matching screenshot */}
                <div className="mt-6 text-left">
                  {/* MANDATORY badge */}
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1 rounded-sm bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      ⚠ MANDATORY
                    </span>
                  </div>

                  {/* Card: entire row is a clickable link */}
                  <a
                    href={workshopConfig.whatsappCommunityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-brand-navy/15 bg-white px-4 py-3.5 shadow-xs hover:shadow-sm transition-shadow"
                  >
                    {/* WhatsApp icon bubble */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15">
                      <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-bold text-brand-navy leading-snug">
                        Join WhatsApp Community
                      </p>
                      <p className="mt-0.5 text-xs text-brand-navy/60">
                        লিংক, শিডিউল ও ম্যাটেরিয়ালস পেতে
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            ) : (
              <form action={handleFormSubmit} className="mt-8 space-y-5">
                {/* Global Error Notice if any */}
                {state.status === "error" && state.message ? (
                  <div
                    className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/8 p-4 text-sm font-semibold text-destructive"
                    role="alert"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{state.message}</span>
                  </div>
                ) : null}

                {/* Honeypot field (hidden from screen readers & users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website-field">Website</label>
                  <input
                    id="website-field"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Field 1: Full Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-bold text-brand-navy flex items-center justify-between"
                  >
                    <span>পূর্ণ নাম <span className="text-destructive">*</span></span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-navy/45 pointer-events-none" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className="border-brand-navy/20 bg-white pl-10 h-12 text-sm sm:text-base focus-visible:ring-brand-indigo"
                    />
                  </div>
                  {state.fieldErrors?.fullName ? (
                    <p className="text-xs font-semibold text-destructive mt-1">
                      {state.fieldErrors.fullName}
                    </p>
                  ) : null}
                </div>

                {/* Field 2: Mobile Number */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="mobile"
                    className="text-sm font-bold text-brand-navy flex items-center justify-between"
                  >
                    <span>মোবাইল নম্বর <span className="text-destructive">*</span></span>
                    <span className="text-xs font-normal text-brand-navy/60">
                      (WhatsApp বা SMS এর জন্য)
                    </span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-navy/45 pointer-events-none" />
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="01XXXXXXXXX"
                      className="border-brand-navy/20 bg-white pl-10 h-12 text-sm sm:text-base font-mono focus-visible:ring-brand-indigo"
                    />
                  </div>
                  {state.fieldErrors?.mobile ? (
                    <p className="text-xs font-semibold text-destructive mt-1">
                      {state.fieldErrors.mobile}
                    </p>
                  ) : null}
                </div>

                {/* Field 3: Email Address */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-bold text-brand-navy"
                  >
                    ইমেইল অ্যাড্রেস <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-navy/45 pointer-events-none" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@example.com"
                      className="border-brand-navy/20 bg-white pl-10 h-12 text-sm sm:text-base focus-visible:ring-brand-indigo"
                    />
                  </div>
                  {state.fieldErrors?.email ? (
                    <p className="text-xs font-semibold text-destructive mt-1">
                      {state.fieldErrors.email}
                    </p>
                  ) : null}
                </div>

                {/* Field 4: Profession / Designation */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="profession"
                    className="text-sm font-bold text-brand-navy"
                  >
                    পেশা / পদবি <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-navy/45 pointer-events-none" />
                    <Input
                      id="profession"
                      name="profession"
                      type="text"
                      required
                      placeholder="যেমন: চাকরিজীবী, ব্যবসায়ী, Accountant"
                      className="border-brand-navy/20 bg-white pl-10 h-12 text-sm sm:text-base focus-visible:ring-brand-indigo"
                    />
                  </div>
                  {state.fieldErrors?.profession ? (
                    <p className="text-xs font-semibold text-destructive mt-1">
                      {state.fieldErrors.profession}
                    </p>
                  ) : null}
                </div>

                {/* Field 5: Tracking / Workshop Intent Dropdown */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="workshopIntent"
                    className="text-sm font-bold text-brand-navy"
                  >
                    এই Workshop-এ অংশ নেওয়ার মূল উদ্দেশ্য কী? <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="workshopIntent"
                      name="workshopIntent"
                      required
                      defaultValue=""
                      className="flex h-12 w-full rounded-md border border-brand-navy/20 bg-white px-3.5 py-2 text-sm sm:text-base text-brand-navy shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2"
                    >
                      <option value="" disabled>
                        একটি অপশন নির্বাচন করুন
                      </option>
                      {workshopIntentOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {state.fieldErrors?.workshopIntent ? (
                    <p className="text-xs font-semibold text-destructive mt-1">
                      {state.fieldErrors.workshopIntent}
                    </p>
                  ) : null}
                </div>

                {/* Submit Button with Loading & Protection */}
                <div className="pt-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={pending}
                    className="clicky h-13 w-full rounded-2xl bg-brand-navy text-white text-base font-bold shadow-md shadow-brand-navy/25 hover:bg-brand-navy/90"
                  >
                    {pending ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                        <span>রেজিস্ট্রেশন হচ্ছে...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>রেজিস্ট্রেশন করুন</span>
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </div>

                {/* Microcopy & Privacy Guarantee */}
                <div className="pt-2 text-center space-y-1">
                  <p className="flex items-center justify-center gap-1.5 text-xs text-brand-navy/70">
                    <Lock className="h-3.5 w-3.5 text-emerald-700" />
                    <span>কোনো পাসওয়ার্ড প্রয়োজন নেই — শুধু আপনার তথ্য দিন।</span>
                  </p>
                  <p className="text-[11px] text-brand-navy/55">
                    আপনার তথ্য শুধুমাত্র Workshop communication ও Associates Academy-এর relevant updates-এর জন্য ব্যবহার করা হবে।
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
