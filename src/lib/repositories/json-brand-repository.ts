import type { Brand } from "@/types"
import data from "@/data/products.json"

const brands = (data as { brands: Brand[] }).brands

export const jsonBrandRepository = {
  async list(): Promise<Brand[]> {
    return brands
  },

  async getBySlug(slug: string): Promise<Brand | null> {
    return brands.find((b) => b.slug === slug) ?? null
  },

  async getById(id: string): Promise<Brand | null> {
    return brands.find((b) => b.id === id) ?? null
  },
}
