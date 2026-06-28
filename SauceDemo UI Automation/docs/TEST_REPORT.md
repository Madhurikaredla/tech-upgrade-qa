# SauceDemo — Test Execution Report

| | |
|---|---|
| **Application** | https://www.saucedemo.com/ |
| **Framework** | Playwright (TypeScript) + Page Object Model |
| **Browsers** | Chromium, Firefox, WebKit |
| **Date** | 2026-06-28 |
| **Command** | `npx playwright test` |

## Summary

| Metric | Value |
|--------|-------|
| Test cases (per browser) | 30 |
| Total runs (× 3 browsers) | **90** |
| ✅ Passed | **81** |
| ❌ Failed (intentional `@defect`) | **9** (3 defects × 3 browsers) |
| Duration | ~52 s |

**Every functional test passes on all three browsers.** The 9 failures are the
3 `@defect` tests running once per browser — they assert *correct* behaviour and
fail because SauceDemo's special accounts contain real defects. This is by
design: a defect test that passed would mean it is not checking anything (the
same convention used by the repo's Pet Store API assignment).

## Pass/fail by area (per browser)

| Area | Tests | Passed | Failed |
|------|-------|--------|--------|
| Login / Logout | 10 | 10 | 0 |
| Inventory & Sorting | 8 | 8 | 0 |
| Cart | 3 | 3 | 0 |
| Checkout | 3 | 3 | 0 |
| Special accounts | 6 | 3 | 3 *(intentional `@defect` — see below)* |

Special-account breakdown (per browser):

| Test | User | Result |
|------|------|--------|
| All product images distinct `@defect` | problem_user | ❌ defect caught |
| Price sort reorders `@defect` | problem_user | ❌ defect caught |
| Inventory loads (slow) | performance_glitch_user | ✅ (~6 s load, annotated) |
| Add to cart works | error_user | ✅ |
| Price sort reorders `@defect` | error_user | ❌ defect caught |
| Add-to-cart → checkout step one | visual_user | ✅ |

→ 3 `@defect` failures per browser × 3 browsers = **9 intentional failures**.

## Evidence captured on failure

Playwright was configured with `screenshot: 'only-on-failure'` and
`video: 'retain-on-failure'`. The run produced **9 screenshots and 9 videos** —
one per failed test — all attached to the interactive HTML report.

- Interactive report: [`../reports/html-report/index.html`](../reports/html-report/index.html)
  (open in a browser, or run `npm run report` against a fresh run)
- Standalone evidence: [`../reports/failure-evidence/`](../reports/failure-evidence)

## Defects found

See [`DEFECTS.md`](DEFECTS.md). Summary:

| ID | Account | Defect |
|----|---------|--------|
| BUG-01 | problem_user | All 6 product images are the same broken `sl-404…jpg` |
| BUG-02 | problem_user | Sort dropdown does not reorder the product list |
| BUG-03 | error_user | Sort dropdown does not reorder the product list |

## How to reproduce

```bash
cd "SauceDemo UI Automation"
npm install
npx playwright install            # one-time: download browsers
npx playwright test               # all browsers
npx playwright test --project=chromium   # single browser
npm run report                    # open the HTML report
```
