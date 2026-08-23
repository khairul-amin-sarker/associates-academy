import { NextResponse } from "next/server";
import { getVerifiedAuthContext } from "@/lib/auth";
import { PayStationError, PayStationProvider } from "@/lib/payments/paystation";
import { verifyPayStationInvoice } from "@/lib/payments/service";
import { createAdminClient } from "@/lib/supabase/server";
import {
  checkoutCustomerSchema,
  checkoutRequestSchema,
  guestCourseCheckoutRequestSchema,
} from "@/lib/validation/checkout";

function commerceError(message?: string) {
  const error =
    message?.match(
      /(invalid_coupon|coupon_exhausted|coupon_user_limit|zero_total_not_supported|already_enrolled|product_not_found|invalid_customer|authenticated_email_mismatch|idempotency_conflict)/,
    )?.[1] ?? "order_creation_failed";
  return NextResponse.json(
    { error },
    { status: error === "already_enrolled" ? 409 : 400 },
  );
}

function providerError(error: unknown) {
  if (error instanceof PayStationError) {
    const status = error.code === "not_configured" ? 503 : 502;
    return NextResponse.json(
      {
        error:
          error.code === "not_configured"
            ? "payment_provider_not_connected"
            : "payment_provider_unavailable",
      },
      { status },
    );
  }
  return NextResponse.json(
    { error: "payment_provider_unavailable" },
    { status: 502 },
  );
}

function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return null;
  try {
    const url = new URL(value);
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:")
      return null;
    return url.origin;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const productSlug =
    payload && typeof payload === "object" && "productSlug" in payload
      ? String(payload.productSlug)
      : "";
  if (!productSlug)
    return NextResponse.json({ error: "invalid_checkout" }, { status: 422 });

  const admin = createAdminClient();
  if (!admin)
    return NextResponse.json(
      { error: "payment_database_not_configured" },
      { status: 503 },
    );
  const { data: product } = await admin
    .from("products")
    .select("product_type")
    .eq("slug", productSlug)
    .eq("is_published", true)
    .maybeSingle();
  if (!product) return commerceError("product_not_found");

  const origin = siteUrl();
  const mode = process.env.PAYSTATION_MODE;
  if (!origin || (mode !== "sandbox" && mode !== "live"))
    return NextResponse.json(
      { error: "payment_provider_not_connected" },
      { status: 503 },
    );
  const provider = new PayStationProvider({ mode });
  if (!provider.configured)
    return NextResponse.json(
      { error: "payment_provider_not_connected" },
      { status: 503 },
    );

  const auth = await getVerifiedAuthContext();

  if (product.product_type === "course") {
    const parsed = guestCourseCheckoutRequestSchema.safeParse(payload);
    if (!parsed.success)
      return NextResponse.json({ error: "invalid_checkout" }, { status: 422 });
    const customer = {
      ...parsed.data.customer,
      email: (auth?.email ?? parsed.data.customer.email).trim().toLowerCase(),
    };
    const nullableCoupon = parsed.data.couponCode?.trim() || null;
    const nullableUserId = auth?.userId ?? null;
    const { data, error } = await admin.rpc("create_guest_course_order", {
      p_product_slug: parsed.data.productSlug,
      p_customer: customer,
      // Postgres accepts NULL here; generated RPC argument types cannot express
      // nullable function parameters.
      p_coupon_code: nullableCoupon as unknown as string,
      p_checkout_request_id: parsed.data.checkoutRequestId,
      p_authenticated_user_id: nullableUserId as unknown as string,
      p_provider_mode: mode,
    });
    const order = Array.isArray(data) ? data[0] : data;
    if (error || !order) return commerceError(error?.message);
    if (!order.provider_reference || !order.gateway_fee_mode)
      return NextResponse.json(
        { error: "order_snapshot_incomplete" },
        { status: 500 },
      );
    const { data: orderSnapshot, error: snapshotError } = await admin
      .from("orders")
      .select("customer_snapshot")
      .eq("id", order.order_id)
      .single();
    const storedCustomer = checkoutCustomerSchema.safeParse(
      orderSnapshot?.customer_snapshot,
    );
    if (snapshotError || !storedCustomer.success)
      return NextResponse.json(
        { error: "order_snapshot_incomplete" },
        { status: 500 },
      );

    try {
      const checkout = await provider.initiateCheckout({
        invoiceNumber: order.invoice_number,
        amount: Number(order.total_amount),
        currency: "BDT",
        callbackUrl: `${origin}/api/payments/paystation/callback?invoice=${encodeURIComponent(order.invoice_number)}`,
        payWithCharge: order.gateway_fee_mode === "customer" ? 1 : 0,
        reference: order.provider_reference,
        checkoutItems: JSON.stringify({ course: order.course_slug }),
        customer: {
          name: storedCustomer.data.name,
          email: storedCustomer.data.email,
          phone: storedCustomer.data.phone,
          address: storedCustomer.data.city,
        },
      });
      if (checkout.invoiceNumber !== order.invoice_number) {
        await admin
          .from("payment_attempts")
          .update({ diagnostic_code: "initiate_invoice_mismatch" })
          .eq("id", order.payment_attempt_id);
        return NextResponse.json(
          { error: "payment_provider_invalid_response" },
          { status: 502 },
        );
      }
      await admin
        .from("payment_attempts")
        .update({
          initiated_at: new Date().toISOString(),
          provider_status: "processing",
          provider_status_code: checkout.providerStatusCode,
          diagnostic_code: null,
        })
        .eq("id", order.payment_attempt_id);
      return NextResponse.json({
        checkoutUrl: checkout.paymentUrl,
        invoiceNumber: order.invoice_number,
      });
    } catch (error) {
      await admin
        .from("payment_attempts")
        .update({
          diagnostic_code:
            error instanceof PayStationError
              ? `initiate_${error.code}`
              : "initiate_unexpected_error",
        })
        .eq("id", order.payment_attempt_id);
      if (
        error instanceof PayStationError &&
        error.providerStatusCode === "1008"
      ) {
        // A previous initiation can succeed even when its browser response is
        // lost. PayStation then reports a duplicate invoice on retry. Recheck
        // that durable order server-side and send the learner to the neutral
        // result page; the duplicate response itself never proves payment.
        await verifyPayStationInvoice(
          order.invoice_number,
          "return",
          provider,
        ).catch(() => null);
        return NextResponse.json({
          checkoutUrl: `${origin}/payment/result?invoice=${encodeURIComponent(order.invoice_number)}`,
          invoiceNumber: order.invoice_number,
        });
      }
      return providerError(error);
    }
  }

  // Preserve the established authenticated eBook order contract.
  const parsed = checkoutRequestSchema.safeParse(payload);
  if (!parsed.success)
    return NextResponse.json({ error: "invalid_checkout" }, { status: 422 });
  if (!auth?.supabase)
    return NextResponse.json(
      { error: "authentication_required" },
      { status: 401 },
    );
  const customer = {
    ...parsed.data.customer,
    email: auth.email ?? parsed.data.customer.email,
  };
  const { data, error } = await auth.supabase.rpc("create_order", {
    p_product_slug: parsed.data.productSlug,
    p_customer: customer,
    ...(parsed.data.couponCode
      ? { p_coupon_code: parsed.data.couponCode }
      : {}),
  });
  const order = Array.isArray(data) ? data[0] : data;
  if (error || !order) return commerceError(error?.message);
  try {
    const checkout = await provider.initiateCheckout({
      invoiceNumber: order.invoice_number,
      amount: Number(order.total_amount),
      currency: "BDT",
      callbackUrl: `${origin}/api/payments/paystation/callback?invoice=${encodeURIComponent(order.invoice_number)}`,
      payWithCharge: 0,
      reference: order.invoice_number,
      checkoutItems: JSON.stringify({ product: parsed.data.productSlug }),
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
    return NextResponse.json({
      checkoutUrl: checkout.paymentUrl,
      invoiceNumber: order.invoice_number,
    });
  } catch (error) {
    return providerError(error);
  }
}
