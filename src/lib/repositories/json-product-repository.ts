import type {
  Product,
  ProductFilters,
  ProductRepository,
  SortOption,
  PaginationParams,
  PaginatedResult,
} from "@/types"
import data from "@/data/products.json"

const products = data.products as Product[]

function applyFilters(items: Product[], filters?: ProductFilters): Product[] {
  if (!filters) return items

  let result = items.filter((p) => p.status === "active")

  if (filters.category) {
    const category = data.categories.find((c) => c.slug === filters.category)
    if (category) {
      result = result.filter((p) => p.categoryIds.includes(category.id))
    }
  }

  if (filters.priceRange) {
    const { min, max } = filters.priceRange
    result = result.filter((p) => {
      const price = p.variants[0]?.price ?? 0
      if (min !== undefined && price < min) return false
      if (max !== undefined && price > max) return false
      return true
    })
  }

  if (filters.inStock !== undefined) {
    result = result.filter((p) =>
      p.variants.some((v) =>
        filters.inStock
          ? v.inventory.quantity > 0 || v.inventory.allowBackorder
          : true
      )
    )
  }

  if (filters.search) {
    const query = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    )
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((p) =>
      filters.tags!.some((t) => p.tags.includes(t))
    )
  }

  return result
}

function applySort(items: Product[], sort?: SortOption): Product[] {
  if (!sort) return items

  return [...items].sort((a, b) => {
    let comparison = 0

    switch (sort.field) {
      case "price": {
        const priceA = a.variants[0]?.price ?? 0
        const priceB = b.variants[0]?.price ?? 0
        comparison = priceA - priceB
        break
      }
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "createdAt":
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
      default:
        comparison = 0
    }

    return sort.order === "desc" ? -comparison : comparison
  })
}

function paginate<T>(
  items: T[],
  pagination?: PaginationParams
): PaginatedResult<T> {
  const page = pagination?.page ?? 1
  const limit = pagination?.limit ?? 12
  const total = items.length
  const totalPages = Math.ceil(total / limit)
  const offset = (page - 1) * limit
  const paginatedItems = items.slice(offset, offset + limit)

  return {
    items: paginatedItems,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

export const jsonProductRepository: ProductRepository = {
  async list(filters, sort, pagination) {
    let result = applyFilters(products, filters)
    result = applySort(result, sort)
    return paginate(result, pagination)
  },

  async getBySlug(slug) {
    return products.find((p) => p.slug === slug && p.status === "active") ?? null
  },

  async getById(id) {
    return products.find((p) => p.id === id) ?? null
  },

  async getFeatured(limit = 4) {
    return products
      .filter((p) => p.featured && p.status === "active")
      .slice(0, limit)
  },

  async getByCategory(categorySlug, pagination) {
    const category = data.categories.find((c) => c.slug === categorySlug)
    if (!category) return paginate([], pagination)

    const categoryProducts = products.filter(
      (p) => p.categoryIds.includes(category.id) && p.status === "active"
    )
    return paginate(categoryProducts, pagination)
  },

  async search(query, pagination) {
    const filtered = applyFilters(products, { search: query })
    return paginate(filtered, pagination)
  },
}
