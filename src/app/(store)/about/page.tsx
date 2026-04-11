import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about our story, mission, and the team behind Store.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>
          We believe in quality over quantity. Every product in our store has
          been carefully selected to meet our high standards for design,
          durability, and value.
        </p>
        <p>
          Founded with the simple idea that shopping should be a joyful
          experience, we curate products that we genuinely love and stand
          behind. From everyday essentials to special finds, each item tells a
          story.
        </p>
        <h2 className="!mt-12 text-xl font-semibold text-foreground">
          Our Values
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Quality craftsmanship in every product</li>
          <li>Sustainable and responsible sourcing</li>
          <li>Exceptional customer experience</li>
          <li>Transparency in everything we do</li>
        </ul>
        <h2 className="!mt-12 text-xl font-semibold text-foreground">
          Get in Touch
        </h2>
        <p>
          Have questions or feedback? We&apos;d love to hear from you. Visit
          our{" "}
          <a href="/contact" className="underline hover:text-foreground">
            contact page
          </a>{" "}
          or email us anytime.
        </p>
      </div>
    </div>
  )
}
