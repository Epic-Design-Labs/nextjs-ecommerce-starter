import type { CmsPage } from "@/types"
import data from "@/data/pages.json"

const pages = data.pages as CmsPage[]

export const jsonPageRepository = {
  async list(): Promise<CmsPage[]> {
    return [...pages].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  },

  async getBySlug(slug: string): Promise<CmsPage | null> {
    return pages.find((p) => p.slug === slug) ?? null
  },

  async getById(id: string): Promise<CmsPage | null> {
    return pages.find((p) => p.id === id) ?? null
  },
}
