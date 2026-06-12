# Test Execution Report
## B2B Vendor Invoice Management Portal — Phase 1

**Project:** Vendor Invoice Management Portal  
**Report Date:** 2026-06-12  
**Testing Phase:** Phase 1 Functional Testing (Sample/Template)  
**Prepared by:** QA Team  
**Build Version:** v0.4.2  
**Environment:** QA Staging

> **Note:** This is a sample execution report showing the format and structure. Actual pass/fail data will be populated as test cycles are run.

---

## 1. Executive Summary

| Metric | Value |
|--------|-------|
| Total Test Cases Planned | 41 |
| Total Executed | 22 |
| Passed | 14 |
| Failed | 6 |
| Blocked | 2 |
| Not Run (Deferred) | 9 |
| Pass Rate (of executed) | **63.6%** |
| Requirement Coverage | **100%** (all reqs have at least one TC) |
| Critical Bugs Found | 2 |
| High Bugs Found | 3 |
| Medium Bugs Found | 1 |
| Overall Test Status | **NOT READY FOR UAT** |

---

## 2. Test Execution by Requirement

| Req ID | Total TCs | Executed | Passed | Failed | Blocked | Pass Rate |
|--------|-----------|----------|--------|--------|---------|-----------|
| REQ-01 | 7 | 7 | 6 | 1 | 0 | 85.7% |
| REQ-02 | 9 | 9 | 5 | 3 | 1 | 55.5% |
| REQ-03 | 6 | 6 | 3 | 2 | 1 | 50.0% |
| REQ-04 | 4 | 0 | 0 | 0 | 0 | Deferred |
| REQ-05 | 6 | 0 | 0 | 0 | 0 | Not Started |
| REQ-06 | 5 | 0 | 0 | 0 | 0 | Deferred |
| REQ-07 | 9 | 5 | 4 | 1 | 0 | 80.0% |

---

## 3. Detailed Execution Results

### REQ-01: Vendor Registration and Login

| TC ID | Title | Result | Bug ID | Notes |
|-------|-------|--------|--------|-------|
| TC-001 | Vendor registers with valid details | PASS | — | |
| TC-002 | Verified vendor logs in correctly | PASS | — | |
| TC-003 | Login fails with wrong password | PASS | — | |
| TC-004 | Account lockout after 5 failed attempts | PASS | — | |
| TC-005 | Duplicate email registration blocked | PASS | — | |
| TC-006 | Email verification link activates account | PASS | — | |
| TC-007 | Deactivated vendor cannot log in | FAIL | BUG-004 | Session not invalidated after logout; also impacts deactivated user scenario |

---

### REQ-02: Invoice Submission

| TC ID | Title | Result | Bug ID | Notes |
|-------|-------|--------|--------|-------|
| TC-010 | Successful invoice submission | PASS | — | |
| TC-011 | Submission against non-existent PO blocked | PASS | — | |
| TC-012 | File size over limit rejected | PASS | — | |
| TC-013 | Duplicate invoice blocked | FAIL | BUG-005 | Duplicate check not working for same PO, different invoice number on same day |
| TC-014 | Amount exceeds PO value | FAIL | BUG-006 | No validation — system accepts invoice with amount 5x the PO value |
| TC-015 | Valid PDF file uploads successfully | PASS | — | |
| TC-016 | Rejected file format blocked | PASS | — | |
| TC-017 | Vendor edits invoice before review | PASS | — | |
| TC-018 | SQL injection in invoice number field | BLOCKED | — | Blocked pending security environment setup |

---

### REQ-03: AP Approval Workflow

| TC ID | Title | Result | Bug ID | Notes |
|-------|-------|--------|--------|-------|
| TC-020 | AP approves valid invoice | PASS | — | |
| TC-021 | Rejection without reason blocked | PASS | — | |
| TC-022 | Concurrent AP approval race condition | FAIL | BUG-007 | Both approvals succeed — duplicate approval record created in DB |
| TC-023 | Re-approval of already-approved invoice blocked | PASS | — | |
| TC-024 | Filter invoices by status | FAIL | BUG-008 | Filter returns all invoices regardless of selected status |
| TC-025 | Search by vendor and invoice number | BLOCKED | — | Search feature not yet deployed to QA env |

---

### REQ-07: Access Control

| TC ID | Title | Result | Bug ID | Notes |
|-------|-------|--------|--------|-------|
| TC-060 | IDOR — Vendor A cannot access Vendor B invoice | FAIL | BUG-002 | Critical — data exposed across vendor boundary |
| TC-061 | Unauthenticated user blocked from portal | PASS | — | |
| TC-062 | API 403 for vendor calling AP endpoint | PASS | — | |
| TC-063 | Vendor cannot view AP queue | PASS | — | |
| TC-064 | Read-only auditor cannot approve/reject | PASS | — | |

---

## 4. Open Bug Summary

| Bug ID | Title | Severity | Priority | Status | Blocking Release? |
|--------|-------|----------|----------|--------|------------------|
| BUG-001 | Invoice submitted without file | High | P1 | Open | YES |
| BUG-002 | IDOR — cross-vendor data exposure | Critical | P1 | Open | YES |
| BUG-003 | Rejection email missing reason placeholder | Medium | P2 | Open | No (workaround: AP calls vendor) |
| BUG-004 | JWT valid after logout | High | P1 | Open | YES |
| BUG-005 | Duplicate check insufficient | High | P1 | Open | YES |
| BUG-006 | No validation for invoice > PO amount | High | P2 | Open | YES |
| BUG-007 | Concurrent approval creates duplicate record | High | P1 | Open | YES |
| BUG-008 | Invoice status filter returns all records | Medium | P3 | Open | No |

---

## 5. Risk Assessment

| Risk | Current Status | Action Required |
|------|---------------|-----------------|
| 2 Critical bugs open | HIGH RISK | Must be fixed and re-tested before UAT |
| 5 High bugs open | HIGH RISK | Must be fixed before UAT |
| REQ-04 not yet tested | MEDIUM RISK | ERP sandbox must be provisioned in next sprint |
| REQ-05 not yet started | MEDIUM RISK | SMTP not configured in QA env — devops action needed |
| Concurrent session bug found | HIGH RISK | Security review required |

---

## 6. Test Coverage Chart

```
REQ-01  ████████████████████░░░░  86% pass
REQ-02  ████████████░░░░░░░░░░░░  56% pass
REQ-03  ████████████░░░░░░░░░░░░  50% pass
REQ-04  ░░░░░░░░░░░░░░░░░░░░░░░░  Deferred
REQ-05  ░░░░░░░░░░░░░░░░░░░░░░░░  Not Started
REQ-06  ░░░░░░░░░░░░░░░░░░░░░░░░  Deferred
REQ-07  ████████████████████░░░░  80% pass
```

---

## 7. Recommendations

1. **Do not proceed to UAT** until BUG-002 (Critical IDOR) and BUG-004 (session invalidation) are fixed
2. **ERP sandbox provisioning** must be escalated — REQ-04 is a critical integration path
3. **SMTP configuration** in QA environment must be completed before REQ-05 can be tested
4. **Security review** by dev lead required for concurrency bug (BUG-007) before fix is implemented
5. Schedule a **regression run** after dev fixes BUG-001 through BUG-007
6. **Performance testing** scheduled for Phase 2 — ensure k6 environment is ready

---

## 8. Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Lead | | | |
| Dev Lead | | | |
| Product Owner | | | |

*Release recommendation: **NOT APPROVED** pending resolution of P1 bugs.*
