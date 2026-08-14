import { NextResponse } from "next/server";
import { createPublicServerClient, hasSupabaseConfig } from "@/lib/supabase/server";

type Context = { params: Promise<{ code: string }> };
export async function GET(_: Request, { params }: Context) {
  const { code } = await params;
  if (!/^[A-Za-z0-9-]{4,80}$/.test(code)) return NextResponse.json({ error: "invalid_code" }, { status: 422 });
  if (!hasSupabaseConfig()) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const { data, error } = await createPublicServerClient().rpc("verify_certificate_public", { p_code: code });
  const certificate = Array.isArray(data) ? data[0] : data;
  if (error || !certificate) return NextResponse.json({ error: "not_found" }, { status: 404, headers: { "Cache-Control": "public, max-age=60" } });
  return NextResponse.json({ certificate }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" } });
}
