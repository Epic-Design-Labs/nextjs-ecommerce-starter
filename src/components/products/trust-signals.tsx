import { Truck, RotateCcw, Shield } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { siteConfig } from "@/lib/config"

export function TrustSignals() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Truck className="h-4 w-4" />
        <span>Free shipping on orders over {formatPrice(siteConfig.freeShippingThreshold)}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <RotateCcw className="h-4 w-4" />
        <span>30-day hassle-free returns</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Secure checkout</span>
      </div>
    </div>
  )
}
