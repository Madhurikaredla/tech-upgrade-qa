import { test, expect } from '../fixtures/pages';
import { SAMPLE_PRODUCT, CHECKOUT_INFO } from '../fixtures/testData';

/**
 * End-to-end checkout funnel.
 */
test.describe('Checkout', () => {
  test('completes a full purchase end-to-end @sanity @regression', async ({
    detailPage,
    cartPage,
    checkoutPage,
  }) => {
    // Add a product and go to the cart.
    await detailPage.goto(SAMPLE_PRODUCT.detailPath);
    await detailPage.expectLoaded();
    await detailPage.addToCart();
    await detailPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemCount(1);
    await cartPage.proceedToCheckout();

    // Fill the form and place the order.
    await checkoutPage.expectLoaded();
    await checkoutPage.fillDetails(CHECKOUT_INFO);
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderPlaced();
  });

  test('checkout form is reachable from a populated cart @regression', async ({
    detailPage,
    cartPage,
    checkoutPage,
  }) => {
    await detailPage.goto(SAMPLE_PRODUCT.detailPath);
    await detailPage.expectLoaded();
    await detailPage.addToCart();
    await detailPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectLoaded();
    await checkoutPage.expectFormRendered();
  });
});
