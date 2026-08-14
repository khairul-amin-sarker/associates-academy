import { expect, test } from "@playwright/test";

test("academy gateway routes to the course and checkout", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Associates Academy/);
  await expect(page.getByRole("heading", { name: /Professional Compliance/ })).toBeVisible();
  await page.getByRole("link", { name: "কোর্স দেখুন" }).first().click();
  await expect(page).toHaveURL(/\/courses$/);
  await page.getByRole("link", { name: /Fundamentals of Income Tax Act/ }).first().click();
  await expect(page.getByRole("heading", { name: /Fundamentals of Income Tax Act/ })).toBeVisible();
  await page.getByRole("link", { name: "এনরোল করুন" }).click();
  await expect(page).toHaveURL(/\/checkout\?product=income-tax-working-framework/);
  await page.getByLabel("পূর্ণ নাম").fill("Local Test Learner");
  await page.getByLabel("Email").fill("learner@example.com");
  await page.getByLabel("Mobile number").fill("01700000000");
  await page.getByRole("button", { name: /Secure PayStation checkout/ }).click();
  await expect(page).toHaveURL(/\/payment\/success\?invoice=AA-DEMO-/);
  await expect(page.getByRole("heading", { name: "Payment status received" })).toBeVisible();
});

test("analytics opt-out is persistent and clear", async ({ page, context }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Analytics privacy settings" }).click();
  await expect(page.getByRole("dialog", { name: "Analytics privacy settings" })).toBeVisible();
  await page.getByRole("button", { name: "Analytics বন্ধ করুন" }).click();
  await expect.poll(async () => page.evaluate(() => localStorage.getItem("aa_analytics_preference"))).toBe("disabled");
  const cookies = await context.cookies();
  expect(cookies.find((cookie) => cookie.name === "aa_analytics_optout")?.value).toBe("1");
});

