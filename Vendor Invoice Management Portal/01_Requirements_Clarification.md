# Requirements Clarification Document
## B2B Vendor Invoice Management Portal

**Project:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12  
**Version:** 1.0

---

## Purpose

This document lists clarification questions raised by the QA team after reviewing the client requirements. Every ambiguous requirement is a potential defect waiting to happen. These questions must be answered and signed off by the client before test design begins.

---

## REQ-01: Vendors can register and log in to the portal

| # | Question | Why It Matters |
|---|----------|----------------|
| 1.1 | What information is required during vendor registration? (Company name, GST/tax ID, contact email, phone, bank details?) | Determines mandatory vs optional fields and validation rules |
| 1.2 | Is registration self-service, or does an admin need to approve each new vendor before they can log in? | Defines the registration workflow and approval state |
| 1.3 | What authentication method is used — username/password, SSO, OTP, or multi-factor? | Directly impacts login test cases and security testing scope |
| 1.4 | What happens after a vendor registers — do they get an email verification link before accessing the portal? | Defines the activation flow |
| 1.5 | Is there a password policy? (min length, complexity, expiry, reuse restriction) | Required for security test cases |
| 1.6 | How many failed login attempts before lockout? What is the lockout duration? | Required for brute-force and account lockout testing |
| 1.7 | Can a vendor have multiple users (sub-accounts) under one vendor profile? | Defines multi-user management scope |
| 1.8 | What happens to existing invoices if a vendor account is deactivated or deleted? | Data retention and orphan record risk |
| 1.9 | Is there a "Forgot Password" / account recovery flow? What are its rules? | Required for recovery flow test cases |
| 1.10 | Can a vendor log in from multiple devices/sessions simultaneously? | Session management behavior |

---

## REQ-02: Vendors can submit invoices against purchase orders

| # | Question | Why It Matters |
|---|----------|----------------|
| 2.1 | What file formats are accepted for invoice upload? (PDF, Excel, JPEG, PNG, XML?) | Determines file validation test cases |
| 2.2 | What is the maximum allowed file size per invoice upload? | Required for boundary value testing |
| 2.3 | Can a vendor upload multiple invoice files in a single submission? | Defines multi-file upload behavior |
| 2.4 | Must every invoice reference a pre-existing Purchase Order (PO) number in the system? What if the PO doesn't exist? | Determines whether PO validation is enforced |
| 2.5 | Can one invoice reference multiple POs, or is it always one invoice per PO? | Defines the data model and test combinations |
| 2.6 | What fields are mandatory on the invoice submission form? (Invoice number, date, amount, currency, PO reference, line items?) | Determines form validation rules |
| 2.7 | What currencies are supported? Is there currency conversion? | Required for multi-currency test cases |
| 2.8 | Can a vendor edit a submitted invoice before it is reviewed? After rejection? | Defines state-transition rules |
| 2.9 | Can a vendor withdraw/cancel a submitted invoice? Under what conditions? | Defines cancellation workflow |
| 2.10 | Is there a duplicate invoice check? (Same vendor + same invoice number + same amount?) | Prevents duplicate payment risk |
| 2.11 | What happens if the invoice amount exceeds the PO amount? Is it allowed or blocked? | Business rule validation |
| 2.12 | Is there a submission deadline or cut-off date per PO? | Time-bound behavior testing |
| 2.13 | Are there rate limits — e.g., max invoices per vendor per day? | Performance and abuse prevention |

---

## REQ-03: The AP team can view, approve, or reject invoices

| # | Question | Why It Matters |
|---|----------|----------------|
| 3.1 | Who are all the members of the AP team — is it a role or specific named users? | Defines RBAC and permission test scope |
| 3.2 | Can any AP team member approve any invoice, or are approvals scoped by department, PO owner, or amount? | Determines approval routing logic |
| 3.3 | Is there a single-level or multi-level approval workflow? (e.g., invoices above $10,000 require a second approver?) | Defines workflow complexity and test cases |
| 3.4 | When an invoice is rejected, is a mandatory rejection reason required? | Determines validation on rejection form |
| 3.5 | Can the AP team edit invoice details, or can they only approve/reject as-is? | Determines AP user permissions |
| 3.6 | Is there an approval deadline? What happens if an invoice sits unapproved beyond a set period? | Defines escalation or auto-rejection behavior |
| 3.7 | Can an approved invoice be reversed or recalled? Under what conditions and by whom? | Defines post-approval state transitions |
| 3.8 | Can the AP team filter/search invoices by vendor, date range, PO, status, and amount? | Defines filter and search test cases |
| 3.9 | What happens when two AP users open and try to act on the same invoice simultaneously? | Concurrent access / locking behavior |
| 3.10 | Can the AP team add internal comments or notes to an invoice? Are those visible to the vendor? | Defines communication features |

---

## REQ-04: Approved invoices are forwarded for payment processing

| # | Question | Why It Matters |
|---|----------|----------------|
| 4.1 | What does "forwarded for payment processing" mean technically — is it an API call to an ERP/SAP, an email, a file export, or a queue? | Defines integration test scope |
| 4.2 | Which payment system or ERP is the integration target? (SAP, Oracle, QuickBooks, Tally?) | Determines integration test tools and data |
| 4.3 | What is the expected payment processing time after approval? Is the vendor informed of payment date? | Defines SLA and notification test cases |
| 4.4 | What happens if the payment system is unreachable at the time of forwarding? Is there a retry mechanism? | Failure-mode and resilience testing |
| 4.5 | What data is sent to the payment system — full invoice or a summary record? | Determines data integrity validation |
| 4.6 | Is there a confirmation back from the payment system indicating the invoice was received? | Defines status update flow |
| 4.7 | Can payment processing be paused (e.g., vendor bank details are incorrect)? Who can pause it? | Defines exception handling flow |
| 4.8 | How are partial payments handled? (If only part of the invoice is approved?) | Edge case for payment amount validation |

---

## REQ-05: Both parties receive email notifications on status changes

| # | Question | Why It Matters |
|---|----------|----------------|
| 5.1 | What exact status changes trigger a notification? (Submitted, Under Review, Approved, Rejected, Payment Initiated, Payment Completed?) | Defines the complete notification trigger matrix |
| 5.2 | Who receives each notification — vendor only, AP team only, or both for every event? | Defines recipient logic per event |
| 5.3 | Can users configure or opt out of specific notification types? | Determines notification preference testing |
| 5.4 | What email address is used as the sender — a no-reply address or a monitored inbox? | Relevant for spam and deliverability testing |
| 5.5 | Are notification emails templated? Can the client customise the template? | Determines template validation scope |
| 5.6 | Is there a fallback if the email fails to deliver? (SMS, in-app notification?) | Failure-mode testing |
| 5.7 | Are notifications sent immediately, or batched at a scheduled time? | Timing and SLA testing |
| 5.8 | Are notification emails logged for audit purposes? | Audit trail and compliance testing |

---

## REQ-06: The system generates monthly invoice activity reports

| # | Question | Why It Matters |
|---|----------|----------------|
| 6.1 | What data is included in the monthly report? (Total invoices submitted, approved, rejected, pending, total amount?) | Defines report content validation |
| 6.2 | Who can generate and view these reports — all users, AP team only, admin only? | Defines access control test cases |
| 6.3 | Are reports generated automatically on a schedule, or manually on demand? | Determines trigger mechanism testing |
| 6.4 | In what format is the report exported — PDF, Excel, CSV? | Determines file format test cases |
| 6.5 | What is the reporting period — calendar month or rolling 30 days? | Defines boundary date test cases |
| 6.6 | How is the very first month's report handled if the system goes live mid-month? | Edge case for partial-period reports |
| 6.7 | Are historical reports retained? For how long? | Data retention and access testing |
| 6.8 | Is there a drill-down capability from summary to invoice-level detail? | Defines UI navigation test cases |

---

## REQ-07: Only authorized users may access the system

| # | Question | Why It Matters |
|---|----------|----------------|
| 7.1 | What user roles exist? (Vendor, AP Reviewer, AP Approver, Finance Manager, System Admin, Read-Only Auditor?) | Defines the complete RBAC matrix |
| 7.2 | Is role assignment managed by a system admin, or self-selected at registration? | Defines role provisioning test cases |
| 7.3 | Is there a session timeout for idle users? How long? | Security and session management testing |
| 7.4 | Are all pages and API endpoints protected — i.e., is there server-side authorization, not just UI-level? | Critical for security testing scope |
| 7.5 | Is there an audit log of who accessed what and when? | Compliance and audit trail testing |
| 7.6 | How is access revoked when an employee leaves or a vendor is deactivated? | Offboarding and access control testing |
| 7.7 | Are there IP-based restrictions or geo-blocking requirements? | Environment and security configuration testing |
| 7.8 | Does the system need to comply with any regulatory standards? (GDPR, ISO 27001, SOC 2, PCI-DSS?) | Determines compliance test scope |

---

## Hidden Risks Identified

| Risk | Category | Impact |
|------|----------|--------|
| No PO validation could allow fraudulent invoice submission | Security / Business | Critical |
| Concurrent AP approval with no locking = split-brain approvals | Data Integrity | High |
| Payment forwarding with no retry = silent failure on ERP downtime | Reliability | High |
| Vendor account deletion with no data archiving = orphaned records | Data Integrity | High |
| Email-only notification with no fallback = missed critical status updates | Reliability | Medium |
| No duplicate invoice detection = double payment risk | Financial | Critical |
| Role check only on UI = API can be called directly by any authenticated user | Security | Critical |
| Report generated without timezone definition = wrong monthly boundary | Data Accuracy | Medium |

---

*This document should be reviewed and signed off by the Product Owner and Client representative before test design begins.*
