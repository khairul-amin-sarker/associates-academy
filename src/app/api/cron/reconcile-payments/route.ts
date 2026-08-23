import { NextResponse } from "next/server";
import { reconcilePendingPayStationOrders } from "@/lib/payments/service";

export async function GET(request: Request) {
  if (
    !process.env.CRON_SECRET ||
    request.headers.get("authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
  )
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const results = await reconcilePendingPayStationOrders();
  const states = results.reduce<Record<string, number>>((summary, result) => {
    summary[result.state] = (summary[result.state] ?? 0) + 1;
    return summary;
  }, {});
  return NextResponse.json({ checked: results.length, states });
}
