import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
  ],

  use: {
    baseURL: "http://localhost:6006",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",

    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
    },
  },
  projects: [
    {
      name: "chromium-light",
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "light",
      },
    },
    {
      name: "chromium-dark",
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "dark",
      },
    },
    {
      name: "firefox-light",
      use: {
        ...devices["Desktop Firefox"],
        colorScheme: "light",
      },
    },
    {
      name: "firefox-dark",
      use: {
        ...devices["Desktop Firefox"],
        colorScheme: "dark",
      },
    },
    {
      name: "mobile-safari",
      use: {
        ...devices["iPhone 13"],
      },
    },
    {
      name: "tablet",
      use: {
        ...devices["iPad Pro"],
      },
    },
  ],

  webServer: {
    command: "npm run storybook",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
