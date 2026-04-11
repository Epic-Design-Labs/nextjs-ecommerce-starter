import type { MetadataRoute } from "next"
import data from "@/data/products.json"
import { siteConfig } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/cart",
    "/wishlist",
    "/auth/login",
    "/auth/register",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
    "/policies/terms",
  ]

  const productPages = data.products
    .filter((p) => p.status === "active")
    .map((p) => `/${p.slug}`)

  const categoryPages = data.categories.map((c) => `/${c.slug}`)

  const allPages = [...staticPages, ...productPages, ...categoryPages]

  return allPages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/policies") ? 0.3 : 0.8,
  }))
}
