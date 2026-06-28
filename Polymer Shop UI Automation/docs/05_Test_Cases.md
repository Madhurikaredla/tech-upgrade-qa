# Test Cases

## Polymer Shop (shop.polymer-project.org)

**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0

> Each test case is atomic, reproducible, includes test data and expected
> results, and traces to a requirement and scenario. The **Automated test**
> field names the spec and test title that implements it (where applicable).
> Classification: **S** = Sanity, **R** = Regression.

**Base URL:** `https://shop.polymer-project.org`
**Sample product:** Men's Tech Shell Full-Zip — `$50.20` — `/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip`

---

## Module: Storefront & Category Navigation (REQ-01)

### TC-001 — Home page loads with category call-outs
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-NAV-01, TS-NAV-02 / REQ-01 |
| Priority / Class | High / **S, R** |
| Preconditions | Browser open |
| Steps | 1. Navigate to `/`  2. Observe title, category tabs and "SHOP NOW" links |
| Test Data | — |
| Expected | Title contains "Home - SHOP"; all 4 category tabs visible; exactly 4 "SHOP NOW" links |
| Automated test | `navigation.spec.ts` › "home page loads with all category call-outs" |

### TC-002 — Open each category from the header
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-NAV-03, TS-NAV-05, TS-NAV-06 / REQ-01 |
| Priority / Class | High / **R** |
| Preconditions | On home page |
| Steps | For each category tab: click it; verify the listing |
| Test Data | mens_outerwear, ladies_outerwear, mens_tshirts, ladies_tshirts |
| Expected | URL becomes `/list/<slug>`; heading matches the category label; ≥ 1 product tile |
| Automated test | `navigation.spec.ts` › "can open each category from the header" |

### TC-003 — Men's Outerwear shows expected product count
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-NAV-04, TS-NAV-07 / REQ-01 |
| Priority / Class | Medium / **S, R** |
| Preconditions | On home page |
| Steps | 1. Open Men's Outerwear  2. Count product tiles |
| Expected | Exactly **16** product tiles displayed |
| Automated test | `navigation.spec.ts` › "Men's Outerwear category shows its product tiles" |

---

## Module: Product Detail (REQ-02)

### TC-004 — Product detail shows title, price and ADD TO CART
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-PRD-01, TS-PRD-02, TS-PRD-04 / REQ-02 |
| Priority / Class | High / **S, R** |
| Preconditions | — |
| Steps | 1. Open the sample product detail URL  2. Observe title, price, CTA, selectors |
| Expected | Heading == "Men's Tech Shell Full-Zip"; price matches `$NN.NN`; ADD TO CART visible; size + quantity selects present |
| Automated test | `product.spec.ts` › "product detail shows title, price and ADD TO CART" |

### TC-005 — Open a tile from a category → detail page
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-PRD-03, TS-PRD-05 / REQ-02 |
| Priority / Class | High / **R** |
| Preconditions | On home page |
| Steps | 1. Open Ladies T-Shirts  2. Click the first tile |
| Expected | URL `/detail/…`; non-empty title; valid `$NN.NN` price |
| Automated test | `product.spec.ts` › "opening a tile from a category lands on its detail page" |

---

## Module: Shopping Cart (REQ-03)

### TC-006 — Adding a product puts it in the cart
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CART-01 / REQ-03 |
| Priority / Class | Critical / **S, R** |
| Preconditions | On sample product detail page |
| Steps | 1. Click ADD TO CART  2. Open the cart |
| Expected | Cart contains exactly 1 line item |
| Automated test | `product.spec.ts` › "adding a product puts it in the cart" |

### TC-007 — Cart shows product, heading, checkout and correct total
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CART-02, TS-CART-03, TS-CART-05 / REQ-03 |
| Priority / Class | High / **R** |
| Preconditions | Sample product added |
| Steps | 1. Open cart  2. Inspect heading, checkout link and total |
| Expected | 1 item; "Your Cart" heading visible; CHECKOUT visible; **total == $50.20** |
| Automated test | `cart.spec.ts` › "added product appears in the cart with a checkout option" |

### TC-008 — Change quantity recalculates the total
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CART-04 / REQ-03 |
| Priority / Class | High / **R** |
| Preconditions | Sample product added (qty 1) |
| Steps | 1. Open cart  2. Set first item quantity to 2 |
| Expected | Quantity 1→2; 1 line item; **total doubles $50.20 → $100.40**; CHECKOUT still visible |
| Automated test | `cart.spec.ts` › "cart quantity can be changed and the total recalculates" |

### TC-009 — Remove the only item empties the cart *(manual)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CART-06 / REQ-03 |
| Priority / Class | Medium / **R** |
| Preconditions | One item in cart |
| Steps | 1. Open cart  2. Remove the line item |
| Expected | Cart becomes empty; "…is empty" message shown |
| Automated test | — (manual; cart-item remove control is inside a nested shadow root) |

### TC-010 — Multiple distinct products list multiple line items *(manual)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CART-07 / REQ-03 |
| Priority / Class | Medium / **R** |
| Steps | Add two different products; open cart |
| Expected | Two separate line items; total = sum of both prices |
| Automated test | — (manual) |

---

## Module: Checkout & Order Placement (REQ-04)

### TC-011 — Full purchase end-to-end
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CHK-01, TS-CHK-04 / REQ-04 |
| Priority / Class | Critical / **S, R** |
| Preconditions | — |
| Steps | 1. Open sample product  2. ADD TO CART  3. Open cart  4. Checkout  5. Fill the form  6. Place Order |
| Test Data | See `06_Test_Data.md` → checkout data |
| Expected | Redirects to `/checkout/success`; "Thank you" heading + "Demo checkout process complete." message shown |
| Automated test | `checkout.spec.ts` › "completes a full purchase end-to-end" |

### TC-012 — Checkout form reachable & fully rendered
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CHK-02, TS-CHK-03 / REQ-04 |
| Priority / Class | High / **R** |
| Preconditions | Sample product added |
| Steps | 1. Open cart  2. Click CHECKOUT  3. Inspect the form |
| Expected | Email, shipping address and card-number inputs visible; Place Order button visible |
| Automated test | `checkout.spec.ts` › "checkout form is reachable from a populated cart" |

### TC-013 — Country selector options *(manual)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CHK-05 / REQ-04 |
| Priority / Class | Low / **R** |
| Steps | Open checkout; inspect Country selector |
| Expected | Options are exactly `US` and `CA` |
| Automated test | — (verified during exploration; see Test Data) |

### TC-014 — Expiry month/year option values *(manual)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-CHK-06 / REQ-04 |
| Priority / Class | Low / **R** |
| Steps | Open checkout; inspect expiry selectors |
| Expected | Month options `01`–`12`; Year options `2016`–`2026` |
| Automated test | — (verified during exploration; see Test Data) |

---

## Module: Cart Persistence & Header Navigation (REQ-05)

### TC-015 — Header cart link opens the cart
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-PERS-01 / REQ-05 |
| Priority / Class | High / **R** |
| Steps | From any page, click the header cart link |
| Expected | Navigates to `/cart` |
| Automated test | covered by `BasePage.openCart()` used in product/cart/checkout specs |

### TC-016 — Cart persists across in-app navigation
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-PERS-02 / REQ-05 |
| Priority / Class | Medium / **R** |
| Steps | Add product on detail page; navigate to cart |
| Expected | Added item still present in cart |
| Automated test | implicit in `product.spec.ts` / `checkout.spec.ts` (add then open cart) |

### TC-017 — Cart persists across a full reload *(manual)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-PERS-03 / REQ-05 |
| Priority / Class | Medium / **R** |
| Steps | Add product; press browser reload; open cart |
| Expected | Item still present (persisted to local storage) |
| Automated test | — (manual) |

---

## Module: Form Validation & Empty States (REQ-06)

### TC-018 — Empty cart shows the empty-cart message
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-VAL-01 / REQ-06 |
| Priority / Class | Medium / **R** |
| Preconditions | Empty cart |
| Steps | 1. Open `/cart` directly |
| Expected | 0 items; "…is empty" message visible; "Your Cart" heading not shown |
| Automated test | `cart.spec.ts` › "empty cart shows the empty-cart message" |

### TC-019 — Card number accepts any value (no Luhn) *(observation)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-VAL-02 / REQ-06 |
| Priority / Class | Medium / **R** |
| Steps | At checkout, enter `0000000000000000`; place order |
| Expected (ideal) | Invalid card rejected |
| Actual | Order accepted — see BUG-OBS-01 |
| Automated test | — (manual observation) |

### TC-020 — Past expiry year selectable *(observation)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-VAL-03 / REQ-06 |
| Priority / Class | Low / **R** |
| Steps | At checkout, select expiry year `2016`; place order |
| Expected (ideal) | Past expiry rejected |
| Actual | Order accepted — see BUG-OBS-02 |
| Automated test | — (manual observation) |

---

## Module: Non-Functional (REQ-07) — manual

### TC-021 — Responsive layout *(manual)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-NFR-01 / REQ-07 |
| Priority / Class | Medium / **R** |
| Steps | View at 375px, 768px, 1280px widths |
| Expected | Layout remains usable; nav collapses to drawer on narrow widths |
| Automated test | — (see `10_NonFunctional_Testing_Checklist.md`) |

### TC-022 — Offline / network-warning view *(manual)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-NFR-02 / REQ-07 |
| Priority / Class | Low / **R** |
| Steps | Disconnect network; interact with the app |
| Expected | App surfaces "No internet connection" / "Couldn't reach the server" |
| Automated test | — (these views were observed hidden in the DOM during automation) |

### TC-023 — Keyboard & screen-reader navigation *(manual)*
| Field | Detail |
|-------|--------|
| Scenario / Req | TS-NFR-03 / REQ-07 |
| Priority / Class | Medium / **R** |
| Steps | Tab through home → category → detail → cart; run an axe scan |
| Expected | All interactive elements reachable; no critical a11y violations |
| Automated test | — (see NFT checklist) |

---

## Summary

| Module (REQ) | Test cases | Automated | Manual/Observation |
|--------------|-----------|-----------|--------------------|
| REQ-01 Navigation | 3 | 3 | 0 |
| REQ-02 Product detail | 2 | 2 | 0 |
| REQ-03 Cart | 5 | 3 | 2 |
| REQ-04 Checkout | 4 | 2 | 2 |
| REQ-05 Persistence | 3 | 2 | 1 |
| REQ-06 Validation/empty | 3 | 1 | 2 |
| REQ-07 Non-functional | 3 | 0 | 3 |
| **Total** | **23** | **13** | **10** |

> The 13 automated cases map to the **11 spec tests** (TC-015 and TC-016 are
> verified implicitly within other spec tests). All 11 spec tests run on 3
> browsers = **33 executions**.
