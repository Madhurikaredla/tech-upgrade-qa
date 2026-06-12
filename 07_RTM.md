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
| REQ-01 | Vendors can register and log in to the portal | TS-REG-01, TS-REG-02, TS-REG-03, TS-REG-04, TS-REG-05, TS-LOG-01, TS-LOG-02, TS-LOG-03, TS-LOG-04, TS-LOG-05, TS-LOG-06, TS-LOG-07 | TC-001, TC-002, TC-003, TC-004, TC-005, TC-006, TC-007 | Not Started | — | |
| REQ-02 | Vendors can submit invoices against purchase orders | TS-INV-01 to TS-INV-15 | TC-010, TC-011, TC-012, TC-013, TC-014, TC-015, TC-016, TC-017, TC-018 | Not Started | — | |
| REQ-03 | The AP team can view, approve, or reject invoices | TS-AP-01 to TS-AP-10 | TC-020, TC-021, TC-022, TC-023, TC-024, TC-025 | Not Started | — | |
| REQ-04 | Approved invoices are forwarded for payment processing | TS-PAY-01 to TS-PAY-05 | TC-030 to TC-034 | Deferred | — | ERP sandbox not yet available |
| REQ-05 | Both parties receive email notifications on status changes | TS-NOT-01 to TS-NOT-08 | TC-040, TC-041, TC-042, TC-043, TC-044, TC-045 | Not Started | — | |
| REQ-06 | The system generates monthly invoice activity reports | TS-RPT-01 to TS-RPT-07 | TC-050, TC-051, TC-052, TC-053, TC-054 | Not Started | — | Feature incomplete; deferred |
| REQ-07 | Only authorized users may access the system | TS-RBAC-01 to TS-RBAC-09 | TC-060, TC-061, TC-062, TC-063, TC-064, TC-065, TC-066, TC-067, TC-068 | Not Started | — | |

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

**Coverage: 7 test cases | 0 executed | REQ-01 Coverage: 100%**

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

**Coverage: 9 test cases | 0 executed | REQ-02 Coverage: 100%**

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

**Coverage: 6 test cases | 0 executed | REQ-03 Coverage: 100%**

---

### REQ-04: Payment Processing Integration

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-031 | Approved invoice forwarded to ERP successfully | Integration | Critical | Deferred | — |
| TC-032 | ERP unavailable — retry mechanism kicks in | Resilience | High | Deferred | — |
| TC-033 | ERP returns error — invoice status reflects failure | Integration | High | Deferred | — |
| TC-034 | Correct data payload sent to ERP (no truncation) | Data Integrity | High | Deferred | — |

**Coverage: 4 test cases | DEFERRED (ERP sandbox pending)**

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

**Coverage: 6 test cases | 0 executed | REQ-05 Coverage: 100%**

---

### REQ-06: Monthly Report Generation

| Test Case ID | Title | Type | Priority | Status | Result |
|--------------|-------|------|----------|--------|--------|
| TC-050 | Report generated for full calendar month | Positive | High | Deferred | — |
| TC-051 | Report data matches DB totals exactly | Data Integrity | Critical | Deferred | — |
| TC-052 | Report generated for month with zero invoices | Edge Case | Medium | Deferred | — |
| TC-053 | Report export as PDF — file valid and readable | Positive | High | Deferred | — |
| TC-054 | Vendor role cannot generate monthly report | Negative / RBAC | High | Deferred | — |

**Coverage: 5 test cases | DEFERRED (feature incomplete)**

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

**Coverage: 9 test cases | 0 executed | REQ-07 Coverage: 100%**

---

## Coverage Summary

| Requirement | Test Cases | Status | Coverage |
|-------------|-----------|--------|----------|
| REQ-01 | 7 | Not Started | 100% |
| REQ-02 | 9 | Not Started | 100% |
| REQ-03 | 6 | Not Started | 100% |
| REQ-04 | 4 | Deferred | 100% (deferred pending ERP) |
| REQ-05 | 6 | Not Started | 100% |
| REQ-06 | 5 | Deferred | 100% (deferred pending feature) |
| REQ-07 | 9 | Not Started | 100% |
| **TOTAL** | **46** | — | **100%** |

---

*This RTM will be updated with pass/fail results as test execution progresses. Any requirement with no linked test case must be escalated to the QA Lead immediately.*
