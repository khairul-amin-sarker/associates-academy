import { NextResponse } from "next/server";
import { syncExternalAnalytics } from "@/lib/analytics/external";
import { reconcilePendingPayStationOrders } from "@/lib/payments/service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (
    !process.env.CRON_SECRET ||
    request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [integrationSync, paymentReconciliation] = await Promise.allSettled([
    syncExternalAnalytics("daily_sync"),
    reconcilePendingPayStationOrders(),
  ]);
  const paymentResults =
    paymentReconciliation.status === "fulfilled"
      ? paymentReconciliation.value
      : [];
  const paymentStates = paymentResults.reduce<Record<string, number>>(
    (summary, result) => {
      summary[result.state] = (summary[result.state] ?? 0) + 1;
      return summary;
    },
    {},
  );

  return NextResponse.json(
    {
      ok:
        integrationSync.status === "fulfilled" &&
        paymentReconciliation.status === "fulfilled",
      integrations: integrationSync.status,
      payments: {
        status: paymentReconciliation.status,
        checked: paymentResults.length,
        states: paymentStates,
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
