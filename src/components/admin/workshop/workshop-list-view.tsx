"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Video,
  Calendar,
  Users,
  Award,
  ExternalLink,
  Settings,
  Power,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  WorkshopSettingsModal,
  type WorkshopRecord,
} from "./workshop-settings-modal";
import { toggleWorkshopRegistrationAction } from "@/app/(admin)/admin/workshop/actions";
import { toast } from "sonner";

export type WorkshopWithStats = WorkshopRecord & {
  totalRegistrations: number;
  attendedCount: number;
  absentCount: number;
  enrolledCount: number;
  conversionRate: number;
};

export function WorkshopListView({
  workshops,
}: {
  workshops: WorkshopWithStats[];
}) {
  const [editingWorkshop, setEditingWorkshop] = useState<WorkshopRecord | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleToggleRegistration = (workshopId: number, currentEnabled: boolean) => {
    startTransition(async () => {
      const res = await toggleWorkshopRegistrationAction(workshopId, !currentEnabled);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleOpenEdit = (ws: WorkshopRecord) => {
    setEditingWorkshop(ws);
    setSettingsOpen(true);
  };

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return "Not scheduled";
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

  const getStatusBadge = (status: string, enabled: boolean) => {
    if (!enabled || status === "registration_closed") {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-900 border-amber-500/30">
          Registration Closed
        </Badge>
      );
    }
    switch (status) {
      case "registration_open":
        return (
          <Badge variant="outline" className="bg-emerald-600/15 text-emerald-900 border-emerald-600/30 font-bold">
            ● Registration Open
          </Badge>
        );
      case "live":
        return (
          <Badge variant="outline" className="bg-red-600 text-white animate-pulse">
            🔴 Live Now
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-brand-navy/10 text-brand-navy/80">
            Completed
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="bg-slate-500/10 text-slate-700">
            Draft
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-brand-navy/10 bg-white/95 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider">
                Total Workshops
              </p>
              <p className="font-heading text-3xl font-extrabold text-brand-navy mt-1">
                {workshops.length.toLocaleString("bn-BD")}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy/10 text-brand-navy">
              <Video className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-navy/10 bg-white/95 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider">
                Total Workshop Leads
              </p>
              <p className="font-heading text-3xl font-extrabold text-emerald-800 mt-1">
                {workshops
                  .reduce((sum, w) => sum + w.totalRegistrations, 0)
                  .toLocaleString("bn-BD")}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700">
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-navy/10 bg-white/95 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider">
                Course Conversions
              </p>
              <p className="font-heading text-3xl font-extrabold text-purple-800 mt-1">
                {workshops
                  .reduce((sum, w) => sum + w.enrolledCount, 0)
                  .toLocaleString("bn-BD")}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/10 text-purple-700">
              <Award className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workshop List Table / Cards */}
      <div className="space-y-4">
        {workshops.map((ws) => (
          <Card
            key={ws.id}
            className="border-brand-navy/10 bg-white/95 shadow-xs hover:shadow-md transition-all overflow-hidden"
          >
            <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: Info */}
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {getStatusBadge(ws.status, ws.registration_enabled)}
                  <span className="text-xs font-mono font-semibold text-brand-navy/60">
                    /{ws.slug}
                  </span>
                  <span className="text-xs text-brand-navy/50">• {ws.platform}</span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy leading-snug">
                  <Link
                    href={`/admin/workshop/${ws.id}`}
                    className="hover:text-brand-indigo hover:underline transition-colors"
                  >
                    {ws.title}
                  </Link>
                </h3>

                <div className="flex items-center gap-4 text-xs text-brand-navy/70 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                    <span>{formatDate(ws.starts_at)}</span>
                  </span>
                  {ws.max_participants ? (
                    <span>Capacity: {ws.max_participants} seats</span>
                  ) : (
                    <span>Capacity: Unlimited</span>
                  )}
                </div>
              </div>

              {/* Middle Column: Live Metrics */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-[#faf7f2] border border-brand-navy/10 rounded-2xl p-3.5 sm:p-4 text-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-navy/60">
                    Registrations
                  </p>
                  <p className="font-heading text-xl sm:text-2xl font-extrabold text-brand-navy mt-0.5">
                    {ws.totalRegistrations.toLocaleString("bn-BD")}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-navy/60">
                    Attended
                  </p>
                  <p className="font-heading text-xl sm:text-2xl font-extrabold text-emerald-800 mt-0.5">
                    {ws.attendedCount.toLocaleString("bn-BD")}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-navy/60">
                    Converted
                  </p>
                  <p className="font-heading text-xl sm:text-2xl font-extrabold text-purple-800 mt-0.5">
                    {ws.enrolledCount.toLocaleString("bn-BD")}
                  </p>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                <Button
                  asChild
                  size="sm"
                  className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold text-xs h-9 px-4"
                >
                  <Link href={`/admin/workshop/${ws.id}`}>
                    Manage Participants
                  </Link>
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(ws)}
                    className="border-brand-navy/20 text-brand-navy text-xs h-8 flex-1"
                  >
                    <Settings className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleRegistration(ws.id, ws.registration_enabled)}
                    disabled={isPending}
                    className={`text-xs h-8 border-brand-navy/20 ${
                      ws.registration_enabled
                        ? "text-amber-800 hover:bg-amber-50"
                        : "text-emerald-800 hover:bg-emerald-50"
                    }`}
                  >
                    <Power className="h-3 w-3 mr-1" />
                    {ws.registration_enabled ? "Close Reg" : "Open Reg"}
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-brand-navy/60 hover:text-brand-navy"
                  >
                    <Link href="/workshop" target="_blank">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {editingWorkshop && (
        <WorkshopSettingsModal
          workshop={editingWorkshop}
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
        />
      )}
    </div>
  );
}
