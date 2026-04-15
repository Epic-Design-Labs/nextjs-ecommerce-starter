import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { productRepository, categoryRepository } from "@/lib/repositories"
import { ProductGrid } from "@/components/products/product-grid"
import { Pagination } from "@/components/products/pagination"
import { SortDropdown } from "@/components/products/sort-dropdown"
import type { SortOption } from "@/types"
import { siteConfig } from "@/lib/config"

interface ShopPageProps {
  searchParams: Promise<{
    page?: string
    sort?: string
    category?: string
    q?: string
  }>
}

export async function generateMetadata({
  searchParams,
}: ShopPageProps): Promise<Metadata> {
  const params = await searchParams
  const page = Number(params.page) || 1
  const canonical = page > 1 ? `${siteConfig.url}/shop?page=${page}` : `${siteConfig.url}/shop`

  return {
    title: "Shop",
    description: "Browse our full collection of quality products.",
    alternates: { canonical },
  }
}

const SORT_OPTIONS: Record<string, SortOption> = {
  newest: { field: "createdAt", order: "desc" },
  "price-asc": { field: "price", order: "asc" },
  "price-desc": { field: "price", order: "desc" },
  name: { field: "name", order: "asc" },
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const sortKey = params.sort || "newest"
  const categorySlug = params.category
  const searchQuery = params.q

  const sort = SORT_OPTIONS[sortKey] ?? SORT_OPTIONS.newest

  const { items: products, pagination } = await productRepository.list(
    {
      category: categorySlug,
      search: searchQuery,
    },
    sort,
    { page, limit: 40 }
  )

  const allCategories = await categoryRepository.list()
  const categories = allCategories.filter((c) => !c.parentId)

  // Build current search params for pagination links
  const currentParams: Record<string, string> = {}
  if (sortKey !== "newest") currentParams.sort = sortKey
  if (categorySlug) currentParams.category = categorySlug
  if (searchQuery) currentParams.q = searchQuery

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {categorySlug
              ? categories.find((c) => c.slug === categorySlug)?.name ??
                "Shop"
              : searchQuery
                ? `Results for "${searchQuery}"`
                : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {pagination.total} {pagination.total === 1 ? "product" : "products"}
          </p>
        </div>

        <Suspense>
          <SortDropdown currentSort={sortKey} />
        </Suspense>
      </div>

      {/* Category filter pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            !categorySlug
              ? "border-foreground bg-foreground text-background"
              : "border-border hover:border-foreground"
          }`}
        >
          Shop All
        </Link>
        {categories.map((cat) => {
          return (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                categorySlug === cat.slug
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground"
              }`}
            >
              {cat.name}
            </Link>
          )
        })}
      </div>

      {/* Product Grid */}
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <Pagination
          pagination={pagination}
          basePath="/shop"
          searchParams={currentParams}
        />
      </div>
    </div>
  )
}
