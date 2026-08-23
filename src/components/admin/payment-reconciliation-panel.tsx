"use client";

import { useState } from "react";
import { RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ReconciliationResult = {
  checked: number;
  states: Record<string, number>;
};

export function PaymentReconciliationPanel({
  pendingCount,
  ownerEnabled,
}: {
  pendingCount: number;
  ownerEnabled: boolean;
}) {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ReconciliationResult | null>(null);
  const [error, setError] = useState(false);

  async function reconcile() {
    setRunning(true);
    setError(false);
    try {
      const response = await fetch("/api/admin/payments/reconcile", {
        method: "POST",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("reconciliation_failed");
      setResult((await response.json()) as ReconciliationResult);
    } catch {
      setError(true);
    } finally {
      setRunning(false);
    }
  }

  const stateSummary = result
    ? Object.entries(result.states)
        .map(([state, count]) => `${state}: ${count}`)
        .join(" · ")
    : null;

  return (
    <Card className="border-brand-navy/10 overflow-hidden bg-white py-0 shadow-sm">
      <div className="bg-brand-navy px-5 py-5 text-white sm:px-6">
        <div className="flex items-start gap-3">
          <span className="bg-brand-gold/15 text-brand-gold grid h-11 w-11 shrink-0 place-items-center rounded-xl">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-brand-gold text-xs font-bold tracking-[0.14em] uppercase">
              Server-authoritative recovery
            </p>
            <h2 className="font-heading mt-1 text-2xl font-bold">
              Pending payment পুনরায় যাচাই
            </h2>
          </div>
        </div>
      </div>
      <CardContent className="space-y-4 p-5 sm:p-6">
        <p className="text-muted-foreground leading-7">
          Callback বন্ধ হয়ে গেলে বা payment processing-এ আটকে থাকলে PayStation
          Transaction Status API দিয়ে due invoice-গুলো আবার যাচাই করুন।
          Browser-এর কোনো success value এখানে বিশ্বাস করা হয় না।
        </p>
        <div className="border-brand-navy/10 bg-brand-cream/45 rounded-2xl border p-4">
          <p className="text-brand-navy text-sm font-semibold">
            বর্তমানে due/pending order: {pendingCount.toLocaleString("bn-BD")}
          </p>
          <p className="text-muted-foreground mt-1 text-xs leading-5">
            একই invoice বা transaction পুনরায় এলে database idempotency duplicate
            entitlement ও enrollment আটকাবে।
          </p>
        </div>
        <Button
          type="button"
          className="min-h-11 w-full sm:w-auto"
          disabled={!ownerEnabled || running}
          onClick={reconcile}
        >
          <RefreshCw className={running ? "animate-spin" : ""} />
          {running ? "যাচাই চলছে…" : "এখনই reconcile করুন"}
        </Button>
        {!ownerEnabled ? (
          <p className="text-muted-foreground text-sm">
            এই action শুধু Owner account থেকে চালানো যাবে।
          </p>
        ) : null}
        <div aria-live="polite" className="min-h-6 text-sm">
          {result ? (
            <p className="font-medium text-emerald-700">
              {result.checked.toLocaleString("bn-BD")}টি order যাচাই হয়েছে
              {stateSummary ? ` — ${stateSummary}` : "।"}
            </p>
          ) : null}
          {error ? (
            <p className="text-destructive font-medium">
              যাচাই সম্পন্ন হয়নি। Invoice reference রেখে আবার চেষ্টা করুন বা
              server log দেখুন।
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
