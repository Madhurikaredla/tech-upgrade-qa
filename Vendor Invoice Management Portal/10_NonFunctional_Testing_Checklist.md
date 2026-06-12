# Non-Functional Testing Checklist
## B2B Vendor Invoice Management Portal

**Project:** Vendor Invoice Management Portal
**Prepared by:** QA Team
**Date:** 2026-06-12
**Version:** 1.0

> Non-functional testing validates system quality attributes beyond feature correctness: how fast, how secure, how accessible, how compatible, and how usable the portal is. This checklist is executed in parallel with functional test execution during Phase 6.

---

## How to Use This Checklist

| Column | Meaning |
|--------|---------|
| Check ID | Unique identifier in format NFT-CAT-NN |
| Check | What to verify |
| Test Method | Tool or technique |
| Pass Criteria | Measurable threshold that must be met |
| Status | Not Started / In Progress / Pass / Fail / Blocked |
| Result | Actual measured value or observation |
| Notes | Defect ID or deviation reason |

---

## Performance

| Check ID | Check | Test Method | Pass Criteria | Status | Result | Notes |
|----------|-------|------------|---------------|--------|--------|-------|
| NFT-PERF-01 | Invoice list page load time with 500 invoices in DB | k6 / JMeter load script; measure p95 response time | < 3 seconds at p95 | Not Started | — | |
| NFT-PERF-02 | Invoice submission API response time under normal load | Postman / k6; single-user baseline | < 2 seconds end-to-end | Not Started | — | |
| NFT-PERF-03 | System stability under 500 concurrent users | k6 load test; ramp to 500 VUs over 5 min, sustain 10 min | 0 errors; no 5xx responses; response time p95 < 3s | Not Started | — | |
| NFT-PERF-04 | Monthly report generation for 12 months of data | Trigger report via UI/API; measure wall-clock time | Completes in < 10 seconds | Not Started | — | |

---

## Security

| Check ID | Check | Test Method | Pass Criteria | Status | Result | Notes |
|----------|-------|------------|---------------|--------|--------|-------|
| NFT-SEC-01 | SQL injection in login username and password fields | OWASP ZAP / Burp Suite active scan; manual payloads | No DB error exposed; no data returned; input rejected or sanitized | Not Started | — | |
| NFT-SEC-02 | XSS payload in invoice notes field | Manual: submit `<script>alert(1)</script>`; inspect rendered output | Script not executed in any browser; input escaped in UI and API response | Not Started | — | |
| NFT-SEC-03 | API endpoints reject requests with no auth token | Postman: call every API endpoint without Authorization header | All endpoints return HTTP 401; no data leakage in response body | Not Started | — | |
| NFT-SEC-04 | File upload rejects disguised executable (e.g., `.exe` renamed to `.pdf`) | Upload `invoice.exe` renamed to `invoice.pdf`; also test with MIME-type mismatch | Upload rejected with clear error; file not stored on server | Not Started | — | |
| NFT-SEC-05 | Uploaded file containing embedded JavaScript or macros does not execute | Prepare PDF with embedded JavaScript action; upload and view | No script execution on server or in browser PDF viewer; file rendered safely or rejected | Not Started | — | |
| NFT-SEC-06 | Session expires after configured idle timeout | Log in; leave portal idle beyond timeout period; attempt any action | User redirected to login; session token invalidated; no action performed | Not Started | — | |
| NFT-SEC-07 | Sensitive data not present in application logs | Trigger login, submission, and approval flows; inspect server logs | Passwords, session tokens, PII not written to application logs in plaintext | Not Started | — | |

---

## Accessibility

| Check ID | Check | Test Method | Pass Criteria | Status | Result | Notes |
|----------|-------|------------|---------------|--------|--------|-------|
| NFT-ACC-01 | All form input fields have accessible labels (WCAG 2.1 AA — SC 1.3.1) | axe / Lighthouse automated scan + manual screen-reader check | Zero "label missing" violations in axe report | Not Started | — | |
| NFT-ACC-02 | Entire portal navigable by keyboard alone (WCAG 2.1 AA — SC 2.1.1) | Navigate all pages using Tab, Shift+Tab, Enter, Arrow keys only | All interactive elements reachable and operable; no focus trap | Not Started | — | |
| NFT-ACC-03 | Text and background colour contrast ratio meets WCAG 2.1 AA minimum | Lighthouse / colour-contrast analyser on all text elements | Contrast ratio ≥ 4.5:1 for normal text; ≥ 3:1 for large text | Not Started | — | |

---

## Compatibility

| Check ID | Check | Test Method | Pass Criteria | Status | Result | Notes |
|----------|-------|------------|---------------|--------|--------|-------|
| NFT-COMP-01 | Portal functions correctly on Chrome, Firefox, Edge, and Safari | Manual smoke test of core flows (login, submit, approve) on each browser; BrowserStack | All browsers: no layout breaks, no JS errors, all actions complete | Not Started | — | |
| NFT-COMP-02 | Portal is usable on mobile (phone) and tablet screen sizes | BrowserStack / Chrome DevTools responsive mode; test at 375px, 768px, 1024px | All critical flows usable; no horizontal scroll on key pages; touch targets ≥ 44px | Not Started | — | |

---

## Usability

| Check ID | Check | Test Method | Pass Criteria | Status | Result | Notes |
|----------|-------|------------|---------------|--------|--------|-------|
| NFT-USA-01 | Error messages guide the user to the correct corrective action | Manual: trigger each validation error; assess message clarity | Each error message names the field, states the problem, and states how to fix it | Not Started | — | |
| NFT-USA-02 | End-to-end invoice submission can be completed in under 5 minutes by a new user | Timed usability walkthrough with a participant unfamiliar with the system | Median task time < 5 minutes; no dead ends requiring help | Not Started | — | |

---

## Documentation

| Check ID | Check | Test Method | Pass Criteria | Status | Result | Notes |
|----------|-------|------------|---------------|--------|--------|-------|
| NFT-DOC-01 | All portal error messages match the approved error message catalogue | Compare each rendered error against the error message catalogue document | 100% match; no undocumented or stale messages found | Not Started | — | |
| NFT-DOC-02 | User guide screenshots and step descriptions match the current portal UI | Side-by-side review of user guide vs. live portal on current build | No screenshot or step out of date; all UI labels match guide text | Not Started | — | |

---

## Coverage Summary

| Category | Total Checks | Pass | Fail | Not Started | Blocked |
|----------|-------------|------|------|-------------|---------|
| Performance | 4 | — | — | 4 | — |
| Security | 7 | — | — | 7 | — |
| Accessibility | 3 | — | — | 3 | — |
| Compatibility | 2 | — | — | 2 | — |
| Usability | 2 | — | — | 2 | — |
| Documentation | 2 | — | — | 2 | — |
| **TOTAL** | **20** | **—** | **—** | **20** | **—** |

---

## Traceability

NFT checks map to the following requirements and test strategies:

| Check ID | Related REQ | Related Test Strategy Section | Related Scenarios / TCs |
|----------|------------|-------------------------------|------------------------|
| NFT-PERF-01 | REQ-02 | 3.6 Performance Testing | TS-INV-28, TC_E17 |
| NFT-PERF-02 | REQ-02, REQ-03 | 3.6 Performance Testing | TC-010, TC-020 |
| NFT-PERF-03 | REQ-01 to REQ-07 | 3.6 Performance Testing | TC_E15, TC_E17 |
| NFT-PERF-04 | REQ-06 | 3.6 Performance Testing | TS-RPT-08, TC_E15 |
| NFT-SEC-01 | REQ-07 | 3.5 Security Testing | TS-SEC-01, TC_E16, TC-018 |
| NFT-SEC-02 | REQ-07 | 3.5 Security Testing | TS-INV-26, TC_N15, TC_N07 |
| NFT-SEC-03 | REQ-07 | 3.5 Security Testing | TS-RBAC-05, TC-062 |
| NFT-SEC-04 | REQ-02, REQ-07 | 3.5 Security Testing | TS-INV-10, TC-016, TC_N13 |
| NFT-SEC-05 | REQ-02, REQ-07 | 3.5 Security Testing | TS-SEC-04 |
| NFT-SEC-06 | REQ-07 | 3.5 Security Testing | TC_E10, TC-067 |
| NFT-SEC-07 | REQ-07 | 3.5 Security Testing | TC-066 |
| NFT-ACC-01 | REQ-01 to REQ-07 | 3.7 Usability / Accessibility | — |
| NFT-ACC-02 | REQ-01 to REQ-07 | 3.7 Usability / Accessibility | — |
| NFT-ACC-03 | REQ-01 to REQ-07 | 3.7 Usability / Accessibility | — |
| NFT-COMP-01 | REQ-01 to REQ-07 | Cross-browser scope | — |
| NFT-COMP-02 | REQ-01 to REQ-07 | Cross-browser scope | — |
| NFT-USA-01 | REQ-01 to REQ-07 | 3.7 Usability / Accessibility | — |
| NFT-USA-02 | REQ-02 | 3.7 Usability / Accessibility | TS-INV-01 |
| NFT-DOC-01 | REQ-01 to REQ-07 | Phase 8: Deploy & Docs Verify | — |
| NFT-DOC-02 | REQ-01 to REQ-07 | Phase 8: Deploy & Docs Verify | — |

---

*Update the Status and Result columns as checks are executed. Any Fail result must be raised as a defect in the bug tracker before sign-off.*
