"use client"

import { useState } from "react"
import { AvailabilityTable } from "@/components/property/availability-table"
import { BookingModal } from "@/components/property/booking-modal"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

type Room = {
  id: string
  name: string
  description: string
  maxGuests: number
  price: number
  nights: number
  freeCancellation: boolean
}

interface PropertyBookingShellProps {
  propertyName: string
  price: number
  currency: string
  rooms: Room[]
}

/**
 * Thin client boundary — owns only the booking modal open/close state.
 * Renders AvailabilityTable (needs onSelectRoom callback) and the
 * mobile sticky footer Book Now button, plus the BookingModal itself.
 */
export function PropertyBookingShell({
  propertyName,
  price,
  currency,
  rooms,
}: PropertyBookingShellProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  return (
    <>
      {/* Availability table — needs a callback to open the modal */}
      <AvailabilityTable
        rooms={rooms}
        onSelectRoom={() => setBookingModalOpen(true)}
      />

      {/* Mobile sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border p-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-xl font-bold text-foreground">
              {currency}{price}
              <span className="text-sm font-normal text-muted-foreground"> / night</span>
            </p>
          </div>
          <Button onClick={() => setBookingModalOpen(true)} className="gap-2">
            <Calendar className="h-4 w-4" />
            Book Now
          </Button>
        </div>
      </div>

      {/* Spacer so content isn't hidden behind the mobile footer */}
      <div className="h-20 lg:hidden" />

      {/* Booking modal */}
      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        propertyName={propertyName}
      />
    </>
  )
}