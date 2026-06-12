# Test Scenarios
## B2B Vendor Invoice Management Portal

**Project:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12  
**Version:** 1.0

> A test scenario is "what to test" — a user situation or feature area. Each scenario expands into one or more detailed test cases in the Test Cases document.

---

## REQ-01: Vendor Registration and Login

| Scenario ID | Scenario Description | Priority |
|-------------|----------------------|----------|
| TS-REG-01 | Vendor successfully registers with all valid required details | High |
| TS-REG-02 | Vendor attempts registration with missing mandatory fields | High |
| TS-REG-03 | Vendor attempts registration with an already-registered email | High |
| TS-REG-04 | Vendor registration with invalid email format | Medium |
| TS-REG-05 | Email verification flow after registration | High |
| TS-REG-06 | Vendor registration with password at minimum and maximum allowed character length | Medium |
| TS-REG-07 | Email verification link accessed after it has expired — link should be rejected | High |
| TS-REG-08 | Email verification link reused after account is already active — replay blocked | Medium |
| TS-LOG-01 | Registered and verified vendor logs in with correct credentials | Critical |
| TS-LOG-02 | Vendor attempts login with incorrect password | High |
| TS-LOG-03 | Account lockout after multiple failed login attempts | High |
| TS-LOG-04 | Vendor uses "Forgot Password" to reset credentials | High |
| TS-LOG-05 | Session expires after idle timeout and user is redirected to login | Medium |
| TS-LOG-06 | Vendor logs out and session is invalidated | Medium |
| TS-LOG-07 | Deactivated vendor account cannot log in | High |
| TS-LOG-08 | Session expires while the invoice submission form is actively being filled | Medium |
| TS-LOG-09 | Vendor with unverified email attempts to log in before completing email verification | High |
| TS-LOG-10 | Password reset link used a second time after password already changed — second use blocked | Medium |
| TS-LOG-11 | Same vendor account logs in concurrently from two different browsers or devices | Medium |
| TS-LOG-12 | XSS payload entered in the email or username field at login | High |

---

## REQ-02: Invoice Submission

| Scenario ID | Scenario Description | Priority |
|-------------|----------------------|----------|
| TS-INV-01 | Vendor submits a valid invoice against an existing PO | Critical |
| TS-INV-02 | Vendor attempts to submit invoice against a non-existent PO number | High |
| TS-INV-03 | Vendor submits invoice with missing mandatory fields (invoice number, date, amount) | High |
| TS-INV-04 | Vendor uploads invoice file in an accepted format (PDF) | High |
| TS-INV-05 | Vendor uploads invoice file in a rejected format (e.g., .exe, .zip) | High |
| TS-INV-06 | Vendor uploads invoice file that exceeds the maximum file size | High |
| TS-INV-07 | Vendor uploads invoice file exactly at the maximum file size boundary | Medium |
| TS-INV-08 | Vendor submits a duplicate invoice (same invoice number, same vendor) | Critical |
| TS-INV-09 | Invoice amount exceeds the PO's approved amount | High |
| TS-INV-10 | Vendor edits a submitted invoice before AP review | Medium |
| TS-INV-11 | Vendor attempts to edit an invoice that is already approved | Medium |
| TS-INV-12 | Vendor views the status history of a submitted invoice | Low |
| TS-INV-13 | Invoice submitted with special characters in text fields | Medium |
| TS-INV-14 | Invoice submitted with a very large line-item count | Low |
| TS-INV-15 | Concurrent invoice submissions from the same vendor | Medium |
| TS-INV-16 | Upload a corrupted PDF file (valid extension, corrupt content) | Medium |
| TS-INV-17 | Invoice number at, below, and above maximum character length | Medium |
| TS-INV-18 | Rapid bulk submission of 20 invoices in quick succession (stress) | Medium |
| TS-INV-19 | Invoice submitted with an amount of zero | High |
| TS-INV-20 | Invoice submitted with a future date | High |
| TS-INV-21 | Invoice submitted against a PO with zero remaining balance (fully consumed) | High |
| TS-INV-22 | Non-numeric characters entered in the invoice amount field | High |
| TS-INV-23 | Two concurrent duplicate invoice submissions from the same vendor — race condition on the duplicate check | High |
| TS-INV-24 | File uploaded with a .pdf extension but actual MIME type is different (MIME spoofing) | High |
| TS-INV-25 | Zero-byte (empty) file uploaded as invoice attachment | Medium |
| TS-INV-26 | XSS payload entered in vendor notes or free-text description field | High |
| TS-INV-27 | Vendor resubmits a previously rejected invoice with corrections applied | High |
| TS-INV-28 | Invoice list page loads within 3 seconds when 500 invoices are present | High |

---

## REQ-03: AP Team Approval / Rejection Workflow

| Scenario ID | Scenario Description | Priority |
|-------------|----------------------|----------|
| TS-AP-01 | AP team member views the list of pending invoices | High |
| TS-AP-02 | AP team member opens and reviews an individual invoice | High |
| TS-AP-03 | AP team member approves a valid invoice | Critical |
| TS-AP-04 | AP team member rejects an invoice with a mandatory reason | High |
| TS-AP-05 | AP team member attempts to reject an invoice without providing a reason | High |
| TS-AP-06 | AP team member attempts to approve an already-approved invoice | Medium |
| TS-AP-07 | Two AP team members open and act on the same invoice simultaneously | High |
| TS-AP-08 | AP team filters invoices by status (Pending, Approved, Rejected) | Medium |
| TS-AP-09 | AP team searches invoices by vendor name, invoice number, or PO | Medium |
| TS-AP-10 | AP team views invoice history and audit trail | Medium |
| TS-AP-11 | AP user attempts to approve an already-rejected invoice (invalid state) | High |
| TS-AP-12 | AP user attempts to reject an already-approved invoice (invalid state) | High |
| TS-AP-13 | Rejection reason submitted at exactly maximum allowed character length | Medium |
| TS-AP-14 | Rejection reason containing only whitespace — treated as empty and blocked | High |
| TS-AP-15 | Three AP users simultaneously attempt to act on the same invoice | High |
| TS-AP-16 | AP user sorts invoice list by date, amount, and vendor name | Low |
| TS-AP-17 | Multi-level approval required for invoices above threshold — escalates correctly to next approver | High |

---

## REQ-04: Payment Processing

| Scenario ID | Scenario Description | Priority |
|-------------|----------------------|----------|
| TS-PAY-01 | Approved invoice is successfully forwarded to payment system | Critical |
| TS-PAY-02 | Payment system is unreachable when invoice is approved — retry behavior | High |
| TS-PAY-03 | Payment system returns an error — invoice status reflects failure | High |
| TS-PAY-04 | Verify correct invoice data is sent to payment system (no data truncation) | High |
| TS-PAY-05 | Payment confirmation received from ERP updates invoice status | Medium |
| TS-PAY-06 | ERP retry limit reached — invoice status moves to "payment failed", no further retries attempted | High |
| TS-PAY-07 | Approved invoice forwarded to ERP twice simultaneously — idempotency prevents duplicate payment | High |

---

## REQ-05: Email Notifications

| Scenario ID | Scenario Description | Priority |
|-------------|----------------------|----------|
| TS-NOT-01 | Vendor receives email notification when invoice is submitted successfully | High |
| TS-NOT-02 | AP team receives email notification when a new invoice is submitted | High |
| TS-NOT-03 | Vendor receives email notification when invoice is approved | High |
| TS-NOT-04 | Vendor receives email notification when invoice is rejected (with reason) | High |
| TS-NOT-05 | Both parties receive notification when payment is initiated | Medium |
| TS-NOT-06 | Notification email contains correct invoice details (number, amount, PO, status) | High |
| TS-NOT-07 | No notification is sent for internal AP comments not visible to vendor | Medium |
| TS-NOT-08 | Notification is re-sent if first delivery fails (bounce/timeout) | Low |
| TS-NOT-09 | Email service is completely down during a status change — core action still completes | High |
| TS-NOT-10 | Multiple rapid status changes on an invoice — notifications delivered in correct chronological order | Medium |
| TS-NOT-11 | Notification email correctly renders special characters in vendor name and invoice fields | Medium |

---

## REQ-06: Monthly Report Generation

| Scenario ID | Scenario Description | Priority |
|-------------|----------------------|----------|
| TS-RPT-01 | Admin generates a monthly report for a full calendar month | High |
| TS-RPT-02 | Report data matches actual invoice counts and amounts in DB | Critical |
| TS-RPT-03 | Report generated for a month with zero invoices | Medium |
| TS-RPT-04 | Report export in PDF format — file downloads correctly | High |
| TS-RPT-05 | Report export in Excel/CSV format — data is correctly structured | High |
| TS-RPT-06 | Vendor role cannot access the monthly report | High |
| TS-RPT-07 | Report for the first partial month (system launched mid-month) | Medium |
| TS-RPT-08 | Monthly report generation with a large dataset (10,000+ invoices) — performance | Medium |
| TS-RPT-09 | Two admin users trigger report generation simultaneously — no duplicate or corrupted output | High |
| TS-RPT-10 | Report accurately categorizes and counts invoices across all statuses: Pending, Approved, Rejected, Payment Failed | High |

---

## REQ-07: Role-Based Access Control (RBAC)

| Scenario ID | Scenario Description | Priority |
|-------------|----------------------|----------|
| TS-RBAC-01 | Vendor can only see their own invoices — not another vendor's | Critical |
| TS-RBAC-02 | Vendor cannot access AP approval pages | Critical |
| TS-RBAC-03 | AP team member cannot submit invoices on behalf of a vendor | High |
| TS-RBAC-04 | Unauthenticated user cannot access any portal page (redirected to login) | Critical |
| TS-RBAC-05 | API endpoints return 401/403 when called without a valid token | Critical |
| TS-RBAC-06 | Vendor A cannot view or act on Vendor B's invoices via direct URL manipulation | Critical |
| TS-RBAC-07 | Admin can create, deactivate, and assign roles to users | High |
| TS-RBAC-08 | Deactivated user's session is invalidated immediately on deactivation | High |
| TS-RBAC-09 | Read-only auditor can view invoices but cannot approve, reject, or submit | Medium |
| TS-RBAC-10 | All admin role assignments and changes are captured in the audit log | High |
| TS-RBAC-11 | IDOR via API — vendor submits a valid token but requests another vendor's resource by ID | Critical |
| TS-RBAC-12 | AP Clerk role cannot access the payment processing module (access denied) | High |
| TS-SEC-01 | SQL injection payloads in all text input fields — verify inputs sanitized, no DB impact | Critical |
| TS-SEC-02 | Vendor attempts to elevate their own role or permissions via a direct API call | Critical |
| TS-SEC-03 | JWT token with a tampered payload submitted — request rejected with 401 | Critical |
| TS-SEC-04 | Invoice file containing embedded JavaScript or macros is uploaded — script does not execute on server or in browser | Critical |
