/**
 * SauceDemo accepted users and the documented behaviour of each.
 * All accounts share the same password.
 *
 * Source: the login page of https://www.saucedemo.com/ lists these accounts.
 */

export const PASSWORD = 'secret_sauce';

export type UserKey =
  | 'standard'
  | 'lockedOut'
  | 'problem'
  | 'performanceGlitch'
  | 'error'
  | 'visual';

export interface SauceUser {
  /** value typed into the username field */
  username: string;
  password: string;
  /** can this account reach the inventory page at all? */
  canLogin: boolean;
  /** human-readable note on what is special about this account */
  behaviour: string;
}

export const USERS: Record<UserKey, SauceUser> = {
  standard: {
    username: 'standard_user',
    password: PASSWORD,
    canLogin: true,
    behaviour: 'Baseline happy-path account; everything works.',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: PASSWORD,
    canLogin: false,
    behaviour: 'Login is rejected with a "locked out" error message.',
  },
  problem: {
    username: 'problem_user',
    password: PASSWORD,
    canLogin: true,
    behaviour:
      'Logs in, but product images are all identical/broken and several controls (e.g. checkout form last name) misbehave.',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: PASSWORD,
    canLogin: true,
    behaviour: 'Logs in but pages load noticeably slowly.',
  },
  error: {
    username: 'error_user',
    password: PASSWORD,
    canLogin: true,
    behaviour: 'Logs in but hits errors part-way through the checkout flow.',
  },
  visual: {
    username: 'visual_user',
    password: PASSWORD,
    canLogin: true,
    behaviour: 'Logs in but the UI has intentional visual glitches.',
  },
};

/** Error text SauceDemo shows when a locked-out account attempts to log in. */
export const LOCKED_OUT_MESSAGE =
  'Epic sadface: Sorry, this user has been locked out.';

/** Error text shown when the username field is empty. */
export const USERNAME_REQUIRED_MESSAGE = 'Epic sadface: Username is required';

/** Error text shown when the password field is empty. */
export const PASSWORD_REQUIRED_MESSAGE = 'Epic sadface: Password is required';

/** Error text shown when credentials do not match any account. */
export const NO_MATCH_MESSAGE =
  'Epic sadface: Username and password do not match any user in this service';
