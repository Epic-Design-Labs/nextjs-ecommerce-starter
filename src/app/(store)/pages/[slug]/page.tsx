import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { pageRepository } from "@/lib/repositories"
import { formatDate } from "@/lib/utils"
import { siteConfig } from "@/lib/config"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = await pageRepository.list()
  return pages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await pageRepository.getBySlug(slug)
  if (!page) return { title: "Not Found" }

  return {
    title: page.title,
    description: page.excerpt ?? page.title,
    alternates: { canonical: `/pages/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.excerpt ?? page.title,
      type: "article",
      url: `${siteConfig.url}/pages/${page.slug}`,
    },
  }
}

export default async function CmsPageDetail({ params }: PageProps) {
  const { slug } = await params
  const page = await pageRepository.getBySlug(slug)
  if (!page) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Pages", href: "/pages" },
              { name: page.title, href: `/pages/${page.slug}` },
            ])
          ),
        }}
      />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/pages" />}>Pages</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{page.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="mt-6">
        <header>
          <h1 className="text-4xl font-bold tracking-tight">{page.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Updated {formatDate(page.updatedAt ?? page.publishedAt)}
          </p>
        </header>

        <div
          className="blog-body mt-10"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      </article>
    </div>
  )
}
