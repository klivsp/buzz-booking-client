"use client"

import { User, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RoomType {
  id: string
  name: string
  description: string
  maxGuests: number
  price: number
  currency?: string
  nights?: number
  freeCancellation?: boolean
}

interface AvailabilityTableProps {
  rooms: RoomType[]
  onSelectRoom?: (roomId: string) => void
}

export function AvailabilityTable({ rooms, onSelectRoom }: AvailabilityTableProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-foreground">Availability</h2>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="w-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Accommodation Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Sleeps
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Price for {rooms[0]?.nights || 7} Nights
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Your Choices
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr 
                    key={room.id}
                    className="cursor-pointer hover:bg-muted/30 transition-colors border-b last:border-0"
                    onClick={() => onSelectRoom?.(room.id)}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-primary hover:underline">{room.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{room.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: room.maxGuests }).map((_, i) => (
                          <User key={i} className="size-4 text-muted-foreground" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {room.currency || "€"}{room.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Includes taxes and charges
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {room.freeCancellation && (
                        <div className="flex items-center gap-2 text-success">
                          <Check className="size-4" />
                          <span className="text-sm font-medium uppercase">Free Cancellation</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y">
            {rooms.map((room) => (
              <div 
                key={room.id}
                className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => onSelectRoom?.(room.id)}
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-primary">{room.name}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{room.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-foreground">
                      {room.currency || "€"}{room.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      for {room.nights || 7} nights
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Sleeps:</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: room.maxGuests }).map((_, i) => (
                        <User key={i} className="size-3.5 text-muted-foreground" />
                      ))}
                    </div>
                  </div>
                  
                  {room.freeCancellation && (
                    <div className="flex items-center gap-1.5 text-success">
                      <Check className="size-3.5" />
                      <span className="text-xs font-medium">Free Cancel</span>
                    </div>
                  )}
                </div>

                <Button size="sm" className="w-full mt-3">
                  Select
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
