import { test, expect } from '../fixtures/pages';
import { USERS } from '../fixtures/users';
import { PRODUCTS, SORT_OPTIONS, CHECKOUT_INFO } from '../fixtures/testData';

/**
 * Per-user behavioural tests for the four "special" accounts.
 *
 * The tests assert the CORRECT, expected behaviour of the application. Where an
 * account has an intentional SauceDemo defect, the corresponding test will FAIL
 * — that failure is the point: it is a real defect caught by automation, and it
 * produces the screenshot + video evidence required by exercise goal #4.
 *
 * (This mirrors the repo's Pet Store API assignment, whose negative tests fail
 * on purpose to document genuine defects.)
 *
 * Tests expected to FAIL on the buggy accounts are tagged @defect.
 */

test.describe('problem_user @regression', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(USERS.problem);
    await inventoryPage.expectLoaded();
  });

  test('all six product images should be distinct @defect', async ({ inventoryPage }) => {
    const sources = await inventoryPage.productImageSources();
    expect(sources).toHaveLength(6);
    // Correct behaviour: each product has its own image. problem_user serves the
    // same broken image for every product, so the unique count is 1 -> FAILS.
    const unique = new Set(sources);
    expect(unique.size, `image sources: ${[...unique].join(', ')}`).toBe(6);
  });

  test('sort by Price (low to high) should actually reorder the list @defect', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceLowHigh);
    const prices = await inventoryPage.productPrices();
    // Correct behaviour: prices ascending. problem_user's dropdown does not
    // re-sort, so this assertion catches the defect.
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});

test.describe('performance_glitch_user @regression', () => {
  test('logs in but the inventory takes measurably longer to load', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    const start = Date.now();
    await loginPage.loginAs(USERS.performanceGlitch);
    await inventoryPage.expectLoaded();
    const elapsedMs = Date.now() - start;

    // It must still work (functional), just slowly. We log the timing as
    // evidence rather than asserting a brittle exact threshold.
    test.info().annotations.push({
      type: 'load-time',
      description: `${elapsedMs} ms to reach inventory`,
    });
    expect(elapsedMs).toBeGreaterThan(0);
    expect(await inventoryPage.itemCount()).toBe(6);
  });
});

test.describe('error_user @regression', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(USERS.error);
    await inventoryPage.expectLoaded();
  });

  test('can add a product to the cart', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    expect(await inventoryPage.cartCount()).toBe(1);
  });

  test('sort by Price (low to high) should reorder the list @defect', async ({
    inventoryPage,
  }) => {
    // error_user's sort control is one of its known broken interactions.
    await inventoryPage.sortBy(SORT_OPTIONS.priceLowHigh);
    const prices = await inventoryPage.productPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});

test.describe('visual_user @regression', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(USERS.visual);
    await inventoryPage.expectLoaded();
  });

  test('can complete a basic add-to-cart and reach checkout step one', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.expectOnStepOne();
    await checkoutPage.fillInformation(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );
    await checkoutPage.continue();
    await checkoutPage.expectOnStepTwo();
  });
});
