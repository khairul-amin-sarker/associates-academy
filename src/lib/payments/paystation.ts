import "server-only";

import { z } from "zod";

export type PayStationMode = "sandbox" | "live";
export type PayStationTransactionStatus =
  | "processing"
  | "success"
  | "failed"
  | "refund";

export type InitiateCheckoutInput = {
  invoiceNumber: string;
  amount: number;
  currency: "BDT";
  callbackUrl: string;
  payWithCharge: 0 | 1;
  reference: string;
  checkoutItems: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
};

export type InitiateCheckoutResult = {
  paymentUrl: string;
  invoiceNumber: string;
  amount: number;
  providerStatusCode: string;
};

export type TransactionStatusResult = {
  requestSuccessful: boolean;
  providerStatusCode: string;
  status: PayStationTransactionStatus;
  invoiceNumber: string;
  transactionId: string;
  amount: number | null;
  currency: string | null;
  reference: string | null;
  paymentMethod: string | null;
  raw: Record<string, unknown>;
};

type PayStationLogger = (event: {
  operation: "initiate" | "status";
  mode: PayStationMode;
  invoiceNumber: string;
  outcome: "success" | "provider_error" | "network_error";
  httpStatus?: number;
  providerStatusCode?: string;
}) => void;

const initiateResponseSchema = z
  .object({
    status_code: z.union([z.string(), z.number()]).transform(String),
    status: z.string(),
    message: z.string().optional(),
    payment_amount: z.coerce.number().optional(),
    invoice_number: z.string().optional(),
    payment_url: z.string().url().optional(),
  })
  .passthrough();

const transactionDataSchema = z
  .object({
    invoice_number: z.string(),
    trx_status: z.union([z.string(), z.number()]),
    trx_id: z.string().nullish(),
    payment_amount: z.coerce.number().nullish(),
    reference: z.string().nullish(),
    payment_method: z.string().nullish(),
    currency: z.string().nullish(),
  })
  .passthrough();

const transactionResponseSchema = z
  .object({
    status_code: z.union([z.string(), z.number()]).transform(String),
    status: z.string(),
    message: z.string().optional(),
    data: transactionDataSchema.optional(),
  })
  .passthrough();

export class PayStationError extends Error {
  constructor(
    public readonly code:
      | "not_configured"
      | "timeout"
      | "network"
      | "invalid_response"
      | "provider_rejected"
      | "unsafe_payment_url",
    public readonly operation: "initiate" | "status",
    public readonly httpStatus?: number,
    public readonly providerStatusCode?: string,
  ) {
    super(`paystation_${operation}_${code}`);
    this.name = "PayStationError";
  }
}

export function normalizePayStationStatus(
  value: unknown,
): PayStationTransactionStatus {
  const status = String(value ?? "")
    .trim()
    .toLowerCase();
  if (status === "success" || status === "successful" || status === "paid")
    return "success";
  if (status === "refund" || status === "refunded") return "refund";
  if (
    status === "failed" ||
    status === "failure" ||
    status === "cancelled" ||
    status === "canceled"
  )
    return "failed";
  return "processing";
}

export function calculateGatewayFee(
  amount: number,
  mode: "merchant" | "customer",
  rate = 0.02,
) {
  return mode === "customer" ? Math.round(amount * rate * 100) / 100 : 0;
}

function defaultLogger(event: Parameters<PayStationLogger>[0]) {
  const log = { integration: "paystation", ...event };
  if (event.outcome === "success") console.info(log);
  else console.warn(log);
}

function safeJson(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export class PayStationProvider {
  readonly mode: PayStationMode;
  private readonly baseUrl: string;
  private readonly merchantId?: string;
  private readonly password?: string;
  private readonly fetcher: typeof fetch;
  private readonly logger: PayStationLogger;
  private readonly timeoutMs: number;

  constructor(
    options: {
      mode?: PayStationMode;
      merchantId?: string;
      password?: string;
      fetch?: typeof fetch;
      logger?: PayStationLogger;
      timeoutMs?: number;
    } = {},
  ) {
    this.mode =
      options.mode ??
      (process.env.PAYSTATION_MODE === "live" ? "live" : "sandbox");
    this.baseUrl =
      this.mode === "sandbox"
        ? "https://sandbox.paystation.com.bd"
        : "https://api.paystation.com.bd";
    this.merchantId =
      options.merchantId ??
      (this.mode === "sandbox"
        ? process.env.PAYSTATION_SANDBOX_MERCHANT_ID
        : process.env.PAYSTATION_LIVE_MERCHANT_ID);
    this.password =
      options.password ??
      (this.mode === "sandbox"
        ? process.env.PAYSTATION_SANDBOX_PASSWORD
        : process.env.PAYSTATION_LIVE_PASSWORD);
    this.fetcher = options.fetch ?? fetch;
    this.logger = options.logger ?? defaultLogger;
    this.timeoutMs = options.timeoutMs ?? 15_000;
  }

  get configured() {
    return Boolean(this.merchantId && this.password);
  }

  async initiateCheckout(
    input: InitiateCheckoutInput,
  ): Promise<InitiateCheckoutResult> {
    this.assertConfigured("initiate");
    const fields = {
      merchantId: this.merchantId!,
      password: this.password!,
      invoice_number: input.invoiceNumber,
      currency: input.currency,
      payment_amount: input.amount.toFixed(2),
      pay_with_charge: String(input.payWithCharge),
      reference: input.reference,
      cust_name: input.customer.name,
      cust_phone: input.customer.phone,
      cust_email: input.customer.email,
      cust_address: input.customer.address ?? "",
      callback_url: input.callbackUrl,
      checkout_items: input.checkoutItems,
    };

    // PayStation's official Sandbox collection requires multipart/form-data.
    // Its live v1 documentation shows application/x-www-form-urlencoded.
    const body =
      this.mode === "sandbox"
        ? Object.entries(fields).reduce((form, [key, value]) => {
            form.append(key, value);
            return form;
          }, new FormData())
        : new URLSearchParams(fields);

    const response = await this.request(
      `${this.baseUrl}/initiate-payment`,
      {
        method: "POST",
        headers:
          this.mode === "sandbox"
            ? { accept: "application/json" }
            : {
                accept: "application/json",
                "content-type": "application/x-www-form-urlencoded",
              },
        body,
      },
      "initiate",
      input.invoiceNumber,
    );

    let parsed: z.infer<typeof initiateResponseSchema>;
    try {
      parsed = initiateResponseSchema.parse(await response.json());
    } catch {
      throw new PayStationError(
        "invalid_response",
        "initiate",
        response.status,
      );
    }
    if (
      parsed.status_code !== "200" ||
      parsed.status.toLowerCase() !== "success" ||
      !parsed.payment_url
    ) {
      this.logger({
        operation: "initiate",
        mode: this.mode,
        invoiceNumber: input.invoiceNumber,
        outcome: "provider_error",
        httpStatus: response.status,
        providerStatusCode: parsed.status_code,
      });
      throw new PayStationError(
        "provider_rejected",
        "initiate",
        response.status,
        parsed.status_code,
      );
    }

    const paymentUrl = new URL(parsed.payment_url);
    if (
      paymentUrl.protocol !== "https:" ||
      !(
        paymentUrl.hostname === "paystation.com.bd" ||
        paymentUrl.hostname.endsWith(".paystation.com.bd")
      )
    ) {
      throw new PayStationError(
        "unsafe_payment_url",
        "initiate",
        response.status,
        parsed.status_code,
      );
    }
    this.logger({
      operation: "initiate",
      mode: this.mode,
      invoiceNumber: input.invoiceNumber,
      outcome: "success",
      httpStatus: response.status,
      providerStatusCode: parsed.status_code,
    });
    return {
      paymentUrl: paymentUrl.toString(),
      invoiceNumber: parsed.invoice_number ?? input.invoiceNumber,
      amount: parsed.payment_amount ?? input.amount,
      providerStatusCode: parsed.status_code,
    };
  }

  async getTransactionStatusByInvoice(
    invoiceNumber: string,
  ): Promise<TransactionStatusResult> {
    this.assertConfigured("status");
    const response = await this.request(
      `${this.baseUrl}/transaction-status`,
      {
        method: "POST",
        headers:
          this.mode === "sandbox"
            ? {
                accept: "application/json",
                "content-type": "application/json",
                merchantId: this.merchantId!,
              }
            : {
                accept: "application/json",
                "content-type": "application/x-www-form-urlencoded",
                merchantId: this.merchantId!,
              },
        body:
          this.mode === "sandbox"
            ? JSON.stringify({ invoice_number: invoiceNumber })
            : new URLSearchParams({ invoice_number: invoiceNumber }),
      },
      "status",
      invoiceNumber,
    );

    let parsed: z.infer<typeof transactionResponseSchema>;
    let raw: Record<string, unknown>;
    try {
      raw = safeJson(await response.json());
      parsed = transactionResponseSchema.parse(raw);
    } catch {
      throw new PayStationError("invalid_response", "status", response.status);
    }

    const requestSuccessful =
      parsed.status_code === "200" &&
      parsed.status.trim().toLowerCase() === "success" &&
      Boolean(parsed.data);
    const status = requestSuccessful
      ? normalizePayStationStatus(parsed.data?.trx_status)
      : "failed";
    this.logger({
      operation: "status",
      mode: this.mode,
      invoiceNumber,
      outcome: requestSuccessful ? "success" : "provider_error",
      httpStatus: response.status,
      providerStatusCode: parsed.status_code,
    });

    return {
      requestSuccessful,
      providerStatusCode: parsed.status_code,
      status,
      invoiceNumber: parsed.data?.invoice_number ?? "",
      transactionId: parsed.data?.trx_id?.trim() ?? "",
      amount: parsed.data?.payment_amount ?? null,
      // PayStation currently documents no currency response field for v1/v2.
      // Keep it nullable so verification never invents provider evidence.
      currency: parsed.data?.currency?.trim().toUpperCase() ?? null,
      reference: parsed.data?.reference?.trim() || null,
      paymentMethod: parsed.data?.payment_method?.trim() || null,
      raw,
    };
  }

  private assertConfigured(operation: "initiate" | "status") {
    if (!this.configured)
      throw new PayStationError("not_configured", operation);
  }

  private async request(
    url: string,
    init: RequestInit,
    operation: "initiate" | "status",
    invoiceNumber: string,
  ) {
    try {
      const response = await this.fetcher(url, {
        ...init,
        cache: "no-store",
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!response.ok) {
        this.logger({
          operation,
          mode: this.mode,
          invoiceNumber,
          outcome: "provider_error",
          httpStatus: response.status,
        });
        throw new PayStationError(
          "provider_rejected",
          operation,
          response.status,
        );
      }
      return response;
    } catch (error) {
      if (error instanceof PayStationError) throw error;
      const timeout =
        error instanceof DOMException &&
        (error.name === "TimeoutError" || error.name === "AbortError");
      this.logger({
        operation,
        mode: this.mode,
        invoiceNumber,
        outcome: "network_error",
      });
      throw new PayStationError(timeout ? "timeout" : "network", operation);
    }
  }
}
