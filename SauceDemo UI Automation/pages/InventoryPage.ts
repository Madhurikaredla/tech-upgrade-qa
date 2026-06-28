import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * The product listing ("inventory") page shown after a successful login.
 */
export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /** Asserts that we have actually landed on the inventory page. */
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  async itemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  /** The "Add to cart" / "Remove" button scoped to a single product card. */
  private itemButton(productName: string): Locator {
    return this.inventoryItems
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) })
      .getByRole('button');
  }

  async addToCart(productName: string): Promise<void> {
    const button = this.itemButton(productName);
    await expect(button).toHaveText('Add to cart');
    await button.click();
    await expect(button).toHaveText('Remove');
  }

  async removeFromCart(productName: string): Promise<void> {
    const button = this.itemButton(productName);
    await expect(button).toHaveText('Remove');
    await button.click();
    await expect(button).toHaveText('Add to cart');
  }

  async openProduct(productName: string): Promise<void> {
    await this.itemNames.filter({ hasText: productName }).click();
  }

  async sortBy(optionValue: string): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async productNames(): Promise<string[]> {
    return this.itemNames.allInnerTexts();
  }

  /** Prices as numbers, in display order (strips the leading "$"). */
  async productPrices(): Promise<number[]> {
    const raw = await this.itemPrices.allInnerTexts();
    return raw.map((p) => Number(p.replace('$', '')));
  }

  /** The src of every product image (used to detect the problem_user defect). */
  async productImageSources(): Promise<string[]> {
    return this.page.locator('.inventory_item_img img').evaluateAll((imgs) =>
      imgs.map((img) => (img as HTMLImageElement).getAttribute('src') ?? ''),
    );
  }
}
