import { test } from "@playwright/test";
import { gotoStory, takeStoryScreenshot, focusAndWait } from "./utils/helpers";

test.describe("Input Component Visual Tests", () => {
  test("Default input", async ({ page }) => {
    await gotoStory(page, "components-input", "default");
    await takeStoryScreenshot(page, "input-default");
  });

  test("Input with label", async ({ page }) => {
    await gotoStory(page, "components-input", "with-label");
    await takeStoryScreenshot(page, "input-with-label");
  });

  test("Input focused state", async ({ page }) => {
    await gotoStory(page, "components-input", "with-label");
    await focusAndWait(page, "input");
    await takeStoryScreenshot(page, "input-focused");
  });

  test("Input with helper text", async ({ page }) => {
    await gotoStory(page, "components-input", "with-helper-text");
    await takeStoryScreenshot(page, "input-with-helper-text");
  });

  test("Input with error", async ({ page }) => {
    await gotoStory(page, "components-input", "with-error");
    await takeStoryScreenshot(page, "input-with-error");
  });

  test("Input with left icon", async ({ page }) => {
    await gotoStory(page, "components-input", "with-left-icon");
    await takeStoryScreenshot(page, "input-with-left-icon");
  });

  test("Input with right icon", async ({ page }) => {
    await gotoStory(page, "components-input", "with-right-icon");
    await takeStoryScreenshot(page, "input-with-right-icon");
  });

  test("Disabled input", async ({ page }) => {
    await gotoStory(page, "components-input", "disabled");
    await takeStoryScreenshot(page, "input-disabled");
  });

  test("All sizes", async ({ page }) => {
    await gotoStory(page, "components-input", "all-sizes");
    await takeStoryScreenshot(page, "input-all-sizes");
  });

  test("Form example", async ({ page }) => {
    await gotoStory(page, "components-input", "form-example");
    await takeStoryScreenshot(page, "input-form-example");
  });
});
