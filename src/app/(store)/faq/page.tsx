import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about orders, shipping, returns, and more.",
}

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 5-7 business days. Express shipping is available at checkout and delivers within 2-3 business days.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all items. Products must be in their original condition with tags attached. Visit our returns page for more details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. You can see the exact cost at checkout.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order from your account dashboard.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secured with SSL encryption.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via our contact page, email us at support@store.com, or call (555) 123-4567. Our support team is available Monday through Friday, 9am to 5pm EST.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it. After that, please contact our support team and we'll do our best to accommodate your request.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes! Digital gift cards are available in denominations of $25, $50, $100, and $200. They're delivered instantly via email and never expire.",
  },
]

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">
        Frequently Asked Questions
      </h1>
      <p className="mt-4 text-muted-foreground">
        Find answers to common questions about our products, shipping, and
        policies.
      </p>

      <Accordion className="mt-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 rounded-lg border bg-neutral-50 p-6 text-center">
        <h2 className="text-lg font-semibold">Still have questions?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Can&apos;t find what you&apos;re looking for? Our support team is
          happy to help.
        </p>
        <a
          href="/contact"
          className="mt-4 inline-block text-sm font-medium underline hover:text-foreground"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}
