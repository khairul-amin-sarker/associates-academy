import { describe, expect, it, vi } from "vitest";
import {
  calculateGatewayFee,
  normalizePayStationStatus,
  PayStationError,
  PayStationProvider,
} from "./paystation";

const checkoutInput = {
  invoiceNumber: "AA-0123456789ABCDEF0123456789ABCDEF",
  amount: 1600,
  currency: "BDT" as const,
  callbackUrl: "https://academy.example/payment/callback",
  payWithCharge: 0 as const,
  reference: "AA-0123456789ABCDEF0123456789ABCDEF",
  checkoutItems: '{"course":"tax"}',
  customer: {
    name: "Test Learner",
    email: "learner@example.com",
    phone: "01700000000",
  },
};

describe("PayStation provider adapter", () => {
  it.each([
    ["success", "success"],
    ["processing", "processing"],
    ["failed", "failed"],
    ["refund", "refund"],
  ] as const)("maps %s to %s", (value, expected) => {
    expect(normalizePayStationStatus(value)).toBe(expected);
  });

  it("uses the official Sandbox multipart initiation encoding", async () => {
    const fetcher = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      expect(init?.body).toBeInstanceOf(FormData);
      const form = init?.body as FormData;
      expect(form.get("payment_amount")).toBe("1600.00");
      expect(form.get("cust_name")).toBe("Test Learner");
      expect(form.get("merchantId")).toBe("merchant");
      return Response.json({
        status_code: "200",
        status: "success",
        payment_amount: "1600",
        invoice_number: checkoutInput.invoiceNumber,
        payment_url: "https://sandbox.paystation.com.bd/checkout/token",
      });
    });
    const provider = new PayStationProvider({
      mode: "sandbox",
      merchantId: "merchant",
      password: "private-password",
      fetch: fetcher as typeof fetch,
      logger: vi.fn(),
    });
    const result = await provider.initiateCheckout(checkoutInput);
    expect(result.paymentUrl).toContain("sandbox.paystation.com.bd/checkout");
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it("uses JSON for Sandbox invoice-status verification", async () => {
    const fetcher = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      expect(init?.method).toBe("POST");
      expect(init?.headers).toMatchObject({
        "content-type": "application/json",
        merchantId: "merchant",
      });
      expect(init?.body).toBe(
        JSON.stringify({ invoice_number: checkoutInput.invoiceNumber }),
      );
      return Response.json({
        status_code: "200",
        status: "success",
        data: {
          invoice_number: checkoutInput.invoiceNumber,
          trx_status: "Success",
          trx_id: "TRX-1",
          payment_amount: "1600.00",
          reference: checkoutInput.reference,
          payment_method: "bKash",
        },
      });
    });
    const provider = new PayStationProvider({
      mode: "sandbox",
      merchantId: "merchant",
      password: "private-password",
      fetch: fetcher as typeof fetch,
      logger: vi.fn(),
    });
    const result = await provider.getTransactionStatusByInvoice(
      checkoutInput.invoiceNumber,
    );
    expect(result).toMatchObject({
      requestSuccessful: true,
      status: "success",
      transactionId: "TRX-1",
      amount: 1600,
      currency: null,
    });
  });

  it("normalizes successful API lookups with failed, processing and refund transaction states", async () => {
    for (const [providerStatus, expected] of [
      ["Failed", "failed"],
      ["processing", "processing"],
      ["refund", "refund"],
    ] as const) {
      const provider = new PayStationProvider({
        mode: "sandbox",
        merchantId: "merchant",
        password: "private-password",
        fetch: vi.fn(async () =>
          Response.json({
            status_code: "200",
            status: "success",
            data: {
              invoice_number: checkoutInput.invoiceNumber,
              trx_status: providerStatus,
              trx_id: providerStatus === "processing" ? "" : "TRX-1",
              payment_amount: "1600.00",
            },
          }),
        ) as typeof fetch,
        logger: vi.fn(),
      });
      await expect(
        provider.getTransactionStatusByInvoice(checkoutInput.invoiceNumber),
      ).resolves.toMatchObject({ status: expected });
    }
  });

  it("rejects duplicate-invoice initiation as a safe provider error", async () => {
    const provider = new PayStationProvider({
      mode: "sandbox",
      merchantId: "merchant",
      password: "private-password",
      fetch: vi.fn(async () =>
        Response.json({
          status_code: "1008",
          status: "failed",
          message: "Duplicate invoice number.",
        }),
      ) as typeof fetch,
      logger: vi.fn(),
    });
    await expect(provider.initiateCheckout(checkoutInput)).rejects.toMatchObject({
      code: "provider_rejected",
      providerStatusCode: "1008",
    } satisfies Partial<PayStationError>);
  });

  it("never accepts a non-PayStation checkout redirect", async () => {
    const provider = new PayStationProvider({
      mode: "live",
      merchantId: "merchant",
      password: "private-password",
      fetch: vi.fn(async () =>
        Response.json({
          status_code: "200",
          status: "success",
          payment_url: "https://evil.example/checkout",
        }),
      ) as typeof fetch,
      logger: vi.fn(),
    });
    await expect(provider.initiateCheckout(checkoutInput)).rejects.toMatchObject({
      code: "unsafe_payment_url",
    } satisfies Partial<PayStationError>);
  });
});

describe("gateway fee policy", () => {
  it("applies the fee only when the customer bears it", () => {
    expect(calculateGatewayFee(1000, "merchant")).toBe(0);
    expect(calculateGatewayFee(1000, "customer")).toBe(20);
  });

  it("rounds fractional fees to numeric(12,2) precision", () => {
    expect(calculateGatewayFee(149, "customer")).toBe(2.98);
  });
});
