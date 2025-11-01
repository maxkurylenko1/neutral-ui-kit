import { test } from "@playwright/test";
import {
  gotoStory,
  takeStoryScreenshot,
  clickAndWait,
  hoverAndWait,
} from "./utils/helpers";

// toast tests
test.describe("Toast Component Visual Tests", () => {
  test("Toast - trigger button", async ({ page }) => {
    await gotoStory(page, "components-toast", "default");
    await takeStoryScreenshot(page, "toast-trigger");
  });

  test("Toast - default notification", async ({ page }) => {
    await gotoStory(page, "components-toast", "default");
    await clickAndWait(page, 'button:has-text("Show Toast")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-default");
  });

  test("Toast - success variant", async ({ page }) => {
    await gotoStory(page, "components-toast", "success");
    await clickAndWait(page, 'button:has-text("Show Success")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-success");
  });

  test("Toast - destructive variant", async ({ page }) => {
    await gotoStory(page, "components-toast", "destructive");
    await clickAndWait(page, 'button:has-text("Show Error")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-destructive");
  });

  test("Toast - warning variant", async ({ page }) => {
    await gotoStory(page, "components-toast", "warning");
    await clickAndWait(page, 'button:has-text("Show Warning")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-warning");
  });

  test("Toast - with action button", async ({ page }) => {
    await gotoStory(page, "components-toast", "with-action");
    await clickAndWait(page, 'button:has-text("Show with Action")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-with-action");
  });

  test("Toast - title only", async ({ page }) => {
    await gotoStory(page, "components-toast", "title-only");
    await clickAndWait(page, 'button:has-text("Title Only")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-title-only");
  });

  test("Toast - description only", async ({ page }) => {
    await gotoStory(page, "components-toast", "description-only");
    await clickAndWait(page, 'button:has-text("Description Only")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-description-only");
  });

  test("Toast - with undo action", async ({ page }) => {
    await gotoStory(page, "components-toast", "with-undo");
    await clickAndWait(page, 'button:has-text("Delete Item")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-with-undo");
  });

  test("Toast - long content", async ({ page }) => {
    await gotoStory(page, "components-toast", "long-content");
    await clickAndWait(page, 'button:has-text("Show Long Content")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-long-content");
  });

  test("Toast - multiple toasts", async ({ page }) => {
    await gotoStory(page, "components-toast", "multiple-toasts");
    await clickAndWait(page, 'button:has-text("Show Multiple")');

    await page.waitForTimeout(1500);
    await takeStoryScreenshot(page, "toast-multiple");
  });

  test("Toast - form submission success", async ({ page }) => {
    await gotoStory(page, "components-toast", "form-submission");
    await clickAndWait(page, 'button:has-text("Submit Success")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-form-success");
  });

  test("Toast - form submission error", async ({ page }) => {
    await gotoStory(page, "components-toast", "form-submission");
    await clickAndWait(page, 'button:has-text("Submit Error")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "toast-form-error");
  });
});

// Tooltip tests
test.describe("Tooltip Component Visual Tests", () => {
  test("Tooltip - trigger button", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "default");
    await takeStoryScreenshot(page, "tooltip-trigger");
  });

  test("Tooltip - visible on hover", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "default");
    await hoverAndWait(page, 'button:has-text("Hover me")');
    await takeStoryScreenshot(page, "tooltip-visible");
  });

  test("Tooltip - top position", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "top");
    await hoverAndWait(page, 'button:has-text("Top")');
    await takeStoryScreenshot(page, "tooltip-top");
  });

  test("Tooltip - right position", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "right");
    await hoverAndWait(page, 'button:has-text("Right")');
    await takeStoryScreenshot(page, "tooltip-right");
  });

  test("Tooltip - bottom position", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "bottom");
    await hoverAndWait(page, 'button:has-text("Bottom")');
    await takeStoryScreenshot(page, "tooltip-bottom");
  });

  test("Tooltip - left position", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "left");
    await hoverAndWait(page, 'button:has-text("Left")');
    await takeStoryScreenshot(page, "tooltip-left");
  });

  test("Tooltip - all sides", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "all-sides");
    await takeStoryScreenshot(page, "tooltip-all-sides-closed");

    await hoverAndWait(page, 'button:has-text("Top")', 500, {
      scopeToRoot: false,
    });
    await takeStoryScreenshot(page, "tooltip-all-sides-top-open");
  });

  test("Tooltip - with icon", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "with-icon");
    await hoverAndWait(page, "button");
    await takeStoryScreenshot(page, "tooltip-with-icon");
  });

  test("Tooltip - long content", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "long-content");
    await hoverAndWait(page, "button");
    await takeStoryScreenshot(page, "tooltip-long-content");
  });

  test("Tooltip - help text", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "help-text");
    await hoverAndWait(page, "button");
    await takeStoryScreenshot(page, "tooltip-help-text");
  });

  test("Tooltip - form example", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "form-example");
    await takeStoryScreenshot(page, "tooltip-form-example");

    await hoverAndWait(page, "button:nth-of-type(1)");
    await takeStoryScreenshot(page, "tooltip-form-example-hover");
  });

  test("Tooltip - icon buttons", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "icon-buttons");
    await takeStoryScreenshot(page, "tooltip-icon-buttons");

    await hoverAndWait(page, "button:nth-of-type(1)");
    await takeStoryScreenshot(page, "tooltip-icon-buttons-hover");
  });

  test("Tooltip - rich content", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "rich-content");
    await hoverAndWait(page, "button", 500);
    await takeStoryScreenshot(page, "tooltip-rich-content");
  });

  test("Tooltip - keyboard accessible", async ({ page }) => {
    await gotoStory(page, "components-tooltip", "keyboard-accessible");
    await page.focus("button:nth-of-type(1)");
    await page.waitForTimeout(500);
    await takeStoryScreenshot(page, "tooltip-keyboard-focus");
  });
});

// Pagination tests
test.describe("Pagination Component Visual Tests", () => {
  test("Pagination - default (page 1)", async ({ page }) => {
    await gotoStory(page, "components-pagination", "default");
    await takeStoryScreenshot(page, "pagination-default");
  });

  test("Pagination - page 3 selected", async ({ page }) => {
    await gotoStory(page, "components-pagination", "default");
    await clickAndWait(page, 'button[aria-label="Go to page 3"]');
    await takeStoryScreenshot(page, "pagination-page-3");
  });

  test("Pagination - last page", async ({ page }) => {
    await gotoStory(page, "components-pagination", "default");
    await clickAndWait(page, 'button[aria-label="Go to last page"]');
    await takeStoryScreenshot(page, "pagination-last-page");
  });

  test("Pagination - controlled state", async ({ page }) => {
    await gotoStory(page, "components-pagination", "controlled");
    await takeStoryScreenshot(page, "pagination-controlled");
  });

  test("Pagination - without first/last buttons", async ({ page }) => {
    await gotoStory(page, "components-pagination", "without-first-last");
    await takeStoryScreenshot(page, "pagination-no-first-last");
  });

  test("Pagination - without prev/next buttons", async ({ page }) => {
    await gotoStory(page, "components-pagination", "without-prev-next");
    await takeStoryScreenshot(page, "pagination-no-prev-next");
  });

  test("Pagination - minimal buttons", async ({ page }) => {
    await gotoStory(page, "components-pagination", "minimal-buttons");
    await takeStoryScreenshot(page, "pagination-minimal");
  });

  test("Pagination - large dataset", async ({ page }) => {
    await gotoStory(page, "components-pagination", "large-dataset");
    await takeStoryScreenshot(page, "pagination-large-dataset");
  });

  test("Pagination - large dataset last page", async ({ page }) => {
    await gotoStory(page, "components-pagination", "large-dataset");
    await clickAndWait(page, 'button[aria-label="Go to page 100"]');
    await takeStoryScreenshot(page, "pagination-large-dataset-last-page");
  });

  test("Pagination - small dataset", async ({ page }) => {
    await gotoStory(page, "components-pagination", "small-dataset");
    await takeStoryScreenshot(page, "pagination-small-dataset");
  });

  test("Pagination - more siblings", async ({ page }) => {
    await gotoStory(page, "components-pagination", "more-siblings");
    await takeStoryScreenshot(page, "pagination-more-siblings");
  });

  test("Pagination - fewer siblings", async ({ page }) => {
    await gotoStory(page, "components-pagination", "fewer-siblings");
    await takeStoryScreenshot(page, "pagination-fewer-siblings");
  });

  test("Pagination - with table", async ({ page }) => {
    await gotoStory(page, "components-pagination", "with-table");
    await takeStoryScreenshot(page, "pagination-with-table");
  });

  test("Pagination - with table page 2", async ({ page }) => {
    await gotoStory(page, "components-pagination", "with-table");
    await clickAndWait(page, 'button[aria-label="Go to page 2"]');
    await takeStoryScreenshot(page, "pagination-with-table-page-2");
  });

  test("Pagination - different page sizes", async ({ page }) => {
    await gotoStory(page, "components-pagination", "different-page-sizes");
    await takeStoryScreenshot(page, "pagination-page-size-10");

    await page.selectOption("select", "20");
    await page.waitForTimeout(500);
    await takeStoryScreenshot(page, "pagination-page-size-20");
  });

  test("Pagination - all states", async ({ page }) => {
    await gotoStory(page, "components-pagination", "all-states");
    await takeStoryScreenshot(page, "pagination-all-states");
  });

  test("Pagination - edge cases", async ({ page }) => {
    await gotoStory(page, "components-pagination", "edge-cases");
    await takeStoryScreenshot(page, "pagination-edge-cases");
  });

  test("Pagination - keyboard navigation", async ({ page }) => {
    await gotoStory(page, "components-pagination", "keyboard-navigation");
    await page.focus('button[aria-label="Go to page 5"]');
    await page.waitForTimeout(300);
    await takeStoryScreenshot(page, "pagination-keyboard-focus");
  });

  test("Pagination - hover state", async ({ page }) => {
    await gotoStory(page, "components-pagination", "default");
    await hoverAndWait(page, 'button[aria-label="Go to page 2"]', 300);
    await takeStoryScreenshot(page, "pagination-hover");
  });

  test("Pagination - disabled states", async ({ page }) => {
    await gotoStory(page, "components-pagination", "default");
    await takeStoryScreenshot(page, "pagination-disabled-prev");

    await clickAndWait(page, 'button[aria-label="Go to last page"]');
    await takeStoryScreenshot(page, "pagination-disabled-next");
  });
});
