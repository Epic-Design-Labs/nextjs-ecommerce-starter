"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Order } from "@/types"

interface OrdersState {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrderById: (id: string) => Order | undefined
  getOrdersByEmail: (email: string) => Order[]
  updateOrderStatus: (id: string, status: Order["status"]) => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },

      getOrderById: (id) => get().orders.find((o) => o.id === id),

      getOrdersByEmail: (email) =>
        get().orders.filter((o) => o.customerEmail === email),

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
          ),
        }))
      },
    }),
    { name: "orders-storage" }
  )
)
