# Test Strategy
## B2B Vendor Invoice Management Portal

**Project:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12  
**Version:** 1.0  
**Status:** Draft — Pending Client Sign-off on Requirements

---

## 1. Scope

### In Scope
- Vendor registration, login, and account management
- Invoice submission workflow (UI + API + DB layers)
- AP team approval and rejection workflow
- Payment processing integration (forwarding to ERP/payment system)
- Email notification triggers and content
- Monthly report generation and export
- Role-Based Access Control (RBAC) for all user types
- Session management and timeout behavior
- API contract validation (all endpoints)
- Database data integrity checks
- Cross-browser and responsive UI testing

### Out of Scope
- The external payment/ERP system's internal logic (tested at the integration boundary only)
- Email server infrastructure
- Network penetration testing (covered under a separate security engagement)
- Physical infrastructure and server provisioning

---

## 2. Test Objectives

| Objective | How We Measure It |
|-----------|-------------------|
| All 7 requirements are correctly implemented | 100% RTM coverage with Pass status |
| No Critical or High severity bugs remain open at release | Zero open Critical/High defects on go-live checklist |
| API contracts are stable and validated | All API test cases executed with expected response codes and schemas |
| RBAC prevents unauthorized access | All negative access control test cases pass |
| System handles failure modes gracefully | All error-state test cases verified |
| Performance is acceptable under expected load | Response time ≤ 2s for 95th percentile under 500 concurrent users |

---

## 3. Test Types and Approach

### 3.1 Functional Testing
- **Manual** for exploratory, UAT, and complex workflow scenarios
- **Automation** (Cypress or Playwright) for regression suite once stable
- Cover positive paths, negative paths, and boundary conditions for every requirement

### 3.2 API Testing
- Tool: **Postman** (manual validation) + **Newman** (CI pipeline)
- Validate: request/response schemas, HTTP status codes, error payloads, auth token handling
- Test each endpoint directly — do not rely on UI to validate API behavior

### 3.3 Database Testing
- Verify data written to DB after every create/update/delete operation
- Check constraints, foreign key integrity, no orphaned records
- Tool: Direct SQL queries on test database

### 3.4 Integration Testing
- Test the invoice forwarding boundary with the payment/ERP system
- Use a stub/mock of the ERP for failure scenarios (timeout, 500 error, malformed response)
- Verify retry mechanism and failure logging

### 3.5 Security Testing
- OWASP Top 10 checks: SQL Injection, XSS, IDOR, auth bypass, sensitive data exposure
- Verify all API endpoints enforce server-side authorization (not just UI-level guards)
- Test session timeout, session fixation, and concurrent session behavior
- Password policy enforcement testing

### 3.6 Performance Testing
- Tool: **k6** or **JMeter**
- Load test: 500 concurrent users performing invoice submission
- Stress test: Ramp to breaking point to identify system limits
- Report generation under large data set (10,000+ invoices)

### 3.7 Usability Testing
- First-time vendor onboarding walkthrough
- Error message clarity (are they actionable?)
- Mobile responsiveness for vendor portal

### 3.8 Regression Testing
- Full regression suite executed before every release
- Automated regression run triggered on every code merge to main

### 3.9 Smoke Testing
- Executed immediately after every deployment to staging/production
- Covers: login, invoice submit, AP approve, notification received

### 3.10 UAT
- Executed by client AP team and vendor representatives
- Based on real business scenarios, not test scripts

---

## 4. Test Environments

| Environment | Purpose | Owner |
|-------------|---------|-------|
| DEV | Developer unit testing | Engineering |
| QA / Staging | QA functional, integration, and regression testing | QA Team |
| UAT | Client acceptance testing | Client + QA |
| Production | Post-deploy smoke test only | QA + DevOps |

**ERP Integration:** A sandbox/mock ERP environment must be provisioned for QA. QA will not test against the production ERP.

---

## 5. Test Tools

| Tool | Purpose |
|------|---------|
| Jira / TestRail | Test case management, bug tracking |
| Postman + Newman | API testing |
| Cypress / Playwright | UI automation |
| k6 / JMeter | Performance and load testing |
| Burp Suite (Community) | Security testing |
| SQL Client (DBeaver) | Database validation |
| BrowserStack | Cross-browser and device testing |

---

## 6. Entry and Exit Criteria

### Entry Criteria (before testing begins)
- Requirements signed off by client
- Test environment is stable and accessible
- Build deployed to QA environment with release notes
- Test data is set up
- All clarification questions answered

### Exit Criteria (before release is approved)
- All test cases executed (pass or fail documented)
- Zero open Critical severity defects
- Zero open High severity defects (unless formally waived by client with a mitigation plan)
- RTM shows 100% requirement coverage
- Performance test results meet SLA
- UAT sign-off received from client

---

## 7. Defect Management

- All defects logged in **Jira** with: title, steps to reproduce, expected vs actual, severity, priority, environment, screenshots/logs
- Severity levels: **Critical | High | Medium | Low**
- Priority levels: **P1 (fix now) | P2 (fix this sprint) | P3 (fix next sprint) | P4 (backlog)**
- Triage: daily defect triage with Dev Lead + QA Lead
- Re-test: every fixed defect is re-tested + regression check on adjacent features

---

## 8. Risk and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Requirements change mid-testing | High | High | Lock requirements with sign-off; use RTM to track change impact |
| ERP sandbox unavailable for integration testing | Medium | High | Provision a mock stub service early; include in project kickoff checklist |
| Insufficient test data (no real POs) | Medium | Medium | Create synthetic test data covering all valid/invalid states |
| Performance requirements not defined | High | Medium | Agree on SLA targets before performance testing begins |
| Compressed testing timeline | Medium | High | Risk-based testing: prioritize Critical and High risk areas first |

---

## 9. Roles and Responsibilities

| Role | Responsibility |
|------|---------------|
| QA Lead | Test strategy, test plan, sign-off decisions, stakeholder communication |
| QA Engineer | Test case design, execution, defect reporting |
| Automation Engineer | Automation framework, CI integration |
| Dev Lead | Defect fix ownership, unit test coverage |
| Product Owner | Requirement clarification, UAT sign-off |
| Client AP Team | UAT execution |
