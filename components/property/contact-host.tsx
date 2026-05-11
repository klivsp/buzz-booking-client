"use client"

import { Phone, Mail, MessageCircle, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactHostProps {
  hostName: string
  phone?: string
  email?: string
  hasWhatsApp?: boolean
  website?: string
}

export function ContactHost({ hostName, phone, email, hasWhatsApp, website }: ContactHostProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Contact the host</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Have questions about the property? Reach out to {hostName} directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {phone && (
                <div className="flex items-start gap-3">
                  <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground truncate">{phone}</p>
                  </div>
                </div>
              )}
              
              {email && (
                <div className="flex items-start gap-3">
                  <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full border border-success/30 bg-success/5">
                    <Mail className="size-4 text-success" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground truncate">{email}</p>
                  </div>
                </div>
              )}

              {hasWhatsApp && (
                <div className="flex items-start gap-3">
                  <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full border border-pink-500/30 bg-pink-500/5">
                    <MessageCircle className="size-4 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-pink-500">WhatsApp</p>
                    <p className="text-sm font-medium text-foreground">Chat with us</p>
                  </div>
                </div>
              )}

              {website && (
                <div className="flex items-start gap-3">
                  <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/5">
                    <Globe className="size-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-amber-500">Website</p>
                    <p className="text-sm font-medium text-foreground">Visit official site</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Your Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Your Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm">Message</Label>
              <Textarea 
                id="message" 
                placeholder="I have a question about..." 
                className="min-h-[80px] sm:min-h-[100px] resize-none"
              />
            </div>
            <Button className="w-full rounded-lg">
              Send Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
