import { Page, Locator, expect } from '@playwright/test';
import { Category } from '../fixtures/testData';

/**
 * Shared shell behaviour: the SHOP logo, the category tabs and the cart link
 * in the <shop-app> header.
 *
 * The Shop keeps inactive views in the DOM (404, network-warning, etc.), so all
 * page-specific locators in the concrete pages are scoped to their host element
 * (shop-list / shop-detail / shop-cart / shop-checkout) to avoid matching hidden
 * views. Playwright's CSS/text/role engines pierce open shadow roots, so these
 * descendant selectors work across component boundaries.
 */
export class BasePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // The Shop renders a header nav AND an off-screen drawer; both contain the
    // same links. ":visible" isolates the on-screen header copy (drawer links
    // are display:none while the drawer is closed).
    // The off-screen drawer copies of these links carry tabindex="-1"; the
    // header copies do not. Excluding tabindex="-1" targets the clickable
    // header link (the drawer copy is translated off-viewport and not clickable).
    this.homeLink = page.locator('a[href="/"]:not([tabindex="-1"])').first();
    this.cartLink = page.locator('a[href="/cart"]:not([tabindex="-1"])').first();
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'networkidle' });
  }

  /** Click a category tab in the header (e.g. "Men's Outerwear"). */
  async openCategory(category: Category): Promise<void> {
    await this.page.locator(`a[href="/list/${category.slug}"]:visible`).first().click();
    await expect(this.page).toHaveURL(new RegExp(`/list/${category.slug}`));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async goHome(): Promise<void> {
    await this.homeLink.click();
  }
}
