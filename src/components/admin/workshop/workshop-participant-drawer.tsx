"use client";

import React, { useState, useTransition } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  User,
  Phone,
  Mail,
  Briefcase,
  Tag,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Loader2,
} from "lucide-react";
import {
  updateAttendanceAction,
  updateLeadStatusAction,
  updateCourseStatusAction,
} from "@/app/(admin)/admin/workshop/actions";
import { toast } from "sonner";

export type ParticipantRecord = {
  id: number;
  registration_code: string;
  workshop_id: number;
  full_name: string;
  mobile: string;
  normalized_mobile: string;
  email: string;
  profession: string;
  intent: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  utm_audience: string | null;
  referrer: string | null;
  landing_page_url: string | null;
  registration_status: "registered" | "confirmed" | "cancelled";
  confirmation_status: "pending" | "sent" | "failed";
  attendance_status: "unknown" | "attended" | "absent";
  lead_status: "new" | "interested" | "follow_up" | "converted";
  course_conversion_status: "not_enrolled" | "interested" | "enrolled";
  registered_at: string;
  confirmed_at: string | null;
  attended_at: string | null;
  converted_at: string | null;
};

const intentLabels: Record<string, string> = {
  "own-return-do": "নিজের Return নিজে করতে চাই",
  "own-return-understand": "নিজের Return সম্পর্কে পরিষ্কার ধারণা নিতে চাই",
  "tax-profession": "Income Tax Profession-এ কাজ করি",
  "accounts-finance-profession": "Accounts / Finance Profession-এ কাজ করি",
  "tax-practice-start": "Tax Practice শুরু করতে চাই",
  "other": "অন্যান্য",
};

function ParticipantDrawerBody({
  participant,
  onParticipantUpdated,
}: {
  participant: ParticipantRecord;
  onParticipantUpdated?: (updated: ParticipantRecord) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [attendance, setAttendance] = useState(participant.attendance_status);
  const [leadStatus, setLeadStatus] = useState(participant.lead_status);
  const [courseStatus, setCourseStatus] = useState(participant.course_conversion_status);

  const handleAttendanceChange = (newStatus: "unknown" | "attended" | "absent") => {
    setAttendance(newStatus);
    startTransition(async () => {
      const res = await updateAttendanceAction(participant.id, newStatus);
      if (res.success) {
        toast.success(res.message);
        onParticipantUpdated?.({
          ...participant,
          attendance_status: newStatus,
          attended_at: newStatus === "attended" ? new Date().toISOString() : null,
        });
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleLeadStatusChange = (newStatus: "new" | "interested" | "follow_up" | "converted") => {
    setLeadStatus(newStatus);
    startTransition(async () => {
      const res = await updateLeadStatusAction(participant.id, newStatus);
      if (res.success) {
        toast.success(res.message);
        onParticipantUpdated?.({
          ...participant,
          lead_status: newStatus,
        });
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleCourseStatusChange = (newStatus: "not_enrolled" | "interested" | "enrolled") => {
    setCourseStatus(newStatus);
    startTransition(async () => {
      const res = await updateCourseStatusAction(participant.id, newStatus);
      if (res.success) {
        toast.success(res.message);
        onParticipantUpdated?.({
          ...participant,
          course_conversion_status: newStatus,
          converted_at: newStatus === "enrolled" ? new Date().toISOString() : null,
          lead_status: newStatus === "enrolled" ? "converted" : participant.lead_status,
        });
      } else {
        toast.error(res.message);
      }
    });
  };

  const formatDate = (val?: string | null) => {
    if (!val) return "—";
    try {
      return new Intl.DateTimeFormat("bn-BD", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Dhaka",
      }).format(new Date(val));
    } catch {
      return val;
    }
  };

  return (
    <>
      <SheetHeader className="pb-4 border-b border-brand-navy/10">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold text-emerald-950 bg-emerald-500/15 border border-emerald-600/25 px-2.5 py-1 rounded-md">
            {participant.registration_code}
          </span>
          <Badge
            variant="outline"
            className={
              attendance === "attended"
                ? "bg-emerald-600/10 text-emerald-800 border-emerald-600/30"
                : attendance === "absent"
                  ? "bg-red-600/10 text-red-800 border-red-600/30"
                  : "bg-brand-navy/5 text-brand-navy/70 border-brand-navy/15"
            }
          >
            {attendance === "attended"
              ? "✓ Attended"
              : attendance === "absent"
                ? "✗ Absent"
                : "Attendance: Unknown"}
          </Badge>
        </div>
        <SheetTitle className="font-heading text-xl font-bold text-brand-navy mt-2 text-left">
          {participant.full_name}
        </SheetTitle>
        <p className="text-xs text-brand-navy/60 text-left">
          Registered on {formatDate(participant.registered_at)}
        </p>
      </SheetHeader>

      <div className="mt-6 space-y-6 text-sm">
        {/* 1. Contact Information */}
        <section className="space-y-3 rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy/70 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-brand-indigo" />
            Contact Details
          </h4>
          <dl className="grid grid-cols-1 gap-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-brand-navy/5 pb-2">
              <dt className="text-brand-navy/60 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Mobile:
              </dt>
              <dd className="font-mono font-bold text-brand-navy select-all">
                <a href={`tel:${participant.mobile}`} className="hover:underline text-brand-indigo">
                  {participant.mobile}
                </a>
              </dd>
            </div>

            <div className="flex items-center justify-between border-b border-brand-navy/5 pb-2">
              <dt className="text-brand-navy/60 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> Email:
              </dt>
              <dd className="font-medium text-brand-navy select-all truncate max-w-[220px]">
                <a href={`mailto:${participant.email}`} className="hover:underline text-brand-indigo">
                  {participant.email}
                </a>
              </dd>
            </div>

            <div className="flex items-center justify-between border-b border-brand-navy/5 pb-2">
              <dt className="text-brand-navy/60 flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" /> Profession:
              </dt>
              <dd className="font-medium text-brand-navy text-right">
                {participant.profession}
              </dd>
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <dt className="text-brand-navy/60">Workshop Intent:</dt>
              <dd className="font-semibold text-brand-navy text-xs bg-brand-cream/60 p-2 rounded-lg border border-brand-navy/10">
                {intentLabels[participant.intent] || participant.intent}
              </dd>
            </div>
          </dl>
        </section>

        {/* 2. Manual Controls (Attendance, Lead Status, Course Status) */}
        <section className="space-y-4 rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy/70">
              Status &amp; Controls
            </h4>
            {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-indigo" />}
          </div>

          {/* Attendance Toggle */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-brand-navy">
              Live Session Attendance
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                size="sm"
                variant={attendance === "attended" ? "default" : "outline"}
                onClick={() => handleAttendanceChange("attended")}
                disabled={isPending}
                className={`h-9 text-xs font-semibold ${
                  attendance === "attended"
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                    : "border-brand-navy/15 text-brand-navy hover:bg-emerald-50"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Attended
              </Button>
              <Button
                type="button"
                size="sm"
                variant={attendance === "absent" ? "default" : "outline"}
                onClick={() => handleAttendanceChange("absent")}
                disabled={isPending}
                className={`h-9 text-xs font-semibold ${
                  attendance === "absent"
                    ? "bg-red-700 hover:bg-red-800 text-white"
                    : "border-brand-navy/15 text-brand-navy hover:bg-red-50"
                }`}
              >
                <XCircle className="h-3.5 w-3.5 mr-1" />
                Absent
              </Button>
              <Button
                type="button"
                size="sm"
                variant={attendance === "unknown" ? "default" : "outline"}
                onClick={() => handleAttendanceChange("unknown")}
                disabled={isPending}
                className={`h-9 text-xs font-semibold ${
                  attendance === "unknown"
                    ? "bg-brand-navy text-white"
                    : "border-brand-navy/15 text-brand-navy"
                }`}
              >
                Unknown
              </Button>
            </div>
          </div>

          {/* Lead Status */}
          <div className="space-y-1.5">
            <Label htmlFor="lead-select" className="text-xs font-semibold text-brand-navy">
              Lead Status
            </Label>
            <select
              id="lead-select"
              value={leadStatus}
              onChange={(e) =>
                handleLeadStatusChange(
                  e.target.value as "new" | "interested" | "follow_up" | "converted",
                )
              }
              disabled={isPending}
              className="w-full h-9 rounded-md border border-brand-navy/20 bg-white px-3 py-1 text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            >
              <option value="new">New Lead</option>
              <option value="interested">Interested (Lead Warm)</option>
              <option value="follow_up">Needs Follow-up</option>
              <option value="converted">Converted to Customer</option>
            </select>
          </div>

          {/* Course Conversion Status */}
          <div className="space-y-1.5">
            <Label htmlFor="course-select" className="text-xs font-semibold text-brand-navy">
              Main Course Conversion
            </Label>
            <select
              id="course-select"
              value={courseStatus}
              onChange={(e) =>
                handleCourseStatusChange(
                  e.target.value as "not_enrolled" | "interested" | "enrolled",
                )
              }
              disabled={isPending}
              className="w-full h-9 rounded-md border border-brand-navy/20 bg-white px-3 py-1 text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            >
              <option value="not_enrolled">Not Enrolled</option>
              <option value="interested">Interested / In Cart</option>
              <option value="enrolled">Enrolled in Full Course (৳)</option>
            </select>
          </div>
        </section>

        {/* 3. Acquisition & Attribution Details */}
        <section className="space-y-3 rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy/70 flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-brand-gold" />
            Marketing &amp; Attribution Metadata
          </h4>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div className="border-b border-brand-navy/5 pb-1.5">
              <dt className="text-brand-navy/50 text-[10px]">Audience:</dt>
              <dd className="font-semibold text-brand-navy">
                {participant.utm_audience || "—"}
              </dd>
            </div>
            <div className="border-b border-brand-navy/5 pb-1.5">
              <dt className="text-brand-navy/50 text-[10px]">Source / Medium:</dt>
              <dd className="font-semibold text-brand-navy">
                {participant.utm_source || "direct"} / {participant.utm_medium || "none"}
              </dd>
            </div>
            <div className="border-b border-brand-navy/5 pb-1.5">
              <dt className="text-brand-navy/50 text-[10px]">Campaign:</dt>
              <dd className="font-semibold text-brand-navy truncate">
                {participant.utm_campaign || "—"}
              </dd>
            </div>
            <div className="border-b border-brand-navy/5 pb-1.5">
              <dt className="text-brand-navy/50 text-[10px]">Content / Ad:</dt>
              <dd className="font-semibold text-brand-navy truncate">
                {participant.utm_content || "—"}
              </dd>
            </div>
            <div className="col-span-2 pt-1">
              <dt className="text-brand-navy/50 text-[10px]">Referrer / Landing URL:</dt>
              <dd className="font-mono text-[11px] text-brand-navy/80 truncate">
                {participant.landing_page_url || participant.referrer || "—"}
              </dd>
            </div>
          </dl>
        </section>

        {/* 4. Communication Timeline (Prepared architecture) */}
        <section className="space-y-3 rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy/70 flex items-center gap-1.5">
            <Send className="h-3.5 w-3.5 text-brand-indigo" />
            Communication Timeline
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px]">
                ✓
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Website Registration Recorded</p>
                <p className="text-[11px] text-brand-navy/50">{formatDate(participant.registered_at)}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-navy/15 text-brand-navy text-[9px]">
                <Clock className="h-2.5 w-2.5" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">WhatsApp Community Link Provided</p>
                <p className="text-[11px] text-brand-navy/50">Success confirmation screen</p>
              </div>
            </div>

            {participant.attended_at ? (
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px]">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-brand-navy">Live Attendance Marked</p>
                  <p className="text-[11px] text-brand-navy/50">{formatDate(participant.attended_at)}</p>
                </div>
              </div>
            ) : null}

            {participant.converted_at ? (
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-[9px]">
                  ★
                </div>
                <div>
                  <p className="font-semibold text-purple-950">Enrolled in Full Course</p>
                  <p className="text-[11px] text-purple-800/70">{formatDate(participant.converted_at)}</p>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}

export function WorkshopParticipantDrawer({
  participant,
  open,
  onOpenChange,
  onParticipantUpdated,
}: {
  participant: ParticipantRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onParticipantUpdated?: (updated: ParticipantRecord) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-6 bg-[#fffdfa]">
        {participant ? (
          <ParticipantDrawerBody
            key={participant.id}
            participant={participant}
            onParticipantUpdated={onParticipantUpdated}
          />
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
