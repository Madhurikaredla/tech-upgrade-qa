import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ListPage } from '../pages/ListPage';
import { DetailPage } from '../pages/DetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type Pages = {
  homePage: HomePage;
  listPage: ListPage;
  detailPage: DetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  listPage: async ({ page }, use) => use(new ListPage(page)),
  detailPage: async ({ page }, use) => use(new DetailPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

export { expect } from '@playwright/test';
