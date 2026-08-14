"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ManualSyncButton() {
  const [pending, setPending] = useState(false);
  async function sync() {
    setPending(true);
    try {
      const response = await fetch("/api/admin/integrations/sync", {
        method: "POST",
      });
      const result = (await response.json()) as {
        results?: Record<string, { connected: boolean }>;
      };
      if (!response.ok) throw new Error("sync_failed");
      const connected = Object.values(result.results ?? {}).filter(
        (item) => item.connected,
      ).length;
      toast.success(
        connected
          ? `${connected} integration synced`
          : "Sync finished; credentials are not connected yet",
      );
    } catch {
      toast.error("Integration sync could not complete");
    } finally {
      setPending(false);
    }
  }
  return (
    <Button onClick={sync} disabled={pending}>
      <RefreshCcw className={pending ? "animate-spin" : ""} />
      {pending ? "Syncing…" : "Sync now"}
    </Button>
  );
}
