# Requirements Traceability Matrix (RTM)
## B2B Vendor Invoice Management Portal

**Project:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12  
**Version:** 1.0

> The RTM ensures every requirement maps to at least one test scenario and test case, and every test case links back to a requirement. It is the primary proof of test coverage.

---

## Full Traceability Matrix

| Req ID | Requirement | Test Scenarios | Test Case IDs | Execution Status | Pass/Fail | Notes |
|--------|-------------|----------------|---------------|-----------------|-----------|-------|
| REQ-01 | Vendors can register and log in to the portal | TS-REG-01 to TS-REG-08, TS-LOG-01 to TS-LOG-12 | TC-001 to TC-007, TC_E10, TC_N01 to TC_N07 | Not Started | — | |
| REQ-02 | Vendors can submit invoices against purchase orders | TS-INV-01 to TS-INV-28 | TC-010 to TC-018, TC_E01, TC_E02, TC_E04, TC_E07, TC_E17, TC_N08 to TC_N15, TC_N30, TC_N31 | Not Started | — | |
| REQ-03 | The AP team can view, approve, or reject invoices | TS-AP-01 to TS-AP-17 | TC-020 to TC-025, TC_E08, TC_E09, TC_N16 to TC_N19, TC_N32 | Not Started | — | |
| REQ-04 | Approved invoices are forwarded for payment processing | TS-PAY-01 to TS-PAY-07 | TC-031 to TC-034, TC_N20, TC_N21 | Deferred | — | ERP sandbox not yet available |
| REQ-05 | Both parties receive email notifications on status changes | TS-NOT-01 to TS-NOT-11 | TC-040 to TC-045, TC_E12, TC_N22, TC_N23 | Not Started | — | |
| REQ-06 | The system generates monthly invoice activity reports | TS-RPT-01 to TS-RPT-10 | TC-050 to TC-054, TC_E15, TC_N24, TC_N25 | Not Started | — | Feature incomplete; deferred |
| REQ-07 | Only authorized users may access the system | TS-RBAC-01 to TS-RBAC-12, TS-SEC-01 to TS-SEC-04 | TC-060 to TC-068, TC_E16, TC_N26 to TC_N29, TC_N33, TC_N34 | Not Started | — | |

---

## Detailed Coverage per Requirement

### REQ-01: Vendor Registration & Login

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-001 | Vendor registers with valid details | Positive | High | Not Started | — |
| TC-002 | Verified vendor logs in with correct credentials | Positive | Critical | Not Started | — |
| TC-003 | Login fails with incorrect password | Negative | High | Not Started | — |
| TC-004 | Account lockout after 5 failed attempts | Security | High | Not Started | — |
| TC-005 | Duplicate email registration blocked | Negative | High | Not Started | — |
| TC-006 | Email verification link activates account | Positive | High | Not Started | — |
| TC-007 | Deactivated vendor cannot log in | Negative | High | Not Started | — |
| TC_E10 | Session expires mid-submission — no partial DB record created | Session–Edge Case | High | Not Started | — |
| TC_N01 | Password boundary at registration (min/max length) | Boundary Value Analysis | Medium | Not Started | — |
| TC_N02 | Expired email verification link rejected | State–Time | High | Not Started | — |
| TC_N03 | Email verification link reuse blocked (replay) | State–Replay | Medium | Not Started | — |
| TC_N04 | Login blocked for unverified account | State | High | Not Started | — |
| TC_N05 | Password reset link reuse blocked (replay) | State–Replay | Medium | Not Started | — |
| TC_N06 | Concurrent sessions from same account — policy enforced | Concurrency–Session | Medium | Not Started | — |
| TC_N07 | XSS payload in login fields sanitized | Security–XSS | High | Not Started | — |

Coverage: 15 test cases | 0 executed | REQ-01 Coverage: 100%

---

### REQ-02: Invoice Submission

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-010 | Successful invoice submission against valid PO | Positive | Critical | Not Started | — |
| TC-011 | Invoice against non-existent PO blocked | Negative | High | Not Started | — |
| TC-012 | File exceeds maximum size — upload rejected | Boundary | High | Not Started | — |
| TC-013 | Duplicate invoice submission blocked | Negative | Critical | Not Started | — |
| TC-014 | Invoice amount exceeds PO value | Business Rule | High | Not Started | — |
| TC-015 | Accepted file format (PDF) uploads successfully | Positive | High | Not Started | — |
| TC-016 | Rejected file format (.exe) blocked | Negative | High | Not Started | — |
| TC-017 | Vendor edits submitted invoice before review | Positive | Medium | Not Started | — |
| TC-018 | SQL injection in invoice number field | Security | High | Not Started | — |
| TC_E01 | Submit with all mandatory fields empty | Validation–Negative | High | Not Started | — |
| TC_E02 | File upload at exact 5 MB boundary (below / at / above) | Boundary Value Analysis | High | Not Started | — |
| TC_E04 | Corrupted PDF upload (valid extension, corrupt content) | Format–Negative | High | Not Started | — |
| TC_E07 | Invoice number at max character length (short / 50-char / 51-char) | Boundary Value Analysis | Medium | Not Started | — |
| TC_E17 | Bulk 20-invoice rapid submission — stress | Performance–Stress | Medium | Not Started | — |
| TC_N08 | Invoice amount of zero rejected | Boundary–Validation | High | Not Started | — |
| TC_N09 | Invoice with future date rejected | Validation–Date | High | Not Started | — |
| TC_N10 | Invoice against fully consumed PO rejected | State–Business Rule | High | Not Started | — |
| TC_N11 | Non-numeric amount field input rejected | Format Validation | High | Not Started | — |
| TC_N12 | Concurrent duplicate submission — one record only | Concurrency–Race | High | Not Started | — |
| TC_N13 | MIME type spoofing (.pdf with non-PDF content) rejected | Security–Format | High | Not Started | — |
| TC_N14 | Zero-byte file upload rejected | Boundary–File Size | Medium | Not Started | — |
| TC_N15 | XSS in vendor notes field sanitized | Security–XSS | High | Not Started | — |
| TC_N30 | Rejected invoice resubmitted by vendor with corrections — transitions to Pending Review | State Transition | High | Not Started | — |
| TC_N31 | Invoice list page loads in < 3s with 500 invoices (p95) | Performance | High | Not Started | — |

Coverage: 24 test cases | 0 executed | REQ-02 Coverage: 100%

---

### REQ-03: AP Approval Workflow

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-020 | AP approves valid pending invoice | Positive | Critical | Not Started | — |
| TC-021 | AP rejects invoice without providing reason — blocked | Negative | High | Not Started | — |
| TC-022 | Concurrent AP approval race condition | Concurrency | High | Not Started | — |
| TC-023 | AP approves already-approved invoice — blocked | Negative | Medium | Not Started | — |
| TC-024 | AP filters invoices by status | Positive | Medium | Not Started | — |
| TC-025 | AP searches invoices by vendor and invoice number | Positive | Medium | Not Started | — |
| TC_E08 | Approve already-rejected invoice — expects HTTP 409 | Workflow–Invalid State | High | Not Started | — |
| TC_E09 | Reject already-approved invoice — expects HTTP 409 | Workflow–Invalid State | High | Not Started | — |
| TC_N16 | Rejection reason at maximum character length | Boundary Value Analysis | Medium | Not Started | — |
| TC_N17 | Whitespace-only rejection reason blocked | Validation | High | Not Started | — |
| TC_N18 | Three concurrent AP actions — one accepted, two rejected | Concurrency | High | Not Started | — |
| TC_N19 | AP sorts invoice list by date, amount, vendor name | Functional | Low | Not Started | — |
| TC_N32 | Invoice above threshold escalates to next-level approver — L1 cannot act, L2 can approve | State Transition–Workflow | High | Not Started | — |

Coverage: 13 test cases | 0 executed | REQ-03 Coverage: 100%

---

### REQ-04: Payment Processing Integration

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-031 | Approved invoice forwarded to ERP successfully | Integration | Critical | Deferred | — |
| TC-032 | ERP unavailable — retry mechanism kicks in | Resilience | High | Deferred | — |
| TC-033 | ERP returns error — invoice status reflects failure | Integration | High | Deferred | — |
| TC-034 | Correct data payload sent to ERP (no truncation) | Data Integrity | High | Deferred | — |
| TC_N20 | ERP retry limit exhausted — status moves to Payment Failed | State–Boundary | High | Deferred | — |
| TC_N21 | Double ERP trigger — idempotency prevents duplicate payment | Concurrency–Idempotency | High | Deferred | — |

Coverage: 6 test cases | DEFERRED (ERP sandbox pending)

---

### REQ-05: Email Notifications

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-040 | Vendor receives notification on invoice submission | Integration | High | Not Started | — |
| TC-041 | Vendor receives rejection email with reason | Integration | High | Not Started | — |
| TC-042 | AP team notified on new invoice arrival | Integration | High | Not Started | — |
| TC-043 | Vendor notified on invoice approval | Integration | High | Not Started | — |
| TC-044 | Notification email contains correct invoice details | Content | High | Not Started | — |
| TC-045 | No notification for internal-only AP comments | Negative | Medium | Not Started | — |
| TC_E12 | Email service down during status change — business action must not be blocked | Integration–Failure Mode | High | Not Started | — |
| TC_N22 | Notifications for rapid status changes delivered in correct order | Concurrency–Ordering | Medium | Not Started | — |
| TC_N23 | Special characters in email notification rendered correctly | Encoding–UTF-8 | Medium | Not Started | — |

Coverage: 9 test cases | 0 executed | REQ-05 Coverage: 100%

---

### REQ-06: Monthly Report Generation

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-050 | Report generated for full calendar month | Positive | High | Deferred | — |
| TC-051 | Report data matches DB totals exactly | Data Integrity | Critical | Deferred | — |
| TC-052 | Report generated for month with zero invoices | Edge Case | Medium | Deferred | — |
| TC-053 | Report export as PDF — file valid and readable | Positive | High | Deferred | — |
| TC-054 | Vendor role cannot generate monthly report | Negative / RBAC | High | Deferred | — |
| TC_E15 | Report generated with 10,000+ invoice dataset — response within SLA | Performance/Reporting | Medium | Deferred | — |
| TC_N24 | Concurrent report generation by two admins — no duplicate output | Concurrency | High | Deferred | — |
| TC_N25 | Report counts accurate across all invoice statuses | Data Integrity | High | Deferred | — |

Coverage: 8 test cases | DEFERRED (feature incomplete)

---

### REQ-07: RBAC / Access Control

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-060 | Vendor A cannot access Vendor B's invoice (IDOR) | Security | Critical | Not Started | — |
| TC-061 | Unauthenticated user blocked from all portal pages | Security | Critical | Not Started | — |
| TC-062 | API returns 403 when vendor calls AP-only endpoint | Security | Critical | Not Started | — |
| TC-063 | Vendor cannot view AP approval queue | RBAC | Critical | Not Started | — |
| TC-064 | Read-only auditor cannot approve or reject invoices | RBAC | Medium | Not Started | — |
| TC-065 | Admin can deactivate a vendor account | Admin | High | Not Started | — |
| TC-066 | Deactivated user session invalidated immediately | Security | High | Not Started | — |
| TC-067 | Session expires after idle timeout | Security | Medium | Not Started | — |
| TC-068 | Admin can assign and change user roles | Admin | High | Not Started | — |
| TC_E16 | SQL injection across ALL text fields — verify no DB impact (extends TC-018) | Security–Input Validation | High | Not Started | — |
| TC_N26 | Vendor attempts privilege escalation via direct API call — blocked | Security–Privilege Escalation | Critical | Not Started | — |
| TC_N27 | Tampered JWT token rejected with 401 | Security–Token Integrity | Critical | Not Started | — |
| TC_N28 | Admin role changes captured in audit log | Audit Trail | High | Not Started | — |
| TC_N29 | IDOR via API with valid token for another vendor's resource | Security–IDOR | Critical | Not Started | — |
| TC_N33 | AP Clerk role denied access to payment processing module — UI and API blocked | RBAC–Negative | High | Not Started | — |
| TC_N34 | PDF with embedded JavaScript uploaded — script does not execute on server or in portal viewer | Security–File Upload | Critical | Not Started | — |

Coverage: 16 test cases | 0 executed | REQ-07 Coverage: 100%

---

## Coverage Summary

| Requirement | Test Cases | Status | Coverage |
|-------------|-----------|--------|----------|
| REQ-01 | 15 (TC-001–007 + TC_E10 + TC_N01–N07) | Not Started | 100% |
| REQ-02 | 24 (TC-010–018 + TC_E01/02/04/07/17 + TC_N08–N15 + TC_N30–N31) | Not Started | 100% |
| REQ-03 | 13 (TC-020–025 + TC_E08/09 + TC_N16–N19 + TC_N32) | Not Started | 100% |
| REQ-04 | 6 (TC-031–034 + TC_N20–N21) | Deferred | 100% (deferred pending ERP) |
| REQ-05 | 9 (TC-040–045 + TC_E12 + TC_N22–N23) | Not Started | 100% |
| REQ-06 | 8 (TC-050–054 + TC_E15 + TC_N24–N25) | Deferred | 100% (deferred pending feature) |
| REQ-07 | 16 (TC-060–068 + TC_E16 + TC_N26–N29 + TC_N33–N34) | Not Started | 100% |
| **TOTAL** | **91** | — | **100%** |

---

*This RTM will be updated with pass/fail results as test execution progresses. Any requirement with no linked test case must be escalated to the QA Lead immediately.*
