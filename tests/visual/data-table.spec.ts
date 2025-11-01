import { test } from "@playwright/test";
import { gotoStory, takeStoryScreenshot, clickAndWait } from "./utils/helpers";

test.describe("DataTable Component Visual Tests", () => {
  test("Default table", async ({ page }) => {
    await gotoStory(page, "components-datatable", "default");
    await takeStoryScreenshot(page, "datatable-default");
  });

  test("Table with sorting", async ({ page }) => {
    await gotoStory(page, "components-datatable", "with-sorting");
    await takeStoryScreenshot(page, "datatable-with-sorting");
  });

  test("Table - sorted ascending", async ({ page }) => {
    await gotoStory(page, "components-datatable", "with-sorting");
    await clickAndWait(page, 'th:has-text("Name")');
    await takeStoryScreenshot(page, "datatable-sorted-asc");
  });

  test("Table - sorted descending", async ({ page }) => {
    await gotoStory(page, "components-datatable", "with-sorting");
    await clickAndWait(page, 'th:has-text("Name")');
    await takeStoryScreenshot(page, "datatable-sorted-desc");
  });

  test("Loading state", async ({ page }) => {
    await gotoStory(page, "components-datatable", "loading");
    await page.waitForSelector(".animate-spin");
    await takeStoryScreenshot(page, "datatable-loading");
  });

  test("Empty state", async ({ page }) => {
    await gotoStory(page, "components-datatable", "empty");
    await takeStoryScreenshot(page, "datatable-empty");
  });

  test("Custom empty message", async ({ page }) => {
    await gotoStory(page, "components-datatable", "custom-empty-message");
    await takeStoryScreenshot(page, "datatable-custom-empty");
  });

  test("Table with pagination", async ({ page }) => {
    await gotoStory(page, "components-datatable", "large-dataset");
    await takeStoryScreenshot(page, "datatable-with-pagination");
  });

  test("Table - page 2", async ({ page }) => {
    await gotoStory(page, "components-datatable", "large-dataset");
    await clickAndWait(page, 'button[aria-label="Go to page 2"]');
    await takeStoryScreenshot(page, "datatable-page-2");
  });

  test("Table with custom styling", async ({ page }) => {
    await gotoStory(page, "components-datatable", "with-custom-styling");
    await takeStoryScreenshot(page, "datatable-custom-styling");
  });

  test("Advanced columns", async ({ page }) => {
    await gotoStory(page, "components-datatable", "advanced-columns");
    await takeStoryScreenshot(page, "datatable-advanced-columns");
  });
});
