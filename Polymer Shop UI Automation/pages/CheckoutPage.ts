import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutDetails {
  accountEmail: string;
  accountPhone: string;
  shipAddress: string;
  shipCity: string;
  shipState: string;
  shipZip: string;
  shipCountry: string;
  ccName: string;
  ccNumber: string;
  ccExpMonth: string;
  ccExpYear: string;
  ccCVV: string;
}

/**
 * The checkout page (shop-checkout). Fields are plain <input name="…"> and
 * <select name="…"> elements inside the component's shadow DOM; Playwright's CSS
 * engine pierces the shadow root, so name-based selectors work directly.
 *
 * A successful order redirects to /checkout/success.
 */
export class CheckoutPage extends BasePage {
  readonly placeOrderButton: Locator;
  readonly confirmationHeading: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.placeOrderButton = page.locator('shop-checkout input[type="button"][value="Place Order"]');
    this.confirmationHeading = page.locator('shop-checkout h1:visible').filter({ hasText: /thank you/i });
    this.confirmationMessage = page
      .locator('shop-checkout')
      .getByText(/demo checkout process complete/i);
  }

  private input(name: string): Locator {
    return this.page.locator(`shop-checkout input[name="${name}"]`);
  }

  private select(name: string): Locator {
    return this.page.locator(`shop-checkout select[name="${name}"]`);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.input('accountEmail')).toBeVisible();
  }

  /** Assert the key form controls and the Place Order button all rendered. */
  async expectFormRendered(): Promise<void> {
    await expect(this.input('accountEmail')).toBeVisible();
    await expect(this.input('shipAddress')).toBeVisible();
    await expect(this.input('ccNumber')).toBeVisible();
    await expect(this.placeOrderButton).toBeVisible();
  }

  async fillDetails(d: CheckoutDetails): Promise<void> {
    await this.input('accountEmail').fill(d.accountEmail);
    await this.input('accountPhone').fill(d.accountPhone);
    await this.input('shipAddress').fill(d.shipAddress);
    await this.input('shipCity').fill(d.shipCity);
    await this.input('shipState').fill(d.shipState);
    await this.input('shipZip').fill(d.shipZip);
    await this.select('shipCountry').selectOption(d.shipCountry);
    // Billing defaults to the shipping address, so billing fields are skipped.
    await this.input('ccName').fill(d.ccName);
    await this.input('ccNumber').fill(d.ccNumber);
    await this.select('ccExpMonth').selectOption(d.ccExpMonth);
    await this.select('ccExpYear').selectOption(d.ccExpYear);
    await this.input('ccCVV').fill(d.ccCVV);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  async expectOrderPlaced(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout\/success/, { timeout: 15_000 });
    await expect(this.confirmationHeading).toHaveText('Thank you');
    await expect(this.confirmationMessage).toBeVisible();
  }
}
