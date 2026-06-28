import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ORDER_COMPLETE_HEADER } from '../fixtures/testData';

/**
 * Covers the three-step SauceDemo checkout funnel:
 *   step one  -> shipping information form  (checkout-step-one.html)
 *   step two  -> order overview / totals    (checkout-step-two.html)
 *   complete  -> confirmation               (checkout-complete.html)
 *
 * One class is used because the steps form a single linear flow and share
 * navigation; the locators are grouped by step for readability.
 */
export class CheckoutPage extends BasePage {
  // Step one — form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Step two — overview
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly summaryTotalLabel: Locator;
  readonly summarySubtotalLabel: Locator;
  readonly overviewItemNames: Locator;

  // Complete
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.summarySubtotalLabel = page.locator('.summary_subtotal_label');
    this.summaryTotalLabel = page.locator('.summary_total_label');
    this.overviewItemNames = page.locator('.inventory_item_name');

    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async expectOnStepOne(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async getErrorText(): Promise<string> {
    return (await this.errorMessage.innerText()).trim();
  }

  async expectOnStepTwo(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  /** Subtotal (item total before tax) parsed as a number. */
  async subtotal(): Promise<number> {
    const text = await this.summarySubtotalLabel.innerText(); // "Item total: $29.99"
    return Number(text.split('$')[1]);
  }

  async total(): Promise<number> {
    const text = await this.summaryTotalLabel.innerText(); // "Total: $32.39"
    return Number(text.split('$')[1]);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText(ORDER_COMPLETE_HEADER);
  }
}
