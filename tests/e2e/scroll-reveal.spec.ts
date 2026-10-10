import { expect, test } from "@playwright/test";

test("every route reveals offscreen content once, including tall content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const route of ["/", "/projects", "/projects/bar-os"]) {
    await page.goto(route);
    await expect(page.locator(".reveal-pending").first()).toHaveCSS("opacity", "0");
    await expect(page.locator("h1")).toHaveCSS("opacity", "1");
    // A section taller than the viewport must not require a percentage to fit.
    const target = route === "/" ? page.locator(".services-statement") : route === "/projects" ? page.locator(".project-row").last() : page.locator(".case-wide-copy").last().locator("p");
    await target.evaluate(element => { (element as HTMLElement).style.minHeight = "120vh"; });
    await target.scrollIntoViewIfNeeded();
    await expect(target).toHaveCSS("opacity", "1");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(target).toHaveCSS("opacity", "1");
    await expect(page.locator("main [data-reveal] [data-reveal]")).toHaveCount(0);
  }
});

test("keyboard focus and live reduced-motion changes reveal content immediately", async ({ page }) => {
  await page.goto("/projects");
  const row = page.locator(".project-row").last();
  await expect(row).toHaveCSS("opacity", "0");
  await page.locator(".project-link").last().focus();
  await expect(row).toHaveCSS("opacity", "1");
  await page.goto("/projects/bar-os");
  await expect(page.locator(".reveal-pending").first()).toHaveCSS("opacity", "0");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".reveal-pending")).toHaveCount(0);
  for (const item of await page.locator("main [data-reveal]").all()) await expect(item).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("h1")).toHaveCSS("opacity", "1");
});

test("missing or failed observers leave all content readable", async ({ page }) => {
  await page.addInitScript(() => { delete (window as unknown as { IntersectionObserver?: unknown }).IntersectionObserver; });
  await page.goto("/projects");
  await expect(page.locator(".project-row").last()).toHaveCSS("opacity", "1");
  await expect(page.locator(".reveal-pending")).toHaveCount(0);
});

test("a stalled observer fails open", async ({ browser }) => {
  const context = await browser.newContext();
  await context.addInitScript(() => {
    window.IntersectionObserver = class {
      observe() {} unobserve() {} disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });
  const page = await context.newPage();
  await page.goto("/projects");
  await expect(page.locator(".project-row").last()).toHaveCSS("opacity", "1", { timeout: 4000 });
  await expect(page.locator(".reveal-pending")).toHaveCount(0);
  await context.close();
});

test("client navigation sets up fresh reveals and direct anchor destinations stay readable", async ({ page }) => {
  await page.goto("/projects");
  await page.locator(".project-link").first().click();
  await expect(page.locator(".case-wide-copy").last().locator("p")).toHaveCSS("opacity", "0");
  await page.getByRole("link", { name: "ABOUT", exact: true }).click();
  await expect(page.locator("#about")).toBeInViewport();
  await expect(page.locator("#about p")).toHaveCSS("opacity", "1");
  await page.goto("/#about");
  await expect(page.locator("#about p")).toHaveCSS("opacity", "1");
});

test("healthy observers keep distant content waiting beyond the startup watchdog", async ({ page }) => {
  await page.goto("/projects");
  const row = page.locator(".project-row").last();
  await expect(row).toHaveCSS("opacity", "0");
  await page.waitForTimeout(2300);
  await expect(row).toHaveCSS("opacity", "0");
  await row.scrollIntoViewIfNeeded();
  await expect(row).toHaveCSS("opacity", "1");
});

test("entering content runs a fade transition instead of appearing abruptly", async ({ page }) => {
  for (const route of ["/projects", "/"]) {
    await page.goto(route);
    const target = route === "/" ? page.locator(".service-content h2").last() : page.locator(".project-row").last();
    await expect(target).toHaveCSS("opacity", "0");
    await target.evaluate(element => element.scrollIntoView({ behavior: "instant", block: "center" }));
    await expect.poll(() => target.evaluate(element => element.getAnimations().some(animation => animation instanceof CSSTransition && animation.transitionProperty === "opacity" && animation.playState === "running"))).toBe(true);
    await expect(target).toHaveCSS("opacity", "1");
  }
});
