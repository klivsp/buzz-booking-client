"use client"

import { CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  propertyName: string
}

export function BookingModal({ open, onOpenChange, propertyName }: BookingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-125 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 sm:space-y-4">
          <div className="mx-auto flex size-12 sm:size-14 items-center justify-center rounded-xl border-2 border-primary bg-primary/5">
            <CheckCircle className="size-6 sm:size-7 text-primary" />
          </div>
          <div className="text-center">
            <DialogTitle className="text-lg sm:text-xl font-bold">Complete your stay</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {"You're just one step away from your stay at "}
              <span className="font-semibold text-foreground">{propertyName}</span>
            </p>
          </div>
        </DialogHeader>

        <form className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wide">
                First Name
              </Label>
              <Input 
                id="firstName" 
                placeholder="Enter your first name"
                className="bg-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wide">
                Last Name
              </Label>
              <Input 
                id="lastName" 
                placeholder="Enter your last name"
                className="bg-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookingEmail" className="text-xs font-medium uppercase tracking-wide">
              Email Address
            </Label>
            <Input 
              id="bookingEmail" 
              type="email" 
              placeholder="name@example.com"
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-wide">
              Phone Number
            </Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+355 6X XXX XXXX"
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-xs font-medium uppercase tracking-wide">
              Special Requests (Optional)
            </Label>
            <Textarea 
              id="specialRequests" 
              placeholder="Tell us about any special requests or preferences..."
              className="min-h-17.5 sm:min-h-20 resize-none bg-input"
            />
          </div>

          <Button type="submit" className="w-full rounded-lg font-semibold">
            Complete Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
