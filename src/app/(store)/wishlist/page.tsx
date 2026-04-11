"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { ProductCard } from "@/components/products/product-card"
import { useWishlistStore } from "@/store/wishlist"
import type { Product } from "@/types"
import data from "@/data/products.json"

const allProducts = data.products as Product[]

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((s) => s.items)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Wishlist" />
      </div>
    )
  }

  const wishlistedProducts = allProducts.filter((p) =>
    wishlistItems.some((w) => w.productId === p.id)
  )

  if (wishlistedProducts.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Wishlist" />
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save products you love to find them easily later."
          actionLabel="Browse Products"
          actionHref="/shop"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Wishlist"
        description={`${wishlistedProducts.length} ${wishlistedProducts.length === 1 ? "item" : "items"}`}
      />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
