import { describe, expect, it } from "vitest";
import { analyticsEventSchema } from "./analytics";

const valid = { eventId: "d42bb15b-8a78-4f02-a59b-d32c9a16765f", sessionId: "2077979f-4de0-4dcb-8235-5d19c8946e8e", name: "page_view", path: "/courses", occurredAt: "2026-08-15T01:00:00.000Z", properties: {} };

describe("analytics ingestion contract", () => {
  it("accepts allowlisted events", () => { expect(analyticsEventSchema.safeParse(valid).success).toBe(true); });
  it("rejects arbitrary event names and external paths", () => { expect(analyticsEventSchema.safeParse({ ...valid, name: "drop_table", path: "https://example.com" }).success).toBe(false); });
});
