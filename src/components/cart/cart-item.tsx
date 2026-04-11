"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuantitySelector } from "@/components/products/quantity-selector"
import { formatPrice } from "@/lib/utils"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { useCartStore } from "@/store/cart"
import type { CartItem as CartItemType } from "@/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const [imgSrc, setImgSrc] = useState(item.image?.url || PLACEHOLDER_IMAGE)

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <Link
        href={`/${item.slug}`}
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100 sm:h-20 sm:w-20"
      >
        <Image
          src={imgSrc}
          alt={item.image?.alt ?? item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 64px, 80px"
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
        />
      </Link>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/${item.slug}`}
              className="block truncate text-sm font-medium hover:underline"
            >
              {item.name}
            </Link>
            {item.variantName !== "Default" && (
              <p className="text-xs text-muted-foreground">
                {item.variantName}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {formatPrice(item.price)} each
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeItem(item.variantId)}
            aria-label={`Remove ${item.name}`}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={(q) => updateQuantity(item.variantId, q)}
          />
          <span className="shrink-0 text-sm font-medium tabular-nums">
            {formatPrice(item.lineTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}
