import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { allowedMedia, signedUploadSchema } from "@/lib/validation/media";

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.supabase) return NextResponse.json({ error: "local_demo_no_storage" }, { status: 503 });
  const parsed = signedUploadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_upload" }, { status: 422 });
  const rules = allowedMedia[parsed.data.bucket];
  if (!rules.mimes.some((mime) => mime === parsed.data.mimeType) || parsed.data.sizeBytes > rules.max) return NextResponse.json({ error: "file_not_allowed" }, { status: 422 });
  const extension = parsed.data.originalName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const prefix = parsed.data.bucket === "cms-public" ? `admin/${auth.userId}` : parsed.data.scopeId;
  if (!prefix) return NextResponse.json({ error: "scope_required" }, { status: 422 });
  const path = `${prefix}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
  const { data, error } = await auth.supabase.storage.from(parsed.data.bucket).createSignedUploadUrl(path);
  if (error) return NextResponse.json({ error: "signing_failed" }, { status: 400 });
  return NextResponse.json({ path, token: data.token });
}
