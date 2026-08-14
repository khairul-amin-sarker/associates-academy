import "server-only";

import { render } from "@react-email/render";
import { Resend } from "resend";
import { PaymentReceiptEmail } from "@/emails/payment-receipt";
import { createAdminClient } from "@/lib/supabase/server";

type OutboxRow = { id: string; idempotency_key: string; template_key: string; recipient_email: string; payload: Record<string, unknown>; attempt_count: number };

function nextAttempt(attempt: number) {
  const minutes = Math.min(24 * 60, 2 ** Math.min(attempt, 10));
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

export async function processEmailOutbox(limit = 20) {
  const admin = createAdminClient();
  const apiKey = process.env.RESEND_API_KEY;
  if (!admin || !apiKey) return { configured: false, processed: 0, sent: 0, failed: 0 };
  const resend = new Resend(apiKey);
  const { data, error } = await admin.rpc("claim_email_outbox", { p_limit: limit });
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as OutboxRow[];
  let sent = 0;
  let failed = 0;
  for (const row of rows) {
    try {
      if (row.template_key !== "payment_receipt") throw new Error("unknown_email_template");
      const invoice = String(row.payload.invoice ?? "");
      const amount = Number(row.payload.amount ?? 0);
      const html = await render(PaymentReceiptEmail({ invoice, amount }));
      const result = await resend.emails.send({ from: process.env.EMAIL_FROM_INVOICE ?? "Associates Academy <invoice@associatesacademy.com.bd>", to: row.recipient_email, subject: `Payment receipt · ${invoice}`, html }, { idempotencyKey: row.idempotency_key });
      if (result.error) throw new Error(result.error.message);
      await admin.from("email_outbox").update({ status: "sent", sent_at: new Date().toISOString(), locked_at: null, last_error: null }).eq("id", row.id);
      await admin.from("email_delivery_logs").insert({ outbox_id: row.id, provider_message_id: result.data?.id ?? null, event_type: "sent" });
      sent += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message.slice(0, 1000) : "unknown_error";
      await admin.from("email_outbox").update({ status: "failed", locked_at: null, next_attempt_at: nextAttempt(row.attempt_count), last_error: message }).eq("id", row.id);
      await admin.from("email_delivery_logs").insert({ outbox_id: row.id, event_type: "failed", detail: { message } });
      failed += 1;
    }
  }
  return { configured: true, processed: rows.length, sent, failed };
}
