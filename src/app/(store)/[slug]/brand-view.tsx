import Link from "next/link"
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
import type { Brand, Product, PaginationMeta } from "@/types"

interface BrandViewProps {
  brand: Brand
  products: Product[]
  pagination: PaginationMeta
}

export function BrandView({ brand, products, pagination }: BrandViewProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/brands" />}>Brands</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{brand.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-2">
        <h1 className="text-3xl font-bold tracking-tight">{brand.name}</h1>
        <p className="mt-2 text-muted-foreground">
          {brand.description}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {pagination.total} {pagination.total === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="mt-6">
        <ProductGrid products={products} />
      </div>

      <div className="mt-12">
        <Pagination pagination={pagination} basePath={`/${brand.slug}`} />
      </div>
    </div>
  )
}
