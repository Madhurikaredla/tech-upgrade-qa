# SauceDemo — Defects Caught by Automation

These are the real defects the `@defect`-tagged tests detect. SauceDemo ships
these intentionally on its "special" accounts so testers have something to find;
our automation treats them as genuine bugs and fails the relevant test, attaching
a screenshot and video as evidence.

---

## BUG-01 — All product images are identical (problem_user)

| | |
|---|---|
| **Account** | problem_user |
| **Severity** | Medium (UX / merchandising) |
| **Test** | `tests/users.spec.ts` → "all six product images should be distinct" |

**Steps**
1. Log in as `problem_user` / `secret_sauce`.
2. Observe the six product thumbnails on the inventory page.

**Expected** — each product shows its own distinct image (6 unique sources).
**Actual** — all six use the same broken image: `/static/media/sl-404.168b1cce10384b857a6f.jpg` (unique source count = 1).

**Evidence** — `reports/failure-evidence/users-problem-user-regress-bac88-…png` / `.webm`

---

## BUG-02 — Sort dropdown does not reorder products (problem_user)

| | |
|---|---|
| **Account** | problem_user |
| **Severity** | High (core feature broken) |
| **Test** | `tests/users.spec.ts` → "sort by Price (low to high) should actually reorder the list" |

**Steps**
1. Log in as `problem_user`.
2. Select "Price (low to high)" in the sort dropdown.

**Expected** — products reorder by ascending price.
**Actual** — the list order is unchanged; prices are not ascending.

**Evidence** — `reports/failure-evidence/users-problem-user-regress-3d7d1-…png` / `.webm`

---

## BUG-03 — Sort dropdown does not reorder products (error_user)

| | |
|---|---|
| **Account** | error_user |
| **Severity** | High (core feature broken) |
| **Test** | `tests/users.spec.ts` → "sort by Price (low to high) should reorder the list" |

**Steps**
1. Log in as `error_user`.
2. Select "Price (low to high)" in the sort dropdown.

**Expected** — products reorder by ascending price.
**Actual** — the list order is unchanged; prices are not ascending.

**Evidence** — `reports/failure-evidence/users-error-user-regressio-dd475-…png` / `.webm`

---

## Observation (not failed) — performance_glitch_user is slow

The `performance_glitch_user` reaches the inventory in **~6 seconds** versus
**<1 second** for `standard_user`. The test passes (the page is functional) but
records the load time as a Playwright annotation. Worth raising as a performance
defect rather than a functional one.
