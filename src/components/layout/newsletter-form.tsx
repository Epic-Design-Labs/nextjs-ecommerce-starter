"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setTimeout(() => {
      toast.success("Thanks for subscribing!")
      setEmail("")
      setLoading(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-md gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        aria-label="Email address for newsletter"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <Button variant="secondary" type="submit" disabled={loading}>
        {loading ? "..." : "Subscribe"}
      </Button>
    </form>
  )
}
