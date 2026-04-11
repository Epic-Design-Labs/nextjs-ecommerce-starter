// ============================================================================
// Analytics — Placeholder for tracking events.
// Replace these with your analytics provider (Google Analytics, Segment,
// Plausible, PostHog, etc.)
// ============================================================================

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, properties)
  }

  // Example: Google Analytics
  // window.gtag?.("event", name, properties)

  // Example: Segment
  // window.analytics?.track(name, properties)

  // Example: PostHog
  // window.posthog?.capture(name, properties)
}

export function trackPageView(url: string) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics] pageview", url)
  }

  // Example: Google Analytics
  // window.gtag?.("config", "GA_ID", { page_path: url })
}

// Common ecommerce events
export const events = {
  addToCart: (product: { id: string; name: string; price: number; quantity: number }) =>
    trackEvent("add_to_cart", product),

  removeFromCart: (product: { id: string; name: string }) =>
    trackEvent("remove_from_cart", product),

  addToWishlist: (product: { id: string; name: string }) =>
    trackEvent("add_to_wishlist", product),

  beginCheckout: (total: number, itemCount: number) =>
    trackEvent("begin_checkout", { total, itemCount }),

  purchase: (orderId: string, total: number) =>
    trackEvent("purchase", { orderId, total }),

  search: (query: string, resultCount: number) =>
    trackEvent("search", { query, resultCount }),

  viewProduct: (product: { id: string; name: string; price: number }) =>
    trackEvent("view_product", product),

  signUp: () => trackEvent("sign_up"),
  login: () => trackEvent("login"),
}
