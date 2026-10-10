import { expect, test } from "@playwright/test";
import { projects } from "../../src/features/projects/data/projects";

test("archive rows are visible on direct load and link to every case study", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/projects");
  await expect(page.locator(".project-row")).toHaveCount(projects.length);
  for (const project of projects) {
    const link = page.locator(`.project-link[href='/projects/${project.slug}']`);
    await expect(link).toBeVisible();
    await expect(link.locator("article")).toHaveCSS("opacity", "1");
    await link.click();
    await expect(page.locator("h1")).toHaveText(project.title);
    await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "PROJECTS", exact: true }).click();
  }
  expect(errors).toEqual([]);
});

test("About navigation returns to the homepage section", async ({ page }) => {
  await page.goto("/projects/bar-os");
  await page.getByRole("link", { name: "ABOUT", exact: true }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.locator("#about")).toBeInViewport();
});

test("unknown projects return 404", async ({ page }) => {
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Page not found");
});

test("all public content and navigation work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of ["/", "/projects", "/projects/bar-os"]) {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCSS("opacity", "1");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".nav-inner")).toBeVisible();
    await expect(page.locator(".splash")).toBeHidden();
  }
  await context.close();
});

test("reduced motion disables splash, parallax and hidden reveals", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".splash")).toBeHidden();
  await expect(page.locator(".reveal-pending")).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(page.locator(".portrait")).toHaveCSS("transform", "none");
  expect(await page.locator("meta[name='viewport']").getAttribute("content")).not.toContain("user-scalable=no");
});

test("leaving during the intro does not hide archive content", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "PROJECTS", exact: true }).click();
  await page.waitForTimeout(3600);
  await expect(page.locator(".splash")).toHaveCount(0);
  for (const row of await page.locator(".project-row").all()) await expect(row).toHaveCSS("opacity", "1");
});

test("case studies fit narrow screens without clipped project navigation", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/projects/rummy-500");
    const geometry = await page.evaluate(() => {
      const showcase = document.querySelector(".case-showcase")!.getBoundingClientRect();
      const links = [...document.querySelectorAll(".case-nav a")].map(e => ({ client: e.clientWidth, scroll: e.scrollWidth }));
      return { left: showcase.left, right: showcase.right, width: innerWidth, links };
    });
    expect(geometry.left).toBeGreaterThanOrEqual(0);
    expect(geometry.right).toBeLessThanOrEqual(geometry.width);
    for (const link of geometry.links) expect(link.scroll).toBeLessThanOrEqual(link.client + 1);
  }
});

test("homepage assets load and layouts remain within the viewport", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/projects", "/projects/bar-os"]) {
    await page.goto(route);
    if (route === "/") {
      const graphic = page.locator(".graphic-image");
      await expect(graphic).toBeVisible();
      await expect.poll(() => graphic.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
      await page.locator(".portrait-section").scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator(".portrait").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(page.viewportSize()!.width);
    await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll("/", "_") || "home"}.png`) });
  }
});

test("keyboard skip link and navigation stay accessible on every route", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/projects", "/projects/bar-os"]) {
    await page.goto(route);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);
    await expect(page.locator(".nav-logo")).toHaveCSS("mix-blend-mode", "normal");
  }
});
