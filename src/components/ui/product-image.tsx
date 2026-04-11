"use client"

import { useState } from "react"
import Image from "next/image"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface ProductImageProps {
  src?: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  className?: string
}

export function ProductImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes,
  priority,
  className,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER_IMAGE)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
    />
  )
}
