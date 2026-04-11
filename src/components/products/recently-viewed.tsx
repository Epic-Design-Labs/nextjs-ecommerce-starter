"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRecentlyViewedStore } from "@/store/recently-viewed"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"

interface RecentlyViewedProps {
  excludeProductId?: string
}

export function RecentlyViewed({ excludeProductId }: RecentlyViewedProps) {
  const getItems = useRecentlyViewedStore((s) => s.getItems)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const items = getItems(excludeProductId, 6)
  if (items.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold tracking-tight">Recently Viewed</h2>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <Link
            key={item.productId}
            href={`/${item.slug}`}
            className="group shrink-0"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={item.imageUrl || PLACEHOLDER_IMAGE}
                alt={item.imageAlt || item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="128px"
              />
            </div>
            <p className="mt-2 w-32 truncate text-xs font-medium group-hover:underline">
              {item.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatPrice(item.price)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
