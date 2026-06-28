import { test, expect } from '../fixtures/pages';
import {
  USERS,
  PASSWORD,
  LOCKED_OUT_MESSAGE,
  USERNAME_REQUIRED_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  NO_MATCH_MESSAGE,
} from '../fixtures/users';

/**
 * Authentication test cases — one per accepted user plus the negative paths.
 * Tagged @smoke (the critical login path) and @regression.
 */
test.describe('Login @regression', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard_user can log in and reach the inventory @smoke', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectLoaded();
    expect(await inventoryPage.itemCount()).toBe(6);
  });

  test('locked_out_user is rejected with the locked-out message @smoke', async ({
    loginPage,
  }) => {
    await loginPage.loginAs(USERS.lockedOut);
    await expect(loginPage.errorMessage).toBeVisible();
    expect(await loginPage.getErrorText()).toBe(LOCKED_OUT_MESSAGE);
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
  });

  // problem / performance_glitch / error / visual all share the same login
  // behaviour (they only differ *after* login), so verify they can all enter.
  for (const key of ['problem', 'performanceGlitch', 'error', 'visual'] as const) {
    test(`${USERS[key].username} can log in`, async ({ loginPage, inventoryPage }) => {
      await loginPage.loginAs(USERS[key]);
      await inventoryPage.expectLoaded();
    });
  }

  test('empty username shows "Username is required"', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);
    expect(await loginPage.getErrorText()).toBe(USERNAME_REQUIRED_MESSAGE);
  });

  test('empty password shows "Password is required"', async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, '');
    expect(await loginPage.getErrorText()).toBe(PASSWORD_REQUIRED_MESSAGE);
  });

  test('unknown credentials show the no-match message', async ({ loginPage }) => {
    await loginPage.login('no_such_user', 'wrong_password');
    expect(await loginPage.getErrorText()).toBe(NO_MATCH_MESSAGE);
  });

  test('standard_user can log out back to the login screen', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectLoaded();
    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
  });
});
