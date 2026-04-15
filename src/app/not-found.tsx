import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { categoryRepository } from "@/lib/repositories"

export default async function NotFound() {
  // Fetch categories so the header nav still works on 404
  const categories = await categoryRepository.list()

  return (
    <>
      <AnnouncementBar />
      <Header categories={categories} />
      <main className="flex-1">
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Page not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
