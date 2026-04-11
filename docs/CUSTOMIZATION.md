# Customization Guide

This guide covers how to customize the ecommerce starter for your store.

## Quick Start Checklist

1. Update `src/lib/config.ts` with your store name, contact info, and social links
2. Replace placeholder images in `public/images/products/`
3. Update product data in `src/data/products.json`
4. Edit theme colors in `src/app/globals.css`
5. Connect your payment provider (see below)

## Store Configuration

All store-wide settings live in one file: `src/lib/config.ts`

```typescript
export const siteConfig = {
  name: "Your Store Name",
  tagline: "Your tagline here.",
  contact: { email: "you@yourstore.com", ... },
  social: { instagram: "https://instagram.com/yourstore", ... },
  freeShippingThreshold: 5000, // $50.00 in cents
  taxRate: 0.07,
  currency: "USD",
  locale: "en-US",
}
```

This config is referenced by the header, footer, metadata, cart summary, trust signals, and more. Change it once, it updates everywhere.

## Theme & Colors

Edit CSS variables in `src/app/globals.css` under `:root`:

```css
/* Base colors (shadcn/ui) */
--primary: oklch(0.205 0 0);        /* buttons, active states */
--secondary: oklch(0.97 0 0);       /* secondary buttons */
--destructive: oklch(0.577 0.245 27.325); /* errors, delete */

/* Store accent colors */
--rating: oklch(0.795 0.184 86.047);    /* star rating color */
--wishlist: oklch(0.637 0.237 25.331);  /* wishlist heart color */
--success: oklch(0.627 0.194 149.214);  /* checkmarks, success */

/* Order status badge colors */
--status-pending-bg: ...
--status-processing-bg: ...
```

Use them in Tailwind: `text-rating`, `fill-wishlist`, `bg-status-delivered-bg`, etc.

## Font

The store uses Inter via `next/font`. To change it, edit `src/app/layout.tsx`:

```typescript
import { Poppins } from "next/font/google"
const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
```

And update `--font-sans` in `globals.css`.

## Navigation

All menus (desktop nav, mobile menu) are configured in `src/lib/navigation.ts`:

```typescript
export const shopLinks = [
  { name: "Electronics", href: "/electronics" },
  // add/remove categories here
]

export const mobileMenuSections = [
  { label: "Shop", items: shopLinks },
  { label: "Account", items: accountLinks },
  { label: "Info", items: infoLinks },
]
```

## Products & Categories

Product data lives in `src/data/products.json`. To add a product:

1. Add the product object to the `products` array
2. Reference existing `categoryIds` or create new categories
3. Assign a `brandId` from the `brands` array
4. Set image URLs (or use `/images/products/placeholder.svg`)

To swap to a CMS or database, implement the `ProductRepository` and `CategoryRepository` interfaces from `src/types/index.ts` and update `src/lib/repositories/index.ts`.

## Connecting a Payment Provider

The checkout uses a pluggable `CheckoutProvider` interface:

```typescript
interface CheckoutProvider {
  createSession(cart, customer?): Promise<CheckoutSession>
  getSession(sessionId): Promise<CheckoutSession>
  handleWebhook(payload, signature): Promise<WebhookResult>
}
```

### Steps:

1. Create `src/lib/checkout/throttle-provider.ts` (or stripe, etc.)
2. Implement the `CheckoutProvider` interface
3. Export it from `src/lib/checkout/index.ts`:
   ```typescript
   export { throttleProvider as checkoutProvider } from "./throttle-provider"
   ```
4. Add API routes for webhooks in `src/app/api/`
5. Add your API keys to `.env.local` and uncomment validation in `src/lib/env.ts`

## Internationalization (i18n)

The starter uses `next-intl` with translation files in `messages/`:

- `messages/en.json` — English (default)
- `messages/es.json` — Spanish (example)

### Using translations in components:

```tsx
// Client components
import { useTranslations } from "next-intl"

function MyComponent() {
  const t = useTranslations("cart")
  return <h1>{t("title")}</h1>
}

// Server components
import { getTranslations } from "next-intl/server"

async function MyPage() {
  const t = await getTranslations("shop")
  return <h1>{t("allProducts")}</h1>
}
```

### Adding a new language:

1. Copy `messages/en.json` to `messages/fr.json`
2. Translate the values
3. Add `"fr"` to `locales` in `src/i18n/config.ts`
4. To enable locale routing (`/en/`, `/fr/`), add `next-intl` middleware

## Analytics

Edit `src/lib/analytics.ts` to connect your analytics provider:

```typescript
export function trackEvent(name, properties) {
  // Replace with your provider:
  window.gtag?.("event", name, properties)
  // or: window.analytics?.track(name, properties)
  // or: posthog?.capture(name, properties)
}
```

Pre-defined ecommerce events: `addToCart`, `purchase`, `search`, `viewProduct`, `signUp`, `login`.

## Security Headers

Security headers are configured in `src/middleware.ts`. The Content Security Policy (CSP) uses `report-only` in development and enforces in production. Update the CSP directives when adding external scripts (analytics, payment SDKs, etc.).

## Environment Variables

Required and optional env vars are validated in `src/lib/env.ts` using Zod. Uncomment validation rules as you integrate real services. See `.env.example` for the full list.
