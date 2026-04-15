import type { Category, CategoryRepository } from "@/types"
import data from "@/data/products.json"

const categories = data.categories as Category[]

export const jsonCategoryRepository: CategoryRepository & {
  getChildren(parentId: string): Promise<Category[]>
  getTopLevel(): Promise<Category[]>
  getAncestors(categoryId: string): Promise<Category[]>
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

  /** Walk up the parent chain and return ancestors ordered root → leaf */
  async getAncestors(categoryId) {
    const chain: Category[] = []
    let current = categories.find((c) => c.id === categoryId)
    while (current) {
      chain.unshift(current)
      current = current.parentId
        ? categories.find((c) => c.id === current!.parentId)
        : undefined
    }
    return chain
  },
}
