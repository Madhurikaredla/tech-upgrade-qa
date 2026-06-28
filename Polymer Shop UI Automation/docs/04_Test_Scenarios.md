# Test Scenarios

## Polymer Shop (shop.polymer-project.org)

**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0

> A test scenario is "what to test" — a user situation or feature area. Each
> scenario expands into one or more detailed test cases in `05_Test_Cases.md`.
> The **Auto?** column shows whether the scenario is covered by the automated
> suite (✅) or by manual/non-functional checks (📋).

---

## REQ-01: Storefront & Category Navigation

| Scenario ID | Scenario Description | Priority | Auto? |
|-------------|----------------------|----------|-------|
| TS-NAV-01 | Home page loads with title and four "SHOP NOW" call-outs | High | ✅ |
| TS-NAV-02 | All four category tabs are present in the header | High | ✅ |
| TS-NAV-03 | Each category opens its listing page from the header | High | ✅ |
| TS-NAV-04 | Men's Outerwear listing shows the expected number of products (16) | Medium | ✅ |
| TS-NAV-05 | Each category lists at least one product | Medium | ✅ |
| TS-NAV-06 | Header navigation remains available on every view | Medium | ✅ |
| TS-NAV-07 | Direct deep-link to a category URL renders the listing | Low | ✅ |

## REQ-02: Product Detail Viewing

| Scenario ID | Scenario Description | Priority | Auto? |
|-------------|----------------------|----------|-------|
| TS-PRD-01 | Product detail shows title, price and ADD TO CART | High | ✅ |
| TS-PRD-02 | Price is shown in valid `$NN.NN` format | Medium | ✅ |
| TS-PRD-03 | Clicking a tile on a listing opens that product's detail page | High | ✅ |
| TS-PRD-04 | Size and quantity selectors are present and selectable | Medium | ✅ |
| TS-PRD-05 | Opened product's title is non-empty | Low | ✅ |

## REQ-03: Shopping Cart Management

| Scenario ID | Scenario Description | Priority | Auto? |
|-------------|----------------------|----------|-------|
| TS-CART-01 | Adding a product places it in the cart (1 line item) | Critical | ✅ |
| TS-CART-02 | Cart shows the product and a CHECKOUT option | High | ✅ |
| TS-CART-03 | Cart total equals the product price for one unit | High | ✅ |
| TS-CART-04 | Changing quantity to 2 recalculates the total (doubles) | High | ✅ |
| TS-CART-05 | "Your Cart" heading is shown when the cart has items | Medium | ✅ |
| TS-CART-06 | Removing the only item empties the cart | Medium | 📋 |
| TS-CART-07 | Adding multiple distinct products lists multiple line items | Medium | 📋 |

## REQ-04: Checkout & Order Placement

| Scenario ID | Scenario Description | Priority | Auto? |
|-------------|----------------------|----------|-------|
| TS-CHK-01 | Full purchase end-to-end completes with confirmation | Critical | ✅ |
| TS-CHK-02 | Checkout form is reachable from a populated cart | High | ✅ |
| TS-CHK-03 | All key form controls render (email, address, card, Place Order) | High | ✅ |
| TS-CHK-04 | Order success shows "Thank you" + completion message at `/checkout/success` | Critical | ✅ |
| TS-CHK-05 | Country selector offers the documented options (US, CA) | Low | 📋 |
| TS-CHK-06 | Expiry month/year selectors use documented values (01–12 / 2016–2026) | Low | 📋 |

## REQ-05: Cart Persistence & Header Navigation

| Scenario ID | Scenario Description | Priority | Auto? |
|-------------|----------------------|----------|-------|
| TS-PERS-01 | Cart link in the header opens the cart page | High | ✅ |
| TS-PERS-02 | Cart contents persist across in-app navigation | Medium | ✅ (implicit) |
| TS-PERS-03 | Cart contents persist across a full page reload | Medium | 📋 |

## REQ-06: Form Validation & Empty States

| Scenario ID | Scenario Description | Priority | Auto? |
|-------------|----------------------|----------|-------|
| TS-VAL-01 | Empty cart shows the empty-cart message and 0 items | Medium | ✅ |
| TS-VAL-02 | Credit-card number accepts any value (no Luhn validation) — defect observation | Medium | 📋 |
| TS-VAL-03 | Past expiry year is selectable (no rejection) — defect observation | Low | 📋 |

## REQ-07: Responsive & PWA Behaviour

| Scenario ID | Scenario Description | Priority | Auto? |
|-------------|----------------------|----------|-------|
| TS-NFR-01 | Layout is usable at mobile / tablet / desktop widths | Medium | 📋 |
| TS-NFR-02 | App shows an offline / network-warning view when disconnected | Low | 📋 |
| TS-NFR-03 | Keyboard and screen-reader navigation of the storefront | Medium | 📋 |

---

### Coverage summary

| Requirement | Scenarios | Automated | Manual/NFT |
|-------------|-----------|-----------|------------|
| REQ-01 | 7 | 7 | 0 |
| REQ-02 | 5 | 5 | 0 |
| REQ-03 | 7 | 5 | 2 |
| REQ-04 | 6 | 4 | 2 |
| REQ-05 | 3 | 2 | 1 |
| REQ-06 | 3 | 1 | 2 |
| REQ-07 | 3 | 0 | 3 |
| **Total** | **34** | **24** | **10** |
