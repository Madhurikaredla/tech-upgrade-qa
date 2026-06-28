import { Page, Locator } from '@playwright/test';

/**
 * Common behaviour shared by every page object: the burger menu, the cart
 * badge/link and logout. Concrete pages extend this class.
 */
export class BasePage {
  readonly page: Page;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  /** Number shown on the cart badge, or 0 when the badge is absent. */
  async cartCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number((await this.cartBadge.innerText()).trim());
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.burgerMenuButton.click();
    await this.resetAppStateLink.click();
    // Close the menu again so subsequent clicks are not intercepted.
    await this.page.locator('#react-burger-cross-btn').click();
  }
}
