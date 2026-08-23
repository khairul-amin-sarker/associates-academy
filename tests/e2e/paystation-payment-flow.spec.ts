import { expect, test } from "@playwright/test";

test("provider failure remains non-successful and keeps Bengali retry help", async ({
  page,
}) => {
  await page.route("**/api/payments/paystation/initiate", async (route) => {
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ error: "payment_provider_unavailable" }),
    });
  });

  await page.goto("/checkout/income-tax-working-framework");
  await page.getByLabel("পূর্ণ নাম *").fill("Retry Learner");
  await page.getByLabel("ইমেইল *").fill("retry@example.com");
  await page.getByLabel("প্রাথমিক ফোন নম্বর *").fill("01700000000");
  await page.getByLabel("WhatsApp নম্বর *").fill("01700000000");
  await page.getByLabel("পেশা *").fill("Accountant");
  await page.getByLabel("শহর *").fill("Dhaka");
  await page.getByRole("button", { name: "PayStation-এ পেমেন্ট করুন" }).click();

  await expect(page).toHaveURL(/\/checkout\/income-tax-working-framework$/);
  await expect(
    page.getByText(
      "PayStation এখন সাড়া দিচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।",
    ),
  ).toBeVisible();
  await expect(page.getByLabel("WhatsApp support")).toBeVisible();
});

test("mobile checkout validates every required learner field without overflow", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile project only");
  await page.goto("/checkout/income-tax-working-framework");
  await page.getByRole("button", { name: "PayStation-এ পেমেন্ট করুন" }).click();

  await expect(page.getByText("পূর্ণ নাম লিখুন")).toBeVisible();
  await expect(page.getByText("সঠিক ইমেইল লিখুন")).toBeVisible();
  await expect(page.getByText("সঠিক ফোন নম্বর লিখুন")).toBeVisible();
  await expect(page.getByText("সঠিক WhatsApp নম্বর লিখুন")).toBeVisible();
  await expect(page.getByText("পেশা লিখুন")).toBeVisible();
  await expect(page.getByText("শহর লিখুন")).toBeVisible();
  await expect(page.locator("html")).toHaveJSProperty(
    "scrollWidth",
    await page.locator("html").evaluate((element) => element.clientWidth),
  );
});

test("a learner who closed the callback can reopen the recovery workflow", async ({
  page,
}) => {
  await page.goto("/payment/recovery");
  await expect(
    page.getByRole("heading", { name: "আগে করা payment claim করুন" }),
  ).toBeVisible();
  await expect(
    page.getByText(/সেই verified email দিয়ে login করলে/),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "একই email দিয়ে লগইন করুন" }),
  ).toBeVisible();
  await expect(page.getByText(/Support:/)).toBeVisible();
});
