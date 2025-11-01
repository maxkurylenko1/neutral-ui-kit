import { Page, expect } from "@playwright/test";

export async function gotoStory(
  page: Page,
  componentId: string,
  storyId: string
) {
  await page.goto(`/iframe.html?id=${componentId}--${storyId}&viewMode=story`, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector("#storybook-root", { timeout: 10000 });

  await page.waitForFunction(
    () => {
      const root = document.querySelector("#storybook-root");
      if (!root) return false;
      return Array.from(root.children).some((el) => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== "hidden" &&
          style.display !== "none"
        );
      });
    },
    { timeout: 10000 }
  );

  await page.waitForTimeout(1000);
}

export async function takeStoryScreenshot(
  page: Page,
  name: string,
  options?: {
    fullPage?: boolean;
    mask?: string[];
  }
) {
  const screenshot = await page.screenshot({
    fullPage: options?.fullPage ?? false,
    animations: "disabled",
  });

  await expect(screenshot).toMatchSnapshot(`${name}.png`, {
    maxDiffPixels: 100,
  });
}

export async function waitForImages(page: Page) {
  await page.evaluate(() => {
    const images = Array.from(document.images);
    return Promise.all(
      images
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    );
  });
}

export async function setTheme(page: Page, theme: "light" | "dark") {
  await page.evaluate((theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  }, theme);
  await page.waitForTimeout(300);
}

export async function hoverAndWait(
  page: Page,
  selector: string,
  waitMs = 500,
  options: { scopeToRoot?: boolean } = { scopeToRoot: true }
) {
  const element = options.scopeToRoot
    ? page.locator(`#storybook-root ${selector}`).first()
    : page.locator(selector).first();
  await element.waitFor({ state: "visible", timeout: 10000 });
  await element.hover();
  await page.waitForTimeout(waitMs);
}

export async function focusAndWait(
  page: Page,
  selector: string,
  waitMs = 300,
  options: { scopeToRoot?: boolean } = { scopeToRoot: true }
) {
  const element = options.scopeToRoot
    ? page.locator(`#storybook-root ${selector}`).first()
    : page.locator(selector).first();
  await element.waitFor({ state: "visible", timeout: 10000 });
  await element.focus();
  await page.waitForTimeout(waitMs);
}

export async function clickAndWait(
  page: Page,
  selector: string,
  waitMs = 500,
  options: { scopeToRoot?: boolean } = { scopeToRoot: true }
) {
  const element = options.scopeToRoot
    ? page.locator(`#storybook-root ${selector}`).first()
    : page.locator(selector).first();
  await element.waitFor({ state: "visible", timeout: 10000 });
  await element.click();
  await page.waitForTimeout(waitMs);
}

export async function hideDynamicContent(page: Page) {
  await page.addStyleTag({
    content: `
      * {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }
    `,
  });
}

export async function testComponentStates(
  page: Page,
  componentId: string,
  states: Array<{
    storyId: string;
    name: string;
    interactions?: (page: Page) => Promise<void>;
  }>
) {
  for (const state of states) {
    await gotoStory(page, componentId, state.storyId);

    if (state.interactions) {
      await state.interactions(page);
    }

    await takeStoryScreenshot(page, `${componentId}-${state.name}`);
  }
}
