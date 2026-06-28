import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CATEGORIES } from '../fixtures/testData';

/**
 * The landing page (shop-home): four category call-outs each with a
 * "SHOP NOW" link.
 */
export class HomePage extends BasePage {
  readonly shopNowLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.shopNowLinks = page.getByRole('link', { name: 'SHOP NOW' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Home - SHOP/);
    // One "SHOP NOW" per category.
    await expect(this.shopNowLinks.first()).toBeVisible();
  }

  async shopNowCount(): Promise<number> {
    return this.shopNowLinks.count();
  }

  /** All four category tabs are present in the header. */
  async expectAllCategoryTabs(): Promise<void> {
    for (const c of Object.values(CATEGORIES)) {
      await expect(
        this.page.getByRole('link', { name: c.label, exact: true }).first(),
      ).toBeVisible();
    }
  }
}
