/**
 * Central business information for Mama's Kitchen.
 * Anything set to `null` has NOT been provided/verified yet and is shown on the
 * site as a clearly labeled placeholder. Fill it in here – nothing else to edit.
 */
export const SITE = {
  name: "Mama's Kitchen",
  tagline: 'Where Every Meal Feels Like Home.',
  description:
    "Mama's Kitchen is an Ethiopian and international restaurant in Addis Ababa. Explore our menu, find a branch in Megenagna, Bole Medhanialem and beyond, and share a meal together.",

  // LOGO ---------------------------------------------------------------
  // 1. Put the real logo file in /public/images (e.g. logo.png or logo.svg)
  // 2. Set src below, e.g. '/images/logo.png', and its real pixel size.
  logo: {
    src: '/images/logo.png',
    width: 703,
    height: 429,
    alt: "Mama's Kitchen logo",
  },

  // Provided facts -----------------------------------------------------
  priceRange: 'ETB 1,000–4,000 per person',
  category: 'Ethiopian and international restaurant',
  rating: { value: 3.6, count: 206, source: 'Google', branch: 'Megenagna' },
  features: ['Group-friendly dining', 'All-you-can-eat dining', 'Happy-hour food', 'Fireplace'],

  // Not provided yet – shown as placeholders ---------------------------
  contact: {
    phone: null, // e.g. '+251 ...'
    email: null, // e.g. 'hello@...'
    hours: null, // e.g. 'Daily 8:00 – 22:00'
  },
  social: [
    { label: 'Instagram', url: null },
    { label: 'Facebook', url: null },
    { label: 'TikTok', url: null },
  ],
  // Direct "write a review" link from Google Business Profile, when available.
  googleReviewUrl: null,

  // QR code ------------------------------------------------------------
  // Only turn this on once the logo is set. It is drawn small (≈18% of the
  // code width) and the code uses the highest error-correction level.
  qrLogoInCenter: false,
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Menu', href: '/menu' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Locations', href: '/#locations' },
  { label: 'Contact', href: '/#contact' },
];
