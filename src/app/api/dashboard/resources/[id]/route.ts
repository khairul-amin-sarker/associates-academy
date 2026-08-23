import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  if (!/^\d+$/.test(id))
    return NextResponse.json({ error: "invalid_resource" }, { status: 400 });
  const context = await requireUser(`/dashboard`);
  if (!context.supabase)
    return NextResponse.json({ error: "local_demo_no_file" }, { status: 503 });

  const { data: resource } = await context.supabase
    .from("module_resources")
    .select(
      "bucket_id,object_path,modules!inner(course_id,courses!inner(product_id))",
    )
    .eq("id", Number(id))
    .eq("is_published", true)
    .maybeSingle();
  if (!resource)
    return NextResponse.json({ error: "resource_not_found" }, { status: 404 });

  const linked = resource.modules as unknown as {
    courses: { product_id: number } | null;
  } | null;
  const productId = linked?.courses?.product_id;
  if (!productId)
    return NextResponse.json({ error: "resource_not_found" }, { status: 404 });
  const { data: enrollment } = await context.supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", context.userId)
    .eq("product_id", productId)
    .eq("status", "active")
    .maybeSingle();
  if (!enrollment)
    return NextResponse.json({ error: "not_entitled" }, { status: 403 });

  const { data, error } = await context.supabase.storage
    .from(resource.bucket_id)
    .createSignedUrl(resource.object_path, 300, { download: true });
  if (error || !data?.signedUrl)
    return NextResponse.json(
      { error: "download_unavailable" },
      { status: 404 },
    );
  return NextResponse.redirect(data.signedUrl);
}
