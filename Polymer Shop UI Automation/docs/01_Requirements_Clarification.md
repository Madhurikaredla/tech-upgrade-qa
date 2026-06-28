# Requirements Clarification

## Polymer Shop (shop.polymer-project.org)

**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0

> The Polymer Shop is a public demo storefront with no formal specification.
> The "requirements" below are reverse-engineered from observed behaviour during
> exploratory testing. This document records the clarifying questions a tester
> would raise with a product owner, and a product risk register, before locking
> down the test design.

---

## Derived Requirements

| Req ID | Requirement |
|--------|-------------|
| REQ-01 | Users can browse the storefront home page and navigate to product categories |
| REQ-02 | Users can open a product and view its details (name, price, image, size, quantity) |
| REQ-03 | Users can add products to a cart and manage it (quantity, totals) |
| REQ-04 | Users can check out and place an order, receiving a confirmation |
| REQ-05 | The cart persists and the header navigation/cart link is always reachable |
| REQ-06 | Forms validate required input and the app handles error/empty states |
| REQ-07 | The storefront is responsive and behaves as a PWA (offline-aware) |

---

## REQ-01: Storefront & Category Navigation

| # | Clarifying Question | Why It Matters |
|---|---------------------|----------------|
| Q1.1 | How many categories exist and are they fixed? (Observed: Men's Outerwear, Ladies Outerwear, Men's T-Shirts, Ladies T-Shirts) | Defines navigation coverage |
| Q1.2 | Is the product count per category fixed or catalogue-driven? (Observed: 16 / 6 / 40 / 19) | Determines whether exact counts can be asserted |
| Q1.3 | Should the home page always present exactly four "SHOP NOW" call-outs? | Affects home-page assertions |
| Q1.4 | Is client-side routing expected to keep the header nav present on every view? | Drives navigation test design |

## REQ-02: Product Detail Viewing

| # | Clarifying Question | Why It Matters |
|---|---------------------|----------------|
| Q2.1 | Are size and quantity selectors mandatory before adding to cart, or do defaults apply? | Affects add-to-cart preconditions |
| Q2.2 | What is the expected price format and currency? (Observed: `$NN.NN`, USD) | Defines price assertions |
| Q2.3 | Should an out-of-stock or unavailable product be handled differently? | Negative-path coverage |

## REQ-03: Shopping Cart Management

| # | Clarifying Question | Why It Matters |
|---|---------------------|----------------|
| Q3.1 | Does adding the same product twice create two line items or increment quantity? | Cart logic coverage |
| Q3.2 | What is the maximum quantity selectable per line item? | Boundary testing |
| Q3.3 | Is the cart total expected to recalculate immediately on quantity change? (Observed: yes — $50.20 → $100.40 at qty 2) | Total-recalculation assertion |
| Q3.4 | How is an item removed from the cart, and is there a confirmation? | Remove-path coverage |

## REQ-04: Checkout & Order Placement

| # | Clarifying Question | Why It Matters |
|---|---------------------|----------------|
| Q4.1 | Which checkout fields are mandatory vs optional? | Validation coverage |
| Q4.2 | Is the credit-card number validated (Luhn check) or is any input accepted? (Observed: any input accepted — demo) | Security/validation risk |
| Q4.3 | Are past expiry dates rejected? (Observed: year options 2016–2026 selectable; no rejection of past years) | Validation risk |
| Q4.4 | What confirmation is expected on success? (Observed: redirect to `/checkout/success`, "Thank you" + "Demo checkout process complete.") | Success assertion |
| Q4.5 | Does "billing same as shipping" default on, and does it hide billing fields? | Form-flow coverage |

## REQ-05: Cart Persistence & Header Navigation

| # | Clarifying Question | Why It Matters |
|---|---------------------|----------------|
| Q5.1 | Is the cart expected to persist across page reloads / new sessions? | Persistence coverage |
| Q5.2 | Should the header cart link show a live item-count badge? | Badge assertion |
| Q5.3 | Why does the navigation render a duplicate off-screen drawer copy of links? | Locator strategy (resolved: `:not([tabindex="-1"])`) |

## REQ-06: Form Validation & Error/Empty States

| # | Clarifying Question | Why It Matters |
|---|---------------------|----------------|
| Q6.1 | What is shown when the cart is empty? (Observed: "…is empty" message; "Your Cart" heading hidden) | Empty-state coverage |
| Q6.2 | Are inline field errors shown for invalid checkout input? | Validation UX |

## REQ-07: Responsive & PWA Behaviour

| # | Clarifying Question | Why It Matters |
|---|---------------------|----------------|
| Q7.1 | Which breakpoints are supported (mobile/tablet/desktop)? | Responsive coverage |
| Q7.2 | What is the expected offline behaviour? (Observed: hidden "No internet connection" / "Couldn't reach the server" shell views) | PWA/offline coverage |

---

## Product Risk Register

| Risk ID | Risk | Likelihood | Impact | Mitigation |
|---------|------|-----------|--------|------------|
| R-01 | Credit-card field accepts any value (no Luhn / no expiry validation) | High | High (in a real shop) | Flag as defect; add server + client validation |
| R-02 | Demo checkout always "succeeds" regardless of payment validity | High | High (real shop) | Integrate real payment gateway + validation |
| R-03 | Shadow-DOM shell keeps hidden 404 / network-warning views in the DOM | High | Low (test-only) | Locators use `:visible` to avoid false matches |
| R-04 | Duplicated header/drawer nav links (drawer `tabindex="-1"`) | High | Low (test-only) | Locators use `:not([tabindex="-1"])` |
| R-05 | Async tile/cart rendering can cause flaky reads | Medium | Medium | Web-first assertions (`toHaveCount`, `toBeVisible`) |
| R-06 | Per-category product counts may change with catalogue | Medium | Low | Assert exact count only for one category; `>0` elsewhere |
| R-07 | Add-to-cart gives no consistent visible confirmation snackbar across browsers | Medium | Low | Verify via cart contents instead of transient toast |
