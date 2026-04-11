"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, ProductImage } from "@/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (item: {
    variantId: string
    productId: string
    name: string
    variantName: string
    image: ProductImage
    slug: string
    price: number
    quantity?: number
  }) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  // Computed
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === item.variantId
          )

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? {
                      ...i,
                      quantity: i.quantity + (item.quantity ?? 1),
                      lineTotal: i.price * (i.quantity + (item.quantity ?? 1)),
                    }
                  : i
              ),
            }
          }

          const quantity = item.quantity ?? 1
          const newItem: CartItem = {
            id: item.variantId,
            variantId: item.variantId,
            productId: item.productId,
            name: item.name,
            variantName: item.variantName,
            image: item.image,
            slug: item.slug,
            price: item.price,
            quantity,
            lineTotal: item.price * quantity,
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        }))
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity, lineTotal: i.price * quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.lineTotal, 0),
      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
)
