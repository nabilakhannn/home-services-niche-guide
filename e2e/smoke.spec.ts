import { test, expect } from "@playwright/test";

test.describe("ScaleBuds marketing site", () => {
  test("home loads with hero", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("page-home")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /We Make Your Phone Ring/i,
      })
    ).toBeVisible();
  });

  test("Services page renders when linked from nav (scroll reset)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 5000));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);

    await page
      .locator("header")
      .getByRole("link", { name: "Services" })
      .click();

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.getByTestId("page-services")).toBeVisible();
    await expect(page.getByTestId("services-hero")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Marketing Services for Home Service Contractors/i,
      })
    ).toBeVisible();
  });

  test("direct navigation to /services", async ({ page }) => {
    await page.goto("/services");
    await expect(page.getByTestId("page-services")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Marketing Services for Home Service/i })
    ).toBeVisible();
  });

  test("Resources hub and one article", async ({ page }) => {
    await page.goto("/resources");
    await expect(
      page.getByRole("heading", { name: /Marketing guides for home service/i })
    ).toBeVisible();

    await page.getByRole("link", { name: /HVAC Marketing/i }).first().click();
    await expect(page).toHaveURL(/\/resources\/hvac-marketing-get-more-phone-calls/);
    await expect(
      page.getByRole("heading", { name: /HVAC Marketing/i })
    ).toBeVisible();
  });

  test("Contact page form fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test("About page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /ScaleBuds/i })
    ).toBeVisible();
  });

  test("home dual reality section shows headline and showcase images", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /finish the job/i })
    ).toBeVisible();
    await expect(
      page.locator('img[src="/showcase/hvac-without-ai.png"]')
    ).toBeVisible();
    await expect(
      page.locator('img[src="/showcase/hvac-with-ai.png"]')
    ).toBeVisible();
  });

  test("dual reality AI phone link navigates to services anchor", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("section[aria-labelledby='dual-reality-heading']");
    await section.getByRole("link", { name: /AI phone assistant/i }).click();
    await expect(page).toHaveURL(/\/services#ai-phone-assistant/);
    await expect(page.getByTestId("page-services")).toBeVisible();
    await expect(page.locator("#ai-phone-assistant")).toBeVisible();
    await expect(page.locator("#ai-phone-assistant")).toBeInViewport();
  });

  test("navbar primary links reach About, Resources, and Contact", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page.getByRole("heading", { name: /ScaleBuds/i })
    ).toBeVisible();

    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Resources" }).click();
    await expect(page).toHaveURL(/\/resources$/);
    await expect(
      page.getByRole("heading", { name: /Marketing guides for home service/i })
    ).toBeVisible();

    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Free Strategy Call" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
  });

  test("Services mega menu item lands on hashed services section", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.locator('header nav[aria-label="Primary"]');
    await nav.getByRole("link", { name: "Services" }).hover();
    await page.getByRole("menuitem", { name: /Local SEO/ }).click();
    await expect(page).toHaveURL(/\/services#local-seo/);
    await expect(page.locator("#local-seo")).toBeVisible();
    await expect(page.locator("#local-seo")).toBeInViewport();
  });

  test("footer service link and legal links navigate correctly", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .locator("footer")
      .getByRole("link", { name: "AI Phone Assistant" })
      .click();
    await expect(page).toHaveURL(/\/services#ai-phone-assistant/);

    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "Privacy Policy" }).first().click();
    await expect(page).toHaveURL(/\/privacy-policy$/);

    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "Terms of Service" }).first().click();
    await expect(page).toHaveURL(/\/terms-of-service$/);
  });
});
