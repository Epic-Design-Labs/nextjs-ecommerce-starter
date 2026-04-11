import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: January 1, 2025
      </p>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">
          Information We Collect
        </h2>
        <p>
          We collect information you provide directly, such as your name, email
          address, shipping address, and payment information when you make a
          purchase. We also automatically collect certain information about your
          device and browsing activity.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          How We Use Your Information
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>To process and fulfill your orders</li>
          <li>To communicate with you about your orders</li>
          <li>To send promotional emails (with your consent)</li>
          <li>To improve our website and services</li>
          <li>To detect and prevent fraud</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">
          Data Protection
        </h2>
        <p>
          We implement industry-standard security measures to protect your
          personal information. Your payment data is processed securely and
          never stored on our servers.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal
          information at any time. Contact us at privacy@store.com with any
          requests.
        </p>
      </div>
    </div>
  )
}
