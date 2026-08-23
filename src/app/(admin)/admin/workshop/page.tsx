import React from "react";
import { Badge } from "@/components/ui/badge";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient, createPublicServerClient } from "@/lib/supabase/server";
import {
  WorkshopListView,
  type WorkshopWithStats,
} from "@/components/admin/workshop/workshop-list-view";

export const revalidate = 0; // Always fresh in admin

export default async function AdminWorkshopListPage() {
  const context = await requireAdmin();
  const supabase = context.supabase || createAdminClient() || createPublicServerClient();

  let workshops: WorkshopWithStats[] = [];

  if (supabase) {
    const { data: workshopRows } = await supabase
      .from("workshops")
      .select("*")
      .order("id", { ascending: true });

    if (workshopRows && workshopRows.length > 0) {
      const { data: regRows } = await supabase
        .from("workshop_registrations_v2")
        .select("workshop_id, attendance_status, course_conversion_status");

      const allRegs = regRows || [];

      workshops = workshopRows.map((w) => {
        const wsRegs = allRegs.filter((r) => r.workshop_id === w.id);
        const totalRegistrations = wsRegs.length;
        const attendedCount = wsRegs.filter((r) => r.attendance_status === "attended").length;
        const absentCount = wsRegs.filter((r) => r.attendance_status === "absent").length;
        const enrolledCount = wsRegs.filter(
          (r) => r.course_conversion_status === "enrolled",
        ).length;
        const conversionRate =
          totalRegistrations > 0
            ? Math.round((enrolledCount / totalRegistrations) * 100)
            : 0;

        return {
          id: w.id,
          slug: w.slug,
          title: w.title,
          short_title: w.short_title,
          description: w.description,
          starts_at: w.starts_at,
          ends_at: w.ends_at,
          platform: w.platform,
          meet_url: w.meet_url,
          status: w.status,
          registration_enabled: w.registration_enabled,
          max_participants: w.max_participants,
          course_cta_url: w.course_cta_url,
          totalRegistrations,
          attendedCount,
          absentCount,
          enrolledCount,
          conversionRate,
        };
      });
    }
  }

  // Fallback demo row if empty database or local dev without DB rows
  if (workshops.length === 0) {
    workshops = [
      {
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
        totalRegistrations: 0,
        attendedCount: 0,
        absentCount: 0,
        enrolledCount: 0,
        conversionRate: 0,
      },
    ];
  }

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline">ACADEMY OPERATIONS</Badge>
        <h1 className="font-heading text-brand-navy mt-3 text-3xl sm:text-4xl font-extrabold">
          Live Workshops &amp; Free Sessions
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl leading-relaxed text-sm">
          ফ্রি লাইভ ওয়ার্কশপের রেজিস্ট্রেশন, অংশগ্রহণকারী ব্যবস্থাপনা, মেটা ক্যাম্পেইন অডিয়েন্স
          অ্যাট্রিবিউশন এবং ফুল কোর্সে কনভার্সন ট্র্যাকিং।
        </p>
      </div>

      <WorkshopListView workshops={workshops} />
    </div>
  );
}
