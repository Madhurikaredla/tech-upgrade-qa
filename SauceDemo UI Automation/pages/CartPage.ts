import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * The shopping cart page (cart.html).
 */
export class CartPage extends BasePage {
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async itemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async itemNames(): Promise<string[]> {
    return this.cartItemNames.allInnerTexts();
  }

  async removeItem(productName: string): Promise<void> {
    await this.cartItems
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
