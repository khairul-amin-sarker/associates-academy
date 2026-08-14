import { z } from "zod";

export type NormalizedPaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type CheckoutRequest = { invoiceNumber: string; amount: number; currency: "BDT"; callbackUrl: string; customer: { name: string; email: string; phone: string } };
export type VerificationResult = { invoiceNumber: string; transactionId: string; amount: number; currency: string; status: NormalizedPaymentStatus; raw: unknown };

const responseSchema = z.object({ status: z.union([z.string(), z.number()]).optional(), message: z.string().optional(), payment_url: z.string().url().optional(), checkout_url: z.string().url().optional(), invoice_number: z.string().optional(), transaction_id: z.string().optional(), trx_id: z.string().optional(), amount: z.coerce.number().optional(), currency: z.string().optional() }).passthrough();

export function normalizePayStationStatus(value: unknown): NormalizedPaymentStatus {
  const status = String(value ?? "").trim().toLowerCase();
  if (["success", "successful", "paid", "1"].includes(status)) return "paid";
  if (["refund", "refunded"].includes(status)) return "refunded";
  if (["failed", "failure", "cancelled", "canceled", "0"].includes(status)) return "failed";
  return "pending";
}

export function calculateGatewayFee(amount: number, mode: "merchant" | "customer", rate = 0.02) {
  return mode === "customer" ? Math.round(amount * rate * 100) / 100 : 0;
}

export class PayStationProvider {
  private baseUrl = process.env.PAYSTATION_BASE_URL ?? "https://api.paystation.com.bd";
  private merchantId = process.env.PAYSTATION_MERCHANT_ID;
  private password = process.env.PAYSTATION_PASSWORD;

  get configured() { return Boolean(this.merchantId && this.password); }

  async createCheckout(input: CheckoutRequest) {
    if (!this.configured) throw new Error("paystation_not_configured");
    const body = new URLSearchParams({ merchantId: this.merchantId!, password: this.password!, invoice_number: input.invoiceNumber, amount: input.amount.toFixed(2), currency: input.currency, callback_url: input.callbackUrl, customer_name: input.customer.name, customer_email: input.customer.email, customer_phone: input.customer.phone });
    const response = await fetch(`${this.baseUrl}/initiate-payment`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" }, body, cache: "no-store", signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`paystation_initiate_${response.status}`);
    const data = responseSchema.parse(await response.json());
    const url = data.payment_url ?? data.checkout_url;
    if (!url) throw new Error("paystation_missing_checkout_url");
    return { url, raw: data };
  }

  async verifyTransaction(invoiceNumber: string): Promise<VerificationResult> {
    if (!this.configured) throw new Error("paystation_not_configured");
    const url = new URL(`${this.baseUrl}/transaction-status`);
    url.searchParams.set("invoice_number", invoiceNumber);
    const response = await fetch(url, { headers: { merchantId: this.merchantId!, accept: "application/json" }, cache: "no-store", signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`paystation_verify_${response.status}`);
    const data = responseSchema.parse(await response.json());
    return { invoiceNumber: data.invoice_number ?? invoiceNumber, transactionId: data.transaction_id ?? data.trx_id ?? "", amount: data.amount ?? Number.NaN, currency: data.currency ?? "BDT", status: normalizePayStationStatus(data.status), raw: data };
  }
}
