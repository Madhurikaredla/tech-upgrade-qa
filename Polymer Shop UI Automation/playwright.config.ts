import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the Polymer Shop UI automation suite.
 *
 *  - Screenshots kept only on failure   -> screenshot: 'only-on-failure'
 *  - Video kept only on failure          -> video: 'retain-on-failure'
 *  - Trace kept on first retry           -> trace: 'on-first-retry'
 *  - Interactive HTML report             -> reporter: 'html'
 *
 * The Shop is a Polymer/Lit PWA built from open Web Components. Playwright's
 * CSS / text / role locators pierce open shadow roots automatically, so no
 * special handling is required (we avoid XPath, which does not pierce shadow DOM).
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // The Shop is a public demo on app-engine; allow one retry to absorb cold
  // starts / network jitter. The trace is captured on that retry.
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  use: {
    baseURL: 'https://shop.polymer-project.org',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  timeout: 60_000,
  expect: { timeout: 10_000 },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
