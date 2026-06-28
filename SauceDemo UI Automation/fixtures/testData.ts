/**
 * Static test data for the SauceDemo flows: products, checkout details and
 * the sort options offered by the inventory page.
 */

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export type ProductName = (typeof PRODUCTS)[keyof typeof PRODUCTS];

/** Valid shipping information for the checkout form. */
export const CHECKOUT_INFO = {
  firstName: 'Madhuri',
  lastName: 'Karedla',
  postalCode: '500032',
};

/** Used by the negative checkout test cases. */
export const CHECKOUT_MISSING = {
  firstNameRequired: 'Error: First Name is required',
  lastNameRequired: 'Error: Last Name is required',
  postalCodeRequired: 'Error: Postal Code is required',
};

/** The four sort options, keyed by their <option> value attribute. */
export const SORT_OPTIONS = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
} as const;

/** Message shown on the order-complete page. */
export const ORDER_COMPLETE_HEADER = 'Thank you for your order!';
