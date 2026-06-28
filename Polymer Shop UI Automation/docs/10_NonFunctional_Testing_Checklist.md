# Non-Functional Testing Checklist

## Polymer Shop (shop.polymer-project.org)

**Prepared by:** Madhuri Karedla
**Date:** 2026-06-28
**Version:** 1.0

> Non-functional testing validates quality attributes beyond feature
> correctness: performance, security, accessibility, compatibility, usability
> and documentation. These checks complement the functional automation.

---

## How to Use This Checklist

| Column | Meaning |
|--------|---------|
| Check ID | Identifier `NFT-CAT-NN` |
| Check | What to verify |
| Test Method | Tool or technique |
| Pass Criteria | Measurable threshold |
| Status | Not Started / Pass / Fail / Blocked |
| Result | Observed value |

---

## Performance

| Check ID | Check | Test Method | Pass Criteria | Status | Result |
|----------|-------|------------|---------------|--------|--------|
| NFT-PERF-01 | Home page first load | Lighthouse / DevTools | LCP < 2.5 s on broadband | Not Started | — |
| NFT-PERF-02 | Category listing render | Manual timing | Tiles visible < 2 s | Pass (observed) | tiles rendered within test waits |
| NFT-PERF-03 | Product detail navigation | Manual timing | Detail visible < 2 s | Pass (observed) | — |
| NFT-PERF-04 | Add-to-cart responsiveness | Manual | Cart updates < 1 s | Pass (observed) | — |

## Security

| Check ID | Check | Test Method | Pass Criteria | Status | Result |
|----------|-------|------------|---------------|--------|--------|
| NFT-SEC-01 | HTTPS enforced | Browser / curl | Site served over HTTPS | Pass | HTTPS only |
| NFT-SEC-02 | Card number validation (Luhn) | Manual: enter `0000…` | Invalid card rejected | **Fail** | Accepted — BUG-OBS-01 |
| NFT-SEC-03 | Expiry-date validation | Manual: select past year | Past expiry rejected | **Fail** | Accepted — BUG-OBS-02 |
| NFT-SEC-04 | XSS in checkout text fields | Manual: enter `<script>` | Input escaped, not executed | Not Started | — |
| NFT-SEC-05 | No sensitive data in console/network | DevTools inspection | No card data logged in plaintext | Not Started | — |

> Note: this is a public demo with no real payment backend; SEC-02/03 are
> expected gaps for a demo but would be release blockers in production.

## Accessibility

| Check ID | Check | Test Method | Pass Criteria | Status | Result |
|----------|-------|------------|---------------|--------|--------|
| NFT-A11Y-01 | Keyboard navigation of nav + product flow | Manual tab-through | All interactive elements reachable | Not Started | — |
| NFT-A11Y-02 | Automated a11y scan | axe-core / Lighthouse | 0 critical violations | Not Started | — |
| NFT-A11Y-03 | Form fields have labels | Inspect `aria-label`/`<label>` | All checkout fields labelled | Pass (observed) | inputs have `aria-label`/placeholders |
| NFT-A11Y-04 | Color contrast | Lighthouse | WCAG AA contrast | Not Started | — |

## Compatibility

| Check ID | Check | Test Method | Pass Criteria | Status | Result |
|----------|-------|------------|---------------|--------|--------|
| NFT-COMPAT-01 | Chromium engine | Playwright project | Suite passes | **Pass** | 11/11 |
| NFT-COMPAT-02 | Firefox engine | Playwright project | Suite passes | **Pass** | 11/11 |
| NFT-COMPAT-03 | WebKit (Safari) engine | Playwright project | Suite passes | **Pass** | 11/11 |
| NFT-COMPAT-04 | Responsive layout (mobile/tablet/desktop) | Manual / device emulation | Usable at 375/768/1280 px | Not Started | — |

## Usability

| Check ID | Check | Test Method | Pass Criteria | Status | Result |
|----------|-------|------------|---------------|--------|--------|
| NFT-USE-01 | Add-to-cart gives clear feedback | Manual | Visible confirmation | **Fail** | No clear toast — BUG-OBS-03 |
| NFT-USE-02 | Empty-cart state is clear | Manual / automated | Helpful empty message | Pass | "…is empty" shown |
| NFT-USE-03 | Order confirmation is clear | Automated | "Thank you" + message | Pass | verified |

## Documentation / PWA

| Check ID | Check | Test Method | Pass Criteria | Status | Result |
|----------|-------|------------|---------------|--------|--------|
| NFT-DOC-01 | Offline/network-warning handling | Manual: disconnect | Warning view shown | Not Started | — (views observed in DOM) |
| NFT-DOC-02 | Installable PWA / manifest | DevTools → Application | Manifest + service worker present | Not Started | — |

---

## Summary

| Category | Checks | Pass | Fail | Not Started |
|----------|--------|------|------|-------------|
| Performance | 4 | 3 | 0 | 1 |
| Security | 5 | 1 | 2 | 2 |
| Accessibility | 4 | 1 | 0 | 3 |
| Compatibility | 4 | 3 | 0 | 1 |
| Usability | 3 | 2 | 1 | 0 |
| Documentation/PWA | 2 | 0 | 0 | 2 |
| **Total** | **22** | **10** | **3** | **9** |

The 3 fails are the known demo payment-validation/usability observations
(BUG-OBS-01/02/03). Cross-browser compatibility is fully verified by the
automated suite.
