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
