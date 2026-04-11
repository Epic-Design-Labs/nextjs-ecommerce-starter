import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Our return and refund policy. Easy 30-day returns.",
}

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">
        Returns & Refunds
      </h1>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">
          30-Day Return Policy
        </h2>
        <p>
          We want you to be completely satisfied with your purchase. If you're
          not happy with your order, you can return it within 30 days of
          delivery for a full refund.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Return Conditions
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Items must be unused and in their original packaging</li>
          <li>Tags must be attached</li>
          <li>Sale items are final sale and cannot be returned</li>
          <li>Gift cards are non-refundable</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">
          How to Return
        </h2>
        <ol className="list-inside list-decimal space-y-2">
          <li>Log into your account and go to Order History</li>
          <li>Select the order and items you wish to return</li>
          <li>Print the prepaid return label</li>
          <li>Pack items securely and drop off at any shipping location</li>
        </ol>

        <h2 className="text-xl font-semibold text-foreground">Refunds</h2>
        <p>
          Refunds are processed within 5-7 business days of receiving your
          return. The refund will be credited to your original payment method.
        </p>
      </div>
    </div>
  )
}
