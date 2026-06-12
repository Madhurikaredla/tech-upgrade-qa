# Test Cases
## B2B Vendor Invoice Management Portal

**Project:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12  
**Version:** 1.0

> Each test case is atomic, independent, reproducible, includes exact test data, and traces to a requirement.

---

## Module: Vendor Registration & Login (REQ-01)

---

### TC-001 — Vendor Successful Registration

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-001 |
| **Scenario** | TS-REG-01 |
| **Requirement** | REQ-01 |
| **Title** | Vendor registers with all valid required details |
| **Priority** | High |
| **Type** | Functional — Positive |
| **Preconditions** | User is on the vendor registration page. The email `newvendor@testcorp.com` does not already exist in the system. |

**Test Data:**
```
Company Name : TestCorp Supplies Pvt Ltd
Email        : newvendor@testcorp.com
Password     : Test@1234!
Confirm Pwd  : Test@1234!
Phone        : +91-9876543210
GST/Tax ID   : 29AABCU9603R1ZX
```

**Steps:**
1. Navigate to the Vendor Registration page
2. Enter Company Name: `TestCorp Supplies Pvt Ltd`
3. Enter Email: `newvendor@testcorp.com`
4. Enter Password: `Test@1234!`
5. Enter Confirm Password: `Test@1234!`
6. Enter Phone: `+91-9876543210`
7. Enter GST/Tax ID: `29AABCU9603R1ZX`
8. Click **Register**

**Expected Result:**
- Registration form is submitted successfully
- User sees a success message: "Registration successful. Please verify your email."
- A verification email is sent to `newvendor@testcorp.com`
- Database: a new vendor record exists in `vendors` table with status = `PENDING_VERIFICATION`

**Pass/Fail:** ___

---

### TC-002 — Vendor Login with Valid Credentials

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-002 |
| **Scenario** | TS-LOG-01 |
| **Requirement** | REQ-01 |
| **Title** | Verified vendor logs in with correct credentials |
| **Priority** | Critical |
| **Type** | Functional — Positive |
| **Preconditions** | Vendor account `vendor1@testcorp.com` is registered, email-verified, and active. |

**Test Data:**
```
Email    : vendor1@testcorp.com
Password : Test@1234!
```

**Steps:**
1. Navigate to the Login page
2. Enter Email: `vendor1@testcorp.com`
3. Enter Password: `Test@1234!`
4. Click **Login**

**Expected Result:**
- User is redirected to the Vendor Dashboard
- Session cookie/JWT token is set
- Dashboard shows the correct vendor company name
- Database: last login timestamp updated in `vendors` table

**Pass/Fail:** ___

---

### TC-003 — Login with Wrong Password

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-003 |
| **Scenario** | TS-LOG-02 |
| **Requirement** | REQ-01 |
| **Title** | Login fails with incorrect password |
| **Priority** | High |
| **Type** | Functional — Negative |
| **Preconditions** | Vendor account `vendor1@testcorp.com` is active. |

**Test Data:**
```
Email    : vendor1@testcorp.com
Password : WrongPassword999
```

**Steps:**
1. Navigate to the Login page
2. Enter Email: `vendor1@testcorp.com`
3. Enter Password: `WrongPassword999`
4. Click **Login**

**Expected Result:**
- Login is rejected
- Error message displayed: "Invalid email or password"
- User remains on the login page
- Failed attempt count incremented in database
- No session cookie is set

**Pass/Fail:** ___

---

### TC-004 — Account Lockout After 5 Failed Attempts

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-004 |
| **Scenario** | TS-LOG-03 |
| **Requirement** | REQ-01 |
| **Title** | Account locks after 5 consecutive failed login attempts |
| **Priority** | High |
| **Type** | Security — Negative |
| **Preconditions** | Vendor account `vendor1@testcorp.com` is active and has 0 failed attempts. |

**Test Data:**
```
Email    : vendor1@testcorp.com
Password : WrongPass (used 5 times)
```

**Steps:**
1. Navigate to the Login page
2. Attempt login with wrong password 5 times in succession
3. On the 6th attempt, try with the correct password: `Test@1234!`

**Expected Result:**
- After 5th failed attempt: error message "Account locked due to too many failed login attempts. Try again after 30 minutes."
- 6th attempt (correct password): login is still denied with the lockout message
- Database: `account_locked = true`, `locked_until = NOW() + 30 minutes`

**Pass/Fail:** ___

---

## Module: Invoice Submission (REQ-02)

---

### TC-010 — Successful Invoice Submission Against Valid PO

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-010 |
| **Scenario** | TS-INV-01 |
| **Requirement** | REQ-02 |
| **Title** | Vendor submits a valid invoice against an existing PO |
| **Priority** | Critical |
| **Type** | Functional — Positive |
| **Preconditions** | Vendor `vendor1@testcorp.com` is logged in. PO number `PO-2026-001` exists in the system with an approved amount of ₹50,000 and status = OPEN. |

**Test Data:**
```
Invoice Number : INV-TC-001
Invoice Date   : 2026-06-10
PO Number      : PO-2026-001
Amount         : ₹45,000
Currency       : INR
Line Items     : [Consulting Services - 45000]
File           : valid_invoice.pdf (2 MB)
```

**Steps:**
1. Log in as `vendor1@testcorp.com`
2. Navigate to **Submit Invoice**
3. Enter Invoice Number: `INV-TC-001`
4. Enter Invoice Date: `2026-06-10`
5. Enter PO Number: `PO-2026-001`
6. Enter Amount: `45000`
7. Select Currency: `INR`
8. Upload file: `valid_invoice.pdf`
9. Click **Submit**

**Expected Result:**
- Success message: "Invoice INV-TC-001 submitted successfully."
- Invoice appears in vendor's "My Invoices" list with status = `SUBMITTED`
- Database: record created in `invoices` table with all correct field values
- AP team dashboard shows one new pending invoice
- Notification email triggered to vendor and AP team (verified in notification log)

**Pass/Fail:** ___

---

### TC-011 — Invoice Submission Against Non-Existent PO

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-011 |
| **Scenario** | TS-INV-02 |
| **Requirement** | REQ-02 |
| **Title** | Vendor cannot submit invoice against a PO that does not exist |
| **Priority** | High |
| **Type** | Functional — Negative |
| **Preconditions** | Vendor is logged in. PO `PO-9999-FAKE` does not exist in the system. |

**Test Data:**
```
PO Number : PO-9999-FAKE
Amount    : ₹10,000
```

**Steps:**
1. Log in as vendor
2. Navigate to **Submit Invoice**
3. Enter PO Number: `PO-9999-FAKE`
4. Enter remaining valid fields
5. Click **Submit**

**Expected Result:**
- Submission is blocked
- Inline error: "Purchase Order PO-9999-FAKE does not exist or is not assigned to your account."
- No record created in the database
- No notification email sent

**Pass/Fail:** ___

---

### TC-012 — Invoice File Exceeds Maximum Size

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-012 |
| **Scenario** | TS-INV-06 |
| **Requirement** | REQ-02 |
| **Title** | File upload rejected when file size exceeds the 5 MB limit |
| **Priority** | High |
| **Type** | Functional — Boundary / Negative |
| **Preconditions** | Vendor is logged in. Max file size is 5 MB (confirmed in clarifications). |

**Test Data:**
```
File : oversize_invoice.pdf (5.1 MB)
```

**Steps:**
1. Log in as vendor
2. Navigate to **Submit Invoice**
3. Attempt to upload `oversize_invoice.pdf` (5.1 MB)

**Expected Result:**
- Upload is rejected immediately on file selection or on submit
- Error message: "File size exceeds the 5 MB limit. Please upload a smaller file."
- No file stored on the server
- No invoice record created in DB

**Pass/Fail:** ___

---

### TC-013 — Duplicate Invoice Submission Blocked

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-013 |
| **Scenario** | TS-INV-08 |
| **Requirement** | REQ-02 |
| **Title** | System prevents submission of a duplicate invoice |
| **Priority** | Critical |
| **Type** | Functional — Negative / Business Rule |
| **Preconditions** | Invoice `INV-TC-001` from `vendor1@testcorp.com` against `PO-2026-001` already exists in the system with status SUBMITTED. |

**Test Data:**
```
Invoice Number : INV-TC-001  (same as existing)
PO Number      : PO-2026-001 (same as existing)
Amount         : ₹45,000
```

**Steps:**
1. Log in as `vendor1@testcorp.com`
2. Navigate to **Submit Invoice**
3. Enter Invoice Number: `INV-TC-001`
4. Enter PO Number: `PO-2026-001`
5. Enter Amount: `₹45,000`
6. Click **Submit**

**Expected Result:**
- Submission is blocked
- Error: "Invoice INV-TC-001 against PO-2026-001 has already been submitted."
- No duplicate record created in DB

**Pass/Fail:** ___

---

### TC-014 — Invoice Amount Exceeds PO Value

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-014 |
| **Scenario** | TS-INV-09 |
| **Requirement** | REQ-02 |
| **Title** | System blocks or warns when invoice amount exceeds approved PO amount |
| **Priority** | High |
| **Type** | Business Rule — Negative |
| **Preconditions** | PO `PO-2026-001` has an approved amount of ₹50,000. |

**Test Data:**
```
Invoice Number : INV-TC-002
PO Number      : PO-2026-001
Amount         : ₹55,000  (exceeds PO amount)
```

**Steps:**
1. Log in as vendor
2. Navigate to **Submit Invoice**
3. Enter PO: `PO-2026-001`, Amount: `55000`
4. Click **Submit**

**Expected Result:**
- If hard block: Submission rejected with message "Invoice amount ₹55,000 exceeds the PO approved amount of ₹50,000."
- If soft warning: Warning displayed and vendor must explicitly acknowledge before proceeding
- (Behavior depends on clarification answer — both test cases should be designed)

**Pass/Fail:** ___

---

## Module: AP Approval Workflow (REQ-03)

---

### TC-020 — AP Team Approves a Valid Invoice

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-020 |
| **Scenario** | TS-AP-03 |
| **Requirement** | REQ-03 |
| **Title** | AP team member approves a pending invoice |
| **Priority** | Critical |
| **Type** | Functional — Positive |
| **Preconditions** | Invoice `INV-TC-001` exists in the system with status = SUBMITTED. AP user `ap_reviewer@company.com` is logged in. |

**Steps:**
1. Log in as `ap_reviewer@company.com`
2. Navigate to **Invoice Queue** — Pending
3. Open invoice `INV-TC-001`
4. Review details: verify vendor, PO, amount, and uploaded file
5. Click **Approve**
6. Confirm the approval in the confirmation dialog

**Expected Result:**
- Invoice status changes to `APPROVED`
- AP dashboard removes invoice from Pending queue
- Database: `invoices.status = APPROVED`, `approved_by = ap_reviewer@company.com`, `approved_at = NOW()`
- Notification email sent to vendor (TC-NOT-03 validates this)
- Invoice is queued for payment processing (REQ-04)

**Pass/Fail:** ___

---

### TC-021 — AP Team Rejects Invoice Without Providing Reason

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-021 |
| **Scenario** | TS-AP-05 |
| **Requirement** | REQ-03 |
| **Title** | AP team cannot reject an invoice without providing a rejection reason |
| **Priority** | High |
| **Type** | Functional — Negative / Validation |
| **Preconditions** | Invoice `INV-TC-002` is in SUBMITTED status. AP user is logged in. |

**Steps:**
1. Log in as AP user
2. Open invoice `INV-TC-002`
3. Click **Reject**
4. Leave the rejection reason field empty
5. Click **Confirm Rejection**

**Expected Result:**
- Rejection is blocked
- Inline validation: "Please provide a reason for rejection."
- Invoice status remains SUBMITTED
- No notification sent

**Pass/Fail:** ___

---

### TC-022 — Concurrent AP Approval Race Condition

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-022 |
| **Scenario** | TS-AP-07 |
| **Requirement** | REQ-03 |
| **Title** | Two AP users cannot both act on the same invoice simultaneously |
| **Priority** | High |
| **Type** | Concurrency / Data Integrity |
| **Preconditions** | Invoice `INV-TC-003` is in SUBMITTED status. Two AP users (`ap1@company.com` and `ap2@company.com`) are both logged in. |

**Steps:**
1. Both ap1 and ap2 open invoice `INV-TC-003` at the same time
2. ap1 clicks **Approve** and submits
3. ap2 also clicks **Approve** and submits

**Expected Result:**
- ap1's approval succeeds; invoice status = APPROVED
- ap2 receives an error: "This invoice has already been actioned by another reviewer."
- Database: exactly one approval record exists; no duplicate approval

**Pass/Fail:** ___

---

## Module: RBAC / Access Control (REQ-07)

---

### TC-060 — Vendor Cannot Access Another Vendor's Invoice (IDOR Test)

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-060 |
| **Scenario** | TS-RBAC-06 |
| **Requirement** | REQ-07 |
| **Title** | Vendor A cannot access Vendor B's invoice via direct URL manipulation |
| **Priority** | Critical |
| **Type** | Security — IDOR (Insecure Direct Object Reference) |
| **Preconditions** | `vendorA@a.com` is logged in. Invoice `INV-VENDOR-B-001` belongs to `vendorB@b.com`. |

**Steps:**
1. Log in as `vendorA@a.com`
2. Note the URL pattern for invoices, e.g., `/invoices/123`
3. Manually change the ID in the URL to the ID of Vendor B's invoice: `/invoices/456`
4. Observe the response

**Expected Result:**
- API returns HTTP 403 Forbidden
- UI shows: "You do not have permission to view this invoice." or redirects to dashboard
- No data belonging to Vendor B is exposed
- Attempt is logged in the security audit log

**Pass/Fail:** ___

---

### TC-061 — Unauthenticated User Cannot Access Any Portal Page

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-061 |
| **Scenario** | TS-RBAC-04 |
| **Requirement** | REQ-07 |
| **Title** | Direct URL access without login is blocked |
| **Priority** | Critical |
| **Type** | Security — Authentication |
| **Preconditions** | User has no active session. |

**Steps:**
1. Clear all cookies and session storage
2. Directly navigate to: `/dashboard`, `/invoices`, `/ap/queue`, `/reports`

**Expected Result:**
- All pages redirect to `/login`
- No protected content is returned
- API calls without auth token return HTTP 401

**Pass/Fail:** ___

---

### TC-062 — API Endpoint Enforces Authorization (No UI Bypass)

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-062 |
| **Scenario** | TS-RBAC-05 |
| **Requirement** | REQ-07 |
| **Title** | API returns 403 when vendor token is used to call AP-only endpoint |
| **Priority** | Critical |
| **Type** | Security — API Authorization |
| **Preconditions** | Vendor `vendor1@testcorp.com` is logged in and has a valid JWT token. |

**Steps:**
1. Copy the vendor's JWT from browser dev tools / Postman
2. Send a POST request to `POST /api/invoices/{id}/approve` using the vendor's JWT
3. Observe the API response

**Expected Result:**
- HTTP 403 Forbidden
- Response body: `{ "error": "Insufficient permissions" }`
- Invoice status unchanged in DB

**Pass/Fail:** ___

---

## Module: Email Notifications (REQ-05)

---

### TC-040 — Vendor Receives Notification on Invoice Submission

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-040 |
| **Scenario** | TS-NOT-01 |
| **Requirement** | REQ-05 |
| **Title** | Vendor receives a confirmation email after submitting an invoice |
| **Priority** | High |
| **Type** | Functional — Integration |
| **Preconditions** | Vendor is logged in. SMTP service is configured in QA environment. |

**Steps:**
1. Submit a valid invoice (TC-010 steps)
2. Check `vendor1@testcorp.com` inbox (use test mailbox like Mailhog/Mailtrap in QA)

**Expected Result:**
- Email received within 2 minutes of submission
- Subject: "Invoice INV-TC-001 Submitted Successfully"
- Body contains: Invoice number, PO number, submission date, portal link
- No broken links or placeholder text in the email body

**Pass/Fail:** ___

---

### TC-041 — Vendor Receives Rejection Email with Reason

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-041 |
| **Scenario** | TS-NOT-04 |
| **Requirement** | REQ-05 |
| **Title** | Vendor receives rejection email containing the rejection reason |
| **Priority** | High |
| **Type** | Functional — Integration |
| **Preconditions** | Invoice `INV-TC-002` is in SUBMITTED status. AP user is ready to reject it. |

**Steps:**
1. AP user rejects invoice `INV-TC-002` with reason: "Invoice date does not match PO period."
2. Check `vendor1@testcorp.com` inbox

**Expected Result:**
- Email received within 2 minutes
- Subject: "Invoice INV-TC-002 Has Been Rejected"
- Body contains: invoice number, rejection reason ("Invoice date does not match PO period"), action steps for the vendor

**Pass/Fail:** ___

---

## Module: Monthly Report (REQ-06)

---

### TC-030 — Monthly Report Data Accuracy

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-030 |
| **Scenario** | TS-RPT-02 |
| **Requirement** | REQ-06 |
| **Title** | Generated report totals match actual invoice data in the database |
| **Priority** | Critical |
| **Type** | Functional — Data Integrity |
| **Preconditions** | Test data: May 2026 has 10 invoices — 5 Approved (total ₹200,000), 3 Rejected, 2 Pending. |

**Steps:**
1. Log in as Admin or Finance Manager
2. Navigate to **Reports**
3. Select period: May 2026
4. Click **Generate Report**
5. Compare report figures with direct DB query:
   ```sql
   SELECT status, COUNT(*), SUM(amount) 
   FROM invoices 
   WHERE MONTH(submitted_at) = 5 AND YEAR(submitted_at) = 2026
   GROUP BY status;
   ```

**Expected Result:**
- Report shows: Approved = 5, Rejected = 3, Pending = 2, Total Approved Amount = ₹200,000
- Report values match DB query results exactly
- No rounding errors or missing records

**Pass/Fail:** ___

---

## Edge & Boundary Test Cases

> This section covers boundary conditions, invalid state transitions, failure modes, and security inputs identified in the Edge Test Case reference (TC_E series). Cases TC_E03, TC_E05, TC_E06, TC_E11, TC_E13, and TC_E14 are already covered in the functional test cases above.

---

### TC_E01 — Invoice Submission Without Mandatory Fields

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E01 |
| **Scenario** | TS-INV-03 |
| **Requirement** | REQ-02 |
| **Title** | System shows validation errors when mandatory invoice fields are left empty |
| **Priority** | High |
| **Type** | Validation — Negative |
| **Preconditions** | Vendor `vendor1@testcorp.com` is logged in and on the Submit Invoice page. |

**Test Data:**

```text
Invoice Number : (left empty)
Invoice Date   : (left empty)
PO Number      : (left empty)
Amount         : (left empty)
File           : (no file selected)
```

**Steps:**

1. Log in as vendor and navigate to **Submit Invoice**
2. Leave all mandatory fields empty and click **Submit**
3. Repeat individually — leave only Invoice Number empty, then only PO Number empty, then only Amount empty

**Expected Result:**

- Submission is blocked for each missing mandatory field
- Inline validation message appears adjacent to each empty field (e.g., "Invoice Number is required", "PO Number is required")
- No invoice record created in the database
- Page does not navigate away

**Pass/Fail:** ___

---

### TC_E02 — File Upload at Exact Maximum Size Boundary

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E02 |
| **Scenario** | TS-INV-07 |
| **Requirement** | REQ-02 |
| **Title** | File exactly at the 5 MB limit is accepted; 1 byte over is rejected |
| **Priority** | Medium |
| **Type** | Boundary Value Analysis |
| **Preconditions** | Vendor is logged in. Max file size is 5 MB. Three test files are prepared. |

**Test Data:**

```text
File A : boundary_under.pdf — 4.9 MB  (below limit)
File B : boundary_exact.pdf — 5.0 MB  (exactly at limit)
File C : boundary_over.pdf  — 5.1 MB  (just over limit)
```

**Steps:**

1. Upload `boundary_under.pdf` (4.9 MB) and submit — verify accepted
2. Upload `boundary_exact.pdf` (5.0 MB) and submit — verify accepted
3. Upload `boundary_over.pdf` (5.1 MB) and attempt to submit — verify rejected

**Expected Result:**

- 4.9 MB: Accepted, invoice submits successfully
- 5.0 MB: Accepted, invoice submits successfully
- 5.1 MB: Rejected with error "File size exceeds the 5 MB limit. Please upload a smaller file."
- No file stored on server for the rejected upload

**Pass/Fail:** ___

---

### TC_E04 — Upload Corrupted Invoice File

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E04 |
| **Scenario** | TS-INV-16 |
| **Requirement** | REQ-02 |
| **Title** | System rejects a corrupted PDF file and does not store it |
| **Priority** | Medium |
| **Type** | Format — Negative |
| **Preconditions** | Vendor is logged in. A corrupted PDF file is prepared (valid `.pdf` extension, corrupt binary content). |

**Test Data:**

```text
File : corrupted_invoice.pdf — valid .pdf extension, corrupt byte content
       (e.g., truncated file or modified PDF header bytes)
```

**Steps:**

1. Log in as vendor and navigate to **Submit Invoice**
2. Fill in all other mandatory fields with valid data
3. Upload `corrupted_invoice.pdf`
4. Click **Submit**

**Expected Result:**

- Upload is rejected
- Error message: "The uploaded file could not be read. Please upload a valid PDF."
- No file stored on the server
- No invoice record created in the database

**Pass/Fail:** ___

---

### TC_E07 — Invoice Number Exceeds Maximum Length

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E07 |
| **Scenario** | TS-INV-17 |
| **Requirement** | REQ-02 |
| **Title** | System enforces maximum character length on the invoice number field |
| **Priority** | Medium |
| **Type** | Boundary Value Analysis |
| **Preconditions** | Vendor is logged in. Max invoice number length is 50 characters (confirm in clarifications). |

**Test Data:**

```text
Value A : INV-2026-001                                     (short, valid)
Value B : INV-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA (50 chars, at limit)
Value C : INV-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA (51 chars, over limit)
```

**Steps:**

1. Enter Value A → submit → verify accepted
2. Enter Value B (exactly 50 chars) → submit → verify accepted
3. Enter Value C (51 chars) → attempt to submit
4. Also attempt to type past the limit directly in the field to verify UI enforcement

**Expected Result:**

- Values A and B: Accepted and stored correctly
- Value C: Field either prevents typing beyond the limit (UI cap) OR submission is blocked with "Invoice number must not exceed 50 characters."
- No oversized value stored in the database

**Pass/Fail:** ___

---

### TC_E08 — Approve an Already-Rejected Invoice

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E08 |
| **Scenario** | TS-AP-11 |
| **Requirement** | REQ-03 |
| **Title** | System blocks approval of an invoice already in REJECTED state |
| **Priority** | High |
| **Type** | Workflow — Invalid State Transition |
| **Preconditions** | Invoice `INV-TC-REJ-001` exists with status = `REJECTED`. AP user is logged in. |

**Steps:**

1. Log in as `ap_reviewer@company.com`
2. Locate invoice `INV-TC-REJ-001` (status = REJECTED)
3. Open the invoice detail page
4. Attempt to click **Approve** (or call `POST /api/invoices/{id}/approve` with vendor JWT)

**Expected Result:**

- UI: Approve button is disabled or absent for a rejected invoice
- API: Returns HTTP 409 Conflict — "Invoice is in REJECTED state and cannot be approved."
- Invoice status remains `REJECTED` in the database
- No approval record created

**Pass/Fail:** ___

---

### TC_E09 — Reject an Already-Approved Invoice

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E09 |
| **Scenario** | TS-AP-12 |
| **Requirement** | REQ-03 |
| **Title** | System blocks rejection of an invoice already in APPROVED state |
| **Priority** | High |
| **Type** | Workflow — Invalid State Transition |
| **Preconditions** | Invoice `INV-TC-APP-001` exists with status = `APPROVED`. AP user is logged in. |

**Steps:**

1. Log in as `ap_reviewer@company.com`
2. Locate invoice `INV-TC-APP-001` (status = APPROVED)
3. Open the invoice detail page
4. Attempt to click **Reject** (or call `POST /api/invoices/{id}/reject`)

**Expected Result:**

- UI: Reject button is disabled or absent for an approved invoice
- API: Returns HTTP 409 Conflict — "Invoice is in APPROVED state and cannot be rejected."
- Invoice status remains `APPROVED` in the database
- If invoice is already forwarded to payment, no payment reversal is triggered

**Pass/Fail:** ___

---

### TC_E10 — Session Expires While Invoice Submission Form Is Being Filled

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E10 |
| **Scenario** | TS-LOG-08 |
| **Requirement** | REQ-01 |
| **Title** | Session timeout mid-form redirects to login without creating a partial invoice record |
| **Priority** | Medium |
| **Type** | Session — Edge Case |
| **Preconditions** | Session timeout is configured (e.g., 30 min idle). Vendor is on the Submit Invoice page with partially filled data. |

**Test Data:**

```text
Partially entered:
  Invoice Number : INV-TC-SESSION
  PO Number      : PO-2026-001
  Amount         : ₹30,000
  File           : (not yet selected)
```

**Steps:**

1. Log in as vendor and navigate to **Submit Invoice**
2. Fill in Invoice Number, PO Number, and Amount — do not upload a file
3. Let the session expire (idle past timeout, or invalidate token via dev tools)
4. Click **Submit**

**Expected Result:**

- User is redirected to the login page with message "Your session has expired. Please log in again."
- No partial invoice record exists in the database for `INV-TC-SESSION`
- After re-login, no ghost record or stuck-status invoice is visible

**Pass/Fail:** ___

---

### TC_E12 — Email Service Down During Invoice Status Change

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E12 |
| **Scenario** | TS-NOT-09 |
| **Requirement** | REQ-05 |
| **Title** | Core invoice status update succeeds even when email service is unavailable; failure is logged |
| **Priority** | High |
| **Type** | Integration — Failure Mode |
| **Preconditions** | Invoice `INV-TC-005` is in SUBMITTED status. SMTP service is taken offline or simulated as returning 500 in the QA environment. |

**Steps:**

1. Confirm SMTP service is down (disable in config or use a mock returning 500)
2. Log in as AP user and approve invoice `INV-TC-005`
3. Check invoice status in the portal
4. Check the application notification/error log
5. Restore SMTP and check if a retry sends the pending notification

**Expected Result:**

- Invoice status updates to `APPROVED` in the database — the business action is NOT blocked by email failure
- No notification email is delivered (expected)
- Application log records: "Email notification failed for INV-TC-005 — SMTP unavailable. Queued for retry."
- If retry is implemented: email is delivered once SMTP recovers
- Vendor portal shows the updated status regardless of email

**Pass/Fail:** ___

---

### TC_E15 — Monthly Report Generation with Large Dataset

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E15 |
| **Scenario** | TS-RPT-08 |
| **Requirement** | REQ-06 |
| **Title** | Monthly report generates correctly and within acceptable time under 10,000 invoice records |
| **Priority** | Medium |
| **Type** | Performance / Reporting |
| **Preconditions** | Test database is pre-populated with 10,000 invoice records for January 2026 (5,000 Approved, 3,000 Rejected, 2,000 Pending). |

**Test Data:**

```text
Reporting Period : January 2026
Total Records    : 10,000
  Approved       : 5,000  (₹250,000,000 total)
  Rejected       : 3,000
  Pending        : 2,000
```

**Steps:**

1. Log in as Admin or Finance Manager
2. Navigate to **Reports** and select January 2026
3. Click **Generate Report** and record the time taken
4. Export in both PDF and CSV formats
5. Compare report totals against a direct DB aggregate query

**Expected Result:**

- Report generates without timeout, crash, or memory error
- Page load/render completes within agreed SLA (e.g., ≤ 10 seconds)
- Totals match DB query exactly: Approved = 5,000, Rejected = 3,000, Pending = 2,000
- PDF and CSV exports download without truncation or data corruption

**Pass/Fail:** ___

---

### TC_E16 — SQL Injection Across All Text Input Fields

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E16 |
| **Scenario** | TS-SEC-01 |
| **Requirement** | REQ-02, REQ-07 |
| **Title** | SQL injection payloads in all text input fields are sanitized and do not affect the database |
| **Priority** | Critical |
| **Type** | Security — Input Validation |
| **Preconditions** | Vendor is logged in. TC-018 already covers the invoice number field specifically; this TC extends coverage to all remaining fields. |

**Test Data:**

```text
Payloads:
  P1 : ' OR '1'='1
  P2 : '; DROP TABLE invoices; --
  P3 : ' UNION SELECT username, password FROM users --

Fields to test:
  Invoice form   : PO Number, Amount (text entry), line item description
  Registration   : Company Name, Contact Name, GST/Tax ID
  Login          : Email field, Password field
  Search/Filter  : Vendor name search, invoice number search bar
```

**Steps:**

1. For each field listed above, enter each payload
2. Submit the form or trigger the search/action
3. Observe the UI response — check for SQL error messages or unexpected data
4. Check application logs for DB errors
5. Verify the database is intact after each attempt

**Expected Result:**

- All payloads are sanitized or rejected at input
- No SQL error messages (e.g., "ORA-", "MySQL syntax error", stack traces) appear in the UI
- Database tables and records remain intact
- API returns 400 Bad Request or a clean validation error — never a 500 with a DB stack trace
- All attempts are logged by the application

**Pass/Fail:** ___

---

### TC_E17 — Bulk Invoice Submission (Performance / Stress)

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_E17 |
| **Scenario** | TS-INV-18 |
| **Requirement** | REQ-02 |
| **Title** | System handles 20 rapid successive invoice submissions from the same vendor without failure or data loss |
| **Priority** | Medium |
| **Type** | Performance — Stress |
| **Preconditions** | Vendor account is active. 20 unique invoice records with valid PO numbers and valid PDF files are prepared. |

**Test Data:**

```text
Invoices  : INV-BULK-001 to INV-BULK-020
PO Numbers: PO-2026-001 to PO-2026-020 (all valid and open)
Files     : bulk_invoice_001.pdf to bulk_invoice_020.pdf (each ~1 MB)
```

**Steps:**

1. Log in as vendor
2. Submit INV-BULK-001 through INV-BULK-020 in rapid succession
3. After all submissions, check "My Invoices" list — verify count = 20
4. Check AP team's pending queue — verify 20 new records
5. Query the database: `SELECT COUNT(*) FROM invoices WHERE vendor_id = 'vendor1'`

**Expected Result:**

- All 20 invoices are submitted with status = `SUBMITTED`
- No submissions are lost, duplicated, or stuck in a failed state
- Both vendor dashboard and AP queue show exactly 20 new records
- Database contains 20 distinct invoice records with correct field values
- No application errors or timeouts during the burst

**Pass/Fail:** ___

---

## Module: New Scenario Test Cases (TC_N01–TC_N29)

---

### TC_N01 — Password Boundary at Registration

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N01 |
| **Scenario** | TS-REG-06 |
| **Requirement** | REQ-01 |
| **Title** | Vendor registration with password at minimum and maximum allowed length |
| **Priority** | Medium |
| **Type** | Boundary Value Analysis |
| **Preconditions** | User is on the vendor registration page. |

**Test Data:**

```text
Password_7  : Test@12       (7 chars — just below min)
Password_8  : Test@123      (8 chars — at min)
Password_64 : Aa1! × 16     (64 chars — at max)
Password_65 : Aa1! × 16 + X (65 chars — just above max)
```

**Steps:**

1. Navigate to the vendor registration page; fill all required fields with valid data
2. Enter Password_7 in the password field → attempt registration
3. Enter Password_8 → attempt registration
4. Enter Password_64 → attempt registration
5. Enter Password_65 → attempt registration

**Expected Result:**

- Password_7: rejected — "Password must be at least 8 characters"
- Password_8: accepted, registration succeeds
- Password_64: accepted, registration succeeds
- Password_65: rejected — "Password cannot exceed 64 characters"

**Pass/Fail:** ___

---

### TC_N02 — Expired Email Verification Link

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N02 |
| **Scenario** | TS-REG-07 |
| **Requirement** | REQ-01 |
| **Title** | Email verification link accessed after expiry is rejected |
| **Priority** | High |
| **Type** | State — Time-based |
| **Preconditions** | Vendor registered but has not verified email. Verification link expiry = 24 hours. |

**Test Data:**

```text
Vendor : expiredtest@vendor.com
Action : Access link 25+ hours after registration (simulate via test env config)
```

**Steps:**

1. Register as `expiredtest@vendor.com`; do not click the verification link
2. Simulate expiry (advance system clock or wait 25 hours)
3. Open the verification link from the email

**Expected Result:**

- Error: "This verification link has expired. Please request a new one."
- Vendor account remains `Unverified`
- "Resend verification email" option is shown

**Pass/Fail:** ___

---

### TC_N03 — Email Verification Link Replay

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N03 |
| **Scenario** | TS-REG-08 |
| **Requirement** | REQ-01 |
| **Title** | Email verification link used a second time after account is already active is rejected |
| **Priority** | Medium |
| **Type** | State — Replay |
| **Preconditions** | Vendor has already verified their email and account is `Active`. |

**Test Data:**

```text
Vendor : replaytest@vendor.com
Link   : original verification URL saved before first use
```

**Steps:**

1. Register and click the verification link — confirm account is `Active`
2. Click the same link a second time

**Expected Result:**

- Error: "This link has already been used or is no longer valid."
- No state change; account remains `Active`
- Token details are not exposed in the error

**Pass/Fail:** ___

---

### TC_N04 — Login Before Email Verified

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N04 |
| **Scenario** | TS-LOG-09 |
| **Requirement** | REQ-01 |
| **Title** | Vendor with unverified email is blocked from logging in |
| **Priority** | High |
| **Type** | State — Unverified Account |
| **Preconditions** | Vendor registered but has NOT clicked the verification link. |

**Test Data:**

```text
Email    : unverified@vendor.com
Password : Test@1234!
State    : Registered, email not verified
```

**Steps:**

1. Register as `unverified@vendor.com`; do not verify the email
2. Navigate to the login page; enter correct credentials
3. Click Login

**Expected Result:**

- Login blocked — "Please verify your email address before logging in."
- Option to resend the verification email is shown
- No session token is issued

**Pass/Fail:** ___

---

### TC_N05 — Password Reset Link Reuse

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N05 |
| **Scenario** | TS-LOG-10 |
| **Requirement** | REQ-01 |
| **Title** | Password reset link used a second time after password is already changed is rejected |
| **Priority** | Medium |
| **Type** | State — Replay |
| **Preconditions** | Vendor has successfully reset their password using a reset link. |

**Test Data:**

```text
Email      : resettest@vendor.com
Reset link : original URL saved before first use
```

**Steps:**

1. Request a password reset for `resettest@vendor.com`
2. Click the link, set a new password — confirm success
3. Click the same reset link again

**Expected Result:**

- Error: "This reset link is invalid or has already been used."
- No password change permitted via the old link

**Pass/Fail:** ___

---

### TC_N06 — Concurrent Sessions from Same Account

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N06 |
| **Scenario** | TS-LOG-11 |
| **Requirement** | REQ-01 |
| **Title** | Same vendor account logged in concurrently from two browsers — defined policy is enforced |
| **Priority** | Medium |
| **Type** | Concurrency — Session |
| **Preconditions** | Vendor account is active. Two browsers available. |

**Test Data:**

```text
Email    : concurrent@vendor.com
Browser1 : Chrome (primary)
Browser2 : Firefox (second)
```

**Steps:**

1. Log in as `concurrent@vendor.com` in Browser 1 — confirm session active
2. Log in as the same user in Browser 2
3. Attempt to navigate or perform an action in Browser 1

**Expected Result:**

- Defined concurrent-session policy is enforced consistently: either (a) Browser 1 session is invalidated and redirected to login, or (b) both sessions remain with a warning shown
- No silent data corruption or orphaned sessions

**Pass/Fail:** ___

---

### TC_N07 — XSS in Login Fields

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N07 |
| **Scenario** | TS-LOG-12 |
| **Requirement** | REQ-01 |
| **Title** | XSS payload in email or username field at login is sanitized and not executed |
| **Priority** | High |
| **Type** | Security — XSS |
| **Preconditions** | User is on the login page. |

**Test Data:**

```text
XSS_1 : <script>alert('xss')</script>
XSS_2 : "><img src=x onerror=alert(1)>
XSS_3 : javascript:alert('xss')
```

**Steps:**

1. Navigate to the login page
2. Enter each XSS payload in the email field; submit
3. Check whether any script executes in the browser
4. Check server response and application logs

**Expected Result:**

- No script alert or execution in the browser
- Input rejected or rendered as escaped plain text
- Server returns 400 or "Invalid email format" — never echoes the script

**Pass/Fail:** ___

---

### TC_N08 — Invoice Amount of Zero

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N08 |
| **Scenario** | TS-INV-19 |
| **Requirement** | REQ-02 |
| **Title** | Invoice submitted with amount of zero is rejected |
| **Priority** | High |
| **Type** | Boundary Value — Validation |
| **Preconditions** | Vendor is logged in. A valid open PO exists. |

**Test Data:**

```text
Invoice No : INV-ZERO-001
PO Number  : PO-2026-001
Amount     : 0.00
```

**Steps:**

1. Navigate to Submit Invoice
2. Enter all fields with valid data; set Amount to `0.00`
3. Click Submit

**Expected Result:**

- Submission blocked — "Invoice amount must be greater than zero"
- No invoice record created in the database

**Pass/Fail:** ___

---

### TC_N09 — Invoice with Future Date

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N09 |
| **Scenario** | TS-INV-20 |
| **Requirement** | REQ-02 |
| **Title** | Invoice submitted with a future date is rejected |
| **Priority** | High |
| **Type** | Validation — Date Logic |
| **Preconditions** | Vendor is logged in. A valid open PO exists. |

**Test Data:**

```text
Invoice No   : INV-FUTURE-001
Invoice Date : 2027-01-01
Amount       : 5000.00
```

**Steps:**

1. Navigate to Submit Invoice; fill all valid fields
2. Set Invoice Date to `2027-01-01`
3. Click Submit

**Expected Result:**

- Submission blocked — "Invoice date cannot be in the future"
- No record created in the database

**Pass/Fail:** ___

---

### TC_N10 — Invoice Against Fully Consumed PO

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N10 |
| **Scenario** | TS-INV-21 |
| **Requirement** | REQ-02 |
| **Title** | Invoice submitted against a PO with zero remaining balance is rejected |
| **Priority** | High |
| **Type** | State — Business Rule |
| **Preconditions** | PO-CONSUMED-001 has total value ₹10,000 and remaining balance = ₹0. |

**Test Data:**

```text
Invoice No : INV-OVER-001
PO Number  : PO-CONSUMED-001
Amount     : 1.00
```

**Steps:**

1. Navigate to Submit Invoice
2. Enter PO Number `PO-CONSUMED-001`
3. Fill remaining fields and click Submit

**Expected Result:**

- Submission blocked — "This PO has been fully consumed and cannot accept further invoices"
- No invoice record created

**Pass/Fail:** ___

---

### TC_N11 — Non-Numeric Invoice Amount

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N11 |
| **Scenario** | TS-INV-22 |
| **Requirement** | REQ-02 |
| **Title** | Non-numeric characters in the invoice amount field are rejected |
| **Priority** | High |
| **Type** | Format Validation |
| **Preconditions** | Vendor is logged in. |

**Test Data:**

```text
Test_1 : Amount = "abc"
Test_2 : Amount = "12,000"    (comma separator)
Test_3 : Amount = "$5000"     (currency symbol)
Test_4 : Amount = "5000.00.00" (double decimal)
```

**Steps:**

1. Navigate to Submit Invoice
2. Enter each test value in the Amount field in turn; attempt to submit after each

**Expected Result:**

- All non-numeric or malformed values rejected — "Please enter a valid numeric amount (e.g., 5000.00)"
- Frontend input masking and backend validation both enforce the rule
- No invoice record created for any test value

**Pass/Fail:** ___

---

### TC_N12 — Concurrent Duplicate Invoice Submission (Race Condition)

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N12 |
| **Scenario** | TS-INV-23 |
| **Requirement** | REQ-02 |
| **Title** | Two simultaneous duplicate submissions from the same vendor result in exactly one invoice record |
| **Priority** | High |
| **Type** | Concurrency — Race Condition |
| **Preconditions** | Vendor is logged in. INV-RACE-001 has not been submitted before. |

**Test Data:**

```text
Invoice No : INV-RACE-001
PO Number  : PO-2026-001
Amount     : 3000.00
Trigger    : Two identical POST requests fired simultaneously
```

**Steps:**

1. Prepare two identical POST requests to the invoice submission endpoint
2. Fire both requests simultaneously (using a load tool or two browser tabs)
3. Query DB: `SELECT COUNT(*) FROM invoices WHERE invoice_number = 'INV-RACE-001'`

**Expected Result:**

- Exactly one invoice record created (COUNT = 1)
- One request returns HTTP 201; the other returns HTTP 409 — "Duplicate invoice"
- No race condition creates two identical records

**Pass/Fail:** ___

---

### TC_N13 — MIME Type Spoofing

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N13 |
| **Scenario** | TS-INV-24 |
| **Requirement** | REQ-02 |
| **Title** | File with .pdf extension but non-PDF MIME type is rejected by server-side validation |
| **Priority** | High |
| **Type** | Security — Format Validation |
| **Preconditions** | Vendor is logged in. |

**Test Data:**

```text
File : fake.pdf (actual content: .exe or .html file renamed to .pdf)
MIME : application/octet-stream (not application/pdf)
```

**Steps:**

1. Rename a non-PDF file to `fake.pdf`
2. Navigate to Submit Invoice and attach `fake.pdf`
3. Fill remaining fields with valid data and submit

**Expected Result:**

- Upload rejected after server-side MIME validation — "Invalid file type. Only genuine PDF files are accepted."
- File is not saved to the server
- Extension-only (client-side) check alone is not sufficient

**Pass/Fail:** ___

---

### TC_N14 — Zero-Byte File Upload

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N14 |
| **Scenario** | TS-INV-25 |
| **Requirement** | REQ-02 |
| **Title** | Zero-byte file uploaded as invoice attachment is rejected |
| **Priority** | Medium |
| **Type** | Boundary — Minimum File Size |
| **Preconditions** | Vendor is logged in. |

**Test Data:**

```text
File : empty.pdf (0 bytes)
```

**Steps:**

1. Create an empty file named `empty.pdf` (0 bytes)
2. Navigate to Submit Invoice; attach `empty.pdf`; fill all other required fields
3. Click Submit

**Expected Result:**

- Upload rejected — "Uploaded file is empty. Please attach a valid invoice PDF."
- File not stored; no invoice record created

**Pass/Fail:** ___

---

### TC_N15 — XSS in Vendor Notes Field

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N15 |
| **Scenario** | TS-INV-26 |
| **Requirement** | REQ-02 |
| **Title** | XSS payload in the invoice notes field is sanitized and not executed when viewed by AP user |
| **Priority** | High |
| **Type** | Security — XSS |
| **Preconditions** | Vendor is logged in. A valid open PO exists. |

**Test Data:**

```text
XSS_1 : <script>alert('xss')</script>
XSS_2 : "><img src=x onerror=alert(1)>
XSS_3 : <svg onload=alert(1)>
```

**Steps:**

1. Navigate to Submit Invoice; enter XSS_1 in the Notes/Description field; submit
2. Log in as AP user and open the submitted invoice — observe the Notes field rendering
3. Repeat for XSS_2 and XSS_3

**Expected Result:**

- No script executes in the AP user's browser
- Notes field renders payload as escaped plain text (e.g., `&lt;script&gt;`)

**Pass/Fail:** ___

---

### TC_N16 — Rejection Reason at Maximum Character Length

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N16 |
| **Scenario** | TS-AP-13 |
| **Requirement** | REQ-03 |
| **Title** | Rejection reason at exactly maximum allowed character length is accepted; one above is rejected |
| **Priority** | Medium |
| **Type** | Boundary Value Analysis |
| **Preconditions** | AP user is logged in. Three pending invoices are available. Max rejection reason length = 500 characters. |

**Test Data:**

```text
Reason_499 : "A" × 499 chars
Reason_500 : "A" × 500 chars
Reason_501 : "A" × 501 chars
```

**Steps:**

1. Open pending invoice 1; click Reject; enter Reason_499; submit
2. Open pending invoice 2; click Reject; enter Reason_500; submit
3. Open pending invoice 3; click Reject; enter Reason_501; attempt to submit

**Expected Result:**

- Reason_499: rejection accepted
- Reason_500: rejection accepted (at boundary)
- Reason_501: blocked — "Rejection reason cannot exceed 500 characters"

**Pass/Fail:** ___

---

### TC_N17 — Whitespace-Only Rejection Reason

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N17 |
| **Scenario** | TS-AP-14 |
| **Requirement** | REQ-03 |
| **Title** | Rejection reason containing only whitespace is treated as empty and blocked |
| **Priority** | High |
| **Type** | Validation |
| **Preconditions** | AP user is logged in. A pending invoice is available. |

**Test Data:**

```text
Input_1 : "   "   (spaces only)
Input_2 : "<TAB>" (tab character only)
Input_3 : "\n\n"  (newlines only)
```

**Steps:**

1. Open a pending invoice; click Reject
2. Enter spaces-only in the reason field; click Confirm Rejection
3. Repeat with tabs-only and newlines-only

**Expected Result:**

- All whitespace-only inputs treated as empty after server-side trimming
- Error: "Rejection reason is required and cannot be blank"
- Invoice remains `Pending`; no rejection persisted

**Pass/Fail:** ___

---

### TC_N18 — Three Concurrent AP Actions on Same Invoice

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N18 |
| **Scenario** | TS-AP-15 |
| **Requirement** | REQ-03 |
| **Title** | Three AP users simultaneously acting on the same invoice results in exactly one accepted action |
| **Priority** | High |
| **Type** | Concurrency |
| **Preconditions** | Three AP users active. One pending invoice INV-2026-060 available. |

**Test Data:**

```text
Invoice : INV-2026-060 (Pending)
AP1     : Approve
AP2     : Approve
AP3     : Reject
All actions triggered simultaneously
```

**Steps:**

1. Log in as AP1, AP2, AP3 in separate browsers with INV-2026-060 open
2. Trigger Approve (AP1), Approve (AP2), Reject (AP3) within the same second
3. Check final invoice status and DB: `SELECT status, approved_by FROM invoices WHERE id = 'INV-2026-060'`

**Expected Result:**

- Exactly one action succeeds; invoice has a single final status
- Other two requests return HTTP 409 — "This invoice has already been actioned"
- Audit log shows exactly one action entry; no duplicates

**Pass/Fail:** ___

---

### TC_N19 — AP Sorts Invoice List

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N19 |
| **Scenario** | TS-AP-16 |
| **Requirement** | REQ-03 |
| **Title** | AP user can sort the invoice list by date, amount, and vendor name |
| **Priority** | Low |
| **Type** | Functional |
| **Preconditions** | AP user is logged in. At least 10 invoices exist across multiple vendors. |

**Test Data:**

```text
Existing invoices with varying dates, amounts, and vendor names
```

**Steps:**

1. Log in as AP user; navigate to the invoice list
2. Click Date column header — verify ascending order; click again — verify descending
3. Click Amount column header — verify numeric sort ascending, then descending
4. Click Vendor Name column header — verify alphabetical A→Z, then Z→A

**Expected Result:**

- Each column sort applied to the full dataset (not just current page)
- Sort indicator arrow updates correctly in the UI
- Results match expected order for each column and direction

**Pass/Fail:** ___

---

### TC_N20 — ERP Retry Limit Reached

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N20 |
| **Scenario** | TS-PAY-06 |
| **Requirement** | REQ-04 |
| **Title** | When ERP retry limit is exhausted, invoice status moves to Payment Failed and no further retries occur |
| **Priority** | High |
| **Type** | State — Boundary |
| **Preconditions** | ERP stub configured to return HTTP 503 on every call. Max retries = 3. |

**Test Data:**

```text
Invoice    : INV-2026-070 (Approved)
ERP stub   : always returns 503
Max retries: 3
```

**Steps:**

1. Approve INV-2026-070 to trigger payment forwarding
2. Observe ERP stub returning 503 on all retry attempts
3. After the 3rd retry fails, check invoice status
4. Verify no 4th retry is made (check logs)

**Expected Result:**

- Invoice status = `Payment Failed` after 3 unsuccessful retries
- No further retry attempts beyond the configured limit
- Admin/finance team alerted; audit log shows all 3 retry attempts with timestamps

**Pass/Fail:** ___

---

### TC_N21 — Idempotency: Invoice Forwarded to ERP Twice

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N21 |
| **Scenario** | TS-PAY-07 |
| **Requirement** | REQ-04 |
| **Title** | Approved invoice forwarded to ERP twice simultaneously does not create a duplicate payment |
| **Priority** | High |
| **Type** | Concurrency — Idempotency |
| **Preconditions** | Invoice INV-2026-071 is Approved and ready for forwarding. |

**Test Data:**

```text
Invoice      : INV-2026-071
Trigger      : Two simultaneous forwarding API calls for the same invoice
```

**Steps:**

1. Approve INV-2026-071
2. Fire two simultaneous payment forwarding requests for the same invoice
3. Check ERP for payment records
4. Check DB for payment status entries for INV-2026-071

**Expected Result:**

- Only one payment record created in the ERP
- One request returns 201; the second returns 200 or 409 (idempotent response)
- No duplicate debit processed; invoice has one payment reference ID

**Pass/Fail:** ___

---

### TC_N22 — Notification Ordering Under Rapid Status Changes

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N22 |
| **Scenario** | TS-NOT-10 |
| **Requirement** | REQ-05 |
| **Title** | Notifications for multiple rapid status changes on one invoice are delivered in correct chronological order |
| **Priority** | Medium |
| **Type** | Concurrency — Ordering |
| **Preconditions** | Invoice INV-2026-080 exists. Email notification service is active. |

**Test Data:**

```text
Invoice   : INV-2026-080
Sequence  : Submitted → Approved → Rejected (rapid, within seconds)
Recipients: vendor@test.com, ap-team@company.com
```

**Steps:**

1. Submit INV-2026-080
2. Immediately approve it (within 1 second)
3. Immediately reject it (within 1 second of approval)
4. Check vendor's inbox for all notification emails

**Expected Result:**

- Vendor receives exactly 3 emails: Submitted, Approved, Rejected in order
- Timestamps on emails are chronologically ascending
- No notifications lost, duplicated, or delivered out of order

**Pass/Fail:** ___

---

### TC_N23 — Special Characters in Email Notification Content

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N23 |
| **Scenario** | TS-NOT-11 |
| **Requirement** | REQ-05 |
| **Title** | Notification email correctly renders special characters in vendor name and invoice fields |
| **Priority** | Medium |
| **Type** | Encoding — UTF-8 |
| **Preconditions** | A vendor account exists with special characters in the company name. |

**Test Data:**

```text
Vendor Name  : Müller & Söhne GmbH
Invoice No   : INV-2026/090
Amount       : ₹1,50,000.00
```

**Steps:**

1. Submit an invoice as `Müller & Söhne GmbH`; trigger an approval
2. Check notification emails received by both vendor and AP team
3. Inspect raw email source for charset declaration and character rendering

**Expected Result:**

- All special characters (ü, ö, &, /, ₹) render correctly in the email body
- No garbled characters or raw HTML entities visible to the recipient
- Email headers declare `charset=UTF-8`

**Pass/Fail:** ___

---

### TC_N24 — Concurrent Report Generation

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N24 |
| **Scenario** | TS-RPT-09 |
| **Requirement** | REQ-06 |
| **Title** | Two admin users triggering report generation simultaneously produce correct, non-duplicate output |
| **Priority** | High |
| **Type** | Concurrency |
| **Preconditions** | Two admin accounts exist. May 2026 contains 120 known invoices. |

**Test Data:**

```text
Report Month : May 2026
Admin 1      : admin1@company.com
Admin 2      : admin2@company.com
Expected     : 120 invoices for May 2026
```

**Steps:**

1. Log in as Admin 1 and Admin 2 simultaneously
2. Both click "Generate May 2026 Report" at the same time
3. Download and compare both generated reports

**Expected Result:**

- Both reports contain identical, correct data (120 invoices, matching totals)
- No duplicate report entries created in the system
- No data corruption or partial/merged output

**Pass/Fail:** ___

---

### TC_N25 — Report Accuracy Across All Invoice Statuses

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N25 |
| **Scenario** | TS-RPT-10 |
| **Requirement** | REQ-06 |
| **Title** | Monthly report accurately categorizes and counts invoices across all statuses |
| **Priority** | High |
| **Type** | Data Integrity |
| **Preconditions** | June 2026 contains a known mix of invoices in each status. |

**Test Data:**

```text
Pending       : 10 invoices — ₹50,000
Approved      : 25 invoices — ₹1,25,000
Rejected      : 5 invoices  — ₹20,000
Payment Failed: 2 invoices  — ₹8,000

DB verification query:
SELECT status, COUNT(*), SUM(amount) FROM invoices
WHERE MONTH(submitted_date) = 6 AND YEAR(submitted_date) = 2026
GROUP BY status
```

**Steps:**

1. Confirm above distribution exists in the database for June 2026
2. Generate the June 2026 monthly report as admin
3. Compare report counts and totals against the DB query results

**Expected Result:**

- Report shows all 4 status buckets with correct counts and amounts
- Grand total: 42 invoices, ₹2,03,000
- Report figures match DB query results exactly; no status omitted

**Pass/Fail:** ___

---

### TC_N26 — Privilege Escalation via API

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N26 |
| **Scenario** | TS-SEC-02 |
| **Requirement** | REQ-07 |
| **Title** | Vendor attempting to elevate their own role via API is blocked |
| **Priority** | Critical |
| **Type** | Security — Privilege Escalation |
| **Preconditions** | Vendor account is active with a valid JWT. Role management endpoint is known. |

**Test Data:**

```text
Vendor token : JWT for vendor@testcorp.com (role: VENDOR)
Request      : PATCH /api/users/{vendor_user_id}/role
Payload      : {"role": "ADMIN"}
```

**Steps:**

1. Log in as vendor; capture the JWT token
2. Send `PATCH /api/users/{vendor_user_id}/role` with `{"role": "ADMIN"}` using the vendor JWT
3. Check the HTTP response
4. Verify the user's role in the database has not changed

**Expected Result:**

- HTTP 403 Forbidden — "You do not have permission to modify roles"
- Vendor role in DB remains `VENDOR`
- Attempt logged in the security audit log

**Pass/Fail:** ___

---

### TC_N27 — JWT Token Tampering

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N27 |
| **Scenario** | TS-SEC-03 |
| **Requirement** | REQ-07 |
| **Title** | Request with a tampered JWT payload is rejected with 401 |
| **Priority** | Critical |
| **Type** | Security — Token Integrity |
| **Preconditions** | Vendor has a valid JWT. A JWT decoder tool (e.g., jwt.io) is available. |

**Test Data:**

```text
Original JWT : valid token with role=VENDOR
Tampered JWT : payload modified to role=ADMIN; original signature left unchanged
```

**Steps:**

1. Log in as vendor; capture the JWT
2. Decode the token; modify payload: `"role": "VENDOR"` → `"role": "ADMIN"`; re-encode without re-signing
3. Send an API request to an admin-only endpoint using the tampered token

**Expected Result:**

- HTTP 401 Unauthorized — "Invalid or malformed token"
- No access to the requested resource
- Attempt logged in the security audit log

**Pass/Fail:** ___

---

### TC_N28 — Audit Log for Role Changes

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC_N28 |
| **Scenario** | TS-RBAC-10 |
| **Requirement** | REQ-07 |
| **Title** | Admin role assignment changes are captured in the audit log with full details |
| **Priority** | High |
| **Type** | Audit Trail |
| **Preconditions** | Admin account is active. A vendor user exists whose role will be changed. |

**Test Data:**

```text
Admin       : admin@company.com
Target user : vendor@testcorp.com
Change      : VENDOR → AP_REVIEWER
```

**Steps:**

1. Log in as admin; navigate to User Management
2. Change `vendor@testcorp.com` role from `VENDOR` to `AP_REVIEWER`; save
3. Query audit log: `SELECT * FROM audit_log WHERE action = 'ROLE_CHANGE' ORDER BY timestamp DESC LIMIT 5`

**Expected Result:**

- Audit log entry created with: actor, target_user, old_role=VENDOR, new_role=AP_REVIEWER, timestamp
- Entry is immutable — cannot be deleted or modified via the UI
- Admin sees a confirmation message after the change

**Pass/Fail:** ___

---

### TC_N29 — IDOR via API with Valid Token

| Field | Detail |
| ----- | ------ |
| **Test Case ID** | TC_N29 |
| **Scenario** | TS-RBAC-11 |
| **Requirement** | REQ-07 |
| **Title** | Vendor using a valid token but requesting another vendor's resource by ID is blocked |
| **Priority** | Critical |
| **Type** | Security — IDOR |
| **Preconditions** | Two vendor accounts exist. Vendor 2 has an invoice with a known ID. |

**Test Data:**

```text
Vendor 1 token : JWT for vendor1@testcorp.com
Target resource: INV-ID-9999 (belongs to vendor2@supplier.com)
Endpoint       : GET /api/invoices/INV-ID-9999
```

**Steps:**

1. Log in as Vendor 1; capture the JWT
2. Send `GET /api/invoices/INV-ID-9999` using Vendor 1's valid JWT
3. Check the HTTP response and body

**Expected Result:**

- HTTP 403 Forbidden or 404 Not Found
- Vendor 2's invoice data is NOT returned
- Endpoint does not reveal whether the resource exists for a different user
- Attempt logged in the security audit log

**Pass/Fail:** ___

---

### TC_N30 — Rejected Invoice Resubmission with Corrections

| Field | Detail |
| ----- | ------ |
| **Test Case ID** | TC_N30 |
| **Scenario** | TS-INV-27 |
| **Requirement** | REQ-02 |
| **Title** | Vendor resubmits a previously rejected invoice with corrections applied |
| **Priority** | High |
| **Type** | State Transition — Positive |
| **Preconditions** | Vendor is logged in. An invoice exists in REJECTED state with a rejection reason recorded. |

**Test Data:**

```text
Vendor     : vendor1@testcorp.com
Invoice ID : INV-2024-0099 (status: REJECTED, rejection reason: "Amount exceeds PO value")
Corrected amount: $4,500.00 (originally $6,000.00; PO value $5,000.00)
```

**Steps:**

1. Log in as vendor; navigate to Invoice List and locate INV-2024-0099 (status: REJECTED)
2. Click "Edit & Resubmit"; update Amount to $4,500.00; upload a revised invoice PDF
3. Submit the corrected invoice
4. Verify the invoice status and history

**Expected Result:**

- Invoice transitions from REJECTED → PENDING REVIEW
- Invoice history/audit trail records: original submission, rejection with reason, and resubmission timestamp
- AP team receives notification of the resubmitted invoice
- Corrected amount and document reflected in the invoice record

**Pass/Fail:** ___

---

### TC_N31 — Invoice List Page Performance with 500 Records

| Field | Detail |
| ----- | ------ |
| **Test Case ID** | TC_N31 |
| **Scenario** | TS-INV-28 |
| **Requirement** | REQ-02 |
| **Title** | Invoice list page loads within 3 seconds when 500 invoices are present in the DB |
| **Priority** | High |
| **Type** | Performance |
| **Preconditions** | DB seeded with 500 invoices across multiple statuses. AP user account is active. Performance baseline established. |

**Test Data:**

```text
DB state      : 500 invoices (mixed statuses: Pending, Approved, Rejected, Payment Failed)
User          : ap_user@company.com
Measurement   : k6 / browser network panel; p95 response time
Target SLA    : < 3 seconds page load (p95)
```

**Steps:**

1. Log in as AP user
2. Navigate to the Invoice List page
3. Measure time from navigation request to page fully rendered (DOMContentLoaded + all table rows visible)
4. Repeat 10 times; record p95 value
5. Apply status filter (e.g., "Pending only") and re-measure

**Expected Result:**

- Unfiltered list (500 records) renders in < 3 seconds at p95
- Filtered list renders in < 3 seconds at p95
- No 5xx errors; no console JS errors
- UI remains responsive during load (no freezing)

**Pass/Fail:** ___

---

### TC_N32 — Multi-Level Approval Escalation

| Field | Detail |
| ----- | ------ |
| **Test Case ID** | TC_N32 |
| **Scenario** | TS-AP-17 |
| **Requirement** | REQ-03 |
| **Title** | Invoice above approval threshold escalates correctly to the next-level approver |
| **Priority** | High |
| **Type** | State Transition — Workflow |
| **Preconditions** | System configured with two-level approval: Level 1 (AP Clerk) for invoices ≤ $10,000; Level 2 (AP Manager) for invoices > $10,000. Both user accounts are active. |

**Test Data:**

```text
Invoice amount : $15,000.00 (above L1 threshold)
L1 approver   : ap_clerk@company.com
L2 approver   : ap_manager@company.com
PO             : PO-5001 (authorized up to $20,000)
```

**Steps:**

1. Vendor submits an invoice for $15,000 against PO-5001
2. Log in as ap_clerk@company.com; open the invoice — verify it shows "Pending L2 Approval" or is not actionable by L1
3. Log in as ap_manager@company.com; open the invoice — verify it is actionable
4. AP Manager approves the invoice
5. Verify final status and notification delivery

**Expected Result:**

- Invoice not approvable by L1 approver (clerk sees it as read-only or out of their queue)
- L2 approver (manager) receives a notification and can approve/reject
- On manager approval, invoice moves to APPROVED; vendor and AP clerk notified
- Escalation path recorded in audit trail

**Pass/Fail:** ___

---

### TC_N33 — AP Clerk Cannot Access Payment Processing Module

| Field | Detail |
| ----- | ------ |
| **Test Case ID** | TC_N33 |
| **Scenario** | TS-RBAC-12 |
| **Requirement** | REQ-07 |
| **Title** | AP Clerk role is denied access to the payment processing module |
| **Priority** | High |
| **Type** | RBAC — Negative |
| **Preconditions** | AP Clerk account is active. Payment processing module URL is known. |

**Test Data:**

```text
User              : ap_clerk@company.com (role: AP_CLERK)
Restricted URL    : /payment-processing
Restricted API    : POST /api/payments/trigger
```

**Steps:**

1. Log in as ap_clerk@company.com
2. Attempt to navigate directly to `/payment-processing` via the browser address bar
3. Attempt to call `POST /api/payments/trigger` with the AP Clerk's JWT
4. Verify response and UI behavior

**Expected Result:**

- Browser navigation to `/payment-processing` results in HTTP 403 or redirect to an "Access Denied" page
- API call returns HTTP 403 Forbidden; no payment triggered
- AP Clerk's dashboard does not display any payment module link or button
- Access attempt is logged in the security audit log

**Pass/Fail:** ___

---

### TC_N34 — File Upload Embedded Script Does Not Execute

| Field | Detail |
| ----- | ------ |
| **Test Case ID** | TC_N34 |
| **Scenario** | TS-SEC-04 |
| **Requirement** | REQ-07 |
| **Title** | PDF containing embedded JavaScript is uploaded — script does not execute on server or in browser |
| **Priority** | Critical |
| **Type** | Security — File Upload |
| **Preconditions** | Vendor account is active. A test PDF prepared with an embedded JavaScript action (e.g., `app.alert("XSS")` on open) is available. |

**Test Data:**

```text
File           : malicious_invoice.pdf (valid PDF with embedded JS: app.alert("XSS-TEST") on document open)
File size      : 1.2 MB
Vendor         : vendor1@testcorp.com
```

**Steps:**

1. Log in as vendor; navigate to Submit Invoice
2. Upload `malicious_invoice.pdf` as the invoice attachment; complete and submit the form
3. Log in as AP user; open the invoice and click to view the attached file
4. Monitor browser console and server logs for script execution
5. Verify server-side file handling (sandboxed render, no execution)

**Expected Result:**

- Upload is accepted (file is a valid PDF by extension and MIME type)
- Embedded JavaScript does NOT execute when the AP user opens the file in the portal viewer
- Browser console shows no `alert()` or unexpected JS execution
- Server logs show no script execution events
- If the portal uses a PDF renderer (e.g., PDF.js), JavaScript actions are suppressed

**Pass/Fail:** ___
