import { expect, test } from "@playwright/test";

test("command center and website studio are operational in local demo mode", async ({
  page,
}) => {
  await page.goto("/admin");
  await expect(
    page.getByRole("heading", { name: /Academy Owner/ }),
  ).toBeVisible();
  await expect(page.getByText("First-party journey funnel")).toBeVisible();
  await page.goto("/admin/website-studio");
  await expect(page).toHaveURL(/\/admin\/website-studio/);
  await expect(
    page.getByRole("heading", { name: /Website Studio/ }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Publish/ })).toBeVisible();
});

test("analytics command center exposes honest integration health", async ({
  page,
}) => {
  await page.goto("/admin/analytics");
  await expect(
    page.getByRole("heading", { name: "Campaign Intelligence" }),
  ).toBeVisible();
  await expect(page.getByText("Integration health")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sync now" })).toBeVisible();
});
