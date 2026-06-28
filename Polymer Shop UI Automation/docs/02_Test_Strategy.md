# Test Strategy

## Polymer Shop (shop.polymer-project.org)

**Project:** Polymer Shop UI Automation — Final Assessment
**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0
**Status:** Active

---

## 1. Scope

### In Scope
- Storefront home page and category navigation
- Product listing pages (all four categories)
- Product detail page (title, price, size/quantity selectors)
- Add to cart and shopping-cart management (quantity, totals)
- Checkout funnel: shipping/billing/payment form and order placement
- Order confirmation
- Cart empty-state and header navigation
- Checkout form rendering and field discovery
- Cross-browser execution (Chromium, Firefox, WebKit)
- Functional UI automation with the Page Object Model

### Out of Scope
- Backend/server internals of the demo (no API or DB access available)
- Real payment processing (the Shop is a demo with no real gateway)
- Load/performance testing at scale (single-user timing only)
- Penetration testing
- Native mobile apps

---

## 2. Test Objectives

| Objective | How We Measure It |
|-----------|-------------------|
| All 7 derived requirements are exercised | 100% RTM coverage with at least one automated test each |
| Critical purchase path works end-to-end | Sanity suite (`@sanity`) passes on every run |
| Behaviour is consistent across browsers | Suite passes on Chromium, Firefox and WebKit |
| Functional assertions verify values, not just navigation | Cart total, total recalculation, and order-confirmation text asserted |
| Tests run reliably (no flakiness) | Web-first auto-retrying assertions; 0 flaky failures across runs |

---

## 3. Test Types and Approach

### 3.1 Functional UI Testing
- **Automated** with **Playwright (TypeScript)** using the **Page Object Model**.
- Cover positive paths (browse → detail → cart → checkout) and supporting
  negative/edge paths (empty cart, quantity change).

### 3.2 Test Classification
- **Sanity** (`@sanity`): the narrow critical path — "is the build usable?".
- **Regression** (`@regression`): full functional coverage of every flow.
- Tags allow selective runs: `npm run test:sanity` / `npm run test:regression`.

### 3.3 Cross-Browser Testing
- The same POM runs unchanged on **Chromium, Firefox, WebKit** (Playwright projects).

### 3.4 Exploratory Testing
- Manual exploration of the Shadow-DOM structure to discover resilient locators
  and real field values (documented in Test Data and the risk register).

### 3.5 Regression Testing
- The full suite is the regression suite; intended to run on every PR / merge.

### 3.6 Non-Functional (lightweight)
- A 20-item checklist (performance, security, accessibility, compatibility,
  usability, documentation) — see `10_NonFunctional_Testing_Checklist.md`.

---

## 4. Test Environments

| Environment | Purpose | Notes |
|-------------|---------|-------|
| Local | Author + run tests | Node 18+, Playwright 1.61.x, browsers via `npx playwright install` |
| Public demo | Application under test | https://shop.polymer-project.org/ (live demo; no separate QA env) |
| CI (recommended) | Automated regression on PR/merge | Retries enabled, traces on retry |

> The Shop is a single public demo deployment — there is no DEV/QA/UAT split.
> Tests therefore include one retry locally and on CI to absorb network jitter.

---

## 5. Test Tools

| Tool | Purpose |
|------|---------|
| Playwright (TypeScript) | UI automation engine + runner |
| Page Object Model | Test architecture / maintainability |
| Playwright HTML Reporter | Execution report with screenshots/video/trace |
| Playwright Trace Viewer | Debugging failures (DOM + network) |
| Git | Version control of scripts, data and reports |

---

## 6. Entry and Exit Criteria

### Entry Criteria
- Application URL reachable (HTTP 200)
- Node + Playwright installed; browsers downloaded
- Test data (categories, sample product, checkout data) defined in `fixtures/`
- Page objects implemented for the screens under test

### Exit Criteria
- All planned automated test cases executed
- Sanity suite passes on all target browsers
- Regression suite passes (or failures triaged as app defect vs test/flaky)
- RTM shows 100% requirement coverage
- Execution report and HTML report produced and shared

---

## 7. Defect Management

- Defects/observations logged using the template in `08_Bug_Report_Template_and_Samples.md`.
- Severity: **Critical | High | Medium | Low**; Priority: **P1–P4**.
- For each pipeline failure: re-run once, inspect screenshot/video/trace, then
  classify as **app defect** (raise bug, block) or **flaky/environment** (tag,
  fix root cause) — per the "Managing Regression Test Failures" decision tree.

---

## 8. Risk and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Public demo slowness / cold start | Medium | Medium | One retry; generous navigation timeout |
| Shadow-DOM hidden views cause false matches | High | Low | `:visible` scoped locators |
| Duplicate drawer nav links | High | Low | `:not([tabindex="-1"])` locators |
| Async rendering races | Medium | Medium | Web-first assertions (`toHaveCount`) |
| Catalogue counts change | Medium | Low | Exact count asserted for one category only |
| Demo accepts invalid payment data | High | High (real shop) | Logged as observation BUG-OBS-01/02 |

---

## 9. Roles and Responsibilities

| Role | Responsibility |
|------|---------------|
| QA Engineer (Madhuri) | Strategy, design, automation, execution, reporting |
| Reviewer | Review test design and report |
| Dev (hypothetical) | Fix defects raised against the storefront |
