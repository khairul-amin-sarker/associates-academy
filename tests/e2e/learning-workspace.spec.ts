import { expect, test } from "@playwright/test";

test("local learning dashboard exposes course progress and live-class actions", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(
    page.getByRole("heading", { name: /আপনার শেখার journey/ }),
  ).toBeVisible();
  await expect(page.getByText("৩৩%")).toBeVisible();
  await expect(page.getByRole("link", { name: /Course খুলুন/ })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Google Meet-এ Join করুন/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Add to Calendar/ }),
  ).toBeVisible();
  const liveClassTop = await page.getByText("Next live class").evaluate((node) => node.getBoundingClientRect().top);
  const progressTop = await page.getByText("Course progress").evaluate((node) => node.getBoundingClientRect().top);
  expect(liveClassTop).toBeLessThan(progressTop);
});

test("course workspace presents accessible module disclosures", async ({
  page,
}) => {
  await page.goto("/dashboard/courses/income-tax-working-framework");
  await expect(page.getByText("Course materials & certificate")).toBeVisible();
  await expect(
    page.getByText("আয়কর আইনের ভূমিকা ও মৌলিক কাঠামো"),
  ).toBeVisible();
  await page.getByText("করযোগ্যতা ও আবাসিক মর্যাদা").click();
  await expect(page.getByText("Taxability & Residential Status")).toBeVisible();
  await expect(page.locator("html")).toHaveJSProperty(
    "scrollWidth",
    await page.locator("html").evaluate((element) => element.clientWidth),
  );
});

test("learning management is available from the Admin console", async ({
  page,
}) => {
  await page.goto("/admin/courses");
  await expect(
    page.getByRole("heading", { name: "Courses & Learning" }),
  ).toBeVisible();
  await expect(page.getByText("Module live class")).toBeVisible();
  await expect(page.getByText("Private resource upload")).toBeVisible();
});
