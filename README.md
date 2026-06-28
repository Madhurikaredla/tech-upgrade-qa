# Tech Upgrade — QA Assignments

This repository contains the following QA assignments:

| # | Assignment | Type | Folder |
| - | ---------- | ---- | ------ |
| 1 | **Pet Store API Testing** | API automation (Postman / Newman) | [`Pet Store API Testing/`](Pet%20Store%20API%20Testing/) |
| 2 | **Vendor Invoice Management Portal** | Manual QA documentation | [`Vendor Invoice Management Portal/`](Vendor%20Invoice%20Management%20Portal/) |
| 3 | **SauceDemo UI Automation** | UI automation (Playwright + POM) | [`SauceDemo UI Automation/`](SauceDemo%20UI%20Automation/) |
| 4 | **Polymer Shop UI Automation** | UI automation (Playwright + POM) — final assessment | [`Polymer Shop UI Automation/`](Polymer%20Shop%20UI%20Automation/) |

---

## Assignments 3 & 4 — Playwright UI Automation

Two Playwright (TypeScript) + **Page Object Model** suites with screenshot/video
capture on failure and committed HTML reports.

- **SauceDemo UI Automation** — the exercise. Automates all six SauceDemo accounts
  (login, inventory, cart, checkout) across Chromium/Firefox/WebKit. **81/90 runs
  pass; 9 failures are intentional `@defect` tests** that catch real SauceDemo bugs
  and generate the failure screenshots + videos. Start at
  [`SauceDemo UI Automation/README.md`](SauceDemo%20UI%20Automation/README.md).
- **Polymer Shop UI Automation** — the final assessment. Automates the
  Shadow-DOM Shop PWA with tests classified as **Sanity** and **Regression**.
  **33/33 runs pass.** Start at
  [`Polymer Shop UI Automation/README.md`](Polymer%20Shop%20UI%20Automation/README.md).

Each folder ships `docs/` (test cases, test data, execution report) and a
committed `reports/html-report/`. To run:

```bash
cd "SauceDemo UI Automation"        # or "Polymer Shop UI Automation"
npm install
npx playwright install
npx playwright test
```

---

## Assignment 2 — Pet Store API Testing

A Postman collection of **37 requests / 102 assertions** covering all **20 documented
endpoints** of the [Swagger Pet Store](https://petstore.swagger.io/v2) (Pet, Store, User
modules) — at least one positive and one negative test per endpoint, request chaining via
collection variables, an auto-set auth header, a dedicated **Auth & Security** folder
testing token / no-token / invalid-token cases, and the **bonus**: a collection-level
pre-request script that auto-sets an OAuth2 **Bearer** token (`Authorization: Bearer …`).

**Files**
- `Pet Store API Testing/PetStore.postman_collection.json` — the test collection
- `Pet Store API Testing/PetStore.postman_environment.json` — environment (`baseUrl`, `api_key`, `password`)
- `Pet Store API Testing/qa-pet.png` — image used by the `uploadImage` test (must stay alongside the collection)
- `Pet Store API Testing/BUGS.md` — the 6 API defects the negative/auth/security tests catch
- `Pet Store API Testing/TEST_REPORT.md` — full pass/fail record of all 37 requests / 102 assertions

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ and npm (for the Newman CLI), **or**
- The [Postman](https://www.postman.com/downloads/) desktop app (GUI option)

### Option A — Run with Newman (command line)

```bash
cd "Pet Store API Testing"

# Install Newman + the HTML report add-on once
npm install -g newman newman-reporter-htmlextra

# Run the collection against the QA environment
# (--working-dir . lets Newman find qa-pet.png for the upload test)
newman run PetStore.postman_collection.json \
  -e PetStore.postman_environment.json \
  -r cli,htmlextra \
  --working-dir .
```

The `htmlextra` report is written to `Pet Store API Testing/newman/`.

> **No global install?** Use `npx`, but install the reporter alongside it (npx will not
> auto-resolve a Newman reporter), or just drop `htmlextra` and use the CLI reporter:
> ```bash
> npx -y newman run PetStore.postman_collection.json -e PetStore.postman_environment.json -r cli
> ```

### Option B — Run in the Postman app (GUI)
1. **Import** both JSON files (collection + environment).
2. Select the **"Pet Store - QA (test)"** environment from the top-right dropdown.
3. Open the collection → **Run** → **Run Pet Store API - QA Automation**.

### Expected result

**37/37 requests run; 93/102 assertions pass.** The **9 failing assertions are intentional** —
negative / auth / security tests catching real defects in the public petstore demo API:
auth bypass (protected endpoints accept any/no token), password returned in plain text,
a pet accepted with no name, a 500 on a bad order, login with no credentials, etc. Each is
documented in [`BUGS.md`](Pet%20Store%20API%20Testing/BUGS.md) (6 bugs) and itemised in
[`TEST_REPORT.md`](Pet%20Store%20API%20Testing/TEST_REPORT.md); the red entries in the
Newman report are the evidence. A run with **zero** failures would mean the negative tests
aren't actually checking anything.

---

## Assignment 1 — Vendor Invoice Management Portal

A complete set of manual-QA deliverables for a B2B Vendor Invoice Management Portal,
spanning the full QA lifecycle (requirements → strategy → design → execution → reporting).

These are **Markdown documents** — there is nothing to "run." Read them in any Markdown
viewer (GitHub, VS Code preview, etc.).

**Start here:** [`Vendor Invoice Management Portal/00_Index.md`](Vendor%20Invoice%20Management%20Portal/00_Index.md) — the index of all deliverables.

| Order | Document |
| ----- | -------- |
| 1 | `01_Requirements_Clarification.md` |
| 2 | `02_Test_Strategy.md` |
| 3 | `03_Test_Plan.md` |
| 4 | `04_Test_Scenarios.md` |
| 5 | `05_Test_Cases.md` |
| 6 | `06_Test_Data.md` |
| 7 | `07_RTM.md` (Requirements Traceability Matrix) |
| 8 | `08_Bug_Report_Template_and_Samples.md` |
| 9 | `09_Test_Execution_Report.md` |
| 10 | `10_NonFunctional_Testing_Checklist.md` |
| 11 | `11_Final_QA_Summary_Report.md` (also available as `.docx`) |

To preview in VS Code: open any `.md` file and press `Cmd+Shift+V`.
