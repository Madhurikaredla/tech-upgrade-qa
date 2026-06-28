# QA Deliverables Index

## Polymer Shop (shop.polymer-project.org)

**Assignment:** Automation Testing — Final Assessment
**Application Under Test:** https://shop.polymer-project.org/ (Polymer/Lit Web-Components PWA storefront)
**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28

> This is the full manual-QA lifecycle deliverable set for the Polymer Shop,
> produced alongside the **Playwright + Page Object Model** automation in this
> same folder (`pages/`, `tests/`, `fixtures/`). Execution data in these docs is
> taken from the **real automated run** (33/33 passing across Chromium, Firefox
> and WebKit).

---

## Deliverable 1: Requirements Clarification

| File | Description |
| ---- | ----------- |
| [01_Requirements_Clarification.md](01_Requirements_Clarification.md) | Clarifying questions for the storefront's ambiguous behaviour (cart persistence, payment validation, inventory rules), organised by REQ ID, plus a product risk register. |

---

## Deliverable 2: QA Artifacts (Start to Finish)

| # | File | Artifact | Phase |
| - | ---- | -------- | ----- |
| 1 | [02_Test_Strategy.md](02_Test_Strategy.md) | **Test Strategy** — QA approach, test types, tools, environments, entry/exit criteria | Phase 1: Planning |
| 2 | [03_Test_Plan.md](03_Test_Plan.md) | **Test Plan** — scope, schedule, resources, risks, assumptions | Phase 2: Planning |
| 3 | [04_Test_Scenarios.md](04_Test_Scenarios.md) | **Test Scenarios** — high-level "what to test" for all 7 requirements | Phase 3: Design |
| 4 | [05_Test_Cases.md](05_Test_Cases.md) | **Test Cases** — detailed step-by-step cases with test data, expected results, and the automated spec each maps to | Phase 3: Design |
| 5 | [06_Test_Data.md](06_Test_Data.md) | **Test Data** — categories, products, checkout data, boundary values, field-value findings | Phase 3: Design |
| 6 | [07_RTM.md](07_RTM.md) | **Requirements Traceability Matrix** — maps every requirement to its scenarios, test cases and automated tests | Phase 3–5: Coverage proof |
| 7 | [08_Bug_Report_Template_and_Samples.md](08_Bug_Report_Template_and_Samples.md) | **Bug Report Template + sample observations** found during testing | Phase 5: Execution |
| 8 | [09_Test_Execution_Report.md](09_Test_Execution_Report.md) | **Test Execution Report** — real automation results, cross-browser, classification, release recommendation | Phase 5: Reporting |
| 9 | [10_NonFunctional_Testing_Checklist.md](10_NonFunctional_Testing_Checklist.md) | **Non-Functional Testing Checklist** — 20 checks across Performance, Security, Accessibility, Compatibility, Usability, Documentation | Phase 6: Non-Functional |
| 10 | [11_Final_QA_Summary_Report.md](11_Final_QA_Summary_Report.md) | **Final QA Summary Report** — consolidated view, coverage stats, release readiness, sign-off table | All Phases |

---

## Automation Artifacts (in this folder)

| Path | Description |
| ---- | ----------- |
| [`../README.md`](../README.md) | How to run the suite |
| [`../pages/`](../pages/) | Page Object Model classes |
| [`../tests/`](../tests/) | Playwright test specs (Sanity + Regression) |
| [`../fixtures/`](../fixtures/) | Typed test data and page fixtures |
| [`../reports/html-report/`](../reports/html-report/) | Committed Playwright HTML execution report |

---

## QA Lifecycle Coverage

| Lifecycle Phase | Artifact Produced |
| --------------- | ----------------- |
| Phase 1: Requirements Analysis | Requirements Clarification Document |
| Phase 2: Test Planning | Test Strategy + Test Plan |
| Phase 3: Test Design | Test Scenarios + Test Cases + Test Data |
| Phase 4: Test Classification | Sanity / Regression tagging in specs (`@sanity`, `@regression`) |
| Phase 5: Functional Testing | Automated execution + Bug observations + Execution Report |
| Phase 6: Non-Functional | Non-Functional Testing Checklist (20 checks) |
| Phase 7: Reporting & Sign-off | Final QA Summary Report |

---

## Key Numbers

- **7** functional requirements analysed
- **34** test scenarios across all 7 requirements
- **23** test cases designed
- **11** automated test cases (× 3 browsers = **33** runs, **100% pass**)
- **2** test suites by classification: **Sanity** (5) and **Regression** (11)
- **20** non-functional checks
- **100%** requirement traceability achieved in the RTM
