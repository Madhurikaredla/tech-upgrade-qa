import { test, expect } from '../fixtures/pages';
import { SAMPLE_PRODUCT } from '../fixtures/testData';

/**
 * Shopping cart behaviour.
 */
test.describe('Cart @regression', () => {
  test('empty cart shows the empty-cart message', async ({ cartPage }) => {
    await cartPage.goto('/cart');
    await cartPage.expectLoaded();
    expect(await cartPage.itemCount()).toBe(0);
    await expect(cartPage.emptyMessage).toBeVisible();
  });

  test('added product appears in the cart with a checkout option', async ({
    detailPage,
    cartPage,
  }) => {
    await detailPage.goto(SAMPLE_PRODUCT.detailPath);
    await detailPage.expectLoaded();
    await detailPage.addToCart();
    await detailPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemCount(1);
    await cartPage.expectHeadingVisible();
    await expect(cartPage.checkoutLink).toBeVisible();
    // The cart total must equal the product's price for a single unit.
    expect(await cartPage.totalAmount()).toBeCloseTo(SAMPLE_PRODUCT.price, 2);
  });

  test('cart quantity can be changed and the total recalculates', async ({
    detailPage,
    cartPage,
  }) => {
    await detailPage.goto(SAMPLE_PRODUCT.detailPath);
    await detailPage.expectLoaded();
    await detailPage.addToCart();
    await detailPage.openCart();
    await cartPage.expectLoaded();

    await cartPage.expectItemCount(1);
    expect(await cartPage.firstItemQuantity()).toBe('1');
    expect(await cartPage.totalAmount()).toBeCloseTo(SAMPLE_PRODUCT.price, 2);

    // Bump the first line item to quantity 2.
    await cartPage.setFirstItemQuantity('2');
    expect(await cartPage.firstItemQuantity()).toBe('2');
    await cartPage.expectItemCount(1);
    // The total must double.
    expect(await cartPage.totalAmount()).toBeCloseTo(SAMPLE_PRODUCT.price * 2, 2);
    await expect(cartPage.checkoutLink).toBeVisible();
  });
});
