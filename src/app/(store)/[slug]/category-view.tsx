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
}

export function CategoryView({
  category,
  products,
  pagination,
  subcategories = [],
}: CategoryViewProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Shop", href: "/shop" },
            { name: category.name, href: `/${category.slug}` },
          ])),
        }}
      />
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/shop" />}>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
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

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/${category.slug}`}
            className="rounded-full border border-foreground bg-foreground px-3 py-1 text-xs font-medium text-background transition-colors"
          >
            All {category.name}
          </Link>
          {subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/${sub.slug}`}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors hover:border-foreground"
            >
              {sub.name}
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
