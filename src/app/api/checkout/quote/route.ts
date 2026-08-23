import { NextResponse } from "next/server";
import { getVerifiedAuthContext } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { checkoutQuoteSchema } from "@/lib/validation/checkout";

function quoteError(message?: string) {
  const error =
    message?.match(
      /(invalid_coupon|coupon_exhausted|coupon_user_limit|zero_total_not_supported|already_enrolled|product_not_found)/,
    )?.[1] ?? "quote_failed";
  return NextResponse.json(
    { error },
    { status: error === "already_enrolled" ? 409 : 400 },
  );
}

export async function POST(request: Request) {
  const parsed = checkoutQuoteSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success)
    return NextResponse.json({ error: "invalid_quote" }, { status: 422 });
  const admin = createAdminClient();
  if (!admin)
    return NextResponse.json(
      { error: "payment_database_not_configured" },
      { status: 503 },
    );
  const auth = await getVerifiedAuthContext();
  const { data, error } = await admin.rpc("quote_guest_course_checkout", {
    p_product_slug: parsed.data.productSlug,
    p_coupon_code: parsed.data.couponCode,
    p_checkout_email: (auth?.email ?? parsed.data.email)?.trim().toLowerCase(),
    p_authenticated_user_id: auth?.userId,
  });
  const quote = Array.isArray(data) ? data[0] : data;
  if (error || !quote) return quoteError(error?.message);
  return NextResponse.json({
    subtotal: Number(quote.subtotal),
    discountAmount: Number(quote.discount_amount),
    gatewayFee: Number(quote.gateway_fee),
    totalAmount: Number(quote.total_amount),
    currency: quote.currency,
    gatewayFeeMode: quote.gateway_fee_mode,
  });
}
