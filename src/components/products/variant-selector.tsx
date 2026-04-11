"use client"

import type { ProductVariant } from "@/types"
import { cn } from "@/lib/utils"

interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariantId: string
  onSelect: (variantId: string) => void
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  // Group variants by option name
  const optionGroups = new Map<string, Set<string>>()
  for (const variant of variants) {
    for (const option of variant.options) {
      if (!optionGroups.has(option.name)) {
        optionGroups.set(option.name, new Set())
      }
      optionGroups.get(option.name)!.add(option.value)
    }
  }

  if (optionGroups.size === 0) return null

  const selectedVariant = variants.find((v) => v.id === selectedVariantId)

  return (
    <div className="space-y-4">
      {Array.from(optionGroups.entries()).map(([optionName, values]) => (
        <div key={optionName}>
          <label className="text-sm font-medium">
            {optionName}
            {selectedVariant && (
              <span className="ml-2 font-normal text-muted-foreground">
                {selectedVariant.options.find((o) => o.name === optionName)
                  ?.value ?? ""}
              </span>
            )}
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from(values).map((value) => {
              const matchingVariant = variants.find((v) =>
                v.options.some(
                  (o) => o.name === optionName && o.value === value
                )
              )
              const isSelected = selectedVariant?.options.some(
                (o) => o.name === optionName && o.value === value
              )
              const isAvailable =
                matchingVariant &&
                (matchingVariant.inventory.quantity > 0 ||
                  matchingVariant.inventory.allowBackorder)

              return (
                <button
                  key={value}
                  onClick={() => matchingVariant && onSelect(matchingVariant.id)}
                  disabled={!isAvailable}
                  className={cn(
                    "border px-3 py-1.5 text-sm transition-colors",
                    isSelected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground",
                    !isAvailable && "cursor-not-allowed opacity-40"
                  )}
                  aria-label={`${optionName}: ${value}`}
                  aria-pressed={isSelected}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
