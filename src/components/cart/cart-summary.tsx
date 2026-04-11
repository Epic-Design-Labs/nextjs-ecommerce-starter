"use client"

import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/lib/config"

interface CartSummaryProps {
  subtotal: number
}

export function CartSummary({ subtotal }: CartSummaryProps) {
  const shipping = subtotal >= siteConfig.freeShippingThreshold ? 0 : 599
  const tax = Math.round(subtotal * siteConfig.taxRate)
  const total = subtotal + shipping + tax

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Shipping</span>
        <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Estimated tax</span>
        <span>{formatPrice(tax)}</span>
      </div>
      <Separator />
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      {subtotal > 0 && subtotal < siteConfig.freeShippingThreshold && (
        <p className="text-xs text-muted-foreground">
          Add {formatPrice(siteConfig.freeShippingThreshold - subtotal)} more for free shipping
        </p>
      )}
    </div>
  )
}
