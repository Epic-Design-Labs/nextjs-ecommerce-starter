import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using our website and services.",
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: January 1, 2025
      </p>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">
          Acceptance of Terms
        </h2>
        <p>
          By accessing and using this website, you accept and agree to be bound
          by these Terms of Service. If you do not agree, please do not use our
          services.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Use of Service
        </h2>
        <p>
          You agree to use our services only for lawful purposes and in
          accordance with these terms. You are responsible for maintaining the
          confidentiality of your account credentials.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Products and Pricing
        </h2>
        <p>
          We strive to display accurate product information and pricing.
          However, errors may occur. We reserve the right to correct any errors
          and to cancel orders placed at incorrect prices.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Intellectual Property
        </h2>
        <p>
          All content on this website, including text, images, and logos, is
          protected by intellectual property laws. You may not reproduce or
          distribute any content without our written permission.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by law, we shall not be liable for
          any indirect, incidental, or consequential damages arising from your
          use of our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Contact</h2>
        <p>
          For questions about these terms, contact us at legal@store.com.
        </p>
      </div>
    </div>
  )
}
