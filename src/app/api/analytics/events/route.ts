import { createHash } from "node:crypto";
import { after, NextResponse } from "next/server";
import { dispatchExternalEvent } from "@/lib/analytics/external";
import { analyticsEventSchema } from "@/lib/validation/analytics";
import {
  createPublicServerClient,
  hasSupabaseConfig,
} from "@/lib/supabase/server";
import type { Json } from "@/types/database";

export async function POST(request: Request) {
  if (request.headers.get("cookie")?.includes("aa_analytics_optout=1"))
    return new Response(null, { status: 204 });
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 32_768)
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = analyticsEventSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "invalid_event" }, { status: 422 });
  if (!hasSupabaseConfig()) return new Response(null, { status: 202 });
  const properties = { ...parsed.data.properties };
  const fbclid =
    typeof properties.fbclid === "string" ? properties.fbclid : null;
  delete properties.fbclid;
  if (fbclid)
    properties.fbclid_hash = createHash("sha256")
      .update(`${process.env.ANALYTICS_HASH_SALT ?? "local"}:${fbclid}`)
      .digest("hex");
  const supabase = createPublicServerClient();
  const { error } = await supabase.rpc("ingest_analytics_event", {
    p_event_id: parsed.data.eventId,
    p_session_id: parsed.data.sessionId,
    p_event_name: parsed.data.name,
    p_path: parsed.data.path,
    p_properties: properties as Json,
    p_occurred_at: parsed.data.occurredAt,
  });
  if (error?.message.includes("rate_limited"))
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  if (error)
    return NextResponse.json({ error: "ingestion_failed" }, { status: 503 });
  after(async () => {
    await dispatchExternalEvent({
      eventId: parsed.data.eventId,
      sessionId: parsed.data.sessionId,
      name: parsed.data.name,
      path: parsed.data.path,
      occurredAt: parsed.data.occurredAt,
      properties,
      fbclid,
      clientIp: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      userAgent: request.headers.get("user-agent") ?? undefined,
    });
  });
  return new Response(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
