import { test, expect } from '../fixtures/pages';
import { USERS } from '../fixtures/users';
import { PRODUCTS, SORT_OPTIONS } from '../fixtures/testData';

/**
 * Inventory page: sorting, add/remove, badge counting and product detail.
 * Logs in as standard_user before each test.
 */
test.describe('Inventory @regression', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectLoaded();
  });

  test('shows all six products @smoke', async ({ inventoryPage }) => {
    expect(await inventoryPage.itemCount()).toBe(6);
  });

  test('sort by Name (A to Z) orders names ascending', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.nameAZ);
    const names = await inventoryPage.productNames();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('sort by Name (Z to A) orders names descending', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.nameZA);
    const names = await inventoryPage.productNames();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('sort by Price (low to high) orders prices ascending', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceLowHigh);
    const prices = await inventoryPage.productPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by Price (high to low) orders prices descending', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceHighLow);
    const prices = await inventoryPage.productPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('adding a product increments the cart badge @smoke', async ({ inventoryPage }) => {
    expect(await inventoryPage.cartCount()).toBe(0);
    await inventoryPage.addToCart(PRODUCTS.backpack);
    expect(await inventoryPage.cartCount()).toBe(1);
  });

  test('removing a product decrements the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.bikeLight);
    expect(await inventoryPage.cartCount()).toBe(2);
    await inventoryPage.removeFromCart(PRODUCTS.backpack);
    expect(await inventoryPage.cartCount()).toBe(1);
  });

  test('opening a product shows its detail page', async ({ inventoryPage, page }) => {
    await inventoryPage.openProduct(PRODUCTS.backpack);
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.locator('.inventory_details_name')).toHaveText(PRODUCTS.backpack);
  });
});
