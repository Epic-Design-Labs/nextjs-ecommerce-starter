# Ecommerce Starter

A clean, production-ready Next.js ecommerce starter. Works standalone with demo data out of the box. Designed to connect to [Throttle](https://throttle.com) for checkout, but works with any payment provider.

## Features

- **Product Catalog** — Browse, filter, sort, search across 14 demo products in 6 categories
- **Shopping Cart** — Slide-out drawer, quantity controls, persisted to localStorage
- **Wishlist** — Save products for later
- **Checkout** — Full checkout flow with shipping form and order creation
- **Authentication** — Login, register, forgot password with demo accounts
- **Account** — Order history, saved addresses, profile settings
- **Admin** — Dashboard with stats, order management
- **SEO** — Dynamic metadata, sitemap.xml, robots.txt
- **Responsive** — Mobile-first design, works at every breakpoint

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Zustand** (cart, wishlist, auth, orders — persisted to localStorage)
- **Zod** (form validation)
- **Sonner** (toast notifications)

## Quick Start

```bash
# Requires Node.js 20+
nvm use 22

# Install dependencies
npm install

# Start dev server
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
    (store)/          # Storefront pages (with header/footer)
      [slug]/         # Product detail + category pages
      shop/           # Product catalog with filters
      cart/            # Shopping cart
      checkout/        # Checkout + success
      account/         # Dashboard, orders, addresses, settings
      auth/            # Login, register, forgot password
      about/, contact/, faq/, policies/  # Informational pages
    (admin)/admin/    # Admin dashboard, orders, customers
  components/
    ui/               # shadcn/ui primitives
    layout/           # Header, Footer
    products/         # ProductCard, Grid, Gallery, Filters, etc.
    cart/             # CartDrawer, CartItem, CartSummary
  data/
    products.json     # Sample product + category data
  lib/
    checkout/         # Checkout provider (demo + Throttle-ready)
    repositories/     # Data access layer (JSON-backed)
    validators/       # Zod schemas for all forms
    utils.ts          # Formatting helpers
  store/
    cart.ts           # Zustand cart store
    wishlist.ts       # Zustand wishlist store
    auth.ts           # Zustand auth store
    orders.ts         # Zustand orders store
  types/
    index.ts          # All TypeScript types + interfaces
```

## Connecting a Payment Provider

The checkout uses a pluggable provider pattern. The demo provider creates orders without real payment.

To connect Throttle or any payment system:

1. Create your provider in `src/lib/checkout/` implementing the `CheckoutProvider` interface
2. Export it from `src/lib/checkout/index.ts`

```typescript
// src/types/index.ts — the interface your provider must implement
interface CheckoutProvider {
  createSession(cart: Cart, customer?: { email: string }): Promise<CheckoutSession>
  getSession(sessionId: string): Promise<CheckoutSession>
  handleWebhook(payload: unknown, signature: string): Promise<WebhookResult>
}
```

## Swapping the Data Source

Product data comes from `src/data/products.json` via repository interfaces. To connect a CMS, database, or API:

1. Implement `ProductRepository` and `CategoryRepository` from `src/types/`
2. Export your implementations from `src/lib/repositories/index.ts`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, categories, featured products |
| `/shop` | Product catalog with filters and sorting |
| `/[slug]` | Product detail or category (auto-resolved) |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/checkout/success` | Order confirmation |
| `/search` | Product search |
| `/wishlist` | Saved products |
| `/account` | Account dashboard |
| `/account/orders` | Order history |
| `/account/addresses` | Saved addresses |
| `/account/settings` | Profile settings |
| `/auth/login` | Sign in |
| `/auth/register` | Create account |
| `/about` | About page |
| `/contact` | Contact form |
| `/faq` | FAQ accordion |
| `/policies/*` | Shipping, returns, privacy, terms |
| `/admin` | Admin dashboard |

## License

MIT
