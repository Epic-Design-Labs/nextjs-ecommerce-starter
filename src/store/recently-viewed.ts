"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface RecentlyViewedItem {
  productId: string
  slug: string
  name: string
  price: number
  imageUrl: string
  imageAlt: string
  viewedAt: number
}

interface RecentlyViewedState {
  items: RecentlyViewedItem[]
  addItem: (item: Omit<RecentlyViewedItem, "viewedAt">) => void
  getItems: (excludeId?: string, limit?: number) => RecentlyViewedItem[]
}

const MAX_ITEMS = 12

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const filtered = state.items.filter(
            (i) => i.productId !== item.productId
          )
          return {
            items: [
              { ...item, viewedAt: Date.now() },
              ...filtered,
            ].slice(0, MAX_ITEMS),
          }
        })
      },

      getItems: (excludeId, limit = 6) => {
        return get()
          .items.filter((i) => i.productId !== excludeId)
          .slice(0, limit)
      },
    }),
    {
      name: "recently-viewed-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
)
