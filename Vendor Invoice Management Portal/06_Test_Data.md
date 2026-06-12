# Test Data Specification
## B2B Vendor Invoice Management Portal

**Project:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12  
**Version:** 1.0

> Test data is prepared to cover: valid inputs, invalid inputs, boundary values, and special/edge cases. All data below is synthetic — no real vendor or financial data is used.

---

## 1. User Accounts

### 1.1 Vendor Accounts

| User ID | Email | Password | Company | Status | Notes |
|---------|-------|----------|---------|--------|-------|
| VEN-001 | vendor1@testcorp.com | Test@1234! | TestCorp Supplies | Active | Primary test vendor |
| VEN-002 | vendor2@alphaltd.com | Test@5678! | Alpha Ltd | Active | Secondary vendor (RBAC isolation tests) |
| VEN-003 | vendor3@inactive.com | Test@9999! | Inactive Co | Deactivated | Login rejection test |
| VEN-004 | vendor4@unverified.com | Test@1234! | Unverified Co | Pending Verification | Email not yet verified |
| VEN-005 | vendor5@locked.com | Test@1234! | Locked Co | Locked (5 failed logins) | Lockout test |

### 1.2 AP Team Accounts

| User ID | Email | Password | Role | Notes |
|---------|-------|----------|------|-------|
| AP-001 | ap_reviewer@company.com | APTest@1234! | AP Reviewer | Can view and approve |
| AP-002 | ap_approver2@company.com | APTest@5678! | AP Reviewer | Concurrent action tests |
| AP-003 | ap_readonly@company.com | APTest@9999! | Read-Only Auditor | Cannot approve/reject |

### 1.3 Admin Account

| User ID | Email | Password | Role |
|---------|-------|----------|------|
| ADM-001 | admin@company.com | Admin@1234! | System Admin |

---

## 2. Purchase Orders (Pre-loaded in QA DB)

| PO ID | PO Number | Vendor | Approved Amount | Currency | Status | Notes |
|-------|-----------|--------|-----------------|----------|--------|-------|
| PO-001 | PO-2026-001 | VEN-001 | 50,000 | INR | OPEN | Valid PO for invoice tests |
| PO-002 | PO-2026-002 | VEN-001 | 100,000 | INR | OPEN | Large-amount PO |
| PO-003 | PO-2026-003 | VEN-002 | 25,000 | INR | OPEN | Belongs to Vendor 2 (RBAC test) |
| PO-004 | PO-2026-004 | VEN-001 | 10,000 | INR | CLOSED | Closed PO — submissions should be rejected |
| PO-005 | PO-2026-005 | VEN-001 | 5,000 | USD | OPEN | USD currency PO |

---

## 3. Invoice Test Data

### 3.1 Valid Invoice Inputs

| Invoice # | Vendor | PO | Amount | Currency | File | Expected Outcome |
|-----------|--------|----|--------|----------|------|-----------------|
| INV-TC-001 | VEN-001 | PO-2026-001 | 45,000 | INR | valid_invoice.pdf (2 MB) | Submitted successfully |
| INV-TC-002 | VEN-001 | PO-2026-002 | 99,999 | INR | valid_invoice2.pdf (1 MB) | Submitted successfully |
| INV-TC-005 | VEN-001 | PO-2026-005 | 4,500 | USD | valid_invoice_usd.pdf | Submitted successfully |

### 3.2 Invalid Invoice Inputs (Negative Test Data)

| Test | Input | Expected Error |
|------|-------|----------------|
| Non-existent PO | PO Number: `PO-9999-FAKE` | "PO does not exist" |
| Duplicate invoice | INV-TC-001 (same vendor, same PO) | "Duplicate invoice" |
| Amount exceeds PO | Amount: 55,000 against PO-2026-001 (max 50,000) | Warning or block |
| Missing invoice number | Invoice Number: (empty) | "Invoice number is required" |
| Invalid date (future) | Invoice Date: 2030-01-01 | "Invoice date cannot be in the future" |
| Negative amount | Amount: -1000 | "Amount must be greater than zero" |
| Zero amount | Amount: 0 | "Amount must be greater than zero" |
| Closed PO | PO-2026-004 (CLOSED) | "PO is closed and cannot accept invoices" |

### 3.3 File Upload Test Data

| File Name | Size | Format | Expected Outcome |
|-----------|------|--------|-----------------|
| valid_invoice.pdf | 2 MB | PDF | Accepted |
| valid_invoice_max.pdf | 5 MB (exactly) | PDF | Accepted (boundary) |
| oversize_invoice.pdf | 5.1 MB | PDF | Rejected — over limit |
| invoice.jpeg | 1 MB | JPEG | Accepted (if JPEG is allowed) / Rejected |
| invoice.exe | 500 KB | EXE | Rejected — dangerous file type |
| invoice.zip | 3 MB | ZIP | Rejected — disallowed format |
| empty_file.pdf | 0 KB | PDF | Rejected — empty file |
| invoice_special_chars.pdf | 2 MB | PDF | Accepted (filename only; content is valid PDF) |

---

## 4. Boundary Value Data

### 4.1 File Size Boundaries (assuming 5 MB max)

| Test | File Size | Expected |
|------|-----------|----------|
| Below boundary | 4.9 MB | Pass |
| At boundary | 5.0 MB | Pass |
| Above boundary | 5.1 MB | Fail |

### 4.2 Password Boundaries (assuming min 8, max 64 characters)

| Test | Input | Expected |
|------|-------|----------|
| 7 characters | `Short1!` | Fail |
| 8 characters | `Short1!!` | Pass |
| 64 characters | `A1!` + 61 chars | Pass |
| 65 characters | `A1!` + 62 chars | Fail |

### 4.3 Invoice Amount Boundaries

| Test | Amount | Expected |
|------|--------|----------|
| Zero | 0 | Fail |
| Minimum valid | 1 | Pass (if 1 is valid) |
| At PO limit | 50,000 (PO = 50,000) | Pass (or warn) |
| Exceeds PO limit | 50,001 | Fail / Warn |

---

## 5. Pre-loaded Invoice States (for workflow testing)

| Invoice ID | Invoice # | Vendor | Status | Used for Test |
|------------|-----------|--------|--------|---------------|
| INV-DB-001 | INV-PRE-001 | VEN-001 | SUBMITTED | AP approval/rejection tests |
| INV-DB-002 | INV-PRE-002 | VEN-001 | APPROVED | Verify AP cannot re-approve |
| INV-DB-003 | INV-PRE-003 | VEN-001 | REJECTED | Vendor re-submission test |
| INV-DB-004 | INV-PRE-004 | VEN-002 | SUBMITTED | RBAC / IDOR test (Vendor 1 must not see this) |

---

## 6. Special Characters and Injection Test Inputs

| Field | Input | Purpose |
|-------|-------|---------|
| Invoice Number | `INV'; DROP TABLE invoices;--` | SQL Injection test |
| Company Name | `<script>alert('XSS')</script>` | XSS test |
| Rejection Reason | `A` × 5000 characters | Input length overflow test |
| Invoice Number | `INV/2026\000NULL` | Null byte injection test |
| Email field | `vendor@test.com' OR '1'='1` | SQL Injection in login |

---

## 7. Report Test Data (REQ-06)

Pre-load the following for May 2026 report validation:

| Invoice # | Month | Status | Amount |
|-----------|-------|--------|--------|
| INV-MAY-001 | May 2026 | APPROVED | 20,000 |
| INV-MAY-002 | May 2026 | APPROVED | 30,000 |
| INV-MAY-003 | May 2026 | APPROVED | 50,000 |
| INV-MAY-004 | May 2026 | APPROVED | 60,000 |
| INV-MAY-005 | May 2026 | APPROVED | 40,000 |
| INV-MAY-006 | May 2026 | REJECTED | 15,000 |
| INV-MAY-007 | May 2026 | REJECTED | 25,000 |
| INV-MAY-008 | May 2026 | REJECTED | 10,000 |
| INV-MAY-009 | May 2026 | SUBMITTED | 35,000 |
| INV-MAY-010 | May 2026 | SUBMITTED | 45,000 |

**Expected Report Values:**
- Total Invoices: 10
- Approved: 5 | Total Approved Amount: ₹200,000
- Rejected: 3
- Pending: 2
