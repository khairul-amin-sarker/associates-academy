import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { allowedMedia, signedUploadSchema } from "@/lib/validation/media";

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.supabase) return NextResponse.json({ error: "local_demo_no_storage" }, { status: 503 });
  const body = await request.json().catch(() => null);
  const parsed = signedUploadSchema.extend({ path: z.string().min(3).max(500), altText: z.string().max(300).optional() }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid_completion" }, { status: 422 });
  const directory = parsed.data.path.split("/").slice(0, -1).join("/");
  const filename = parsed.data.path.split("/").at(-1)!;
  const { data: objects, error: listError } = await auth.supabase.storage.from(parsed.data.bucket).list(directory, { search: filename, limit: 2 });
  const object = objects?.find((item) => item.name === filename);
  if (listError || !object || Number(object.metadata?.size ?? parsed.data.sizeBytes) !== parsed.data.sizeBytes) return NextResponse.json({ error: "upload_not_verified" }, { status: 409 });
  const rules = allowedMedia[parsed.data.bucket];
  if (!rules.mimes.some((mime) => mime === parsed.data.mimeType) || parsed.data.sizeBytes > rules.max) return NextResponse.json({ error: "file_not_allowed" }, { status: 422 });
  const { data, error } = await auth.supabase.from("media_assets").insert({ bucket_id: parsed.data.bucket, object_path: parsed.data.path, original_name: parsed.data.originalName, mime_type: parsed.data.mimeType, size_bytes: parsed.data.sizeBytes, alt_text: parsed.data.altText ?? null, uploaded_by: auth.userId, verified_at: new Date().toISOString() }).select("id,bucket_id,object_path").single();
  if (error) return NextResponse.json({ error: "asset_registration_failed" }, { status: 400 });
  return NextResponse.json({ asset: data });
}
