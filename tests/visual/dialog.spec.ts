import { test } from "@playwright/test";
import { gotoStory, takeStoryScreenshot, clickAndWait } from "./utils/helpers";

test.describe("Dialog Component Visual Tests", () => {
  test("Dialog - closed state", async ({ page }) => {
    await gotoStory(page, "components-dialog", "default");
    await takeStoryScreenshot(page, "dialog-closed");
  });

  test("Dialog - open state", async ({ page }) => {
    await gotoStory(page, "components-dialog", "default");
    await clickAndWait(page, 'button:has-text("Open Dialog")');
    await takeStoryScreenshot(page, "dialog-open");
  });

  test("Dialog with actions", async ({ page }) => {
    await gotoStory(page, "components-dialog", "with-actions");
    await clickAndWait(page, 'button:has-text("Open Dialog")');
    await takeStoryScreenshot(page, "dialog-with-actions");
  });

  test("Dialog with form", async ({ page }) => {
    await gotoStory(page, "components-dialog", "with-form");
    await clickAndWait(page, 'button:has-text("Edit Profile")');
    await takeStoryScreenshot(page, "dialog-with-form");
  });

  test("Destructive dialog", async ({ page }) => {
    await gotoStory(page, "components-dialog", "destructive");
    await clickAndWait(page, 'button:has-text("Delete Account")');
    await takeStoryScreenshot(page, "dialog-destructive");
  });

  test("Dialog with long content", async ({ page }) => {
    await gotoStory(page, "components-dialog", "long-content");
    await clickAndWait(page, 'button:has-text("View Terms")');
    await takeStoryScreenshot(page, "dialog-long-content");
  });

  test("Multi-step dialog", async ({ page }) => {
    await gotoStory(page, "components-dialog", "multi-step");

    await clickAndWait(page, 'button:has-text("Start Setup")');
    await takeStoryScreenshot(page, "dialog-multi-step-1");

    await clickAndWait(page, 'button:has-text("Next")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "dialog-multi-step-2");

    await clickAndWait(page, 'button:has-text("Next")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "dialog-multi-step-3");
  });
});
