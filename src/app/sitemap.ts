import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/config"
import {
  productRepository,
  categoryRepository,
  brandRepository,
} from "@/lib/repositories"

// Static public routes. Admin, account, auth, and checkout are excluded
// (covered by robots.txt disallow rules).
const STATIC_PATHS = [
  { path: "", priority: 1, changeFrequency: "daily" as const },
  { path: "/shop", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/brands", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/pages", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/policies/shipping", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/policies/returns", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/policies/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/policies/terms", priority: 0.3, changeFrequency: "yearly" as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic content from the repository layer so swapping
  // backends (CMS, DB, API) doesn't break the sitemap.
  const [productsResult, categories, brands] = await Promise.all([
    productRepository.list(undefined, undefined, { page: 1, limit: 10_000 }),
    categoryRepository.list(),
    brandRepository.list(),
  ])

  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${siteConfig.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))

  const productEntries: MetadataRoute.Sitemap = productsResult.items.map((p) => ({
    url: `${siteConfig.url}/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteConfig.url}/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: c.parentId ? 0.6 : 0.8,
  }))

  const brandEntries: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${siteConfig.url}/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...productEntries,
    ...categoryEntries,
    ...brandEntries,
  ]
}
