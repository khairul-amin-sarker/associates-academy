"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Copy,
  ExternalLink,
  Settings,
  Lock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  WorkshopSettingsModal,
  type WorkshopRecord,
} from "./workshop-settings-modal";
import { toast } from "sonner";

export function WorkshopHeaderActions({
  workshop,
}: {
  workshop: WorkshopRecord;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyRegistrationUrl = () => {
    if (typeof window !== "undefined") {
      const publicUrl = `${window.location.origin}/workshop`;
      navigator.clipboard.writeText(publicUrl);
      setCopiedUrl(true);
      toast.success("Public registration URL copied to clipboard!");
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleCopyMeetLink = () => {
    if (workshop.meet_url) {
      navigator.clipboard.writeText(workshop.meet_url);
      setCopiedMeet(true);
      toast.success("Private Google Meet link copied to clipboard!");
      setTimeout(() => setCopiedMeet(false), 2000);
    } else {
      toast.error("No Google Meet link configured for this workshop.");
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap shrink-0">
      {/* Copy Public Link */}
      <Button
        size="sm"
        variant="outline"
        onClick={handleCopyRegistrationUrl}
        className="h-9 text-xs font-semibold border-brand-navy/20 bg-white text-brand-navy hover:bg-brand-cream/60"
      >
        {copiedUrl ? (
          <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
        ) : (
          <Copy className="h-3.5 w-3.5 mr-1 text-brand-navy/60" />
        )}
        <span>Copy Reg Page</span>
      </Button>

      {/* Copy Private Meet Link */}
      <Button
        size="sm"
        variant="outline"
        onClick={handleCopyMeetLink}
        className="h-9 text-xs font-semibold border-amber-600/30 bg-amber-500/10 text-amber-950 hover:bg-amber-500/20"
      >
        <Lock className="h-3.5 w-3.5 mr-1 text-amber-700" />
        {copiedMeet ? "Meet Link Copied!" : "Copy Meet Link"}
      </Button>

      {/* Edit Workshop Settings */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => setSettingsOpen(true)}
        className="h-9 text-xs font-semibold border-brand-navy/20 bg-white text-brand-navy hover:bg-brand-cream/60"
      >
        <Settings className="h-3.5 w-3.5 mr-1 text-brand-gold" />
        <span>Settings</span>
      </Button>

      {/* Open Public Page */}
      <Button
        asChild
        size="sm"
        className="h-9 text-xs font-bold bg-brand-navy hover:bg-brand-navy/90 text-white"
      >
        <Link href="/workshop" target="_blank">
          <span>Open Public Page</span>
          <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </Link>
      </Button>

      <WorkshopSettingsModal
        workshop={workshop}
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
}
