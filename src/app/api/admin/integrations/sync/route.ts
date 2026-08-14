import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/auth";
import { syncExternalAnalytics } from "@/lib/analytics/external";

export async function POST() {
  await requireOwner();
  return NextResponse.json(await syncExternalAnalytics("manual_sync"));
}
