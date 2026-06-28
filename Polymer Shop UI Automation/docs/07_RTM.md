# Requirements Traceability Matrix (RTM)

## Polymer Shop (shop.polymer-project.org)

**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0

> The RTM proves coverage: every requirement maps to scenarios, test cases and
> (where automated) a spec test; every test case links back to a requirement.
> Execution status reflects the real automated run (2026-06-28).

---

## Full Traceability Matrix

| Req ID | Requirement | Scenarios | Test Cases | Automated tests | Status | Result |
|--------|-------------|-----------|------------|-----------------|--------|--------|
| REQ-01 | Storefront & category navigation | TS-NAV-01…07 | TC-001, TC-002, TC-003 | navigation.spec.ts (3) | Executed | ✅ Pass |
| REQ-02 | Product detail viewing | TS-PRD-01…05 | TC-004, TC-005 | product.spec.ts (2) | Executed | ✅ Pass |
| REQ-03 | Shopping cart management | TS-CART-01…07 | TC-006…TC-010 | product/cart specs (3) | Executed | ✅ Pass (2 manual pending) |
| REQ-04 | Checkout & order placement | TS-CHK-01…06 | TC-011…TC-014 | checkout.spec.ts (2) | Executed | ✅ Pass (2 manual verified) |
| REQ-05 | Cart persistence & header nav | TS-PERS-01…03 | TC-015…TC-017 | implicit in specs | Executed | ✅ Pass (1 manual pending) |
| REQ-06 | Form validation & empty states | TS-VAL-01…03 | TC-018…TC-020 | cart.spec.ts (1) | Executed | ⚠ 1 Pass + 2 observations |
| REQ-07 | Responsive & PWA behaviour | TS-NFR-01…03 | TC-021…TC-023 | — (manual/NFT) | Not run (manual) | ◻ Pending |

**Coverage:** 7/7 requirements have at least one scenario and test case → **100% requirement coverage**.

---

## Detailed Coverage per Requirement

### REQ-01: Storefront & Category Navigation
| Test Case | Title | Type | Class | Status | Result |
|-----------|-------|------|-------|--------|--------|
| TC-001 | Home loads with call-outs | Positive | S, R | Executed | ✅ Pass |
| TC-002 | Open each category | Positive | R | Executed | ✅ Pass |
| TC-003 | Men's Outerwear count = 16 | Positive | S, R | Executed | ✅ Pass |

### REQ-02: Product Detail
| Test Case | Title | Type | Class | Status | Result |
|-----------|-------|------|-------|--------|--------|
| TC-004 | Title/price/CTA shown | Positive | S, R | Executed | ✅ Pass |
| TC-005 | Tile → detail page | Positive | R | Executed | ✅ Pass |

### REQ-03: Shopping Cart
| Test Case | Title | Type | Class | Status | Result |
|-----------|-------|------|-------|--------|--------|
| TC-006 | Add product → cart | Positive | S, R | Executed | ✅ Pass |
| TC-007 | Cart shows item + total $50.20 | Positive | R | Executed | ✅ Pass |
| TC-008 | Quantity change doubles total | Positive | R | Executed | ✅ Pass |
| TC-009 | Remove empties cart | Positive | R | Manual | ◻ Pending |
| TC-010 | Multiple line items | Positive | R | Manual | ◻ Pending |

### REQ-04: Checkout & Order Placement
| Test Case | Title | Type | Class | Status | Result |
|-----------|-------|------|-------|--------|--------|
| TC-011 | Full purchase E2E | Positive | S, R | Executed | ✅ Pass |
| TC-012 | Checkout form rendered | Positive | R | Executed | ✅ Pass |
| TC-013 | Country options US/CA | Positive | R | Manual | ✅ Verified |
| TC-014 | Expiry option values | Positive | R | Manual | ✅ Verified |

### REQ-05: Cart Persistence & Header Navigation
| Test Case | Title | Type | Class | Status | Result |
|-----------|-------|------|-------|--------|--------|
| TC-015 | Header cart link opens cart | Positive | R | Executed (implicit) | ✅ Pass |
| TC-016 | Persist across in-app nav | Positive | R | Executed (implicit) | ✅ Pass |
| TC-017 | Persist across reload | Positive | R | Manual | ◻ Pending |

### REQ-06: Form Validation & Empty States
| Test Case | Title | Type | Class | Status | Result |
|-----------|-------|------|-------|--------|--------|
| TC-018 | Empty cart message | Negative/Empty | R | Executed | ✅ Pass |
| TC-019 | Card accepts any value | Security/Validation | R | Manual | ⚠ BUG-OBS-01 |
| TC-020 | Past expiry selectable | Validation | R | Manual | ⚠ BUG-OBS-02 |

### REQ-07: Non-Functional
| Test Case | Title | Type | Class | Status | Result |
|-----------|-------|------|-------|--------|--------|
| TC-021 | Responsive layout | NFT | R | Manual | ◻ Pending |
| TC-022 | Offline view | NFT | R | Manual | ◻ Pending |
| TC-023 | Keyboard/SR navigation | NFT | R | Manual | ◻ Pending |

---

## Legend
✅ Pass · ⚠ Observation/Defect · ◻ Pending (manual not yet executed) · S = Sanity · R = Regression
