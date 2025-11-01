import { test } from "@playwright/test";
import {
  gotoStory,
  takeStoryScreenshot,
  clickAndWait,
  focusAndWait,
} from "./utils/helpers";

// Select Tests
test.describe("Select Component Visual Tests", () => {
  test("Select - closed", async ({ page }) => {
    await gotoStory(page, "components-select", "default");
    await takeStoryScreenshot(page, "select-closed");
  });

  test("Select - open", async ({ page }) => {
    await gotoStory(page, "components-select", "default");
    await clickAndWait(page, '[role="combobox"]');
    await takeStoryScreenshot(page, "select-open");
  });

  test("Select - with value", async ({ page }) => {
    await gotoStory(page, "components-select", "with-default-value");
    await takeStoryScreenshot(page, "select-with-value");
  });

  test("Select - with groups", async ({ page }) => {
    await gotoStory(page, "components-select", "with-groups");
    await clickAndWait(page, '[role="combobox"]');
    await takeStoryScreenshot(page, "select-with-groups");
  });

  test("Select - with disabled options", async ({ page }) => {
    await gotoStory(page, "components-select", "with-disabled-options");
    await clickAndWait(page, '[role="combobox"]');
    await takeStoryScreenshot(page, "select-disabled-options");
  });

  test("Select - disabled", async ({ page }) => {
    await gotoStory(page, "components-select", "disabled");
    await takeStoryScreenshot(page, "select-disabled");
  });

  test("Select - long list", async ({ page }) => {
    await gotoStory(page, "components-select", "long-list");
    await clickAndWait(page, '[role="combobox"]');
    await takeStoryScreenshot(page, "select-long-list");
  });

  test("Select - focused", async ({ page }) => {
    await gotoStory(page, "components-select", "default");
    await focusAndWait(page, '[role="combobox"]');
    await takeStoryScreenshot(page, "select-focused");
  });
});

// Testarea Tests
test.describe("Textarea Component Visual Tests", () => {
  test("Textarea - default", async ({ page }) => {
    await gotoStory(page, "components-textarea", "default");
    await takeStoryScreenshot(page, "textarea-default");
  });

  test("Textarea with label", async ({ page }) => {
    await gotoStory(page, "components-textarea", "with-label");
    await takeStoryScreenshot(page, "textarea-with-label");
  });

  test("Textarea - focused", async ({ page }) => {
    await gotoStory(page, "components-textarea", "with-label");
    await focusAndWait(page, "textarea");
    await takeStoryScreenshot(page, "textarea-focused");
  });

  test("Textarea with helper text", async ({ page }) => {
    await gotoStory(page, "components-textarea", "with-helper-text");
    await takeStoryScreenshot(page, "textarea-with-helper");
  });

  test("Textarea with error", async ({ page }) => {
    await gotoStory(page, "components-textarea", "with-error");
    await takeStoryScreenshot(page, "textarea-with-error");
  });

  test("Textarea - disabled", async ({ page }) => {
    await gotoStory(page, "components-textarea", "disabled");
    await takeStoryScreenshot(page, "textarea-disabled");
  });

  test("Textarea - auto resize", async ({ page }) => {
    await gotoStory(page, "components-textarea", "auto-resize");
    await takeStoryScreenshot(page, "textarea-auto-resize");
  });

  test("Textarea - with content", async ({ page }) => {
    await gotoStory(page, "components-textarea", "long-content");
    await takeStoryScreenshot(page, "textarea-with-content");
  });

  test("Textarea - resize none", async ({ page }) => {
    await gotoStory(page, "components-textarea", "resize-none");
    await takeStoryScreenshot(page, "textarea-resize-none");
  });

  test("Textarea - comment box", async ({ page }) => {
    await gotoStory(page, "components-textarea", "comment-box");
    await takeStoryScreenshot(page, "textarea-comment-box");
  });
});

// Dropdown Menu Tests
test.describe("Dropdown Menu Component Visual Tests", () => {
  test("Dropdown - closed", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "default");
    await takeStoryScreenshot(page, "dropdown-closed");
  });

  test("Dropdown - open", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "default");
    await clickAndWait(page, 'button:has-text("Open Menu")');
    await takeStoryScreenshot(page, "dropdown-open");
  });

  test("Dropdown with icons", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "with-icons");
    await clickAndWait(page, 'button:has-text("Account")');
    await takeStoryScreenshot(page, "dropdown-with-icons");
  });

  test("Dropdown with shortcuts", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "with-shortcuts");
    await clickAndWait(page, 'button:has-text("Open")');
    await takeStoryScreenshot(page, "dropdown-with-shortcuts");
  });

  test("Dropdown with checkboxes", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "with-checkboxes");
    await clickAndWait(page, 'button:has-text("View")');
    await takeStoryScreenshot(page, "dropdown-with-checkboxes");
  });

  test("Dropdown with radio group", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "with-radio-group");
    await clickAndWait(page, 'button:has-text("Panel Position")');
    await takeStoryScreenshot(page, "dropdown-with-radio");
  });

  test("Dropdown with submenu - closed", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "with-submenu");
    await clickAndWait(page, 'button:has-text("More Options")');
    await takeStoryScreenshot(page, "dropdown-submenu-closed");
  });

  test("Dropdown with submenu - open", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "with-submenu");
    await clickAndWait(page, 'button:has-text("More Options")');
    await page.hover('[role="menuitem"]:has-text("Invite users")');
    await page.waitForTimeout(500);
    await takeStoryScreenshot(page, "dropdown-submenu-open");
  });

  test("Dropdown - action menu", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "action-menu");
    await clickAndWait(page, "button");
    await takeStoryScreenshot(page, "dropdown-action-menu");
  });

  test("Dropdown with disabled items", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "with-disabled-items");
    await clickAndWait(page, 'button:has-text("Options")');
    await takeStoryScreenshot(page, "dropdown-disabled-items");
  });

  test("Dropdown - complex example", async ({ page }) => {
    await gotoStory(page, "components-dropdown-menu", "complex-example");
    await clickAndWait(page, 'button:has-text("Menu")');
    await takeStoryScreenshot(page, "dropdown-complex");
  });
});
