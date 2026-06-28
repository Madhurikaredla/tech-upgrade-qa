import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * The shopping cart page (shop-cart).
 */
export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly items: Locator;
  readonly checkoutLink: Locator;
  readonly emptyMessage: Locator;
  readonly quantitySelect: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    super(page);
    // When the cart is empty the "Your Cart" heading is display:none and an
    // empty-state message is shown instead, so expectLoaded() only checks the
    // URL; tests assert the heading explicitly when the cart has items.
    this.heading = page.locator('shop-cart h1:visible');
    this.items = page.locator('shop-cart shop-cart-item');
    this.checkoutLink = page.locator('shop-cart a').filter({ hasText: /checkout/i });
    this.emptyMessage = page.locator('shop-cart').getByText(/is empty/i);
    this.quantitySelect = page.locator('shop-cart select');
    this.totalLabel = page.locator('shop-cart').getByText(/Total:/i);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart/);
  }

  /** Assert the populated-cart heading is shown. */
  async expectHeadingVisible(): Promise<void> {
    await expect(this.heading).toHaveText('Your Cart');
  }

  async itemCount(): Promise<number> {
    return this.items.count();
  }

  /** Auto-retrying assertion on the number of line items (avoids render races). */
  async expectItemCount(n: number): Promise<void> {
    await expect(this.items).toHaveCount(n);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutLink.click();
    await expect(this.page).toHaveURL(/\/checkout/);
  }

  /** Change the quantity of the first line item by <option> value. */
  async setFirstItemQuantity(value: string): Promise<void> {
    await this.quantitySelect.first().selectOption(value);
    await this.page.waitForTimeout(300);
  }

  /** The selected quantity of the first line item. */
  async firstItemQuantity(): Promise<string> {
    return this.quantitySelect.first().inputValue();
  }

  /** The cart total as a number, parsed from "Total: $NN.NN". */
  async totalAmount(): Promise<number> {
    const text = await this.totalLabel.innerText(); // "Total: $50.20 CHECKOUT"
    const match = text.match(/\$(\d+(?:\.\d{2})?)/);
    if (!match) throw new Error(`Could not parse cart total from: "${text}"`);
    return Number(match[1]);
  }
}
