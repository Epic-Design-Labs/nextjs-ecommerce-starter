"use client"

import { Button } from "@/components/ui/button"

export default function StoreError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-muted-foreground">Something went wrong</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-4 text-muted-foreground">
        Please try again. If the problem persists, contact support.
      </p>
      <Button onClick={reset} className="mt-8">
        Try Again
      </Button>
    </div>
  )
}
