import { after } from "next/server";
import { NextResponse } from "next/server";
import { processEmailOutbox } from "@/lib/email/process-outbox";
import {
  isPayStationInvoice,
  verifyPayStationInvoice,
} from "@/lib/payments/service";

async function readInvoice(request: Request) {
  const url = new URL(request.url);
  const callbackInvoice = url.searchParams.get("invoice");
  if (callbackInvoice) return callbackInvoice.trim().toUpperCase();
  if (request.method === "GET")
    return (
      url.searchParams.get("invoice_number")?.trim().toUpperCase() ?? null
    );
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    const invoice = body.invoice_number ?? body.invoice;
    return typeof invoice === "string" ? invoice.trim().toUpperCase() : null;
  }
  const body = await request.formData().catch(() => null);
  return (
    body?.get("invoice_number")?.toString().trim().toUpperCase() ??
    body?.get("invoice")?.toString().trim().toUpperCase() ??
    null
  );
}

async function handle(request: Request) {
  const invoice = await readInvoice(request);
  if (!invoice || !isPayStationInvoice(invoice))
    return NextResponse.json({ error: "invoice_required" }, { status: 400 });

  try {
    const result = await verifyPayStationInvoice(invoice, "callback");
    if (
      result.paymentState === "verified_paid" ||
      result.paymentState === "paid_unclaimed"
    ) {
      after(async () => {
        await processEmailOutbox(5);
      });
    }
  } catch {
    // The neutral result page reads only the durable database state. Provider
    // downtime remains recoverable by the reconciliation job.
  }

  return NextResponse.redirect(
    new URL(
      `/payment/result?invoice=${encodeURIComponent(invoice)}`,
      request.url,
    ),
    303,
  );
}

export const GET = handle;
export const POST = handle;
