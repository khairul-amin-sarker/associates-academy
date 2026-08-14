import { NextResponse } from "next/server";
import { after } from "next/server";
import { PayStationProvider } from "@/lib/payments/paystation";
import { processEmailOutbox } from "@/lib/email/process-outbox";
import { createAdminClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

async function readInvoice(request: Request) {
  const url = new URL(request.url);
  if (request.method === "GET")
    return (
      url.searchParams.get("invoice_number") ?? url.searchParams.get("invoice")
    );
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return body.invoice_number ?? body.invoice ?? null;
  }
  const body = await request.formData().catch(() => null);
  return (
    body?.get("invoice_number")?.toString() ??
    body?.get("invoice")?.toString() ??
    null
  );
}

async function handle(request: Request) {
  const invoice = await readInvoice(request);
  if (!invoice)
    return NextResponse.json({ error: "invoice_required" }, { status: 400 });
  const provider = new PayStationProvider();
  const admin = createAdminClient();
  if (!provider.configured || !admin)
    return NextResponse.json(
      { error: "provider_not_configured" },
      { status: 503 },
    );
  const verified = await provider.verifyTransaction(invoice);
  if (
    verified.status !== "paid" ||
    verified.invoiceNumber !== invoice ||
    !Number.isFinite(verified.amount)
  )
    return NextResponse.redirect(
      new URL(
        `/payment/failed?invoice=${encodeURIComponent(invoice)}`,
        request.url,
      ),
    );
  const { error } = await admin.rpc("fulfill_verified_order", {
    p_invoice_number: invoice,
    p_provider_transaction_id: verified.transactionId,
    p_verified_amount: verified.amount,
    p_currency: verified.currency,
    p_raw_response: verified.raw as Json,
  });
  if (error)
    return NextResponse.json({ error: "fulfillment_failed" }, { status: 409 });
  after(async () => {
    await processEmailOutbox(5);
  });
  return NextResponse.redirect(
    new URL(
      `/payment/success?invoice=${encodeURIComponent(invoice)}`,
      request.url,
    ),
  );
}

export const GET = handle;
export const POST = handle;
