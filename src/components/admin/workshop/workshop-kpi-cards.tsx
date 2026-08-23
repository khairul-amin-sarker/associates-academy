"use client";

import React from "react";
import {
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  Award,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type WorkshopKpiStats = {
  totalRegistrations: number;
  taxpayerAudienceCount: number;
  professionalAudienceCount: number;
  attendedCount: number;
  absentCount: number;
  unknownAttendanceCount: number;
  courseEnrolledCount: number;
  courseInterestedCount: number;
  conversionRate: number;
  attendanceRate: number;
};

export function WorkshopKpiCards({ stats }: { stats: WorkshopKpiStats }) {
  const cards = [
    {
      title: "Total Registrations",
      value: stats.totalRegistrations,
      subtext: "সর্বমোট লাইভ রেজিস্ট্রেশন",
      icon: Users,
      color: "text-brand-navy",
      bgColor: "bg-brand-navy/10",
    },
    {
      title: "General Taxpayer",
      value: stats.taxpayerAudienceCount,
      subtext: "নিজের রিটার্ন করতে আগ্রহী",
      icon: GraduationCap,
      color: "text-emerald-700",
      bgColor: "bg-emerald-600/10",
      pill: `$6 Ad Audience (${stats.totalRegistrations > 0 ? Math.round((stats.taxpayerAudienceCount / stats.totalRegistrations) * 100) : 0}%)`,
    },
    {
      title: "Tax Professionals",
      value: stats.professionalAudienceCount,
      subtext: "Accounts & Tax Practitioners",
      icon: Briefcase,
      color: "text-brand-indigo",
      bgColor: "bg-brand-indigo/10",
      pill: `$4 Ad Audience (${stats.totalRegistrations > 0 ? Math.round((stats.professionalAudienceCount / stats.totalRegistrations) * 100) : 0}%)`,
    },
    {
      title: "Workshop Attendance",
      value: stats.attendedCount,
      subtext: `${stats.absentCount} absent • ${stats.unknownAttendanceCount} unconfirmed`,
      icon: UserCheck,
      color: "text-amber-700",
      bgColor: "bg-amber-600/10",
      pill: `${stats.attendanceRate}% Attendance Rate`,
    },
    {
      title: "Course Enrolled",
      value: stats.courseEnrolledCount,
      subtext: `${stats.courseInterestedCount} আগ্রহী learners`,
      icon: Award,
      color: "text-purple-700",
      bgColor: "bg-purple-600/10",
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      subtext: "Workshop → Course conversion",
      icon: TrendingUp,
      color: "text-emerald-800",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="border-brand-navy/10 bg-white/95 shadow-xs hover:shadow-sm transition-all"
          >
            <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-navy/60">
                  {card.title}
                </p>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.bgColor}`}
                >
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </div>

              <div className="mt-3">
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-navy">
                  {typeof card.value === "number"
                    ? card.value.toLocaleString("bn-BD")
                    : card.value}
                </p>
                <p className="text-xs text-brand-navy/65 mt-0.5 truncate">
                  {card.subtext}
                </p>
              </div>

              {card.pill ? (
                <div className="mt-2.5 pt-2 border-t border-brand-navy/5">
                  <span className="text-[11px] font-semibold text-brand-navy/80 bg-brand-cream/80 px-2 py-0.5 rounded-md">
                    {card.pill}
                  </span>
                </div>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
