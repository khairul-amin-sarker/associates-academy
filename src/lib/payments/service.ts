import "server-only";

import { PayStationError, PayStationProvider } from "./paystation";
import { validatePayStationEvidence } from "./verification";
import { createAdminClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

export type VerificationSource =
  "callback" | "return" | "reconciliation" | "admin" | "test";

export type PaymentVerificationOutcome = {
  paymentState: string;
  courseSlug: string | null;
  entitledUserId: string | null;
  diagnosticCode: string | null;
  idempotent: boolean;
};

const invoicePattern = /^AA-(?:[A-F0-9]{32}|\d{8}-[A-F0-9]{10})$/;

export function isPayStationInvoice(value: string) {
  return invoicePattern.test(value);
}

function first<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

export async function verifyPayStationInvoice(
  invoiceNumber: string,
  source: VerificationSource,
  provider = new PayStationProvider(),
): Promise<PaymentVerificationOutcome> {
  if (!isPayStationInvoice(invoiceNumber))
    throw new Error("invalid_invoice_number");
  const admin = createAdminClient();
  if (!admin) throw new Error("payment_database_not_configured");
  const { data: expectedOrder, error: orderError } = await admin
    .from("orders")
    .select("invoice_number,total_amount,currency,provider_reference")
    .eq("invoice_number", invoiceNumber)
    .maybeSingle();
  if (orderError || !expectedOrder) throw new Error("order_not_found");

  let transaction;
  try {
    transaction = await provider.getTransactionStatusByInvoice(invoiceNumber);
  } catch (error) {
    const code =
      error instanceof PayStationError ? error.code : "unexpected_error";
    const { data, error: recordError } = await admin.rpc(
      "record_paystation_verification",
      {
        p_invoice_number: invoiceNumber,
        p_provider_invoice_number: invoiceNumber,
        p_provider_transaction_id: "",
        p_verified_amount: null as unknown as number,
        p_provider_currency: null as unknown as string,
        p_provider_reference: null as unknown as string,
        p_provider_status: "failed",
        p_provider_status_code: code,
        p_request_successful: false,
        p_response_snapshot: {},
        p_source: source,
      },
    );
    if (recordError) throw new Error("payment_verification_record_failed");
    const recorded = first(data);
    if (!recorded) throw new Error("payment_verification_record_missing");
    return {
      paymentState: recorded.payment_state,
      courseSlug: recorded.course_slug,
      entitledUserId: recorded.entitled_user_id,
      diagnosticCode: recorded.diagnostic_code,
      idempotent: recorded.idempotent,
    };
  }

  let transactionUsedByAnotherOrder = false;
  if (transaction.transactionId) {
    const { data: replay } = await admin
      .from("payment_attempts")
      .select("orders!inner(invoice_number)")
      .eq("provider", "paystation")
      .eq("provider_transaction_id", transaction.transactionId)
      .neq("orders.invoice_number", invoiceNumber)
      .limit(1);
    transactionUsedByAnotherOrder = Boolean(replay?.length);
  }
  const preflightDiagnostic = validatePayStationEvidence({
    expectedInvoice: expectedOrder.invoice_number,
    expectedAmount: Number(expectedOrder.total_amount),
    expectedCurrency: "BDT",
    expectedReference: expectedOrder.provider_reference,
    transaction,
    transactionUsedByAnotherOrder,
  });

  const { data, error } = await admin.rpc("record_paystation_verification", {
    p_invoice_number: invoiceNumber,
    p_provider_invoice_number: transaction.invoiceNumber,
    p_provider_transaction_id: transaction.transactionId,
    p_verified_amount: transaction.amount as unknown as number,
    p_provider_currency: transaction.currency as unknown as string,
    p_provider_reference: transaction.reference as unknown as string,
    p_provider_status: transaction.status,
    p_provider_status_code: transaction.providerStatusCode,
    p_request_successful: transaction.requestSuccessful,
    p_response_snapshot: transaction.raw as Json,
    p_source: source,
  });
  if (error) {
    if (error.message.includes("payment_attempts_provider_tx_unique"))
      throw new Error("transaction_id_reused");
    throw new Error("payment_verification_record_failed");
  }
  const recorded = first(data);
  if (!recorded) throw new Error("payment_verification_record_missing");
  if (preflightDiagnostic && recorded.diagnostic_code !== preflightDiagnostic)
    throw new Error("payment_verification_invariant_mismatch");
  return {
    paymentState: recorded.payment_state,
    courseSlug: recorded.course_slug,
    entitledUserId: recorded.entitled_user_id,
    diagnosticCode: recorded.diagnostic_code,
    idempotent: recorded.idempotent,
  };
}

export async function getPaymentResult(invoiceNumber: string) {
  if (!isPayStationInvoice(invoiceNumber)) return null;
  const admin = createAdminClient();
  if (!admin) return null;
  const { data } = await admin
    .from("orders")
    .select(
      "id,invoice_number,payment_state,status,normalized_email,user_id,product_slug_snapshot,product_title_snapshot,total_amount,currency,created_at,last_verification_at,next_reconciliation_at",
    )
    .eq("invoice_number", invoiceNumber)
    .maybeSingle();
  return data;
}

export async function claimPaidCourseOrdersForUser(userId: string) {
  const admin = createAdminClient();
  if (!admin) throw new Error("payment_database_not_configured");
  const { data, error } = await admin.rpc("claim_paid_course_orders", {
    p_user_id: userId,
  });
  if (error) throw new Error("paid_order_claim_failed");
  return data ?? [];
}

export async function reconcilePendingPayStationOrders(limit = 25) {
  const admin = createAdminClient();
  if (!admin) throw new Error("payment_database_not_configured");
  const boundedLimit = Math.max(1, Math.min(limit, 100));
  const { data, error } = await admin
    .from("orders")
    .select("invoice_number,expires_at")
    .in("payment_state", ["pending_payment", "processing", "failed"])
    .lte("next_reconciliation_at", new Date().toISOString())
    .order("next_reconciliation_at", { ascending: true })
    .limit(boundedLimit);
  if (error) throw new Error("reconciliation_lookup_failed");

  const results: Array<{
    invoiceNumber: string;
    state: string;
    diagnosticCode: string | null;
  }> = [];
  for (const order of data ?? []) {
    try {
      const outcome = await verifyPayStationInvoice(
        order.invoice_number,
        "reconciliation",
      );
      let reconciledState = outcome.paymentState;
      if (
        order.expires_at &&
        new Date(order.expires_at).getTime() <= Date.now() &&
        ["pending_payment", "processing"].includes(outcome.paymentState)
      ) {
        const { data: expired } = await admin
          .from("orders")
          .update({
            status: "cancelled",
            payment_state: "expired",
            next_reconciliation_at: null,
          })
          .eq("invoice_number", order.invoice_number)
          .in("payment_state", ["pending_payment", "processing"])
          .select("payment_state")
          .maybeSingle();
        reconciledState = expired?.payment_state ?? outcome.paymentState;
      }
      results.push({
        invoiceNumber: order.invoice_number,
        state: reconciledState,
        diagnosticCode: outcome.diagnosticCode,
      });
    } catch {
      results.push({
        invoiceNumber: order.invoice_number,
        state: "retry_pending",
        diagnosticCode: "verification_unavailable",
      });
    }
  }
  return results;
}
