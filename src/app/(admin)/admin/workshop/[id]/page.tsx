import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient, createPublicServerClient } from "@/lib/supabase/server";
import { WorkshopKpiCards } from "@/components/admin/workshop/workshop-kpi-cards";
import {
  WorkshopAttributionTable,
  type AttributionRow,
  type AudienceSummary,
} from "@/components/admin/workshop/workshop-attribution-table";
import { WorkshopParticipantTable } from "@/components/admin/workshop/workshop-participant-table";
import { WorkshopHeaderActions } from "@/components/admin/workshop/workshop-header-actions";
import type { ParticipantRecord } from "@/components/admin/workshop/workshop-participant-drawer";
import type { WorkshopRecord } from "@/components/admin/workshop/workshop-settings-modal";

export const revalidate = 0; // Fresh admin data

interface AdminWorkshopDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminWorkshopDetailPage({
  params,
}: AdminWorkshopDetailPageProps) {
  const context = await requireAdmin();
  const supabase = context.supabase || createAdminClient() || createPublicServerClient();
  const resolvedParams = await params;
  const rawId = resolvedParams.id;
  const isNumeric = /^\d+$/.test(rawId);

  let workshop: WorkshopRecord | null = null;
  let participants: ParticipantRecord[] = [];

  if (supabase) {
    // 1. Fetch workshop record
    const query = supabase.from("workshops").select("*");
    const { data: wsData } = isNumeric
      ? await query.eq("id", Number(rawId)).maybeSingle()
      : await query.eq("slug", rawId).maybeSingle();

    if (wsData) {
      workshop = wsData as WorkshopRecord;

      // 2. Fetch all participants for this workshop
      const { data: regData } = await supabase
        .from("workshop_registrations_v2")
        .select("*")
        .eq("workshop_id", workshop.id)
        .order("registered_at", { ascending: false });

      participants = (regData || []) as ParticipantRecord[];
    }
  }

  // Fallback demo row if local development mode
  if (!workshop) {
    if (rawId === "1" || rawId === "paper-return-to-e-return-2026-08-26" || !context.supabase) {
      workshop = {
        id: 1,
        slug: "paper-return-to-e-return-2026-08-26",
        title:
          "Paper Return থেকে NBR E-Return — Complete Return Preparation বুঝুন হাতে-কলমে",
        short_title: "Paper Return to NBR E-Return Live Workshop",
        description:
          "একটি practical example-এর মাধ্যমে Documents থেকে Final Submission পর্যন্ত পুরো Return Preparation Process বুঝুন।",
        starts_at: "2026-08-26T21:00:00+06:00",
        ends_at: "2026-08-26T22:30:00+06:00",
        platform: "Google Meet",
        meet_url: "https://meet.google.com/private-session",
        status: "registration_open",
        registration_enabled: true,
        max_participants: null,
        course_cta_url: "/courses/income-tax",
      };
    } else {
      notFound();
    }
  }

  // 3. Compute KPI Metrics
  const totalRegistrations = participants.length;
  const taxpayerAudienceCount = participants.filter(
    (p) =>
      p.utm_audience === "taxpayer" ||
      p.intent === "own-return-do" ||
      p.intent === "own-return-understand",
  ).length;

  const professionalAudienceCount = participants.filter(
    (p) =>
      p.utm_audience === "professional" ||
      p.intent === "tax-profession" ||
      p.intent === "accounts-finance-profession" ||
      p.intent === "tax-practice-start",
  ).length;

  const attendedCount = participants.filter((p) => p.attendance_status === "attended").length;
  const absentCount = participants.filter((p) => p.attendance_status === "absent").length;
  const unknownAttendanceCount = participants.filter(
    (p) => p.attendance_status === "unknown",
  ).length;
  const courseEnrolledCount = participants.filter(
    (p) => p.course_conversion_status === "enrolled",
  ).length;
  const courseInterestedCount = participants.filter(
    (p) => p.course_conversion_status === "interested",
  ).length;

  const conversionRate =
    totalRegistrations > 0
      ? Math.round((courseEnrolledCount / totalRegistrations) * 100)
      : 0;

  const attendanceRate =
    totalRegistrations > 0
      ? Math.round((attendedCount / totalRegistrations) * 100)
      : 0;

  const stats = {
    totalRegistrations,
    taxpayerAudienceCount,
    professionalAudienceCount,
    attendedCount,
    absentCount,
    unknownAttendanceCount,
    courseEnrolledCount,
    courseInterestedCount,
    conversionRate,
    attendanceRate,
  };

  // 4. Compute Audience Strategies Breakdown
  const taxpayerAttended = participants.filter(
    (p) =>
      (p.utm_audience === "taxpayer" ||
        p.intent === "own-return-do" ||
        p.intent === "own-return-understand") &&
      p.attendance_status === "attended",
  ).length;

  const taxpayerEnrolled = participants.filter(
    (p) =>
      (p.utm_audience === "taxpayer" ||
        p.intent === "own-return-do" ||
        p.intent === "own-return-understand") &&
      p.course_conversion_status === "enrolled",
  ).length;

  const profAttended = participants.filter(
    (p) =>
      (p.utm_audience === "professional" ||
        p.intent === "tax-profession" ||
        p.intent === "accounts-finance-profession" ||
        p.intent === "tax-practice-start") &&
      p.attendance_status === "attended",
  ).length;

  const profEnrolled = participants.filter(
    (p) =>
      (p.utm_audience === "professional" ||
        p.intent === "tax-profession" ||
        p.intent === "accounts-finance-profession" ||
        p.intent === "tax-practice-start") &&
      p.course_conversion_status === "enrolled",
  ).length;

  const directCount = participants.filter(
    (p) => !p.utm_audience && !p.utm_source,
  ).length;
  const directAttended = participants.filter(
    (p) => !p.utm_audience && !p.utm_source && p.attendance_status === "attended",
  ).length;
  const directEnrolled = participants.filter(
    (p) =>
      !p.utm_audience &&
      !p.utm_source &&
      p.course_conversion_status === "enrolled",
  ).length;

  const audienceSummaries: AudienceSummary[] = [
    {
      audience: "taxpayer",
      label: "General Taxpayer Ad Group ($6)",
      strategyNote: "Targeted to individuals filing their personal returns",
      count: taxpayerAudienceCount,
      percentage:
        totalRegistrations > 0
          ? Math.round((taxpayerAudienceCount / totalRegistrations) * 100)
          : 0,
      attended: taxpayerAttended,
      enrolled: taxpayerEnrolled,
    },
    {
      audience: "professional",
      label: "Tax Professional Ad Group ($4)",
      strategyNote: "Targeted to Accountants, ITPs, and Lawyers",
      count: professionalAudienceCount,
      percentage:
        totalRegistrations > 0
          ? Math.round((professionalAudienceCount / totalRegistrations) * 100)
          : 0,
      attended: profAttended,
      enrolled: profEnrolled,
    },
    {
      audience: "direct",
      label: "Organic & Direct Traffic",
      strategyNote: "Website visitors & direct links",
      count: directCount,
      percentage:
        totalRegistrations > 0
          ? Math.round((directCount / totalRegistrations) * 100)
          : 0,
      attended: directAttended,
      enrolled: directEnrolled,
    },
  ];

  // 5. Compute Grouped UTM Attribution Rows
  const attributionMap = new Map<string, AttributionRow>();

  for (const p of participants) {
    const key = `${p.utm_source || "direct"}_${p.utm_medium || "none"}_${p.utm_campaign || "none"}_${p.utm_audience || "none"}`;
    if (!attributionMap.has(key)) {
      attributionMap.set(key, {
        source: p.utm_source || "direct",
        medium: p.utm_medium || "none",
        campaign: p.utm_campaign || "—",
        content: p.utm_content || "—",
        audience: p.utm_audience || "Organic",
        registrations: 0,
        attended: 0,
        enrolled: 0,
      });
    }
    const item = attributionMap.get(key)!;
    item.registrations += 1;
    if (p.attendance_status === "attended") item.attended += 1;
    if (p.course_conversion_status === "enrolled") item.enrolled += 1;
  }

  const attributionRows = Array.from(attributionMap.values()).sort(
    (a, b) => b.registrations - a.registrations,
  );

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return "২৬ আগস্ট ২০২৬, রাত ৯টা";
    try {
      return new Intl.DateTimeFormat("bn-BD", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Dhaka",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <Link
            href="/admin/workshop"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy/60 hover:text-brand-navy mb-1"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>All Workshops</span>
          </Link>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge
              variant="outline"
              className={
                workshop.registration_enabled
                  ? "bg-emerald-600/15 text-emerald-900 border-emerald-600/30 font-bold"
                  : "bg-amber-500/10 text-amber-900 border-amber-500/30"
              }
            >
              {workshop.registration_enabled
                ? "● Registration Active"
                : "Registration Closed"}
            </Badge>
            <span className="text-xs text-brand-navy/60 font-mono">
              /{workshop.slug}
            </span>
            <span className="text-xs text-brand-navy/60">• {workshop.platform}</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy leading-tight max-w-4xl">
            {workshop.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-brand-navy/70 pt-0.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-brand-gold" />
              <span>{formatDate(workshop.starts_at)}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand-indigo" />
              <span>Platform: {workshop.platform}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons (Copy Meet link, Edit, Open public page) */}
        <WorkshopHeaderActions workshop={workshop} />
      </div>

      {/* KPI Stats Cards */}
      <WorkshopKpiCards stats={stats} />

      {/* Meta Campaign Attribution Matrix */}
      <WorkshopAttributionTable
        attributionRows={attributionRows}
        audienceSummaries={audienceSummaries}
      />

      {/* Participant Management Data Table */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy">
            Workshop Participants &amp; Registrations
          </h2>
          <span className="text-xs text-brand-navy/60 font-medium">
            Live database records
          </span>
        </div>

        <WorkshopParticipantTable
          initialParticipants={participants}
          workshopTitle={workshop.title}
        />
      </div>
    </div>
  );
}
