import type {
  PayStationTransactionStatus,
  TransactionStatusResult,
} from "./paystation";

export type PaymentState =
  | "pending_payment"
  | "processing"
  | "verified_paid"
  | "paid_unclaimed"
  | "failed"
  | "cancelled"
  | "expired"
  | "refunded";

export function validatePayStationEvidence({
  expectedInvoice,
  expectedAmount,
  expectedCurrency,
  expectedReference,
  transaction,
  transactionUsedByAnotherOrder = false,
}: {
  expectedInvoice: string;
  expectedAmount: number;
  expectedCurrency: "BDT";
  expectedReference: string | null;
  transaction: TransactionStatusResult;
  transactionUsedByAnotherOrder?: boolean;
}) {
  if (!transaction.requestSuccessful) return "provider_request_failed";
  if (transaction.invoiceNumber !== expectedInvoice) return "invoice_mismatch";
  if (transaction.status !== "success") return null;
  if (transaction.amount !== expectedAmount) return "amount_mismatch";
  if (
    transaction.currency !== null &&
    transaction.currency !== expectedCurrency
  )
    return "currency_mismatch";
  if (
    expectedReference &&
    transaction.reference &&
    transaction.reference !== expectedReference
  )
    return "reference_mismatch";
  if (!transaction.transactionId) return "transaction_id_missing";
  if (transactionUsedByAnotherOrder) return "transaction_id_reused";
  return null;
}

export function transitionPaymentState({
  currentState,
  providerStatus,
  diagnosticCode,
  matchingVerifiedAccount,
  sameVerifiedTransaction = false,
}: {
  currentState: PaymentState;
  providerStatus: PayStationTransactionStatus;
  diagnosticCode: string | null;
  matchingVerifiedAccount: boolean;
  sameVerifiedTransaction?: boolean;
}): { state: PaymentState; idempotent: boolean; grantEnrollment: boolean } {
  if (diagnosticCode)
    return { state: currentState, idempotent: false, grantEnrollment: false };
  if (providerStatus === "refund")
    return { state: "refunded", idempotent: false, grantEnrollment: false };
  if (
    currentState === "verified_paid" ||
    currentState === "paid_unclaimed" ||
    currentState === "refunded"
  ) {
    return {
      state: currentState,
      idempotent: sameVerifiedTransaction || providerStatus !== "success",
      grantEnrollment: false,
    };
  }
  if (providerStatus === "processing")
    return { state: "processing", idempotent: false, grantEnrollment: false };
  if (providerStatus === "failed")
    return { state: "failed", idempotent: false, grantEnrollment: false };
  return matchingVerifiedAccount
    ? { state: "verified_paid", idempotent: false, grantEnrollment: true }
    : { state: "paid_unclaimed", idempotent: false, grantEnrollment: false };
}
