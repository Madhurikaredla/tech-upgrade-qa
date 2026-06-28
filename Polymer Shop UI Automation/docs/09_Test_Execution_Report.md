# Test Execution Report

## Polymer Shop (shop.polymer-project.org)

**Report Date:** 2026-06-28
**Prepared by:** Madhuri Karedla
**Application:** https://shop.polymer-project.org/
**Framework:** Playwright (TypeScript) + Page Object Model
**Browsers:** Chromium, Firefox, WebKit
**Command:** `npx playwright test`

---

## 1. Executive Summary

| Metric | Value |
|--------|-------|
| Automated test cases (per browser) | 11 |
| Total runs (× 3 browsers) | **33** |
| ✅ Passed | **33** |
| ❌ Failed | **0** |
| Pass rate | **100%** |
| Duration | ~40 s |
| Requirement coverage (RTM) | **100%** (7/7) |
| Defects (functional) | 0 |
| Observations (payment validation) | 2 verified + 1 usability |
| Overall status | **READY** (functional happy path verified across browsers) |

---

## 2. Results by Suite (per browser)

| Suite | Selector | Cases | Result |
|-------|----------|-------|--------|
| Sanity | `npm run test:sanity` | 5 | ✅ all pass |
| Regression | `npm run test:regression` | 11 | ✅ all pass |

---

## 3. Results by Area (per browser)

| Area | Cases | Passed | Failed |
|------|-------|--------|--------|
| Navigation | 3 | 3 | 0 |
| Product detail | 3 | 3 | 0 |
| Cart | 3 | 3 | 0 |
| Checkout | 2 | 2 | 0 |

---

## 4. Detailed Execution Results (Chromium; identical on Firefox & WebKit)

| Spec test | TC | Class | Result |
|-----------|----|-------|--------|
| home page loads with all category call-outs | TC-001 | S,R | ✅ Pass |
| can open each category from the header | TC-002 | R | ✅ Pass |
| Men's Outerwear category shows its product tiles | TC-003 | S,R | ✅ Pass |
| product detail shows title, price and ADD TO CART | TC-004 | S,R | ✅ Pass |
| opening a tile from a category lands on its detail page | TC-005 | R | ✅ Pass |
| adding a product puts it in the cart | TC-006 | S,R | ✅ Pass |
| added product appears in the cart with a checkout option | TC-007 | R | ✅ Pass |
| cart quantity can be changed and the total recalculates | TC-008 | R | ✅ Pass |
| empty cart shows the empty-cart message | TC-018 | R | ✅ Pass |
| completes a full purchase end-to-end | TC-011 | S,R | ✅ Pass |
| checkout form is reachable from a populated cart | TC-012 | R | ✅ Pass |

---

## 5. Coverage Chart (per requirement, automated)

```
REQ-01 Navigation    ████████████████████████  100% (3/3)
REQ-02 Product       ████████████████████████  100% (2/2)
REQ-03 Cart          ████████████████░░░░░░░░  3/5 auto (2 manual)
REQ-04 Checkout      ████████████████░░░░░░░░  2/4 auto (2 manual verified)
REQ-05 Persistence   ████████████████░░░░░░░░  2/3 auto (1 manual)
REQ-06 Validation    ████████░░░░░░░░░░░░░░░░  1/3 auto (2 observations)
REQ-07 Non-functional ░░░░░░░░░░░░░░░░░░░░░░░  manual / NFT checklist
```

---

## 6. Observations / Open Items

| ID | Title | Severity | Status | Blocking? |
|----|-------|----------|--------|-----------|
| BUG-OBS-01 | Checkout accepts invalid card number | Medium (demo) | Open — Won't Fix | No |
| BUG-OBS-02 | Checkout accepts past expiry date | Low (demo) | Open — Won't Fix | No |
| BUG-OBS-03 | No explicit add-to-cart confirmation | Low | Informational | No |
| TC-009/010/017/021–023 | Manual cases not yet executed | — | Pending | No |

---

## 7. Evidence on Failure

Configured in `playwright.config.ts`: `screenshot: 'only-on-failure'`,
`video: 'retain-on-failure'`, `trace: 'on-first-retry'`. Because every test
passed, no failure artifacts were produced this run — the mechanism is identical
to, and demonstrated by, the sibling **SauceDemo UI Automation** project's
intentional defect failures.

- Interactive HTML report: [`../reports/html-report/index.html`](../reports/html-report/index.html)

---

## 8. Notable Engineering Findings (Shadow-DOM PWA)

1. **Hidden shell views** — `<shop-app>` keeps a 404 view and two network-warning
   `<h1>`s in the DOM at all times → heading locators use `:visible`.
2. **Duplicated nav links** — header + off-screen drawer both render nav links;
   drawer copies carry `tabindex="-1"` → locators use `:not([tabindex="-1"])`.
3. **Async rendering** — tiles and cart line items render after a fetch →
   web-first assertions (`toHaveCount`, `toBeVisible`) prevent races.
4. **Empty-cart heading** — the "Your Cart" `<h1>` is `display:none` until the
   cart has items.

---

## 9. Recommendations

1. **Functional happy path is solid** across all three browsers — safe to wire
   into CI as a PR/merge gate (Sanity on PR, Regression nightly).
2. Add card-number (Luhn) and expiry-date validation if this were a real store
   (BUG-OBS-01/02).
3. Automate the remaining manual cases (remove-from-cart, multi-item, reload
   persistence) once a stable selector for the cart-item remove control is
   confirmed.
4. Add the Non-Functional checklist (`10_*`) to the release process.

---

## 10. Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Engineer | Madhuri Karedla | | 2026-06-28 |
| Reviewer | | | |

*Release recommendation: **APPROVED** for the demo's functional scope; payment-validation observations noted as by-design for the demo.*
