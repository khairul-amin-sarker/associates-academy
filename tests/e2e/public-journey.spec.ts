import { expect, test } from "@playwright/test";

test("academy gateway routes to the course and checkout", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Associates Academy/);
  await expect(
    page.getByRole("heading", { name: /Professional Compliance/ }),
  ).toBeVisible();
  await page.getByRole("link", { name: "কোর্স দেখুন" }).first().click();
  await expect(page).toHaveURL(/\/courses$/);
  await expect(page.getByRole("heading", { name: /Fundamentals of Income Tax Act/ })).toBeVisible();
  await page.goto("/courses/income-tax-working-framework");
  await expect(
    page.getByRole("heading", { name: /Fundamentals of Income Tax Act/ }),
  ).toBeVisible();
  await expect(
    page.locator('a[href="/checkout?product=income-tax-working-framework"]').first(),
  ).toBeVisible();
  await page.goto("/checkout?product=income-tax-working-framework");
  await expect(page).toHaveURL(
    /\/checkout\?product=income-tax-working-framework/,
  );
  await page.getByLabel("পূর্ণ নাম").fill("Local Test Learner");
  await page.getByLabel("Email").fill("learner@example.com");
  await page.getByLabel("Mobile number").fill("01700000000");
  await expect(page.getByText(/Terms & Conditions/)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Terms & Conditions" }),
  ).toHaveAttribute("href", "/terms");
  await expect(
    page.getByRole("link", { name: "Return & Refund Policy" }),
  ).toHaveAttribute("href", "/refund-policy");
  await expect(
    page.getByRole("link", { name: "Privacy Policy" }),
  ).toHaveAttribute("href", "/privacy-policy");
  await page.getByRole("button", { name: /পেমেন্ট করুন \/ Pay Now/ }).click();
  await expect(page).toHaveURL(/\/payment\/success\?invoice=AA-DEMO-/);
  await expect(
    page.getByRole("heading", { name: "Payment status received" }),
  ).toBeVisible();
});

test("footer exposes required compliance links and business information", async ({
  page,
}) => {
  await page.goto("/");
  const footer = page.locator("footer").last();
  await expect(footer.getByText("TRAD/DNCC/007397/2026")).toBeVisible();
  await expect(footer.getByText("contact@associatesacademy.bd")).toBeVisible();
  await expect(footer.getByText("+880 1712-192758")).toBeVisible();
  await expect(footer.getByText("+88 0193-4542908")).toBeVisible();
  for (const [label, href] of [
    ["About Us", "/about"],
    ["Business Address", "/business-address"],
    ["Terms & Conditions", "/terms"],
    ["Return & Refund Policy", "/refund-policy"],
    ["Privacy Policy", "/privacy-policy"],
    ["Delivery Policy", "/delivery-policy"],
  ] as const) {
    await expect(
      footer.locator(`a[href="${href}"]`, { hasText: label }).first(),
    ).toBeVisible();
  }
});

test("required compliance pages are directly accessible", async ({ page }) => {
  for (const [path, heading] of [
    ["/about", /About Associates Academy/],
    ["/business-address", /Business Address & Contact Information/],
    ["/terms", /Terms & Conditions/],
    ["/refund-policy", /Return & Refund Policy/],
    ["/privacy-policy", /Privacy Policy/],
    ["/delivery-policy", /Delivery Policy/],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
});

test("ebook checkout shows consent and compliance footer", async ({ page }) => {
  await page.goto("/ebook");
  await page.locator("#checkout").scrollIntoViewIfNeeded();
  const checkout = page.locator("#checkout");
  await expect(
    checkout.getByRole("button", { name: /পেমেন্ট করুন \/ Pay Now/ }),
  ).toBeVisible();
  await expect(
    checkout.getByRole("link", { name: "Privacy Policy" }),
  ).toHaveAttribute("href", "/privacy-policy");
  const footer = page.locator("footer").last();
  await expect(footer.getByText("TRAD/DNCC/007397/2026")).toBeVisible();
  await expect(
    footer
      .locator('a[href="/delivery-policy"]', { hasText: "Delivery Policy" })
      .first(),
  ).toBeVisible();
});

test("analytics opt-out is persistent and clear", async ({ page, context }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Analytics privacy settings" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Analytics privacy settings" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Analytics বন্ধ করুন" }).click();
  await expect
    .poll(async () =>
      page.evaluate(() => localStorage.getItem("aa_analytics_preference")),
    )
    .toBe("disabled");
  const cookies = await context.cookies();
  expect(
    cookies.find((cookie) => cookie.name === "aa_analytics_optout")?.value,
  ).toBe("1");
});
