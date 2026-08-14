import { describe, expect, it } from "vitest";
import { resolveAttribution } from "./attribution";

describe("first/last-touch attribution", () => {
  it("keeps only touchpoints inside the configured window", () => {
    const result = resolveAttribution([{ source: "expired", occurredAt: "2026-06-01T00:00:00Z" }, { source: "facebook", occurredAt: "2026-08-01T00:00:00Z" }, { source: "email", occurredAt: "2026-08-14T00:00:00Z" }], "2026-08-15T00:00:00Z", 30);
    expect(result.firstTouch?.source).toBe("facebook");
    expect(result.lastTouch?.source).toBe("email");
  });
});
