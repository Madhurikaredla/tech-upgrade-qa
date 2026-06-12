# Bug Report Template and Sample Bug Reports
## B2B Vendor Invoice Management Portal

**Project:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12  
**Version:** 1.0

---

## Bug Report Template

```
Bug ID         : BUG-[###]
Title          : [One-line summary — action + outcome + context]
Reported By    : 
Date Reported  : 
Environment    : QA Staging / UAT / Production
Build Version  : 
Browser/OS     : 
Severity       : Critical / High / Medium / Low
Priority       : P1 / P2 / P3 / P4
Status         : New / Open / In Fix / Fixed / Re-test / Closed / Won't Fix
Linked Req     : REQ-[##]
Linked TC      : TC-[###]

PRECONDITIONS:
[State the exact setup required to reproduce the bug]

STEPS TO REPRODUCE:
1. 
2. 
3. 

EXPECTED RESULT:
[What should happen according to the requirement or AC]

ACTUAL RESULT:
[What actually happened — be specific, factual]

REPRODUCIBILITY:
Always / Intermittent (X out of Y times) / Could Not Reproduce Again

ATTACHMENTS:
[ ] Screenshot
[ ] Screen recording
[ ] API response / error log
[ ] DB query result

NOTES:
[Any additional context — related bugs, workarounds, suspected root cause]
```

---

## Sample Bug Reports

---

### BUG-001 — Vendor can submit invoice without uploading a file

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-001 |
| **Title** | Vendor can submit invoice form without uploading an invoice file |
| **Reported By** | QA Engineer |
| **Date Reported** | 2026-06-12 |
| **Environment** | QA Staging — build v0.4.2 |
| **Browser/OS** | Chrome 124 / macOS 14 |
| **Severity** | High |
| **Priority** | P1 |
| **Status** | New |
| **Linked Req** | REQ-02 |
| **Linked TC** | TC-010 |

**Preconditions:**
- Vendor `vendor1@testcorp.com` is logged in
- Valid PO `PO-2026-001` exists

**Steps to Reproduce:**
1. Navigate to **Submit Invoice**
2. Fill in all required fields: Invoice Number, Date, PO Number, Amount
3. Do NOT attach any file
4. Click **Submit**

**Expected Result:**
Submission is blocked with validation error: "Please attach an invoice document before submitting."

**Actual Result:**
Invoice is submitted successfully without any file. Status shows SUBMITTED in the database. The `invoice_file_path` column in the DB is NULL.

**Reproducibility:** Always

**Attachments:** [screenshot_bug001.png] [DB query result showing NULL file path]

**Notes:** The frontend appears to have removed the file upload required validation. The API also does not enforce file presence server-side. Both layers need a fix. This could allow fraudulent invoices with no documentation.

---

### BUG-002 — Vendor A can access Vendor B's invoice via direct URL

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-002 |
| **Title** | IDOR: Authenticated vendor can view another vendor's invoice by manipulating the URL ID |
| **Reported By** | QA Engineer |
| **Date Reported** | 2026-06-12 |
| **Environment** | QA Staging — build v0.4.2 |
| **Browser/OS** | Firefox 125 / Windows 11 |
| **Severity** | Critical |
| **Priority** | P1 |
| **Status** | New |
| **Linked Req** | REQ-07 |
| **Linked TC** | TC-060 |

**Preconditions:**
- `vendorA@a.com` is logged in with a valid session
- Invoice with DB ID `456` belongs to `vendorB@b.com` — vendorA has no relationship to this invoice

**Steps to Reproduce:**
1. Log in as `vendorA@a.com`
2. Open one of vendorA's own invoices, note the URL: `/invoices/123`
3. Manually change the ID in the URL to: `/invoices/456`
4. Press Enter

**Expected Result:**
HTTP 403 Forbidden — page shows "Access denied" or redirects to vendor dashboard.

**Actual Result:**
Invoice `/invoices/456` loads successfully, exposing Vendor B's company name, invoice amount, PO number, and uploaded invoice file.

**Reproducibility:** Always

**Attachments:** [screenshot_bug002_vendorb_data_exposed.png]

**Notes:** This is an Insecure Direct Object Reference (IDOR) vulnerability — one of the OWASP Top 10. The server is performing authentication (valid session required) but NOT authorization (ownership check). The fix must be applied at the API level, not the UI. **This must be fixed before any release.**

---

### BUG-003 — Rejection email does not include the rejection reason

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-003 |
| **Title** | Vendor rejection notification email body does not include the rejection reason entered by AP team |
| **Reported By** | QA Engineer |
| **Date Reported** | 2026-06-12 |
| **Environment** | QA Staging — build v0.4.2 |
| **Browser/OS** | N/A (Email content issue) |
| **Severity** | Medium |
| **Priority** | P2 |
| **Status** | New |
| **Linked Req** | REQ-05 |
| **Linked TC** | TC-041 |

**Preconditions:**
- Invoice `INV-TC-002` in SUBMITTED status
- AP user `ap_reviewer@company.com` is logged in

**Steps to Reproduce:**
1. Log in as AP user
2. Open invoice `INV-TC-002`
3. Click Reject
4. Enter reason: "Invoice date does not match PO period."
5. Confirm rejection
6. Check `vendor1@testcorp.com` inbox

**Expected Result:**
Rejection email body contains: "Reason: Invoice date does not match PO period."

**Actual Result:**
Email is received but the rejection reason section reads: "Reason: [REJECTION_REASON]" — the template placeholder was not replaced with the actual value.

**Reproducibility:** Always

**Attachments:** [screenshot_bug003_email_placeholder.png]

**Notes:** The email template variable `{{REJECTION_REASON}}` is not being resolved before sending. This is a template rendering issue on the notification service. Vendor has no way to know why their invoice was rejected without contacting the AP team directly — impacts usability significantly.

---

### BUG-004 — Session remains active after user logs out

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-004 |
| **Title** | JWT token remains valid after vendor logs out — API calls succeed with old token |
| **Reported By** | QA Engineer |
| **Date Reported** | 2026-06-12 |
| **Environment** | QA Staging — build v0.4.2 |
| **Browser/OS** | Chrome 124 / macOS 14 |
| **Severity** | High |
| **Priority** | P1 |
| **Status** | New |
| **Linked Req** | REQ-07 |
| **Linked TC** | TC-002 (regression) |

**Preconditions:**
- Vendor `vendor1@testcorp.com` is logged in
- Token was captured from browser devtools before logout

**Steps to Reproduce:**
1. Log in as vendor — capture the JWT from the Authorization header in browser devtools
2. Click **Logout**
3. Using Postman, send `GET /api/invoices` with the captured JWT in the Authorization header
4. Observe response

**Expected Result:**
HTTP 401 Unauthorized — token should be invalidated on logout.

**Actual Result:**
HTTP 200 OK — the API returns a full list of invoices. The token is still valid even after logout.

**Reproducibility:** Always

**Attachments:** [postman_response_bug004.json]

**Notes:** The logout endpoint only clears the client-side cookie/localStorage but does not blacklist the JWT server-side. This is a security vulnerability — a stolen token could be replayed after the legitimate user logs out. Fix: implement a server-side token blacklist or use short-lived tokens with refresh token revocation.

---

## Severity vs Priority Reference

| Severity | Description | Example from this project |
|----------|-------------|--------------------------|
| Critical | System cannot function; data loss; security breach | BUG-002 (IDOR — cross-vendor data exposure) |
| High | Core feature broken; incorrect data; significant business impact | BUG-001 (file-less invoice), BUG-004 (session not invalidated) |
| Medium | Feature partially works; workaround exists | BUG-003 (email placeholder not resolved) |
| Low | Cosmetic; minor UX; wording | Button label truncated on mobile screen |

| Priority | Definition |
|----------|------------|
| P1 | Fix immediately — blocks testing or is a security issue |
| P2 | Fix this sprint — business process impacted |
| P3 | Fix next sprint — workaround exists |
| P4 | Fix when time permits — cosmetic or very low user impact |
