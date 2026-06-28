import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Category } from '../fixtures/testData';

/**
 * A category listing page (shop-list) showing product tiles.
 */
export class ListPage extends BasePage {
  readonly heading: Locator;
  readonly productTiles: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('shop-list h1:visible');
    // Each product tile is an anchor to its detail route.
    this.productTiles = page.locator('shop-list a[href^="/detail/"]');
  }

  async expectLoaded(category: Category): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/list/${category.slug}`));
    await expect(this.heading).toHaveText(category.label);
    // Tiles are fetched asynchronously; wait for the first one to render.
    await expect(this.productTiles.first()).toBeVisible();
  }

  async tileCount(): Promise<number> {
    return this.productTiles.count();
  }

  /** Open the product at a given index (0-based). */
  async openProduct(index = 0): Promise<void> {
    await this.productTiles.nth(index).click();
    await expect(this.page).toHaveURL(/\/detail\//);
  }

  /** Names of all visible products (from each tile's title). */
  async productNames(): Promise<string[]> {
    return this.page.locator('shop-list .item-title').allInnerTexts();
  }
}
