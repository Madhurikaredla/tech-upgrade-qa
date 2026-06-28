# Polymer Shop UI Automation — Final Assessment

End-to-end UI automation for the **[Polymer Shop](https://shop.polymer-project.org/)**
PWA using **Playwright (TypeScript)** and the **Page Object Model**, with tests
classified into **Sanity** and **Regression** suites.

> Final assessment goals: prepare test cases + test data, automate with POM,
> classify (Sanity/Regression), and share scripts + data + execution reports.

## What's inside

```
Polymer Shop UI Automation/
├── playwright.config.ts     # 3 browsers; screenshot/video/trace on failure; HTML report
├── pages/                   # Page Object Model
│   ├── BasePage.ts          #   shared header nav + cart link (shadow-DOM aware)
│   ├── HomePage.ts
│   ├── ListPage.ts          #   category listing
│   ├── DetailPage.ts        #   product detail + add to cart
│   ├── CartPage.ts
│   └── CheckoutPage.ts      #   form + place order
├── fixtures/
│   ├── testData.ts          # categories, sample product, checkout data
│   └── pages.ts             # test fixture injecting page objects
├── tests/
│   ├── navigation.spec.ts   # home + category navigation
│   ├── product.spec.ts      # detail + add to cart
│   ├── cart.spec.ts
│   └── checkout.spec.ts     # full purchase E2E
├── docs/                    # full manual-QA lifecycle deliverables (00–11)
│   ├── 00_Index.md          #   index of all deliverables
│   ├── 01_Requirements_Clarification.md
│   ├── 02_Test_Strategy.md
│   ├── 03_Test_Plan.md
│   ├── 04_Test_Scenarios.md
│   ├── 05_Test_Cases.md     #   cases mapped to the automated specs
│   ├── 06_Test_Data.md
│   ├── 07_RTM.md            #   100% requirement traceability
│   ├── 08_Bug_Report_Template_and_Samples.md
│   ├── 09_Test_Execution_Report.md   # real cross-browser results
│   ├── 10_NonFunctional_Testing_Checklist.md
│   └── 11_Final_QA_Summary_Report.md
└── reports/
    └── html-report/         # committed snapshot of the Playwright HTML report
```

> Full QA documentation lives in [`docs/`](docs/) — start at
> [`docs/00_Index.md`](docs/00_Index.md). It mirrors the lifecycle doc set used
> by the Vendor Invoice Management Portal assignment, tailored to this app and
> integrated with the automation.

## Run

```bash
cd "Polymer Shop UI Automation"
npm install
npx playwright install               # one-time browser download

npx playwright test                  # all 3 browsers
npm run test:chromium                # Chromium only
npm run test:sanity                  # Sanity suite  (@sanity) — critical path
npm run test:regression              # Regression suite (@regression)
npm run report                       # open the HTML report
```

## Test classification

| Suite | Tag | Scope |
|-------|-----|-------|
| **Sanity** | `@sanity` | 5 critical-path cases: home loads, browse category, view product, add to cart, complete a purchase. The fast "is the build usable?" gate. |
| **Regression** | `@regression` | All 11 cases: every category, product detail, cart (incl. empty + quantity), and checkout. Full functional coverage. |

## Results

**33 / 33 runs pass** (11 tests × 3 browsers). Full breakdown and the notable
Shadow-DOM findings are in [`docs/09_Test_Execution_Report.md`](docs/09_Test_Execution_Report.md).

## Why this app is interesting to automate

The Shop is a **Web-Components / Shadow-DOM PWA**. Playwright's CSS/text/role
locators pierce open shadow roots automatically, so no special handling is
needed — but three traits shaped the POM (all documented in `docs/09_Test_Execution_Report.md`):

- The app shell keeps **hidden views** (404, network warnings) in the DOM →
  heading locators use `:visible`.
- Header and off-screen **drawer duplicate the nav links** (drawer copies have
  `tabindex="-1"`) → locators use `:not([tabindex="-1"])`.
- Tiles and cart items render **after async fetches** → web-first assertions
  (`toHaveCount`, `toBeVisible`) avoid render races.

## Design notes

- **Page Object Model** — one class per page; specs read like user journeys.
- **Resilient locators** — `data`/route-based and role/text locators; no XPath
  (XPath does not pierce shadow DOM).
- **Test data as code** — categories, product and checkout data are typed
  constants in `fixtures/`.
- **Screenshots/video on failure** — same config as the SauceDemo project.
- **Cross-browser** — identical POM runs on Chromium, Firefox, WebKit.
