// Re-export the JSON-backed repositories as the default implementations.
// To swap backends (database, CMS, API), implement the same interfaces
// and change these exports.

export { jsonProductRepository as productRepository } from "./json-product-repository"
export { jsonCategoryRepository as categoryRepository } from "./json-category-repository"
export { jsonBrandRepository as brandRepository } from "./json-brand-repository"
export { jsonPageRepository as pageRepository } from "./json-page-repository"
export { jsonBlogRepository as blogRepository } from "./json-blog-repository"
