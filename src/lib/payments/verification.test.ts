import { describe, expect, it } from "vitest";
import type { TransactionStatusResult } from "./paystation";
import {
  transitionPaymentState,
  validatePayStationEvidence,
} from "./verification";

const success: TransactionStatusResult = {
  requestSuccessful: true,
  providerStatusCode: "200",
  status: "success",
  invoiceNumber: "AA-0123456789ABCDEF0123456789ABCDEF",
  transactionId: "TRX-NEW",
  amount: 1600,
  currency: null,
  reference: "AA-0123456789ABCDEF0123456789ABCDEF",
  paymentMethod: "bKash",
  raw: {},
};

function validate(
  transaction: TransactionStatusResult,
  transactionUsedByAnotherOrder = false,
) {
  return validatePayStationEvidence({
    expectedInvoice: success.invoiceNumber,
    expectedAmount: 1600,
    expectedCurrency: "BDT",
    expectedReference: success.reference,
    transaction,
    transactionUsedByAnotherOrder,
  });
}

describe("PayStation verification evidence", () => {
  it("rejects an amount mismatch", () => {
    expect(validate({ ...success, amount: 1599.99 })).toBe("amount_mismatch");
  });

  it("rejects an old/replayed transaction ID", () => {
    expect(validate(success, true)).toBe("transaction_id_reused");
  });

  it("does not invent a currency when PayStation omits it", () => {
    expect(validate(success)).toBeNull();
    expect(validate({ ...success, currency: "USD" })).toBe(
      "currency_mismatch",
    );
  });
});

describe("idempotent payment transitions", () => {
  it("keeps duplicate successful callbacks idempotent", () => {
    expect(
      transitionPaymentState({
        currentState: "verified_paid",
        providerStatus: "success",
        diagnosticCode: null,
        matchingVerifiedAccount: true,
        sameVerifiedTransaction: true,
      }),
    ).toEqual({
      state: "verified_paid",
      idempotent: true,
      grantEnrollment: false,
    });
  });

  it.each([
    ["processing", "processing"],
    ["failed", "failed"],
    ["refund", "refunded"],
  ] as const)("maps %s without granting enrollment", (providerStatus, state) => {
    expect(
      transitionPaymentState({
        currentState: "pending_payment",
        providerStatus,
        diagnosticCode: null,
        matchingVerifiedAccount: false,
      }),
    ).toMatchObject({ state, grantEnrollment: false });
  });

  it("creates a paid-unclaimed state when no verified account exists", () => {
    expect(
      transitionPaymentState({
        currentState: "pending_payment",
        providerStatus: "success",
        diagnosticCode: null,
        matchingVerifiedAccount: false,
      }),
    ).toMatchObject({ state: "paid_unclaimed", grantEnrollment: false });
  });
});
