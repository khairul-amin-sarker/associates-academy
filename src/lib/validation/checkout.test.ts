import { describe, expect, it } from "vitest";
import {
  checkoutCustomerSchema,
  checkoutRequestSchema,
  couponSchema,
} from "./checkout";

describe("checkout validation", () => {
  it("requires the enrollment contact details", () => {
    expect(
      checkoutCustomerSchema.safeParse({
        name: "Learner",
        email: "learner@example.com",
        phone: "01700000000",
      }).success,
    ).toBe(false);
    expect(
      checkoutCustomerSchema.safeParse({
        name: "Learner",
        email: "learner@example.com",
        phone: "01700000000",
        whatsappNumber: "01700000000",
        occupation: "Accountant",
        city: "Dhaka",
      }).success,
    ).toBe(true);
  });

  it("keeps the legacy eBook payment customer contract compatible", () => {
    expect(
      checkoutRequestSchema.safeParse({
        productSlug: "fundamentals-income-tax-ebook",
        customer: {
          name: "Test learner",
          email: "student@example.com",
          phone: "01712192758",
        },
      }).success,
    ).toBe(true);
  });

  it("accepts only a valid course-bound coupon configuration", () => {
    const valid = {
      productId: 1,
      code: "COURSE20",
      discountType: "percent",
      discountValue: 20,
      maxRedemptions: 20,
      maxRedemptionsPerUser: 1,
      startsAt: null,
      endsAt: null,
      isActive: true,
    };
    expect(couponSchema.safeParse(valid).success).toBe(true);
    expect(couponSchema.safeParse({ ...valid, code: "bad code" }).success).toBe(
      false,
    );
    expect(
      couponSchema.safeParse({ ...valid, discountValue: 101 }).success,
    ).toBe(false);
    expect(
      couponSchema.safeParse({
        ...valid,
        startsAt: "2026-08-23T00:00:00.000Z",
        endsAt: "2026-08-22T00:00:00.000Z",
      }).success,
    ).toBe(false);
  });
});
