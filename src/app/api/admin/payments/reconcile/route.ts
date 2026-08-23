import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/auth";
import { reconcilePendingPayStationOrders } from "@/lib/payments/service";

export const dynamic = "force-dynamic";

export async function POST() {
  await requireOwner();

  try {
    const results = await reconcilePendingPayStationOrders();
    const states = results.reduce<Record<string, number>>((summary, result) => {
      summary[result.state] = (summary[result.state] ?? 0) + 1;
      return summary;
    }, {});

    return NextResponse.json(
      { checked: results.length, states },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    console.error("[payments] owner reconciliation failed");
    return NextResponse.json(
      { error: "reconciliation_failed" },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
