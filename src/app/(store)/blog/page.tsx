import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/ui/page-header"
import { Pagination } from "@/components/products/pagination"
import { blogRepository } from "@/lib/repositories"
import { formatDate } from "@/lib/utils"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { siteConfig } from "@/lib/config"

interface BlogIndexProps {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({
  searchParams,
}: BlogIndexProps): Promise<Metadata> {
  const params = await searchParams
  const page = Number(params.page) || 1
  const canonical =
    page > 1 ? `${siteConfig.url}/blog?page=${page}` : `${siteConfig.url}/blog`
  return {
    title: "Blog",
    description:
      "Guides, stories, and notes from the team — sustainability, product care, and behind the scenes.",
    alternates: { canonical },
  }
}

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  const params = await searchParams
  const page = Number(params.page) || 1

  const { items: posts, pagination } = await blogRepository.list({
    page,
    limit: 9,
  })

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Blog"
        description={`${pagination.total} ${pagination.total === 1 ? "post" : "posts"}`}
      />

      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            {/* 16:10 thumb */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={post.coverImage?.url ?? PLACEHOLDER_IMAGE}
                alt={post.coverImage?.alt ?? post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span>·</span>
                <span>{post.author}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold leading-snug text-foreground group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <Pagination pagination={pagination} basePath="/blog" />
      </div>
    </div>
  )
}
