import { test, expect } from '../fixtures/pages';
import { CATEGORIES, EXPECTED_TILES_PER_CATEGORY } from '../fixtures/testData';

/**
 * Home page and category navigation.
 * @sanity  — the storefront is alive and reachable.
 */
test.describe('Navigation', () => {
  test('home page loads with all category call-outs @sanity @regression', async ({
    homePage,
  }) => {
    await homePage.goto('/');
    await homePage.expectLoaded();
    await homePage.expectAllCategoryTabs();
    expect(await homePage.shopNowCount()).toBe(4);
  });

  test('can open each category from the header @regression', async ({ homePage, listPage }) => {
    await homePage.goto('/');
    // The header nav is present on every view, so each category tab can be
    // clicked in turn without returning home between categories.
    for (const category of Object.values(CATEGORIES)) {
      await homePage.openCategory(category);
      await listPage.expectLoaded(category);
      // Categories carry different numbers of products; each must list at least one.
      expect(await listPage.tileCount()).toBeGreaterThan(0);
    }
  });

  test("Men's Outerwear category shows its product tiles @sanity @regression", async ({
    homePage,
    listPage,
  }) => {
    await homePage.goto('/');
    await homePage.openCategory(CATEGORIES.mensOuterwear);
    await listPage.expectLoaded(CATEGORIES.mensOuterwear);
    expect(await listPage.tileCount()).toBe(EXPECTED_TILES_PER_CATEGORY);
  });
});
