# SauceDemo — Test Data

All test data lives in code under [`../fixtures`](../fixtures) so it is typed,
reusable and version-controlled. This document is the human-readable mirror.

## Accounts — `fixtures/users.ts`

Password (all accounts): **`secret_sauce`**

| Key | Username | Can log in? | Behaviour |
|-----|----------|-------------|-----------|
| standard | `standard_user` | ✅ | Baseline happy path; everything works. |
| lockedOut | `locked_out_user` | ❌ | Rejected with "locked out" error. |
| problem | `problem_user` | ✅ | Logs in, but product images are all the same broken image and the sort control does not reorder. |
| performanceGlitch | `performance_glitch_user` | ✅ | Logs in but pages load noticeably slowly (~6 s). |
| error | `error_user` | ✅ | Logs in; some interactions (e.g. sort) error/misbehave. |
| visual | `visual_user` | ✅ | Logs in; intentional cosmetic/visual glitches. |

### Expected error messages

| Scenario | Message |
|----------|---------|
| Locked-out user | `Epic sadface: Sorry, this user has been locked out.` |
| Username blank | `Epic sadface: Username is required` |
| Password blank | `Epic sadface: Password is required` |
| Unknown creds | `Epic sadface: Username and password do not match any user in this service` |

## Products — `fixtures/testData.ts`

| Key | Display name | Price |
|-----|--------------|-------|
| backpack | Sauce Labs Backpack | $29.99 |
| bikeLight | Sauce Labs Bike Light | $9.99 |
| boltTShirt | Sauce Labs Bolt T-Shirt | $15.99 |
| fleeceJacket | Sauce Labs Fleece Jacket | $49.99 |
| onesie | Sauce Labs Onesie | $7.99 |
| redTShirt | Test.allTheThings() T-Shirt (Red) | $15.99 |

## Checkout information — `fixtures/testData.ts`

| Field | Value |
|-------|-------|
| First name | Madhuri |
| Last name | Karedla |
| Postal code | 500032 |

### Checkout error messages

| Missing field | Message |
|---------------|---------|
| First name | `Error: First Name is required` |
| Last name | `Error: Last Name is required` |
| Postal code | `Error: Postal Code is required` |

## Sort option values (the `<option value>` attributes)

| Label | Value |
|-------|-------|
| Name (A to Z) | `az` |
| Name (Z to A) | `za` |
| Price (low to high) | `lohi` |
| Price (high to low) | `hilo` |
