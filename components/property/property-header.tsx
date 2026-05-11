"use client"

import { MapPin, Star, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PropertyHeaderProps {
  name: string
  rating: number
  location: string
  onReserve?: () => void // This is the function that will open the modal
}

export function PropertyHeader({ name, rating, location, onReserve }: PropertyHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">{name}</h1>
          <div className="flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-sm font-medium text-success">
            <Star className="size-3.5 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" />
          <span className="text-sm">{location}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 sm:mt-0">
        <Button variant="outline" size="icon" className="rounded-lg">
          <Share2 className="size-4" />
          <span className="sr-only">Share</span>
        </Button>
        <Button variant="outline" size="icon" className="rounded-lg">
          <Heart className="size-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
        <Button 
          className="rounded-lg px-6 font-semibold uppercase tracking-wide"
          onClick={onReserve} // Triggers the modal open state in the parent
        >
          Reserve Stay
        </Button>
      </div>
    </div>
  )
}