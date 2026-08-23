"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Target, BarChart2 } from "lucide-react";

export type AttributionRow = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  audience: string;
  registrations: number;
  attended: number;
  enrolled: number;
};

export type AudienceSummary = {
  audience: string;
  label: string;
  strategyNote: string;
  count: number;
  percentage: number;
  attended: number;
  enrolled: number;
};

export function WorkshopAttributionTable({
  attributionRows,
  audienceSummaries,
}: {
  attributionRows: AttributionRow[];
  audienceSummaries: AudienceSummary[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Meta Ad Campaign Strategy Comparison ($6 Taxpayer vs $4 Professional) */}
      <Card className="border-brand-navy/10 bg-white/95 shadow-xs lg:col-span-1">
        <CardHeader className="p-4 sm:p-5 border-b border-brand-navy/10">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="font-heading text-lg font-bold text-brand-navy flex items-center gap-2">
              <Target className="h-4 w-4 text-brand-gold" />
              Meta Audience Strategy
            </CardTitle>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              Paid vs Organic
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 space-y-4">
          {audienceSummaries.map((summary) => (
            <div
              key={summary.audience}
              className="rounded-xl border border-brand-navy/10 bg-[#faf7f2] p-3.5 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                    {summary.label}
                  </span>
                  <p className="text-[11px] text-brand-navy/65">
                    {summary.strategyNote}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-heading font-extrabold text-lg text-brand-navy">
                    {summary.count.toLocaleString("bn-BD")}
                  </span>
                  <p className="text-[11px] font-semibold text-brand-indigo">
                    {summary.percentage}% of total
                  </p>
                </div>
              </div>

              {/* Attendance & Enrollment for this audience */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs border-t border-brand-navy/10">
                <div>
                  <span className="text-brand-navy/60 text-[11px]">Attended: </span>
                  <strong className="text-emerald-800">{summary.attended}</strong>
                </div>
                <div>
                  <span className="text-brand-navy/60 text-[11px]">Course Enrolled: </span>
                  <strong className="text-purple-800">{summary.enrolled}</strong>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 2. Detailed Attribution Matrix Table */}
      <Card className="border-brand-navy/10 bg-white/95 shadow-xs lg:col-span-2">
        <CardHeader className="p-4 sm:p-5 border-b border-brand-navy/10 flex flex-row items-center justify-between">
          <CardTitle className="font-heading text-lg font-bold text-brand-navy flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-brand-indigo" />
            Channel &amp; Campaign Attribution
          </CardTitle>
          <div className="flex items-center gap-1.5 text-xs text-brand-navy/60">
            <Megaphone className="h-3.5 w-3.5" />
            <span>UTM Breakdown</span>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {attributionRows.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f5efe6] text-brand-navy border-b border-brand-navy/10">
                <tr>
                  <th className="px-4 py-3 font-bold">Source / Medium</th>
                  <th className="px-4 py-3 font-bold">Audience</th>
                  <th className="px-4 py-3 font-bold">Campaign</th>
                  <th className="px-4 py-3 font-bold text-right">Registrations</th>
                  <th className="px-4 py-3 font-bold text-right">Attended</th>
                  <th className="px-4 py-3 font-bold text-right">Enrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5">
                {attributionRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-brand-navy">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{row.source || "direct"}</span>
                        <span className="text-brand-navy/50">/ {row.medium || "none"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {row.audience === "taxpayer" ? (
                        <span className="inline-flex rounded-sm bg-emerald-600/15 px-2 py-0.5 text-[10px] font-bold text-emerald-900 uppercase">
                          Taxpayer ($6)
                        </span>
                      ) : row.audience === "professional" ? (
                        <span className="inline-flex rounded-sm bg-indigo-600/15 px-2 py-0.5 text-[10px] font-bold text-indigo-900 uppercase">
                          Professional ($4)
                        </span>
                      ) : (
                        <span className="inline-flex rounded-sm bg-brand-navy/10 px-2 py-0.5 text-[10px] font-bold text-brand-navy/80 uppercase">
                          {row.audience || "Organic / Direct"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-brand-navy/70 max-w-[140px] truncate">
                      {row.campaign || "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-brand-navy">
                      {row.registrations.toLocaleString("bn-BD")}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-800">
                      {row.attended.toLocaleString("bn-BD")}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-purple-800">
                      {row.enrolled.toLocaleString("bn-BD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-sm text-brand-navy/60">
              এখনও কোনো Attribution ডেটা নেই। নতুন ক্যাম্পেইন ভিজিট শুরু হলে এখানে স্বয়ংক্রিয়ভাবে দেখাবে।
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
