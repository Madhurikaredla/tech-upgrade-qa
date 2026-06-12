# Test Plan
## B2B Vendor Invoice Management Portal — Sprint 1 Release

**Project:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12  
**Version:** 1.0  
**Phase:** Functional Testing (Phase 5 of QA Lifecycle)

---

## 1. Objectives

This test plan covers functional, API, integration, and security testing for the Vendor Invoice Management Portal prior to UAT. It translates the Test Strategy into an executable schedule with defined scope, resources, and success criteria for this release.

---

## 2. Scope

**In scope for this phase:**
- REQ-01: Vendor Registration & Login
- REQ-02: Invoice Submission
- REQ-03: AP Team Approval/Rejection Workflow
- REQ-05: Email Notifications
- REQ-07: RBAC / Access Control

**Deferred to Phase 2:**
- REQ-04: Payment Processing Integration (ERP sandbox not yet available)
- REQ-06: Monthly Report Generation (feature not yet complete)

---

## 3. Test Schedule

| Activity | Start | End | Owner |
|----------|-------|-----|-------|
| Requirements review and clarification questions | Day 1 | Day 2 | QA Lead |
| Test plan creation | Day 2 | Day 3 | QA Lead |
| Test scenario and test case authoring | Day 3 | Day 6 | QA Engineers |
| Test data preparation | Day 4 | Day 6 | QA Engineers |
| Test environment setup and smoke check | Day 6 | Day 7 | QA + DevOps |
| Functional test execution (REQ-01, 07) | Day 7 | Day 9 | QA Engineers |
| Functional test execution (REQ-02, 03, 05) | Day 9 | Day 13 | QA Engineers |
| API test execution | Day 7 | Day 13 | QA Engineers |
| DB validation | Day 7 | Day 13 | QA Engineers |
| Security testing (RBAC, injection, auth) | Day 12 | Day 14 | QA Lead |
| Defect fix verification and regression | Day 14 | Day 17 | QA Engineers |
| Test summary report | Day 17 | Day 18 | QA Lead |
| UAT handoff | Day 18 | — | QA Lead + PM |

---

## 4. Resources

| Resource | Count | Tools |
|----------|-------|-------|
| QA Lead | 1 | Jira, TestRail, Burp Suite |
| QA Engineer | 2 | Postman, Cypress, SQL Client |
| Test Environments | 2 | QA Staging, Mock ERP stub |

---

## 5. Test Approach Summary

- **Positive path first:** Verify happy-path scenarios before edge cases
- **API before UI:** Validate business logic at the API layer; use UI to verify presentation
- **DB verification:** After each create/update/delete, verify data state in the database
- **Risk-based priority:** Test REQ-07 (RBAC) and REQ-02 (Invoice Submission) first — highest business risk

---

## 6. Entry Criteria

- [ ] All requirements for in-scope REQs are signed off
- [ ] Clarification document responses received from client
- [ ] QA environment deployed and accessible
- [ ] API documentation available (Postman collection or OpenAPI spec)
- [ ] Test data (vendor accounts, PO records) loaded in QA database
- [ ] Mock ERP stub configured and responding

---

## 7. Exit Criteria

- [ ] All planned test cases executed (pass or deferred with documented reason)
- [ ] Zero open Critical bugs
- [ ] Zero open High bugs (or formally risk-accepted by client)
- [ ] Test summary report reviewed and approved by QA Lead
- [ ] RTM updated with final execution status

---

## 8. Defect Severity and Priority Matrix

| Severity | Definition | Example |
|----------|------------|---------|
| Critical | System crash, data loss, security breach, complete workflow failure | Vendor can submit invoice without authentication |
| High | Core feature broken, incorrect data saved, major business flow impacted | Approved invoice not forwarded to payment system |
| Medium | Feature partially works, workaround exists, non-critical data issue | Rejection email missing vendor name |
| Low | Cosmetic issue, minor UX problem, wording error | Button label truncated on mobile |

---

## 9. Assumptions

- Client will respond to clarification questions within 2 business days
- Dev team will fix Critical/High bugs within the sprint cycle
- A mock/stub for the ERP integration will be provided by the engineering team
- Performance testing is not in scope for this phase (planned for Phase 2)
- Test environment data will be reset before each test cycle

---

## 10. Dependencies

| Dependency | Owner | Risk if Not Met |
|------------|-------|-----------------|
| API documentation | Engineering | API test cases cannot be authored |
| Test database with PO records | Engineering | REQ-02 tests blocked |
| Email delivery service in QA env | DevOps | REQ-05 tests blocked |
| RBAC role configuration | Engineering | REQ-07 tests blocked |
