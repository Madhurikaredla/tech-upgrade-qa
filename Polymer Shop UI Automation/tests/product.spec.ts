import { test, expect } from '../fixtures/pages';
import { CATEGORIES, SAMPLE_PRODUCT } from '../fixtures/testData';

/**
 * Product detail page and the add-to-cart action.
 */
test.describe('Product detail', () => {
  test('product detail shows title, price and ADD TO CART @sanity @regression', async ({
    detailPage,
  }) => {
    await detailPage.goto(SAMPLE_PRODUCT.detailPath);
    await detailPage.expectLoaded();
    expect(await detailPage.title()).toBe(SAMPLE_PRODUCT.name);
    expect(await detailPage.priceText()).toMatch(/^\$\d+\.\d{2}$/);
  });

  test('opening a tile from a category lands on its detail page @regression', async ({
    homePage,
    listPage,
    detailPage,
  }) => {
    await homePage.goto('/');
    await homePage.openCategory(CATEGORIES.ladiesTshirts);
    await listPage.openProduct(0);
    await detailPage.expectLoaded();
    expect(await detailPage.title()).not.toEqual('');
    // Whatever product we opened, its detail page must show a valid price.
    expect(await detailPage.priceText()).toMatch(/^\$\d+\.\d{2}$/);
  });

  test('adding a product puts it in the cart @sanity @regression', async ({
    detailPage,
    cartPage,
  }) => {
    await detailPage.goto(SAMPLE_PRODUCT.detailPath);
    await detailPage.expectLoaded();
    await detailPage.addToCart();

    await detailPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(1);
  });
});
