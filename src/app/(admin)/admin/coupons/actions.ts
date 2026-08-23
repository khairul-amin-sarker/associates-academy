"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { couponSchema } from "@/lib/validation/checkout";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalNumber(formData: FormData, key: string) {
  const value = text(formData, key);
  return value ? Number(value) : null;
}

function optionalDate(formData: FormData, key: string) {
  const value = text(formData, key);
  return value ? new Date(value).toISOString() : null;
}

export async function saveCoupon(formData: FormData) {
  const parsed = couponSchema.safeParse({
    id: optionalNumber(formData, "id") ?? undefined,
    productId: text(formData, "productId"),
    code: text(formData, "code").toUpperCase(),
    discountType: text(formData, "discountType"),
    discountValue: text(formData, "discountValue"),
    maxRedemptions: optionalNumber(formData, "maxRedemptions"),
    maxRedemptionsPerUser: text(formData, "maxRedemptionsPerUser"),
    startsAt: optionalDate(formData, "startsAt"),
    endsAt: optionalDate(formData, "endsAt"),
    isActive: formData.get("isActive") === "on",
  });
  if (!parsed.success) redirect("/admin/coupons?error=invalid-coupon");

  const context = await requireAdmin();
  if (!context.supabase) redirect("/admin/coupons?error=demo-mode");
  const { data: product } = await context.supabase
    .from("products")
    .select("id,product_type")
    .eq("id", parsed.data.productId)
    .eq("product_type", "course")
    .maybeSingle();
  if (!product) redirect("/admin/coupons?error=invalid-course");

  const values = {
    product_id: parsed.data.productId,
    code: parsed.data.code,
    discount_type: parsed.data.discountType,
    discount_value: parsed.data.discountValue,
    max_redemptions: parsed.data.maxRedemptions,
    max_redemptions_per_user: parsed.data.maxRedemptionsPerUser,
    starts_at: parsed.data.startsAt,
    ends_at: parsed.data.endsAt,
    is_active: parsed.data.isActive,
  };
  const result = parsed.data.id
    ? await context.supabase
        .from("coupons")
        .update(values)
        .eq("id", parsed.data.id)
    : await context.supabase.from("coupons").insert(values);
  if (result.error) redirect("/admin/coupons?error=save-failed");
  revalidatePath("/admin/coupons");
  revalidatePath("/checkout/[slug]", "page");
  redirect("/admin/coupons?saved=1");
}
