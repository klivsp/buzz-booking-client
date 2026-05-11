"use client"

import * as React from "react"
import { Search, Calendar as CalendarIcon, Users, ChevronDown, Minus, Plus } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { BookingModal } from "./booking-modal" 
import { cn } from "@/lib/utils"

interface BookingSidebarProps {
  price: number
  propertyName: string
  currency?: string
  amenities: string[]
  host: {
    name: string
    avatar?: string
    joinedDate: string
    responseRate: string
    responseTime: string
  }
  onCheckAvailability?: (data: { range: DateRange | undefined; guests: GuestState }) => void
  onBookNow?: () => void
}

interface GuestState {
  adults: number
  children: number
}

export function BookingSidebar({
  price,
  propertyName,
  currency = "€",
  amenities,
  host,
  onCheckAvailability,
  onBookNow,
}: BookingSidebarProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  })

  const [guests, setGuests] = React.useState<GuestState>({
    adults: 2,
    children: 0,
  })

  const totalGuests = guests.adults + guests.children

  const updateGuests = (type: keyof GuestState, operation: "inc" | "dec") => {
    setGuests((prev) => ({
      ...prev,
      [type]: operation === "inc" ? prev[type] + 1 : Math.max(type === "adults" ? 1 : 0, prev[type] - 1),
    }))
  }

  const handleBookNow = () => setIsModalOpen(true)

  const SelectionFields = () => (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          Dates
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-primary transition-colors h-10">
              <CalendarIcon className="size-4 text-muted-foreground shrink-0" />
              <span className="truncate text-foreground">
                {date?.from ? (
                  date.to ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d")}` : format(date.from, "MMM d")
                ) : "Select dates"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="range" selected={date} onSelect={setDate} numberOfMonths={1} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          Guests
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-primary transition-colors h-10 text-foreground">
              <span className="flex items-center gap-2 truncate">
                <Users className="size-4 text-muted-foreground shrink-0" />
                <span>{totalGuests} Guests</span>
              </span>
              <span className="flex items-center">
                <ChevronDown className="size-4 text-muted-foreground shrink-0" />
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-4" align="end">
            <div className="space-y-4">
              <GuestControl label="Adults" sub="Age 13+" value={guests.adults} onAdd={() => updateGuests("adults", "inc")} onSub={() => updateGuests("adults", "dec")} />
              <GuestControl label="Children" sub="Ages 2-12" value={guests.children} onAdd={() => updateGuests("children", "inc")} onSub={() => updateGuests("children", "dec")} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )

  return (
    <>
      <BookingModal open={isModalOpen} onOpenChange={setIsModalOpen} propertyName={propertyName} />

      {/* Main Sidebar Container - Always Flex, but only Sticky on Desktop */}
      <aside className="flex flex-col gap-4 md:sticky md:top-6 self-start w-full max-w-100">
        
        {/* Card 1: Availability - Visible on ALL screen sizes */}
        <Card className="w-full">
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center gap-2">
              <Search className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">Check Availability</h3>
            </div>
            <SelectionFields />
            <Button className="w-full" onClick={() => onCheckAvailability?.({ range: date, guests })}>
              Check Availability
            </Button>
          </CardContent>
        </Card>

        {/* Desktop-Only Section: Pricing and Host Cards */}
        <div className="hidden md:flex flex-col gap-4">
          {/* Card 2: Pricing */}
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Starting From
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold">{currency}{price}</span>
                  <span className="text-muted-foreground text-sm">/ night</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {amenities.slice(0, 4).map((amenity) => (
                  <span key={amenity} className="rounded-full border border-border px-3 py-1 text-[11px] font-medium">
                    {amenity}
                  </span>
                ))}
              </div>

              <Button className="w-full font-bold" size="lg" onClick={handleBookNow}>
                Book Now
              </Button>
            </CardContent>
          </Card>

          {/* Card 3: Host */}
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h3 className="text-lg font-semibold">Property Host</h3>
              <div className="flex items-center gap-3">
                <Avatar className="size-12 border-2 border-primary/10">
                  <AvatarImage src={host.avatar} />
                  <AvatarFallback className="bg-primary/5 text-primary">
                    {host.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{host.name}</p>
                  <p className="text-xs text-muted-foreground">Joined {host.joinedDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 text-sm border-t border-border/50 mt-2">
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold">Response Rate</p>
                  <p className="font-semibold text-green-600">{host.responseRate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold">Response Time</p>
                  <p className="font-semibold">{host.responseTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* MOBILE STICKY BOTTOM BAR - Untouched as requested */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-md p-4 md:hidden flex items-center justify-between px-6 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col">
          <span className="text-xl font-bold">{currency}{price}</span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Per Night</span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="lg" className="rounded-full px-10 font-bold">Reserve</Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-[94vw] mb-4 p-5 rounded-2xl shadow-2xl" align="center">
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">Booking Details</h4>
                  <span className="text-primary font-semibold">{currency}{price}/night</span>
                </div>
                <SelectionFields />
                <Button className="w-full h-12 text-md font-bold" onClick={handleBookNow}>
                  Check Availability & Book
                </Button>
             </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

function GuestControl({ label, sub, value, onAdd, onSub }: { label: string; sub: string; value: number; onAdd: () => void; onSub: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-[10px] text-muted-foreground">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="size-8 rounded-full" onClick={onSub} disabled={label === "Adults" ? value <= 1 : value <= 0}>
          <Minus className="size-3" />
        </Button>
        <span className="text-sm font-bold w-4 text-center">{value}</span>
        <Button variant="outline" size="icon" className="size-8 rounded-full" onClick={onAdd}>
          <Plus className="size-3" />
        </Button>
      </div>
    </div>
  )
}