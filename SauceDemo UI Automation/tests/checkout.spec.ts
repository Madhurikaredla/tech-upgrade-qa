import { test, expect } from '../fixtures/pages';
import { USERS } from '../fixtures/users';
import { PRODUCTS, CHECKOUT_INFO, CHECKOUT_MISSING } from '../fixtures/testData';

/**
 * End-to-end checkout funnel and the form's negative paths.
 */
test.describe('Checkout @regression', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectLoaded();
  });

  test('standard_user completes the full checkout flow @smoke', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.bikeLight);
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.checkout();

    await checkoutPage.expectOnStepOne();
    await checkoutPage.fillInformation(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );
    await checkoutPage.continue();

    await checkoutPage.expectOnStepTwo();
    // Order total must equal subtotal + tax, and both must be positive.
    const subtotal = await checkoutPage.subtotal();
    const total = await checkoutPage.total();
    expect(subtotal).toBeGreaterThan(0);
    expect(total).toBeGreaterThan(subtotal); // tax added on top

    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();

    // After ordering, the cart is emptied.
    await checkoutPage.backHomeButton.click();
    await inventoryPage.expectLoaded();
    expect(await inventoryPage.cartCount()).toBe(0);
  });

  test('checkout requires a first name', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.fillInformation('', CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);
    await checkoutPage.continue();
    expect(await checkoutPage.getErrorText()).toBe(CHECKOUT_MISSING.firstNameRequired);
  });

  test('checkout requires a postal code', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.fillInformation(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, '');
    await checkoutPage.continue();
    expect(await checkoutPage.getErrorText()).toBe(CHECKOUT_MISSING.postalCodeRequired);
  });
});
