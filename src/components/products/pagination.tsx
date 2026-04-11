import Link from "next/link"
import { cn } from "@/lib/utils"
import type { PaginationMeta } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  pagination: PaginationMeta
  basePath: string
  searchParams?: Record<string, string>
}

export function Pagination({
  pagination,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const { page, totalPages, hasNext, hasPrev } = pagination

  if (totalPages <= 1) return null

  function buildHref(pageNum: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", String(pageNum))
    return `${basePath}?${params.toString()}`
  }

  const pages: number[] = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      {hasPrev ? (
        <Link
          href={buildHref(page - 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground/60">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium",
            p === page
              ? "bg-foreground text-background"
              : "hover:bg-accent"
          )}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Link>
      ))}

      {hasNext ? (
        <Link
          href={buildHref(page + 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground/60">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  )
}
