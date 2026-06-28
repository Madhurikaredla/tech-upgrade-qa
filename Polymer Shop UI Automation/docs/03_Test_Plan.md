# Test Plan

## Polymer Shop UI Automation — Final Assessment

**Project:** Polymer Shop UI Automation
**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0
**Phase:** Functional UI Automation

---

## 1. Objectives

This plan translates the Test Strategy into an executable schedule for
automating the Polymer Shop storefront with Playwright + Page Object Model,
classifying the tests as Sanity/Regression, executing them across three
browsers, and producing shareable reports.

---

## 2. Scope

**In scope for this assessment:**
- REQ-01 Storefront & Category Navigation
- REQ-02 Product Detail Viewing
- REQ-03 Shopping Cart Management
- REQ-04 Checkout & Order Placement
- REQ-05 Cart Persistence & Header Navigation
- REQ-06 Form Validation & Empty States

**Partially covered / documented only:**
- REQ-07 Responsive & PWA behaviour — covered by the Non-Functional checklist
  rather than the automated suite (manual/lightweight).

---

## 3. Test Schedule

| Activity | Owner | Status |
|----------|-------|--------|
| Reachability check + exploratory DOM discovery | QA | Done |
| Requirements derivation + clarification | QA | Done |
| Test scenarios & test cases authoring | QA | Done |
| Test data preparation (`fixtures/`) | QA | Done |
| Page Object Model implementation | QA | Done |
| Spec authoring + Sanity/Regression tagging | QA | Done |
| Cross-browser execution (Chromium/Firefox/WebKit) | QA | Done |
| Defect/observation logging | QA | Done |
| Execution report + HTML report | QA | Done |

---

## 4. Resources

| Resource | Count | Tools |
|----------|-------|-------|
| QA Engineer | 1 | Playwright, TypeScript, Git |
| Browsers | 3 | Chromium, Firefox, WebKit |
| Environment | 1 | Public demo (shop.polymer-project.org) |

---

## 5. Test Approach Summary

- **Critical path first:** Sanity suite (browse → add → checkout) authored before edge cases.
- **POM:** one class per screen; specs reference page methods, never raw selectors.
- **Resilient locators:** role/text/route-based; `:visible` and `:not([tabindex="-1"])` for the Shadow-DOM shell; no XPath.
- **Value assertions:** verify cart total, total recalculation, and confirmation text — not just navigation.
- **Cross-browser:** identical suite on all three engines.

---

## 6. Entry Criteria

- [x] Application URL returns HTTP 200
- [x] Node 18+, Playwright and browsers installed
- [x] Test data defined in `fixtures/testData.ts`
- [x] Page objects implemented for screens under test

---

## 7. Exit Criteria

- [x] All planned automated test cases executed
- [x] Sanity suite passes on all three browsers
- [x] Regression suite passes (0 unexplained failures)
- [x] RTM updated to 100% requirement coverage
- [x] HTML report + execution report produced

---

## 8. Defect Severity and Priority Matrix

| Severity | Definition | Example (this app) |
|----------|------------|--------------------|
| Critical | Purchase path blocked; data loss; security breach | Checkout cannot complete for any product |
| High | Core feature broken / wrong data | Cart total does not recalculate on quantity change |
| Medium | Partial feature / workaround exists | No visible add-to-cart confirmation toast |
| Low | Cosmetic / minor UX | Demo accepts a past card-expiry year (acceptable for a demo) |

---

## 9. Assumptions

- The public demo remains available and stable during the test window.
- The catalogue (categories and product counts) is stable enough that one exact
  count (Men's Outerwear = 16) can be asserted; others assert "≥ 1".
- The demo's payment step is intentionally non-validating; related findings are
  logged as observations, not blockers.

---

## 10. Dependencies

| Dependency | Risk if Not Met |
|------------|-----------------|
| Public demo availability | Suite cannot run against the live app |
| Playwright browser binaries match the Playwright version | Browser launch fails (`npx playwright install`) |
| Network access from the runner | Navigation timeouts |
