import { test } from "@playwright/test";
import {
  gotoStory,
  takeStoryScreenshot,
  clickAndWait,
  focusAndWait,
} from "./utils/helpers";

// Checkbox Tests
test.describe("Checkbox Component Visual Tests", () => {
  test("Checkbox - unchecked", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "default");
    await takeStoryScreenshot(page, "checkbox-unchecked");
  });

  test("Checkbox - checked", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "checked");
    await takeStoryScreenshot(page, "checkbox-checked");
  });

  test("Checkbox - indeterminate", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "indeterminate");
    await takeStoryScreenshot(page, "checkbox-indeterminate");
  });

  test("Checkbox with label", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "with-label");
    await takeStoryScreenshot(page, "checkbox-with-label");
  });

  test("Checkbox with description", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "with-description");
    await takeStoryScreenshot(page, "checkbox-with-description");
  });

  test("Checkbox with error", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "with-error");
    await takeStoryScreenshot(page, "checkbox-with-error");
  });

  test("Checkbox - disabled", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "disabled");
    await takeStoryScreenshot(page, "checkbox-disabled");
  });

  test("Checkbox - all states", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "all-states");
    await takeStoryScreenshot(page, "checkbox-all-states");
  });

  test("Checkbox - select all pattern", async ({ page }) => {
    await gotoStory(page, "components-checkbox", "select-all");
    await takeStoryScreenshot(page, "checkbox-select-all-initial");

    await clickAndWait(page, 'button[role="checkbox"]');
    await takeStoryScreenshot(page, "checkbox-select-all-checked");
  });
});

// Switch Tests
test.describe("Switch Component Visual Tests", () => {
  test("Switch - off", async ({ page }) => {
    await gotoStory(page, "components-switch", "default");
    await takeStoryScreenshot(page, "switch-off");
  });

  test("Switch - on", async ({ page }) => {
    await gotoStory(page, "components-switch", "checked");
    await takeStoryScreenshot(page, "switch-on");
  });

  test("Switch with label", async ({ page }) => {
    await gotoStory(page, "components-switch", "with-label");
    await takeStoryScreenshot(page, "switch-with-label");
  });

  test("Switch with description", async ({ page }) => {
    await gotoStory(page, "components-switch", "with-description");
    await takeStoryScreenshot(page, "switch-with-description");
  });

  test("Switch with error", async ({ page }) => {
    await gotoStory(page, "components-switch", "with-error");
    await takeStoryScreenshot(page, "switch-with-error");
  });

  test("Switch - disabled off", async ({ page }) => {
    await gotoStory(page, "components-switch", "disabled");
    await takeStoryScreenshot(page, "switch-disabled-off");
  });

  test("Switch - disabled on", async ({ page }) => {
    await gotoStory(page, "components-switch", "disabled-checked");
    await takeStoryScreenshot(page, "switch-disabled-on");
  });

  test("Switch - settings example", async ({ page }) => {
    await gotoStory(page, "components-switch", "settings-example");
    await takeStoryScreenshot(page, "switch-settings-example");
  });

  test("Switch - all states", async ({ page }) => {
    await gotoStory(page, "components-switch", "all-states");
    await takeStoryScreenshot(page, "switch-all-states");
  });
});

// Tabs Tests
test.describe("Tabs Component Visual Tests", () => {
  test("Tabs - first tab active", async ({ page }) => {
    await gotoStory(page, "components-tabs", "default");
    await takeStoryScreenshot(page, "tabs-first-active");
  });

  test("Tabs - second tab active", async ({ page }) => {
    await gotoStory(page, "components-tabs", "default");
    await clickAndWait(
      page,
      'button[data-state="inactive"]:has-text("Password")'
    );
    await takeStoryScreenshot(page, "tabs-second-active");
  });

  test("Tabs - third tab active", async ({ page }) => {
    await gotoStory(page, "components-tabs", "default");
    await clickAndWait(
      page,
      'button[data-state="inactive"]:has-text("Settings")'
    );
    await takeStoryScreenshot(page, "tabs-third-active");
  });

  test("Tabs with cards", async ({ page }) => {
    await gotoStory(page, "components-tabs", "with-cards");
    await takeStoryScreenshot(page, "tabs-with-cards");
  });

  test("Tabs with forms", async ({ page }) => {
    await gotoStory(page, "components-tabs", "with-forms");
    await takeStoryScreenshot(page, "tabs-with-forms-signin");

    // Switch to signup
    await clickAndWait(page, 'button:has-text("Sign Up")');
    await takeStoryScreenshot(page, "tabs-with-forms-signup");
  });

  test("Tabs - disabled state", async ({ page }) => {
    await gotoStory(page, "components-tabs", "disabled");
    await takeStoryScreenshot(page, "tabs-disabled");
  });

  test("Tabs - full width", async ({ page }) => {
    await gotoStory(page, "components-tabs", "full-width");
    await takeStoryScreenshot(page, "tabs-full-width");
  });

  test("Tabs - many tabs", async ({ page }) => {
    await gotoStory(page, "components-tabs", "many-tabs");
    await takeStoryScreenshot(page, "tabs-many");
  });

  test("Tabs - keyboard focus", async ({ page }) => {
    await gotoStory(page, "components-tabs", "default");
    await focusAndWait(page, 'button[role="tab"]');
    await takeStoryScreenshot(page, "tabs-keyboard-focus");
  });
});
