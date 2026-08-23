import { expect, test } from "@playwright/test";

test("homepage exposes the learning ecosystem and interactions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /আইন শুধু জানবেন না/ }),
  ).toBeVisible();
  await expect(page.locator(".associates-home > section")).toHaveCount(16);
  await page.locator("#tax-tools").scrollIntoViewIfNeeded();
  await page
    .getByRole("button", { name: /Business ব্যবসা ও trade income/ })
    .click();
  await expect(
    page.getByText("Financial statements, ledger ও bank statement"),
  ).toBeVisible();
  await page.locator("#faq").scrollIntoViewIfNeeded();
  await page
    .getByText("Associates Academy কি শুধুমাত্র Tax Professionals-এর জন্য?")
    .click();
  await expect(page.getByText(/প্রত্যেকে নিজের প্রয়োজন অনুযায়ী/)).toBeVisible();
  await expect(page.locator("html")).toHaveJSProperty(
    "scrollWidth",
    await page.locator("html").evaluate((element) => element.clientWidth),
  );
});

test("academy gateway routes to the course and checkout", async ({ page }) => {
  const invoice = "AA-0123456789ABCDEF0123456789ABCDEF";
  await page.route("**/api/checkout/quote", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        subtotal: 1710,
        discountAmount: 342,
        gatewayFee: 0,
        totalAmount: 1368,
        currency: "BDT",
      }),
    });
  });
  await page.route("**/api/payments/paystation/initiate", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        invoiceNumber: invoice,
        checkoutUrl: `https://sandbox.paystation.com.bd/checkout/${invoice}`,
      }),
    });
  });
  await page.route("https://sandbox.paystation.com.bd/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<main><h1>PayStation Sandbox Hosted Checkout</h1></main>",
    });
  });

  await page.goto("/");
  await expect(page).toHaveTitle(/Associates Academy/);
  await expect(
    page.getByRole("heading", { name: /আইন শুধু জানবেন না/ }),
  ).toBeVisible();
  await page.getByRole("link", { name: "কোর্সসমূহ দেখুন" }).first().click();
  await expect(page).toHaveURL(/\/courses$/);
  await expect(
    page.getByRole("heading", { name: /Fundamentals of Income Tax Act/ }),
  ).toBeVisible();
  await page.goto("/courses/income-tax-working-framework");
  await expect(
    page.getByRole("heading", { name: /Fundamentals of Income Tax Act/ }),
  ).toBeVisible();
  await expect(
    page.locator('a[href="/checkout/income-tax-working-framework"]').first(),
  ).toBeVisible();
  await page.goto("/checkout?product=income-tax-working-framework");
  await expect(page).toHaveURL(/\/checkout\/income-tax-working-framework/);
  await page.getByLabel("পূর্ণ নাম").fill("Local Test Learner");
  await page.getByLabel("ইমেইল *").fill("learner@example.com");
  await page.getByLabel("প্রাথমিক ফোন নম্বর *").fill("01700000000");
  await page.getByLabel("WhatsApp নম্বর *").fill("01700000000");
  await page.getByLabel("পেশা *").fill("Tax practitioner");
  await page.getByLabel("শহর *").fill("Dhaka");
  await page.getByLabel(/Coupon code/).fill("DEMO20");
  await page.getByRole("button", { name: "Apply করুন" }).click();
  await expect(page.getByText("Coupon discount apply হয়েছে")).toBeVisible();
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
  await page.getByRole("button", { name: "PayStation-এ পেমেন্ট করুন" }).click();
  await expect(page).toHaveURL(
    `https://sandbox.paystation.com.bd/checkout/${invoice}`,
  );
  await expect(
    page.getByRole("heading", { name: "PayStation Sandbox Hosted Checkout" }),
  ).toBeVisible();
});

test("practical return course exposes the complete workflow without placeholder offer data", async ({
  page,
}) => {
  await page.goto("/courses/practical-paper-return-e-return-filing");
  await expect(
    page.getByRole("heading", {
      name: /Paper Return থেকে NBR E-Return/,
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /৫টি মডিউল/ })).toBeVisible();
  await expect(page.getByText("IT10B + IT10BB", { exact: true })).toBeVisible();
  await expect(
    page
      .locator("main")
      .locator('a[href="/checkout/practical-paper-return-e-return-filing"]')
      .first(),
  ).toBeVisible();
  await expect(page.getByText(/৳XXXX|Coming Soon|TBD/)).toHaveCount(0);

  await page.goto("/checkout/practical-paper-return-e-return-filing");
  await expect(
    page.getByRole("heading", {
      name: "Practical Paper Return & E-Return Filing Course",
    }),
  ).toBeVisible();
  await expect(page.getByText("৳১,৬০০").first()).toBeVisible();
  await expect(page.getByText("৳২,০০০").first()).toBeVisible();
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
