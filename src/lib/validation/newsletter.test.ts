import { describe, expect, it } from "vitest";
import { newsletterSubscriptionSchema } from "./newsletter";

describe("newsletterSubscriptionSchema", () => {
  it("normalizes a valid Tax Brief subscription", () => {
    const result = newsletterSubscriptionSchema.parse({
      email: " Learner@Example.com ",
      interests: ["income-tax", "vat", "vat"],
      website: "",
    });

    expect(result).toEqual({
      email: "learner@example.com",
      interests: ["income-tax", "vat"],
      website: "",
    });
  });

  it("rejects an empty interest selection", () => {
    expect(
      newsletterSubscriptionSchema.safeParse({
        email: "learner@example.com",
        interests: [],
        website: "",
      }).success,
    ).toBe(false);
  });
});
