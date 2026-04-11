import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Learn about our shipping options, rates, and delivery times.",
}

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Shipping Policy</h1>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">
          Domestic Shipping
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Standard Shipping (5-7 business days): $5.99</li>
          <li>Express Shipping (2-3 business days): $12.99</li>
          <li>Overnight Shipping (1 business day): $24.99</li>
          <li>Free shipping on all orders over $75</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">
          International Shipping
        </h2>
        <p>
          We ship to most countries worldwide. International shipping rates are
          calculated at checkout based on destination and package weight.
          Delivery typically takes 7-14 business days.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Order Processing
        </h2>
        <p>
          Orders placed before 2:00 PM EST on business days are processed the
          same day. Orders placed after 2:00 PM EST or on weekends will be
          processed the next business day.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Tracking</h2>
        <p>
          You will receive a shipping confirmation email with a tracking number
          once your order has shipped. You can also track your order from your
          account dashboard.
        </p>
      </div>
    </div>
  )
}
