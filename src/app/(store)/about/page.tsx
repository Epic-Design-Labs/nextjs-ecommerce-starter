import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Next.js Ecommerce Starter template and Epic Design Labs, the team behind it.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">About This Starter</h1>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>
          The Next.js Ecommerce Starter is a free, open-source template designed
          to give developers and businesses a production-ready foundation for
          building modern online stores. It&apos;s built with Next.js, Tailwind CSS,
          and shadcn/ui — and it&apos;s designed to connect to any checkout or
          payment system.
        </p>
        <p>
          Whether you&apos;re a developer looking for a clean starting point or a
          business that needs a custom storefront, this template covers the
          essentials: product catalog, cart, checkout, search, authentication,
          wishlist, and more — all built with accessibility, SEO, and
          performance in mind.
        </p>

        <h2 className="!mt-12 text-xl font-semibold text-foreground">
          Built by Epic Design Labs
        </h2>
        <p>
          This starter was created by{" "}
          <a
            href="https://epicdesignlabs.com"
            target="_blank"
            rel="noopener"
            className="underline hover:text-foreground"
          >
            Epic Design Labs
          </a>
          , a design and development studio that helps businesses build
          high-performing ecommerce experiences. We work with brands of all
          sizes to design, develop, and optimize online stores that convert.
        </p>

        <h2 className="!mt-12 text-xl font-semibold text-foreground">
          What&apos;s Included
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>30+ pages with responsive layouts</li>
          <li>Product catalog with categories, subcategories, and brands</li>
          <li>Shopping cart with slide-out drawer</li>
          <li>Pluggable checkout provider (connect any payment system)</li>
          <li>Search modal with instant results</li>
          <li>Wishlist and recently viewed products</li>
          <li>Authentication with protected routes</li>
          <li>Full SEO setup (metadata, structured data, sitemap)</li>
          <li>Accessibility compliant (WCAG best practices)</li>
          <li>Internationalization ready (next-intl with EN/ES)</li>
          <li>Theme variables for easy rebranding</li>
        </ul>

        <h2 className="!mt-12 text-xl font-semibold text-foreground">
          Need a Developer?
        </h2>
        <p>
          This template is free to use, modify, and deploy. If you need help
          customizing it, integrating a payment provider, or building something
          more complex, our team is here to help.{" "}
          <Link href="/contact" className="underline hover:text-foreground">
            Get in touch
          </Link>{" "}
          or visit{" "}
          <a
            href="https://epicdesignlabs.com"
            target="_blank"
            rel="noopener"
            className="underline hover:text-foreground"
          >
            epicdesignlabs.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
