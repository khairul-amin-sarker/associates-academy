import { NextResponse } from "next/server";
import { syncExternalAnalytics } from "@/lib/analytics/external";

export async function GET(request: Request) {
  if (
    !process.env.CRON_SECRET ||
    request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  )
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await syncExternalAnalytics("daily_sync"));
}
