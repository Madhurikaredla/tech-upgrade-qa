# Pet Store API — Full Test Execution Report

Complete record of **every request and every assertion** in `PetStore.postman_collection.json`,
run via Newman against the live Swagger Pet Store (`https://petstore.swagger.io/v2` — the same
API served by the Swagger UI at <https://petstore.swagger.io/#/>).

> ❌ rows are **failing assertions** — intentional: negative / auth / security tests catching
> real defects in the public demo API. Full write-ups in [BUGS.md](BUGS.md).

## Summary

| Metric | Value |
| ------ | ----- |
| Endpoints covered | **20 / 20** (all Pet, Store, User operations) |
| Requests executed | 37 / 37 |
| Assertions total | 102 |
| Assertions passed | **93** |
| Assertions failed | **9** (documented defects) |
| Requests with a failure | 9 |

### Per-module

| Module | Assertions | Failed |
| ------ | ---------- | ------ |
| Pet | 40 | 2 |
| Store | 19 | 1 |
| User | 28 | 2 |
| Auth & Security | 15 | 4 |

**Legend:** ✅ pass · ❌ fail (documented bug) · `P` positive · `N` negative · `A` auth/security


## ❏ Pet

### ✅ 1. `POST /pet - Add a new pet (positive)`  ·  `P`
HTTP **200** · 229 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Response echoes the generated pet id | ✅ pass |
| Pet name and status persisted | ✅ pass |
| Contract: required fields present with correct types | ✅ pass |

### ❌ 2. `POST /pet - Missing required 'name' (negative)`  ·  `N`
HTTP **200** · 240 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Missing required field should be rejected (expected 400/405) | ❌ **FAIL** |

### ✅ 3. `GET /pet/{petId} - Find pet by ID (positive)`  ·  `P`
HTTP **200** · 230 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Returned pet matches the created id | ✅ pass |
| Content-Type is application/json | ✅ pass |

### ✅ 4. `GET /pet/{petId} - Non-existent ID (negative)`  ·  `N`
HTTP **404** · 230 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 404 Not Found | ✅ pass |
| Error payload exposes no stack trace | ✅ pass |

### ✅ 5. `GET /pet/{petId} - Non-numeric ID (negative)`  ·  `N`
HTTP **404** · 233 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Invalid (non-numeric) id is rejected | ✅ pass |

### ✅ 6. `PUT /pet - Update existing pet (positive)`  ·  `P`
HTTP **200** · 233 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Status was updated to sold | ✅ pass |
| Name was updated | ✅ pass |

### ✅ 7. `GET /pet/findByStatus - status=available (positive)`  ·  `P`
HTTP **200** · 700 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Response is an array | ✅ pass |
| Every returned pet has status=available (data filter check) | ✅ pass |

### ❌ 8. `GET /pet/findByStatus - invalid status (negative)`  ·  `N`
HTTP **200** · 234 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Invalid enum value should return 400 (logged bug if 200) | ❌ **FAIL** |

### ✅ 9. `GET /pet/findByTags - deprecated (positive)`  ·  `P`
HTTP **200** · 241 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Response is an array | ✅ pass |

### ✅ 10. `POST /pet/{petId} - Update with form data (positive)`  ·  `P`
HTTP **200** · 244 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| ApiResponse contains the updated pet id | ✅ pass |

### ✅ 11. `POST /pet/{petId}/uploadImage (positive)`  ·  `P`
HTTP **200** · 514 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| ApiResponse contract: code/type/message | ✅ pass |

### ✅ 12. `DELETE /pet/{petId} - Delete pet (positive)`  ·  `P`
HTTP **200** · 273 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Deleted id returned in response | ✅ pass |

### ✅ 13. `DELETE /pet/{petId} - Already deleted (negative)`  ·  `N`
HTTP **404** · 305 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Deleting an already-deleted pet returns 404 | ✅ pass |


## ❏ Store

### ✅ 14. `GET /store/inventory (positive)`  ·  `P`
HTTP **200** · 239 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Inventory is an object of status->count | ✅ pass |
| Counts are integers | ✅ pass |

### ✅ 15. `POST /store/order - Place order (positive)`  ·  `P`
HTTP **200** · 231 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Order echoes id and status placed | ✅ pass |
| Contract: petId and quantity are numbers, complete is boolean | ✅ pass |

### ❌ 16. `POST /store/order - Invalid quantity type (negative)`  ·  `N`
HTTP **500** · 238 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Wrong data type for quantity should return 400 (logged bug if 200/500) | ❌ **FAIL** |

### ✅ 17. `GET /store/order/{orderId} (positive)`  ·  `P`
HTTP **200** · 228 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Returned order matches requested id | ✅ pass |

### ✅ 18. `GET /store/order/{orderId} - out-of-range id (negative)`  ·  `N`
HTTP **404** · 231 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Out-of-range / non-existent order returns 400 or 404 | ✅ pass |

### ✅ 19. `DELETE /store/order/{orderId} (positive)`  ·  `P`
HTTP **200** · 237 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |

### ✅ 20. `DELETE /store/order/{orderId} - already deleted (negative)`  ·  `N`
HTTP **404** · 233 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Deleting an already-deleted order returns 404 | ✅ pass |


## ❏ User

### ✅ 21. `POST /user - Create user (positive)`  ·  `P`
HTTP **200** · 229 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| ApiResponse echoes a message (the created user id) | ✅ pass |

### ✅ 22. `POST /user/createWithList (positive)`  ·  `P`
HTTP **200** · 231 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |

### ✅ 23. `POST /user/createWithArray (positive)`  ·  `P`
HTTP **200** · 228 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |

### ✅ 24. `GET /user/login (positive + capture token)`  ·  `P`
HTTP **200** · 409 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Login returns a session message | ✅ pass |
| Auth token captured into collection variable | ✅ pass |
| Rate-limit headers are present | ✅ pass |

### ❌ 25. `GET /user/login - missing credentials (negative)`  ·  `N`
HTTP **200** · 239 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Login without credentials should return 400 | ❌ **FAIL** |

### ❌ 26. `GET /user/{username} (positive)`  ·  `P`
HTTP **200** · 229 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |
| Returned username matches | ✅ pass |
| SECURITY: password should not be returned in plain text | ❌ **FAIL** |

### ✅ 27. `GET /user/{username} - not found (negative)`  ·  `N`
HTTP **404** · 233 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Unknown user returns 404 | ✅ pass |

### ✅ 28. `PUT /user/{username} (positive)`  ·  `P`
HTTP **200** · 236 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |

### ✅ 29. `DELETE /user/{username} (positive)`  ·  `P`
HTTP **200** · 229 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |

### ✅ 30. `DELETE /user/{username} - already deleted (negative)`  ·  `N`
HTTP **404** · 271 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Deleting an already-deleted user returns 404 | ✅ pass |

### ✅ 31. `GET /user/logout (positive)`  ·  `P`
HTTP **200** · 235 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Status code is 200 | ✅ pass |


## ❏ Auth & Security

### ✅ 32. `GET /pet/{petId} - valid api_key (positive)`  ·  `A`
HTTP **200** · 253 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Authenticated request with valid api_key returns 200 | ✅ pass |
| Returns the requested pet | ✅ pass |

### ❌ 33. `GET /pet/{petId} - MISSING api_key (auth negative)`  ·  `A`
HTTP **200** · 244 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Unauthenticated request should be rejected with 401 (auth bypass if 200) | ❌ **FAIL** |

### ❌ 34. `GET /pet/{petId} - INVALID api_key (auth negative)`  ·  `A`
HTTP **200** · 299 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Invalid api_key should be rejected with 401 (auth bypass if 200) | ❌ **FAIL** |

### ❌ 35. `GET /store/inventory - MISSING api_key (auth negative)`  ·  `A`
HTTP **200** · 248 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Unauthenticated inventory read should be rejected with 401 (auth bypass if 200) | ❌ **FAIL** |

### ❌ 36. `DELETE /pet/{petId} - MISSING OAuth token (auth negative)`  ·  `A`
HTTP **200** · 263 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Delete without OAuth token should be rejected with 401 (auth bypass if 200/404) | ❌ **FAIL** |

### ✅ 37. `GET /store/inventory - with auto-set Bearer token (bonus)`  ·  `A`
HTTP **200** · 241 ms

| Assertion | Result |
|-----------|--------|
| Response time is under 3000ms (SLA guardrail) | ✅ pass |
| Bearer token was auto-set by the collection pre-request | ✅ pass |
| Request carried an Authorization: Bearer header | ✅ pass |
| Protected endpoint returns 200 with a valid token | ✅ pass |
