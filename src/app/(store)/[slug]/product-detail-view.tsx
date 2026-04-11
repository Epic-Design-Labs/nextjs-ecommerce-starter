"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, Heart } from "lucide-react"
import { toast } from "sonner"
import { useCartStore } from "@/store/cart"
import { useWishlistStore } from "@/store/wishlist"
import { useRecentlyViewedStore } from "@/store/recently-viewed"
import { RecentlyViewed } from "@/components/products/recently-viewed"
import { StarRating } from "@/components/products/star-rating"
import { TrustSignals } from "@/components/products/trust-signals"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/components/products/product-gallery"
import { VariantSelector } from "@/components/products/variant-selector"
import { QuantitySelector } from "@/components/products/quantity-selector"
import { ProductGrid } from "@/components/products/product-grid"
import { formatPrice } from "@/lib/utils"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import type { Product, Brand } from "@/types"

interface ProductDetailViewProps {
  product: Product
  relatedProducts: Product[]
  brand: Brand | null
}

export function ProductDetailView({
  product,
  relatedProducts,
  brand,
}: ProductDetailViewProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ""
  )
  const [quantity, setQuantity] = useState(1)

  const addToCart = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const wishlistItems = useWishlistStore((s) => s.items)
  const addToWishlist = useWishlistStore((s) => s.addItem)
  const removeFromWishlist = useWishlistStore((s) => s.removeItem)

  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addItem)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isWishlisted = mounted && wishlistItems.some((i) => i.productId === product.id)

  // Track recently viewed
  useEffect(() => {
    addRecentlyViewed({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.variants[0]?.price ?? 0,
      imageUrl: product.images[0]?.url ?? "",
      imageAlt: product.images[0]?.alt ?? product.name,
    })
  }, [product.id])

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  )
  if (!selectedVariant) return null

  const isOnSale =
    selectedVariant.compareAtPrice &&
    selectedVariant.compareAtPrice > selectedVariant.price
  const inStock =
    selectedVariant.inventory.quantity > 0 ||
    selectedVariant.inventory.allowBackorder

  function handleAddToCart() {
    addToCart({
      variantId: selectedVariant!.id,
      productId: product.id,
      name: product.name,
      variantName: selectedVariant!.name,
      image: product.images[0] ?? { url: "", alt: product.name },
      slug: product.slug,
      price: selectedVariant!.price,
      quantity,
    })
    openCart()
  }

  function handleToggleWishlist() {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast("Removed from wishlist")
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: selectedVariant!.price,
        image: product.images[0] ?? { url: "", alt: product.name },
      })
      toast.success("Added to wishlist")
    }
  }

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Shop", href: "/shop" },
    { name: product.name, href: `/${product.slug}` },
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: selectedVariant.sku,
    brand: brand ? { "@type": "Brand", name: brand.name } : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: (selectedVariant.price / 100).toFixed(2),
      priceCurrency: selectedVariant.currency,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
      />
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/shop" />}>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product */}
      <div className="mt-2 grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Info */}
        <div className="flex flex-col">
          <div>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          {brand && (
            <Link
              href={`/${brand.slug}`}
              className="mt-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              {brand.name}
            </Link>
          )}

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">
              {formatPrice(selectedVariant.price, selectedVariant.currency)}
            </span>
            {isOnSale && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(
                    selectedVariant.compareAtPrice!,
                    selectedVariant.currency
                  )}
                </span>
                <Badge variant="secondary">
                  {Math.round(
                    (1 -
                      selectedVariant.price /
                        selectedVariant.compareAtPrice!) *
                      100
                  )}
                  % off
                </Badge>
              </>
            )}
          </div>

          <p className="mt-4 text-muted-foreground">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mt-6 mb-6">
              <VariantSelector
                variants={product.variants}
                selectedVariantId={selectedVariantId}
                onSelect={setSelectedVariantId}
              />
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-4">
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                max={selectedVariant.inventory.quantity || 99}
              />
              <Button
                variant="outline"
                size="icon"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-wishlist text-wishlist" : ""}`} />
              </Button>
            </div>
            <Button
              size="lg"
              className="w-full sm:flex-1"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>

          {!inStock && (
            <p className="mt-2 text-sm text-destructive">
              This item is currently out of stock.
            </p>
          )}

          <Separator className="my-6" />

          <TrustSignals />
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight">
            You may also like
          </h2>
          <div className="mt-6">
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}

      {/* Recently viewed */}
      <RecentlyViewed excludeProductId={product.id} />
    </div>
  )
}
