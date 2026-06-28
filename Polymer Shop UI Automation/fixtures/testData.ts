/**
 * Test data for the Polymer Shop flows.
 */

/** The four storefront categories and their URL slugs. */
export const CATEGORIES = {
  mensOuterwear: { label: "Men's Outerwear", slug: 'mens_outerwear' },
  ladiesOuterwear: { label: 'Ladies Outerwear', slug: 'ladies_outerwear' },
  mensTshirts: { label: "Men's T-Shirts", slug: 'mens_tshirts' },
  ladiesTshirts: { label: 'Ladies T-Shirts', slug: 'ladies_tshirts' },
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

/** A known product used for deterministic detail/cart/checkout tests. */
export const SAMPLE_PRODUCT = {
  category: CATEGORIES.mensOuterwear,
  name: "Men's Tech Shell Full-Zip",
  detailPath: '/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip',
  price: 50.2,
};

/** Each category page is expected to show this many product tiles. */
export const EXPECTED_TILES_PER_CATEGORY = 16;

/** Valid checkout details (the demo accepts any well-formed input). */
export const CHECKOUT_INFO = {
  accountEmail: 'madhuri.karedla@example.com',
  accountPhone: '5551234567',
  shipAddress: '123 Jubilee Hills',
  shipCity: 'Hyderabad',
  shipState: 'TS',
  shipZip: '500032',
  shipCountry: 'US',
  ccName: 'Madhuri Karedla',
  ccNumber: '4111111111111111',
  ccExpMonth: '01',
  ccExpYear: '2026',
  ccCVV: '123',
};
