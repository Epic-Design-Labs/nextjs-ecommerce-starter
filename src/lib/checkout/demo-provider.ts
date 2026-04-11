import type { Cart, CheckoutProvider, CheckoutSession, WebhookResult, Address } from "@/types"

/**
 * Demo checkout provider that works without any external services.
 * Replace this with ThrottleCheckoutProvider or any payment provider
 * by implementing the same CheckoutProvider interface.
 */
export const demoCheckoutProvider: CheckoutProvider = {
  async createSession(
    cart: Cart,
    customer?: { email: string; shippingAddress?: Address }
  ): Promise<CheckoutSession> {
    // Simulate creating a checkout session
    const sessionId = `demo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    return {
      id: sessionId,
      url: `/checkout/success?session_id=${sessionId}`,
      status: "open",
      metadata: {
        customerEmail: customer?.email ?? "",
        itemCount: String(cart.itemCount),
        total: String(cart.total),
      },
    }
  },

  async getSession(sessionId: string): Promise<CheckoutSession> {
    // In demo mode, all sessions are "complete" once retrieved
    return {
      id: sessionId,
      url: `/checkout/success?session_id=${sessionId}`,
      status: "complete",
      orderId: `ORD-${sessionId.slice(-6).toUpperCase()}`,
    }
  },

  async handleWebhook(
    _payload: unknown,
    _signature: string
  ): Promise<WebhookResult> {
    // Demo webhook always succeeds
    return {
      success: true,
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
    }
  },
}
