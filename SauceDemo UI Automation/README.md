# SauceDemo UI Automation

End-to-end UI automation for **[SauceDemo](https://www.saucedemo.com/)** using
**Playwright (TypeScript)** and the **Page Object Model**. Covers all six demo
accounts, the full purchase journey, and captures **screenshots + video on
failure**.

> Today's QA-learning exercise: identify and automate test cases for each user,
> prepare test data, run cross-browser, and produce a shareable execution report.

## What's inside

```
SauceDemo UI Automation/
├── playwright.config.ts     # 3 browsers; screenshot/video/trace on failure; HTML report
├── pages/                   # Page Object Model
│   ├── BasePage.ts          #   shared: burger menu, cart badge, logout
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts      #   3-step checkout funnel
├── fixtures/
│   ├── users.ts             # the 6 accounts + expected error messages
│   ├── testData.ts          # products, checkout info, sort values
│   └── pages.ts             # test fixture injecting page objects
├── tests/
│   ├── login.spec.ts        # all 6 users + negative paths + logout
│   ├── inventory.spec.ts    # sorting, add/remove, product detail
│   ├── cart.spec.ts
│   ├── checkout.spec.ts     # E2E + form validation
│   └── users.spec.ts        # per-user behaviour incl. @defect tests
├── docs/
│   ├── TEST_CASES.md        # all 30 cases with IDs and tags
│   ├── TEST_DATA.md         # accounts, products, expected messages
│   ├── TEST_REPORT.md       # execution results
│   └── DEFECTS.md           # 3 defects caught by automation
└── reports/
    ├── html-report/         # committed snapshot of the Playwright HTML report
    └── failure-evidence/    # standalone failure screenshots + videos
```

## Prerequisites

- Node.js 18+
- Playwright browsers (one-time download): `npx playwright install`

## Run

```bash
cd "SauceDemo UI Automation"
npm install
npx playwright install               # one-time browser download

npx playwright test                  # all 3 browsers
npm run test:chromium                # Chromium only (fastest)
npm run test:smoke                   # only @smoke critical paths
npm run test:regression              # full functional suite
npm run test:headed                  # watch it run in a browser
npm run report                       # open the interactive HTML report
```

## Results at a glance

**81 / 90 runs pass** (30 tests × 3 browsers). The **9 failures are intentional**:
3 `@defect` tests run once per browser. They assert the *correct* behaviour and
fail because SauceDemo's special accounts contain real defects — a defect test
that passed would not be checking anything. Full breakdown in
[`docs/TEST_REPORT.md`](docs/TEST_REPORT.md).

| Account | Behaviour verified |
|---------|--------------------|
| standard_user | Full happy path: login, sort, cart, checkout, logout ✅ |
| locked_out_user | Login blocked with the correct error ✅ |
| problem_user | Logs in ✅; **identical images** ❌ + **broken sort** ❌ (defects) |
| performance_glitch_user | Logs in & functions, ~6 s slow load (annotated) ✅ |
| error_user | Logs in, add-to-cart works ✅; **broken sort** ❌ (defect) |
| visual_user | Logs in, completes add-to-cart → checkout ✅ |

## Screenshots & video on failure (exercise goal #4)

Configured in [`playwright.config.ts`](playwright.config.ts):

```ts
use: {
  screenshot: 'only-on-failure',   // PNG per failed test
  video: 'retain-on-failure',      // WEBM per failed test, deleted if it passes
  trace: 'on-first-retry',         // full DOM/network trace on CI retry
}
```

Every failed test attaches its screenshot and video to the HTML report (open a
failed test → "Attachments"). Snapshots are committed under
[`reports/`](reports/) so the evidence is shareable without re-running.

## Design notes

- **Page Object Model** — locators and actions live in `pages/`; specs read like
  user stories and never touch raw selectors.
- **Resilient locators** — prefers SauceDemo's `data-test` attributes and
  role-based locators over brittle CSS/XPath.
- **Test data as code** — all accounts/products/messages are typed constants in
  `fixtures/`, reused across specs (data-driven login loop).
- **Tags** — `@smoke`, `@regression`, `@defect` drive selective execution.
- **Cross-browser** — the same POM runs unchanged on Chromium, Firefox, WebKit.
