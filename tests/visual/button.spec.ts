import { test, expect } from "@playwright/test";
import {
  gotoStory,
  takeStoryScreenshot,
  hoverAndWait,
  focusAndWait,
} from "./utils/helpers";

test.describe("Button Component Visual Tests", () => {
  test("Primary button - default state", async ({ page }) => {
    await gotoStory(page, "components-button", "primary");
    await takeStoryScreenshot(page, "button-primary-default");
  });

  test("Primary button - hover state", async ({ page }) => {
    await gotoStory(page, "components-button", "primary");
    await hoverAndWait(page, "button:visible");
    await takeStoryScreenshot(page, "button-primary-hover");
  });

  test("Primary button - focus state", async ({ page }) => {
    await gotoStory(page, "components-button", "primary");
    await focusAndWait(page, "button:visible");
    await takeStoryScreenshot(page, "button-primary-focus");
  });

  test("Secondary button", async ({ page }) => {
    await gotoStory(page, "components-button", "secondary");
    await takeStoryScreenshot(page, "button-secondary");
  });

  test("Destructive button", async ({ page }) => {
    await gotoStory(page, "components-button", "destructive");
    await takeStoryScreenshot(page, "button-destructive");
  });

  test("Outline button", async ({ page }) => {
    await gotoStory(page, "components-button", "outline");
    await takeStoryScreenshot(page, "button-outline");
  });

  test("Ghost button", async ({ page }) => {
    await gotoStory(page, "components-button", "ghost");
    await takeStoryScreenshot(page, "button-ghost");
  });

  test("Loading button", async ({ page }) => {
    await gotoStory(page, "components-button", "loading");
    await page.waitForSelector(".animate-spin");
    await takeStoryScreenshot(page, "button-loading");
  });

  test("Disabled button", async ({ page }) => {
    await gotoStory(page, "components-button", "disabled");
    await takeStoryScreenshot(page, "button-disabled");
  });

  test("All sizes", async ({ page }) => {
    await gotoStory(page, "components-button", "all-sizes");
    await takeStoryScreenshot(page, "button-all-sizes");
  });

  test("With left icon", async ({ page }) => {
    await gotoStory(page, "components-button", "with-left-icon");
    await takeStoryScreenshot(page, "button-with-left-icon");
  });

  test("With right icon", async ({ page }) => {
    await gotoStory(page, "components-button", "with-right-icon");
    await takeStoryScreenshot(page, "button-with-right-icon");
  });
});
