import { z } from "zod";

export const analyticsEventNames = ["page_view", "section_view", "scroll_depth", "cta_click", "checkout_started", "payment_initiated", "payment_failed", "verified_purchase", "dashboard_view", "live_class_join", "resource_download", "ebook_download"] as const;

export const analyticsEventSchema = z.object({
  eventId: z.uuid(),
  sessionId: z.uuid(),
  name: z.enum(analyticsEventNames),
  path: z.string().startsWith("/").max(500),
  occurredAt: z.iso.datetime(),
  properties: z.record(z.string(), z.unknown()).default({}),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
