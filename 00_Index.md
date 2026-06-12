# QA Deliverables Index
## B2B Vendor Invoice Management Portal

**Assignment:** QA Excellence Hands-On Assessment  
**Use Case:** Vendor Invoice Management Portal  
**Prepared by:** QA Team  
**Date:** 2026-06-12

---

## Deliverable 1: Requirements Clarification

| File | Description |
|------|-------------|
| [01_Requirements_Clarification.md](01_Requirements_Clarification.md) | Clarifying questions for all 7 ambiguous requirements, organized by REQ ID. Includes hidden risk register. |

---

## Deliverable 2: QA Artifacts (Start to Finish)

| # | File | Artifact | Phase |
|---|------|----------|-------|
| 1 | [02_Test_Strategy.md](02_Test_Strategy.md) | **Test Strategy** — Project-wide QA approach, test types, tools, environments, entry/exit criteria | Phase 1: Planning |
| 2 | [03_Test_Plan.md](03_Test_Plan.md) | **Test Plan** — Phase-specific scope, schedule, resources, risks, assumptions | Phase 2: Planning |
| 3 | [04_Test_Scenarios.md](04_Test_Scenarios.md) | **Test Scenarios** — High-level "what to test" for all 7 requirements | Phase 3: Design |
| 4 | [05_Test_Cases.md](05_Test_Cases.md) | **Test Cases** — Detailed step-by-step cases with test data, preconditions, expected results | Phase 3: Design |
| 5 | [06_Test_Data.md](06_Test_Data.md) | **Test Data** — User accounts, POs, invoices, boundary values, injection inputs | Phase 3: Design |
| 6 | [07_RTM.md](07_RTM.md) | **Requirements Traceability Matrix** — Maps every requirement to its scenarios and test cases | Phase 3–5: Coverage proof |
| 7 | [08_Bug_Report_Template_and_Samples.md](08_Bug_Report_Template_and_Samples.md) | **Bug Report Template + 4 Sample Bugs** — Including Critical IDOR and security bugs | Phase 5: Execution |
| 8 | [09_Test_Execution_Report.md](09_Test_Execution_Report.md) | **Test Execution Report** — Summary of results, open bugs, risk assessment, release recommendation | Phase 5: Reporting |

---

## QA Lifecycle Coverage

| Lifecycle Phase | Artifact Produced |
|----------------|------------------|
| Phase 1: Requirements Analysis | Requirements Clarification Document |
| Phase 2: Test Planning | Test Strategy + Test Plan |
| Phase 3: Test Design | Test Scenarios + Test Cases + Test Data |
| Phase 4: Shift-Left (Dev) | Requirements questions raised early; risk register |
| Phase 5: Functional Testing | Test Case execution + Bug Reports |
| Phase 6: Non-Functional | Referenced in Test Strategy (performance, security) |
| Phase 7: Integration | Payment processing integration test cases (TC-031–034) |
| Phase 8: Deploy & Docs | Smoke test scope defined in Exit Criteria |

---

## Key Numbers

- **7** requirements analyzed
- **46** test cases designed (across 9 modules)
- **10** hidden risks identified
- **4** sample bug reports with Critical/High findings
- **100%** requirement traceability achieved in RTM
