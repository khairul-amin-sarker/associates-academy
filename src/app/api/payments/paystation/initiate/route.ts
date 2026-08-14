import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthContext } from "@/lib/auth";
import { PayStationProvider } from "@/lib/payments/paystation";

const schema = z.object({
  productSlug: z.string().min(2).max(100),
  couponCode: z.string().max(40).optional(),
  customer: z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    phone: z.string().min(8).max(20),
  }),
});

export async function POST(request: Request) {
  const auth = await getAuthContext();
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json({ error: "invalid_checkout" }, { status: 422 });
  const localDemo =
    !auth &&
    process.env.NODE_ENV === "development" &&
    process.env.LOCAL_DEMO_ADMIN === "true";
  if (!auth && !localDemo)
    return NextResponse.json(
      { error: "authentication_required" },
      { status: 401 },
    );
  if (localDemo) {
    const invoiceNumber = `AA-DEMO-${Date.now()}`;
    return NextResponse.json({
      checkoutUrl: `/payment/success?invoice=${invoiceNumber}&mock=1`,
      invoiceNumber,
    });
  }
  if (!auth)
    return NextResponse.json(
      { error: "authentication_required" },
      { status: 401 },
    );
  const { data, error } = await auth.supabase.rpc("create_order", {
    p_product_slug: parsed.data.productSlug,
    p_customer: parsed.data.customer,
    ...(parsed.data.couponCode
      ? { p_coupon_code: parsed.data.couponCode }
      : {}),
  });
  const order = Array.isArray(data) ? data[0] : data;
  if (error || !order)
    return NextResponse.json(
      { error: error?.message ?? "order_creation_failed" },
      { status: 400 },
    );
  const provider = new PayStationProvider();
  const mode = process.env.PAYSTATION_MODE ?? "mock";
  if (mode === "mock" && process.env.NODE_ENV !== "production")
    return NextResponse.json({
      checkoutUrl: `/payment/success?invoice=${encodeURIComponent(order.invoice_number)}&mock=1`,
      invoiceNumber: order.invoice_number,
    });
  if (!provider.configured)
    return NextResponse.json(
      { error: "payment_provider_not_connected" },
      { status: 503 },
    );
  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/paystation/callback`;
  const checkout = await provider.createCheckout({
    invoiceNumber: order.invoice_number,
    amount: Number(order.total_amount),
    currency: "BDT",
    callbackUrl,
    customer: parsed.data.customer,
  });
  return NextResponse.json({
    checkoutUrl: checkout.url,
    invoiceNumber: order.invoice_number,
  });
}
