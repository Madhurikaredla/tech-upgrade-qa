import { Page, Locator, expect } from '@playwright/test';
import { SauceUser } from '../fixtures/users';

/**
 * The login page at https://www.saucedemo.com/ .
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Convenience overload using a SauceUser fixture. */
  async loginAs(user: SauceUser): Promise<void> {
    await this.login(user.username, user.password);
  }

  async getErrorText(): Promise<string> {
    return (await this.errorMessage.innerText()).trim();
  }
}
