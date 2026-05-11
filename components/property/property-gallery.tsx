"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface PropertyGalleryProps {
  images: {
    src: string
    alt: string
  }[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  // Ensure we have at least 5 images for the gallery layout
  const galleryImages = images.slice(0, 5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-xl overflow-hidden">
      {/* Main large image */}
      <div className="md:col-span-1 md:row-span-2 relative aspect-[3/4] md:aspect-auto md:h-full">
        {galleryImages[0] && (
          <Image
            src={galleryImages[0].src}
            alt={galleryImages[0].alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>

      {/* Grid of smaller images */}
      <div className="hidden md:grid md:col-span-2 md:grid-cols-2 gap-2">
        {galleryImages.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-[4/3] overflow-hidden",
              index === 0 && "rounded-tr-none",
              index === 1 && "rounded-none",
              index === 3 && "rounded-br-none"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
