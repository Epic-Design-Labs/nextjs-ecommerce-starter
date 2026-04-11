# Next.js Ecommerce Starter

A free, open-source, production-ready ecommerce starter template built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**. Designed to work standalone or connect to any checkout/payment system.

**[Live Demo](https://nextjsecommercestarter.com)** · **[Documentation](docs/CUSTOMIZATION.md)** · **[Report Issue](https://github.com/Epic-Design-Labs/nextjs-ecommerce-starter/issues)**

Built by [Epic Design Labs](https://epicdesignlabs.com)

## Features

- **Product Catalog** — Browse, filter, sort, search across 14 demo products in 5 categories
- **Shopping Cart** — Slide-out drawer, quantity controls, persisted to localStorage
- **Wishlist** — Save products with heart icons, persisted to localStorage
- **Checkout** — Full checkout flow with shipping form and order creation
- **Authentication** — Login, register, forgot password with demo accounts
- **Account** — Order history, saved addresses, profile settings
- **Brands** — Brand pages with product filtering
- **Subcategories** — Nested categories with accordion mobile menu
- **Search** — Cmd+K modal with instant results and popular searches
- **Announcement Bar** — Dismissible top banner, configurable in one file
- **Recently Viewed** — Tracks and displays recently browsed products
- **Back to Top** — Smooth scroll button on long pages
- **SEO** — Dynamic metadata, Open Graph, canonical URLs, sitemap, robots.txt, structured data (Product, Organization, BreadcrumbList)
- **Accessibility** — Skip-to-content, focus traps, ARIA labels, keyboard navigation, 44px touch targets
- **i18n** — next-intl with English and Spanish translations
- **Responsive** — Mobile-first design, 1440px max-width, full-width cart/menu on mobile
- **Security** — CSP, HSTS, X-Frame-Options, and more via middleware

## Tech Stack

- **Next.js 16** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Zustand** (cart, wishlist, auth, orders — persisted to localStorage)
- **Zod** (form validation)
- **next-intl** (internationalization)
- **Sonner** (toast notifications)
- **Inter** (Google Font via next/font)

## Quick Start

```bash
# Requires Node.js 20+
git clone https://github.com/Epic-Design-Labs/nextjs-ecommerce-starter.git
cd nextjs-ecommerce-starter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| `admin@example.com` | `password123` | Admin |
| `demo@example.com` | `password123` | Customer |

## Project Structure

```
src/
  app/
    (store)/          # Storefront (header/footer layout)
      [slug]/         # Product detail, category, brand pages
      shop/           # Product catalog with filters
      cart/            # Shopping cart
      checkout/        # Checkout + success
      account/         # Dashboard, orders, addresses, settings
      auth/            # Login, register, forgot password
      brands/          # All brands page
    (admin)/admin/    # Admin dashboard
  components/
    ui/               # shadcn/ui + custom components
    layout/           # Header, Footer, AnnouncementBar, BackToTop
    products/         # ProductCard, Grid, Gallery, StarRating, etc.
    cart/             # CartDrawer, CartItem, CartSummary
    search/           # SearchModal
    auth/             # AuthCardLayout
  data/
    products.json     # Product, category, brand data
  lib/
    config.ts         # Store name, contact, social, shipping, currency
    navigation.ts     # Desktop + mobile menu config
    checkout/         # Pluggable checkout provider
    repositories/     # Data access layer (JSON-backed, swappable)
    validators/       # Zod schemas
    analytics.ts      # Event tracking placeholder
    structured-data.ts # JSON-LD helpers
  store/              # Zustand stores (cart, wishlist, auth, orders)
  types/              # TypeScript types + interfaces
  i18n/               # next-intl config
  hooks/              # Custom hooks (useAuthGuard)
messages/
  en.json             # English translations (200+ keys)
  es.json             # Spanish translations
docs/
  CUSTOMIZATION.md    # Full customization guide
```

## Customization

Everything is configurable from a few key files:

| What | Where |
|------|-------|
| Store name, contact, social links | `src/lib/config.ts` |
| Theme colors (rating, wishlist, status) | `src/app/globals.css` |
| Navigation (desktop + mobile) | `src/lib/navigation.ts` |
| Products, categories, brands | `src/data/products.json` |
| Translations | `messages/en.json`, `messages/es.json` |

See [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for the full guide.

## Connecting a Payment Provider

The checkout uses a pluggable `CheckoutProvider` interface:

```typescript
interface CheckoutProvider {
  createSession(cart, customer?): Promise<CheckoutSession>
  getSession(sessionId): Promise<CheckoutSession>
  handleWebhook(payload, signature): Promise<WebhookResult>
}
```

Ships with a demo provider. To connect Stripe, Throttle, or any payment system, implement the interface and swap the export in `src/lib/checkout/index.ts`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, categories, featured products, developer CTA |
| `/shop` | Product catalog with filters and sorting |
| `/[slug]` | Product detail, category, or brand (auto-resolved) |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/search` | Search (also available via Cmd+K modal) |
| `/wishlist` | Saved products |
| `/brands` | All brands |
| `/account` | Account dashboard |
| `/auth/login` | Sign in |
| `/about` | About the starter + Epic Design Labs |
| `/contact` | Contact form |
| `/faq` | FAQ accordion |
| `/policies/*` | Shipping, returns, privacy, terms |

## Need Help?

This starter is free and open source. If you need help customizing it or building a complete ecommerce solution:

- **Email**: support@epicdesignlabs.com
- **Website**: [epicdesignlabs.com](https://epicdesignlabs.com)
- **Issues**: [GitHub Issues](https://github.com/Epic-Design-Labs/nextjs-ecommerce-starter/issues)

## License

MIT — free for personal and commercial use.
