import { test, expect } from '../fixtures/pages';
import { USERS } from '../fixtures/users';
import { PRODUCTS } from '../fixtures/testData';

/**
 * Shopping cart: items carry over from inventory, can be removed, and
 * "continue shopping" returns to the listing.
 */
test.describe('Cart @regression', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectLoaded();
  });

  test('items added on inventory appear in the cart @smoke', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.fleeceJacket);
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    expect(await cartPage.itemCount()).toBe(2);
    expect(await cartPage.itemNames()).toEqual(
      expect.arrayContaining([PRODUCTS.backpack, PRODUCTS.fleeceJacket]),
    );
  });

  test('removing an item from the cart updates the badge', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.fleeceJacket);
    await inventoryPage.openCart();

    await cartPage.removeItem(PRODUCTS.backpack);
    expect(await cartPage.itemCount()).toBe(1);
    expect(await cartPage.cartCount()).toBe(1);
  });

  test('continue shopping returns to the inventory page', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.continueShopping();
    await inventoryPage.expectLoaded();
    // The badge persists after navigating back.
    expect(await inventoryPage.cartCount()).toBe(1);
  });
});
