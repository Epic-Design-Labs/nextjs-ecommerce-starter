import Link from "next/link"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductGrid } from "@/components/products/product-grid"
import { Pagination } from "@/components/products/pagination"
import type { Category, Product, PaginationMeta } from "@/types"

interface CategoryViewProps {
  category: Category
  products: Product[]
  pagination: PaginationMeta
  subcategories?: Category[]
  ancestors?: Category[]
}

/** Strip parent name prefix from a subcategory display name */
function stripParentPrefix(name: string, parentName: string): string {
  const patterns = [
    new RegExp(`^${parentName}\\s*[-–—:|]\\s*`, "i"),
    new RegExp(`^${parentName}\\s+`, "i"),
  ]
  for (const pattern of patterns) {
    if (pattern.test(name)) return name.replace(pattern, "")
  }
  return name
}

export function CategoryView({
  category,
  products,
  pagination,
  subcategories = [],
  ancestors = [],
}: CategoryViewProps) {
  // Full ancestor trail for breadcrumbs — e.g. Shop > Electronics > Headphones
  const trail = [
    { name: "Shop", href: "/shop" },
    ...ancestors.map((c) => ({ name: c.name, href: `/${c.slug}` })),
  ]

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(trail)),
        }}
      />
      {/* Breadcrumb — full ancestor trail */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/shop" />}>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          {ancestors.map((cat, idx) => {
            const isLast = idx === ancestors.length - 1
            return (
              <div key={cat.id} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{cat.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={`/${cat.slug}`} />}>
                      {cat.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mt-2">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-muted-foreground">{category.description}</p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">
          {pagination.total}{" "}
          {pagination.total === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Subcategories — parent prefix stripped, no "All" pill */}
      {subcategories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/${sub.slug}`}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors hover:border-foreground"
            >
              {stripParentPrefix(sub.name, category.name)}
            </Link>
          ))}
        </div>
      )}

      {/* Products */}
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <Pagination
          pagination={pagination}
          basePath={`/${category.slug}`}
        />
      </div>
    </div>
  )
}
