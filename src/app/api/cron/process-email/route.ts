import { NextResponse } from "next/server";
import { processEmailOutbox } from "@/lib/email/process-outbox";

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await processEmailOutbox());
}
