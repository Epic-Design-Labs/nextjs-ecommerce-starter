"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/products/star-rating"
import { formatPrice } from "@/lib/utils"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { useWishlistStore } from "@/store/wishlist"
import { toast } from "sonner"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const defaultVariant = product.variants[0]
  if (!defaultVariant) return null

  const price = defaultVariant.price
  const compareAtPrice = defaultVariant.compareAtPrice
  const isOnSale = compareAtPrice && compareAtPrice > price
  const image = product.images[0]

  const wishlistItems = useWishlistStore((s) => s.items)
  const addItem = useWishlistStore((s) => s.addItem)
  const removeItem = useWishlistStore((s) => s.removeItem)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isWishlisted = mounted && wishlistItems.some((i) => i.productId === product.id)

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) {
      removeItem(product.id)
      toast("Removed from wishlist")
    } else {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price,
        image: image ?? { url: PLACEHOLDER_IMAGE, alt: product.name },
      })
      toast.success("Added to wishlist")
    }
  }

  return (
    <Link href={`/${product.slug}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={image?.url ?? PLACEHOLDER_IMAGE}
          alt={image?.alt ?? product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {isOnSale && (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-white text-xs"
          >
            Sale
          </Badge>
        )}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition-opacity hover:bg-neutral-50 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-current text-wishlist" : "text-neutral-600"}`}
          />
        </button>
      </div>
      <div className="mt-3">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        <h3 className="mt-1 text-sm font-medium text-foreground group-hover:underline">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium">
            {formatPrice(price, defaultVariant.currency)}
          </span>
          {isOnSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(compareAtPrice, defaultVariant.currency)}
            </span>
          )}
        </div>
        {product.variants.length > 1 && (
          <p className="mt-1 text-xs text-muted-foreground">
            {product.variants.length} options
          </p>
        )}
      </div>
    </Link>
  )
}
