# Bug Report Template and Sample Bug Reports

## Polymer Shop (shop.polymer-project.org)

**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0

> The functional automation found **no functional defects** — all 33 runs pass.
> The findings below are **payment-validation observations** confirmed during
> testing. Because the Shop is an intentional public **demo** with no real
> payment gateway, these are low/medium-severity observations rather than
> release blockers — but in a production storefront they would be serious.

---

## Bug Report Template

```
Bug ID         : BUG-[###]
Title          : [One-line summary — action + outcome + context]
Reported By    :
Date Reported  :
Environment    : shop.polymer-project.org (public demo)
Browser/OS     :
Severity       : Critical / High / Medium / Low
Priority       : P1 / P2 / P3 / P4
Status         : New / Open / In Fix / Fixed / Re-test / Closed / Won't Fix
Linked Req     : REQ-[##]
Linked TC      : TC-[###]

PRECONDITIONS:
[Exact setup required to reproduce]

STEPS TO REPRODUCE:
1.
2.

EXPECTED RESULT:
[What should happen per the requirement]

ACTUAL RESULT:
[What actually happened — factual]

REPRODUCIBILITY:
Always / Intermittent (X of Y) / Could Not Reproduce

ATTACHMENTS:
[ ] Screenshot   [ ] Video   [ ] Trace   [ ] Console log

NOTES:
[Related findings, suspected root cause, workaround]
```

---

## Sample Bug Reports (verified observations)

### BUG-OBS-01 — Checkout accepts an invalid credit-card number

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-OBS-01 |
| **Title** | Order is placed successfully with an obviously invalid card number (no Luhn / format validation) |
| **Reported By** | Madhuri Karedla |
| **Date Reported** | 2026-06-28 |
| **Environment** | shop.polymer-project.org (public demo) |
| **Browser/OS** | Chromium / macOS |
| **Severity** | Medium (would be **Critical** in a real store) |
| **Priority** | P3 (demo) |
| **Status** | Open — Won't Fix (by-design demo) |
| **Linked Req** | REQ-04, REQ-06 |
| **Linked TC** | TC-019 |

**Preconditions:** One product in the cart; on the checkout form.

**Steps to Reproduce:**
1. Add a product and proceed to checkout.
2. Fill the shipping fields with valid data.
3. Enter card number `0000000000000000`, CVV `000`.
4. Click **Place Order**.

**Expected Result:** The invalid card is rejected with a validation error; the order is not placed.

**Actual Result:** The app redirects to `/checkout/success` and shows "Thank you / Demo checkout process complete." The order is accepted.

**Reproducibility:** Always (verified 2026-06-28).

**Notes:** The demo performs no card validation (no Luhn check, no gateway). Acceptable for a demo; in production this is a serious gap. No client- or server-side validation observed.

---

### BUG-OBS-02 — Checkout accepts a past card-expiry date

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-OBS-02 |
| **Title** | Order is placed with an expiry date in the past (e.g. 01/2016) |
| **Reported By** | Madhuri Karedla |
| **Date Reported** | 2026-06-28 |
| **Environment** | shop.polymer-project.org (public demo) |
| **Browser/OS** | Chromium / macOS |
| **Severity** | Low (would be **High** in a real store) |
| **Priority** | P4 (demo) |
| **Status** | Open — Won't Fix (by-design demo) |
| **Linked Req** | REQ-04, REQ-06 |
| **Linked TC** | TC-020 |

**Preconditions:** One product in the cart; on the checkout form.

**Steps to Reproduce:**
1. Add a product and proceed to checkout.
2. Fill valid shipping + card name/number/CVV.
3. Select expiry month `01`, year `2016` (in the past).
4. Click **Place Order**.

**Expected Result:** Past expiry is rejected with a validation error.

**Actual Result:** Order is accepted; redirects to `/checkout/success`.

**Reproducibility:** Always (verified 2026-06-28).

**Notes:** The expiry-year dropdown still offers past years (2016–2026) and applies no "not in the past" rule.

---

### BUG-OBS-03 — No explicit "added to cart" confirmation (usability)

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-OBS-03 |
| **Title** | Clicking ADD TO CART gives no clearly visible confirmation toast across all browsers |
| **Reported By** | Madhuri Karedla |
| **Date Reported** | 2026-06-28 |
| **Environment** | shop.polymer-project.org (public demo) |
| **Severity** | Low |
| **Priority** | P4 |
| **Status** | Open — informational |
| **Linked Req** | REQ-03 |
| **Linked TC** | TC-006 |

**Steps to Reproduce:** On a product detail page, click ADD TO CART and watch for feedback.

**Expected Result:** A clear, consistent confirmation (toast/snackbar + badge update).

**Actual Result:** No reliably detectable confirmation toast was observed during automation; the addition is only confirmable by opening the cart. (Tests therefore verify via cart contents, not a transient toast.)

**Notes:** Informational — flagged for UX review. Does not block the purchase flow.

---

## Severity vs Priority Reference

| Severity | Description | Example (this app) |
|----------|-------------|--------------------|
| Critical | Purchase path blocked; data loss; security breach | (none found) |
| High | Core feature broken / wrong data | (none found) |
| Medium | Partial feature / workaround; demo-only validation gap | BUG-OBS-01 (no card validation) |
| Low | Cosmetic / minor UX / demo-acceptable | BUG-OBS-02, BUG-OBS-03 |

| Priority | Definition |
|----------|------------|
| P1 | Fix immediately — blocks testing or is a security issue |
| P2 | Fix this sprint — business process impacted |
| P3 | Fix next sprint — workaround exists |
| P4 | Fix when time permits — cosmetic / very low impact |
