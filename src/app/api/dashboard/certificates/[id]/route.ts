import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ error: "invalid_certificate" }, { status: 400 });
  const context = await requireUser("/dashboard");
  if (!context.supabase) return NextResponse.json({ error: "local_demo_no_file" }, { status: 503 });
  const { data: certificate } = await context.supabase.from("certificates")
    .select("bucket_id,object_path").eq("id", Number(id)).eq("user_id", context.userId).maybeSingle();
  if (!certificate?.bucket_id || !certificate.object_path) return NextResponse.json({ error: "certificate_not_found" }, { status: 404 });
  const { data, error } = await context.supabase.storage.from(certificate.bucket_id)
    .createSignedUrl(certificate.object_path, 300, { download: true });
  if (error || !data?.signedUrl) return NextResponse.json({ error: "download_unavailable" }, { status: 404 });
  return NextResponse.redirect(data.signedUrl);
}
