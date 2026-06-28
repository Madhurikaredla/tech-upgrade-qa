# SauceDemo — Test Cases

Application under test: **https://www.saucedemo.com/**
Framework: **Playwright (TypeScript) + Page Object Model**
Password for all accounts: `secret_sauce`

Each test case below maps to an automated test in [`../tests`](../tests). Tags in
the test titles drive selective execution:

| Tag | Meaning | Run with |
| --- | ------- | -------- |
| `@smoke` | Critical happy path — must pass on every build | `npm run test:smoke` |
| `@regression` | Full functional coverage | `npm run test:regression` |
| `@defect` | Asserts *correct* behaviour; **fails on purpose** to catch a real SauceDemo defect (evidence for screenshot/video capture) | included in regression |

---

## 1. Authentication — `tests/login.spec.ts`

| ID | Title | User | Steps | Expected result | Tags |
|----|-------|------|-------|-----------------|------|
| LOGIN-01 | Standard user logs in | standard_user | Enter valid creds → Login | Lands on `/inventory.html`, 6 products shown | @smoke |
| LOGIN-02 | Locked-out user blocked | locked_out_user | Enter creds → Login | Stays on login; error = "Epic sadface: Sorry, this user has been locked out." | @smoke |
| LOGIN-03 | problem_user can log in | problem_user | Enter creds → Login | Reaches inventory | @regression |
| LOGIN-04 | performance_glitch_user can log in | performance_glitch_user | Enter creds → Login | Reaches inventory (slowly) | @regression |
| LOGIN-05 | error_user can log in | error_user | Enter creds → Login | Reaches inventory | @regression |
| LOGIN-06 | visual_user can log in | visual_user | Enter creds → Login | Reaches inventory | @regression |
| LOGIN-07 | Empty username rejected | — | Blank username, valid password → Login | Error = "Epic sadface: Username is required" | @regression |
| LOGIN-08 | Empty password rejected | standard_user | Valid username, blank password → Login | Error = "Epic sadface: Password is required" | @regression |
| LOGIN-09 | Unknown credentials rejected | — | Bad username/password → Login | Error = "…do not match any user in this service" | @regression |
| LOGIN-10 | Logout | standard_user | Login → Menu → Logout | Returns to login screen | @regression |

## 2. Inventory & Sorting — `tests/inventory.spec.ts` (standard_user)

| ID | Title | Steps | Expected result | Tags |
|----|-------|-------|-----------------|------|
| INV-01 | Six products listed | Login | `.inventory_item` count = 6 | @smoke |
| INV-02 | Sort Name A→Z | Select "Name (A to Z)" | Names ascending | @regression |
| INV-03 | Sort Name Z→A | Select "Name (Z to A)" | Names descending | @regression |
| INV-04 | Sort Price low→high | Select "Price (low to high)" | Prices ascending | @regression |
| INV-05 | Sort Price high→low | Select "Price (high to low)" | Prices descending | @regression |
| INV-06 | Add increments badge | Add Backpack | Cart badge = 1 | @smoke |
| INV-07 | Remove decrements badge | Add 2, remove 1 | Cart badge = 1 | @regression |
| INV-08 | Product detail opens | Click a product name | `/inventory-item.html`, name matches | @regression |

## 3. Cart — `tests/cart.spec.ts` (standard_user)

| ID | Title | Steps | Expected result | Tags |
|----|-------|-------|-----------------|------|
| CART-01 | Items carry to cart | Add 2 → open cart | Both items present, count = 2 | @smoke |
| CART-02 | Remove from cart | Add 2 → open cart → remove 1 | Count = 1, badge = 1 | @regression |
| CART-03 | Continue shopping | Add 1 → cart → Continue Shopping | Back on inventory, badge persists | @regression |

## 4. Checkout — `tests/checkout.spec.ts` (standard_user)

| ID | Title | Steps | Expected result | Tags |
|----|-------|-------|-----------------|------|
| CHK-01 | Full checkout E2E | Add 2 → cart → checkout → fill form → continue → finish | "Thank you for your order!"; cart empties afterwards; total = subtotal + tax | @smoke |
| CHK-02 | First name required | Checkout → blank first name → Continue | Error = "Error: First Name is required" | @regression |
| CHK-03 | Postal code required | Checkout → blank postal code → Continue | Error = "Error: Postal Code is required" | @regression |

## 5. Special-account behaviour — `tests/users.spec.ts`

| ID | Title | User | Expected (correct) behaviour | Result | Tags |
|----|-------|------|------------------------------|--------|------|
| USR-01 | All product images distinct | problem_user | 6 unique image sources | **FAILS** — all 6 share `sl-404…jpg` (defect) | @defect |
| USR-02 | Price sort reorders | problem_user | Prices ascending after sort | **FAILS** — list does not reorder (defect) | @defect |
| USR-03 | Inventory still loads (slow) | performance_glitch_user | Reaches inventory, 6 items | PASSES — annotated with load time (~6 s vs <1 s) | @regression |
| USR-04 | Add to cart works | error_user | Cart badge = 1 | PASSES | @regression |
| USR-05 | Price sort reorders | error_user | Prices ascending after sort | **FAILS** — list does not reorder (defect) | @defect |
| USR-06 | Basic add-to-cart → checkout step one | visual_user | Reaches checkout step two | PASSES (visual glitches are cosmetic) | @regression |

> The `@defect` failures are intentional and expected — they are real SauceDemo
> defects caught by automation, and they generate the failure screenshots and
> videos attached to the HTML report. See [`DEFECTS.md`](DEFECTS.md).
