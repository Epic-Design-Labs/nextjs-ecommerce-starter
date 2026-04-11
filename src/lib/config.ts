// ============================================================================
// Store Configuration — Single source of truth for all store-wide settings.
// Edit this file to customize the store name, contact info, social links, etc.
// ============================================================================

export const siteConfig = {
  // Branding
  name: "Store Name",
  tagline: "Quality products, thoughtfully curated.",
  description:
    "Discover our curated collection of quality products. Free shipping on orders over $75.",

  // Announcement bar (set to "" to hide)
  announcement: "Free shipping on all orders over $75 — Shop now!",

  // URLs
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",

  // Contact
  contact: {
    email: "support@store.com",
    phone: "(555) 123-4567",
    address: {
      street: "123 Main Street",
      suite: "Suite 100",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
    },
  },

  // Social links (set to "" to hide)
  social: {
    twitter: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
    tiktok: "#",
  },

  // Shipping
  freeShippingThreshold: 7500, // in cents ($75.00)
  taxRate: 0.08, // 8%

  // Currency & locale
  currency: "USD",
  locale: "en-US",

  // Legal
  copyrightYear: new Date().getFullYear(),
} as const

export type SiteConfig = typeof siteConfig
