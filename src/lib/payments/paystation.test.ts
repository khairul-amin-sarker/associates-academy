import { describe, expect, it } from "vitest";
import { calculateGatewayFee, normalizePayStationStatus } from "./paystation";

describe("PayStation normalization", () => {
  it.each([["success", "paid"], ["PAID", "paid"], ["processing", "pending"], ["failed", "failed"], ["refund", "refunded"]])("maps %s to %s", (value, expected) => { expect(normalizePayStationStatus(value)).toBe(expected); });
  it("applies fee only when customer bears it", () => { expect(calculateGatewayFee(1000, "merchant")).toBe(0); expect(calculateGatewayFee(1000, "customer")).toBe(20); });
  it("rounds fractional fees safely", () => { expect(calculateGatewayFee(149, "customer")).toBe(2.98); });
});
