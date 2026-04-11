"use client"

import { useState, useEffect, useCallback, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, ArrowRight } from "lucide-react"
import { StarRating } from "@/components/products/star-rating"
import { formatPrice } from "@/lib/utils"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import type { Product } from "@/types"
import data from "@/data/products.json"

const allProducts = data.products as Product[]

const popularSearches = [
  "Headphones",
  "Coffee",
  "Leather",
  "Wireless",
  "Organic",
  "Candle",
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const results = query.trim().length > 0
    ? allProducts.filter(
        (p) =>
          p.status === "active" &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
      ).slice(0, 6)
    : []

  const handleClose = useCallback(() => {
    setQuery("")
    onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose()

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  const hasQuery = query.trim().length > 0

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div ref={modalRef} className="relative mx-auto mt-[10vh] w-full max-w-2xl px-4" role="dialog" aria-modal="true" aria-label="Search products">
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
          {/* Input */}
          <div className="flex items-center border-b px-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="flex-1 border-0 bg-transparent px-4 py-4 text-lg outline-none placeholder:text-muted-foreground/60"
            />
            {hasQuery ? (
              <button
                onClick={() => setQuery("")}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="hidden rounded border bg-neutral-100 px-1.5 py-0.5 text-xs text-muted-foreground sm:inline">
                ESC
              </kbd>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {hasQuery && results.length > 0 && (
              <div className="p-2">
                {results.map((product) => {
                  const variant = product.variants[0]
                  return (
                    <Link
                      key={product.id}
                      href={`/${product.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-neutral-50"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        <Image
                          src={product.images[0]?.url ?? PLACEHOLDER_IMAGE}
                          alt={product.images[0]?.alt ?? product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {product.name}
                        </p>
                        <StarRating
                          rating={product.rating}
                          reviewCount={product.reviewCount}
                          size="sm"
                        />
                      </div>
                      <span className="shrink-0 text-sm font-medium">
                        {variant && formatPrice(variant.price, variant.currency)}
                      </span>
                    </Link>
                  )
                })}
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="mt-1 flex items-center justify-center gap-2 rounded-lg p-3 text-sm text-muted-foreground transition-colors hover:bg-neutral-50 hover:text-foreground"
                >
                  View all results
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}

            {hasQuery && results.length === 0 && (
              <div className="px-4 py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No results for &quot;{query}&quot;
                </p>
              </div>
            )}

            {!hasQuery && (
              <div className="p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-foreground hover:bg-neutral-50"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
