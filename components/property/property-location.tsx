"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

// The essential Next.js fix for Leaflet
const LeafletMap = dynamic(() => import("./LeafletMap"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 animate-pulse rounded-3xl">
      <span className="text-muted-foreground">Loading Map...</span>
    </div>
  )
})

interface PropertyLocationProps {
  address?: string
  lat?: number
  lng?: number
}

export function PropertyLocation({ 
  address = "Golem, Albania", 
  lat = 41.2500, 
  lng = 19.5200 
}: PropertyLocationProps) {
  const [zoom, setZoom] = useState(13)
  const center: [number, number] = [lat, lng]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Location</h2>
      
      {address && (
        <p className="text-muted-foreground">{address}</p>
      )}
      
      {/* Container must have relative and z-0 to contain Leaflet's high z-index layers */}
      <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-border shadow-sm z-0">
        
        <div className="h-full w-full">
          <LeafletMap center={center} zoom={zoom} />
        </div>
        
        {/* Controls: z-[1000] is required to stay above Leaflet tiles */}
        <div className="absolute left-4 top-4 flex flex-col gap-2 z-1000">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
            className="bg-background/80 backdrop-blur-md border-none shadow-md hover:bg-background rounded-xl"
          >
            <Plus className="size-4 text-foreground" />
            <span className="sr-only">Zoom in</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setZoom(prev => Math.max(prev - 1, 1))}
            className="bg-background/80 backdrop-blur-md border-none shadow-md hover:bg-background rounded-xl"
          >
            <Minus className="size-4 text-foreground" />
            <span className="sr-only">Zoom out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}