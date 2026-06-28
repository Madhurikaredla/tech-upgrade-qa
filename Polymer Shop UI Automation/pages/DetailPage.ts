import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * A product detail page (shop-detail): title, price, size & quantity selects,
 * and the ADD TO CART button.
 *
 * The ADD TO CART control's accessible name does not resolve via getByRole name
 * matching (it is a styled <button> inside the component), so we locate it by
 * its visible text within shop-detail.
 */
export class DetailPage extends BasePage {
  readonly heading: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly selects: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('shop-detail h1:visible');
    this.price = page.locator('shop-detail .price');
    this.addToCartButton = page
      .locator('shop-detail button')
      .filter({ hasText: /add to cart/i });
    this.selects = page.locator('shop-detail select');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/detail\//);
    await expect(this.heading).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async title(): Promise<string> {
    return (await this.heading.innerText()).trim();
  }

  async priceText(): Promise<string> {
    return (await this.price.innerText()).trim();
  }

  /** Set size and quantity by the <option> value, when needed. */
  async selectSize(value: string): Promise<void> {
    await this.selects.nth(0).selectOption(value);
  }

  async selectQuantity(value: string): Promise<void> {
    await this.selects.nth(1).selectOption(value);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    // The shop shows a snackbar and the cart route becomes reachable; give the
    // app a beat to commit the cart state.
    await this.page.waitForTimeout(500);
  }
}
