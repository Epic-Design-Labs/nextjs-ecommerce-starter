"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ProductImage } from "@/types"

export interface WishlistItem {
  productId: string
  name: string
  slug: string
  price: number
  image: ProductImage
}

interface WishlistState {
  items: WishlistItem[]

  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  hasItem: (productId: string) => boolean
  clearAll: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          if (state.items.some((i) => i.productId === item.productId)) {
            return state
          }
          return { items: [...state.items, item] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }))
      },

      hasItem: (productId) =>
        get().items.some((i) => i.productId === productId),

      clearAll: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
)
