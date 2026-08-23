"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Lock, Settings, Loader2 } from "lucide-react";
import { updateWorkshopSettingsAction } from "@/app/(admin)/admin/workshop/actions";
import { toast } from "sonner";

export type WorkshopRecord = {
  id: number;
  slug: string;
  title: string;
  short_title: string | null;
  description: string | null;
  starts_at: string | null;
  ends_at: string | null;
  platform: string;
  meet_url: string | null;
  status: "draft" | "registration_open" | "registration_closed" | "live" | "completed" | "cancelled";
  registration_enabled: boolean;
  max_participants: number | null;
  course_cta_url: string | null;
};

function SettingsFormContent({
  workshop,
  onClose,
}: {
  workshop: WorkshopRecord;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [registrationEnabled, setRegistrationEnabled] = useState(
    workshop.registration_enabled ?? true,
  );
  const [status, setStatus] = useState(workshop.status || "registration_open");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("registrationEnabled", registrationEnabled ? "true" : "false");
    formData.set("status", status);

    startTransition(async () => {
      const res = await updateWorkshopSettingsAction(workshop.id, formData);
      if (res.success) {
        toast.success(res.message);
        onClose();
      } else {
        toast.error(res.message);
      }
    });
  };

  const toInputDateTime = (isoString?: string | null) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      const tzOffset = d.getTimezoneOffset() * 60000;
      const localISOTime = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
      return localISOTime;
    } catch {
      return "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-xs">
      {/* Workshop Title */}
      <div className="space-y-1">
        <Label htmlFor="title" className="text-xs font-bold text-brand-navy">
          Workshop Title (Full)
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={workshop.title}
          required
          className="text-xs border-brand-navy/20 bg-white"
        />
      </div>

      {/* Short Title */}
      <div className="space-y-1">
        <Label htmlFor="shortTitle" className="text-xs font-bold text-brand-navy">
          Short Title (Admin &amp; Tabs)
        </Label>
        <Input
          id="shortTitle"
          name="shortTitle"
          defaultValue={workshop.short_title || ""}
          placeholder="e.g. Paper Return to NBR E-Return"
          className="text-xs border-brand-navy/20 bg-white"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <Label htmlFor="description" className="text-xs font-bold text-brand-navy">
          Description / Subtitle
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={workshop.description || ""}
          className="text-xs border-brand-navy/20 bg-white resize-none"
        />
      </div>

      {/* Status & Registration Switch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-brand-navy/10 bg-brand-cream/40 p-3.5">
        <div className="space-y-1">
          <Label htmlFor="status-select" className="text-xs font-bold text-brand-navy">
            Workshop Lifecycle Status
          </Label>
          <select
            id="status-select"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "draft"
                  | "registration_open"
                  | "registration_closed"
                  | "live"
                  | "completed"
                  | "cancelled",
              )
            }
            className="w-full h-9 rounded-md border border-brand-navy/20 bg-white px-2.5 text-xs text-brand-navy"
          >
            <option value="draft">Draft (Private)</option>
            <option value="registration_open">Registration Open</option>
            <option value="registration_closed">Registration Closed</option>
            <option value="live">Session Live Now</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex flex-col justify-center space-y-1.5">
          <span className="text-xs font-bold text-brand-navy">
            Accept New Registrations
          </span>
          <div className="flex items-center gap-2">
            <Switch
              checked={registrationEnabled}
              onCheckedChange={setRegistrationEnabled}
              id="reg-toggle"
            />
            <label htmlFor="reg-toggle" className="text-xs font-medium text-brand-navy/80 cursor-pointer">
              {registrationEnabled ? "Active (Open)" : "Disabled (Closed)"}
            </label>
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="startsAt" className="text-xs font-bold text-brand-navy">
            Starts At (Date &amp; Time)
          </Label>
          <Input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            defaultValue={toInputDateTime(workshop.starts_at)}
            className="text-xs border-brand-navy/20 bg-white font-mono"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="endsAt" className="text-xs font-bold text-brand-navy">
            Ends At (Date &amp; Time)
          </Label>
          <Input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            defaultValue={toInputDateTime(workshop.ends_at)}
            className="text-xs border-brand-navy/20 bg-white font-mono"
          />
        </div>
      </div>

      {/* Platform & Google Meet URL (Private) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="platform" className="text-xs font-bold text-brand-navy">
            Platform Name
          </Label>
          <Input
            id="platform"
            name="platform"
            defaultValue={workshop.platform || "Google Meet"}
            className="text-xs border-brand-navy/20 bg-white"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="meetUrl" className="text-xs font-bold text-brand-navy flex items-center gap-1">
            <Lock className="h-3 w-3 text-amber-700" />
            Google Meet Link (Private)
          </Label>
          <Input
            id="meetUrl"
            name="meetUrl"
            type="url"
            defaultValue={workshop.meet_url || ""}
            placeholder="https://meet.google.com/..."
            className="text-xs border-brand-navy/20 bg-white font-mono"
          />
        </div>
      </div>

      {/* Maximum Seats & Course CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="maxParticipants" className="text-xs font-bold text-brand-navy">
            Seat Limit / Max Capacity
          </Label>
          <Input
            id="maxParticipants"
            name="maxParticipants"
            type="number"
            defaultValue={workshop.max_participants || ""}
            placeholder="Leave blank for unlimited"
            className="text-xs border-brand-navy/20 bg-white font-mono"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="courseCtaUrl" className="text-xs font-bold text-brand-navy">
            Full Course Upsell Link
          </Label>
          <Input
            id="courseCtaUrl"
            name="courseCtaUrl"
            defaultValue={workshop.course_cta_url || "/courses/income-tax"}
            placeholder="/courses/..."
            className="text-xs border-brand-navy/20 bg-white"
          />
        </div>
      </div>

      <DialogFooter className="pt-3 border-t border-brand-navy/10">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isPending}
          className="text-xs border-brand-navy/20"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="text-xs font-bold bg-brand-navy hover:bg-brand-navy/90 text-white"
        >
          {isPending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
              Saving...
            </>
          ) : (
            "Save Workshop Settings"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function WorkshopSettingsModal({
  workshop,
  open,
  onOpenChange,
}: {
  workshop: WorkshopRecord;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-[#fffdfa] p-6">
        <DialogHeader className="border-b border-brand-navy/10 pb-3">
          <DialogTitle className="font-heading text-xl font-bold text-brand-navy flex items-center gap-2">
            <Settings className="h-5 w-5 text-brand-gold" />
            Workshop Settings &amp; Configuration
          </DialogTitle>
          <p className="text-xs text-brand-navy/60">
            {workshop.title} ({workshop.slug})
          </p>
        </DialogHeader>

        <SettingsFormContent
          key={workshop.id}
          workshop={workshop}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
