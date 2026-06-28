import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the SauceDemo UI automation suite.
 *
 * Key requirements demonstrated here:
 *  - Screenshots captured only when a test fails        -> screenshot: 'only-on-failure'
 *  - Video recorded and kept only when a test fails     -> video: 'retain-on-failure'
 *  - Trace (DOM snapshots + network) kept on first retry-> trace: 'on-first-retry'
 *  - Rich HTML report with the above attachments        -> reporter: 'html'
 *
 * See: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // Run tests in files in parallel.
  fullyParallel: true,

  // Fail the build on CI if test.only is accidentally left in the source.
  forbidOnly: !!process.env.CI,

  // Retry once on CI to absorb genuinely flaky network hiccups; the trace is
  // captured on that retry so we can debug it.
  retries: process.env.CI ? 1 : 0,

  // Limit workers on CI for stable timing; use the machine's default locally.
  workers: process.env.CI ? 2 : undefined,

  // Reporters: a list/line reporter in the terminal + the interactive HTML report.
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  // Settings shared by every project.
  use: {
    baseURL: 'https://www.saucedemo.com',

    // ----- Evidence on failure (exercise goal #4) -----
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  // Per-test timeout and the expect() assertion timeout.
  timeout: 60_000,
  expect: { timeout: 10_000 },

  // Cross-browser matrix. Chromium is the default; the others prove the POM
  // is engine-agnostic. Run a single one with: npx playwright test --project=chromium
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
