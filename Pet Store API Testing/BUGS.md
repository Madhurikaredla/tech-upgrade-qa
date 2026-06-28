# Pet Store API — Defects Found

Bugs surfaced by the negative & security tests in `PetStore.postman_collection.json`,
run against the live Swagger Pet Store (`https://petstore.swagger.io/v2`).

These appear as the **5 failing assertions** in the Newman run — the red entries are the
evidence. Each test asserts the *correct* (spec-compliant) behavior, so it fails against
the demo API's actual buggy behavior.

| # | Severity | Endpoint | Test | Expected | Actual |
|---|----------|----------|------|----------|--------|
| BUG-01 | Critical (Security) | `GET /pet/{id}`, `GET /store/inventory`, `DELETE /pet/{id}` | Auth enforced (api_key / OAuth) | `401 Unauthorized` with no / invalid token | `200 OK` — **auth bypass**, protected endpoints accept any/no token |
| BUG-02 | High (Security) | `GET /user/{username}` | password should not be returned | Password field absent from response | Response returns `password` in **plain text** |
| BUG-03 | High | `POST /store/order` | Wrong data type for `quantity` rejected | `400 Bad Request` | `500 Internal Server Error` (unhandled crash) |
| BUG-04 | Medium | `POST /pet` | Missing required `name` rejected | `400 / 405 / 422` | `200 OK` — invalid pet accepted |
| BUG-05 | Medium | `GET /pet/findByStatus?status=flying` | Invalid enum value rejected | `400 Bad Request` | `200 OK` — invalid status accepted |
| BUG-06 | Medium | `GET /user/login` (no credentials) | Missing credentials rejected | `400 Bad Request` | `200 OK` — login "succeeds" with no creds |

## Details

### BUG-01 — Authentication not enforced / auth bypass (Security)

The spec marks `GET /pet/{petId}` and `GET /store/inventory` as `api_key`-protected, and the
pet write operations (`POST/PUT/DELETE /pet`) as `petstore_auth` (OAuth2). In practice the
demo accepts every request **with no token, and with an invalid token**, returning `200`.
Tested all four cases in the *Auth & Security* folder:

- `GET /pet/{petId}` with **no** `api_key` → `200` (expected `401`)
- `GET /pet/{petId}` with **invalid** `api_key` → `200` (expected `401`)
- `GET /store/inventory` with **no** `api_key` → `200` (expected `401`)
- `DELETE /pet/{petId}` with **no** OAuth token → `200` (expected `401`)

A valid-`api_key` positive case returns `200` and **passes** — so the header is accepted but
never actually verified. **Severity: Critical** — complete authentication bypass.

### BUG-02 — Password disclosed in plain text (Security)

`GET /user/{username}` returns the stored `password` field in the JSON body. Credentials
must never be returned by a read endpoint. **Severity: High** — sensitive data exposure.

### BUG-03 — 500 on invalid `quantity` type

`POST /store/order` with a non-numeric `quantity` returns `500` instead of validating the
input and returning `400`. An unhandled server error on bad input is a robustness defect
and a potential DoS vector.

### BUG-04 — Required-field validation missing on `POST /pet`

Creating a pet without the required `name` field returns `200` and accepts the record. The
API does not enforce its own contract.

### BUG-05 — Enum validation missing on `findByStatus`

`status` is documented as an enum (`available|pending|sold`). Passing `flying` returns
`200` instead of `400`.

### BUG-06 — Login succeeds with no credentials

`GET /user/login` with no `username`/`password` returns `200` and a session message.
Authentication must reject empty credentials with `400`.

---

> **Note:** These are defects in the public Swagger Pet Store demo, which is intentionally
> permissive. In a real project these failing assertions would be raised as tickets against
> the service owner. They are kept as **failing** here so the Newman report itself is the
> proof of each finding.
