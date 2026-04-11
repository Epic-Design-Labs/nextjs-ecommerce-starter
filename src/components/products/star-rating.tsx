import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "default"
}

export function StarRating({ rating, reviewCount, size = "default" }: StarRatingProps) {
  const starSize = size === "sm" ? "h-3 w-3" : "h-4 w-4"
  const textSize = size === "sm" ? "text-xs" : "text-sm"

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating)
          const half = !filled && star === Math.ceil(rating) && rating % 1 >= 0.5

          return (
            <Star
              key={star}
              className={cn(
                starSize,
                filled
                  ? "fill-rating text-rating"
                  : half
                    ? "fill-rating/50 text-rating"
                    : "fill-none text-neutral-300"
              )}
            />
          )
        })}
      </div>
      {reviewCount !== undefined && (
        <span className={cn("text-muted-foreground", textSize)}>
          ({reviewCount})
        </span>
      )}
    </div>
  )
}
