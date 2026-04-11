import type { Category, CategoryRepository } from "@/types"
import data from "@/data/products.json"

const categories = data.categories as Category[]

export const jsonCategoryRepository: CategoryRepository & {
  getChildren(parentId: string): Promise<Category[]>
  getTopLevel(): Promise<Category[]>
} = {
  async list() {
    return categories.sort((a, b) => a.order - b.order)
  },

  async getBySlug(slug) {
    return categories.find((c) => c.slug === slug) ?? null
  },

  async getById(id) {
    return categories.find((c) => c.id === id) ?? null
  },

  async getChildren(parentId) {
    return categories
      .filter((c) => c.parentId === parentId)
      .sort((a, b) => a.order - b.order)
  },

  async getTopLevel() {
    return categories
      .filter((c) => !c.parentId)
      .sort((a, b) => a.order - b.order)
  },
}
