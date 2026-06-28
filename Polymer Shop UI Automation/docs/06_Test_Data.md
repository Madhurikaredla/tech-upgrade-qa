# Test Data

## Polymer Shop (shop.polymer-project.org)

**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0

> All test data is also encoded (typed, version-controlled) in
> [`../fixtures/testData.ts`](../fixtures/testData.ts). This document is the
> readable mirror, plus boundary values and field-value findings.

---

## 1. Categories

| Key | Label | URL slug | Product tiles |
|-----|-------|----------|---------------|
| mensOuterwear | Men's Outerwear | `mens_outerwear` | 16 |
| ladiesOuterwear | Ladies Outerwear | `ladies_outerwear` | 6 |
| mensTshirts | Men's T-Shirts | `mens_tshirts` | 40 |
| ladiesTshirts | Ladies T-Shirts | `ladies_tshirts` | 19 |

> Counts observed 2026-06-28. Only Men's Outerwear's count (16) is asserted
> exactly; the per-category loop asserts "≥ 1 tile" so the suite stays stable if
> the catalogue changes.

## 2. Sample product (deterministic flows)

| Field | Value |
|-------|-------|
| Category | Men's Outerwear |
| Name | Men's Tech Shell Full-Zip |
| Detail path | `/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip` |
| Unit price | $50.20 |
| Total at qty 2 | $100.40 |

## 3. Checkout form data (happy path)

The demo accepts any well-formed input (no real payment gateway).

| Field (input/select `name`) | Value |
|-----------------------------|-------|
| accountEmail | madhuri.karedla@example.com |
| accountPhone | 5551234567 |
| shipAddress | 123 Jubilee Hills |
| shipCity | Hyderabad |
| shipState | TS |
| shipZip | 500032 |
| shipCountry | US |
| ccName | Madhuri Karedla |
| ccNumber | 4111111111111111 |
| ccExpMonth | 01 |
| ccExpYear | 2026 |
| ccCVV | 123 |

> Billing address defaults to the shipping address (`setBilling`), so billing
> fields are left blank in the happy path.

## 4. Field-value findings (discovered during exploratory automation)

| Field | Finding |
|-------|---------|
| Expiry month (`ccExpMonth`) | Options are zero-padded `01`–`12` (not `1`). |
| Expiry year (`ccExpYear`) | Options range `2016`–`2026`. |
| Country (`shipCountry`/`billCountry`) | Only `US` and `CA`. |
| Place Order button | `<input type="button" value="Place Order">` inside `shop-checkout`. |
| Success route | `/checkout/success` → "Thank you" + "Demo checkout process complete." |
| Cart total | Rendered as `Total: $NN.NN`; recalculates on quantity change. |

## 5. Boundary & negative data

| Purpose | Data | Expected |
|---------|------|----------|
| Empty cart | (no items) | "…is empty" message; 0 line items |
| Quantity boundary | qty = 1 (min) | total = unit price |
| Quantity boundary | qty = 2 | total = 2 × unit price |
| Invalid card (observation) | `0000000000000000` | *Ideal:* rejected; *Actual:* accepted (BUG-OBS-01) |
| Past expiry (observation) | year `2016` | *Ideal:* rejected; *Actual:* accepted (BUG-OBS-02) |
| Deep link | `/list/mens_outerwear` | listing renders directly |

## 6. Environment data

| Item | Value |
|------|-------|
| Base URL | https://shop.polymer-project.org |
| Browsers | Chromium, Firefox, WebKit (Playwright projects) |
| Viewport | Desktop defaults per Playwright device descriptors |
| Node / Playwright | Node 18+, Playwright 1.61.x |
