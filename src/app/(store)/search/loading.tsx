import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <Skeleton className="h-9 w-32" />
      <Skeleton className="mt-8 h-10 w-full max-w-lg" />
    </div>
  )
}
