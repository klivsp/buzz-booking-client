"use client"
import { MainLayout } from "@/components/layout/main-layout"
import { PropertyHeader } from "@/components/property/property-header"
import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyStats } from "@/components/property/property-stats"
import { PropertyAbout } from "@/components/property/property-about"
import { PropertyFacilities } from "@/components/property/property-facilities"
import { PropertyHouseRules } from "@/components/property/property-house-rules"
import { PropertyLocation } from "@/components/property/property-location"
import { ContactHost } from "@/components/property/contact-host"
import { PropertyReviews } from "@/components/property/property-reviews"
import { BookingSidebar } from "@/components/property/booking-sidebar"
import { PropertyBookingShell } from "@/components/property/property-booking-shell"
import { BookingModal } from "@/components/property/booking-modal"
import dynamic from "next/dynamic";

// In a real app: const propertyData = await fetchProperty(params.id)
const propertyData = {
  id: "brezdeti-apartments",
  name: "Brezdeti Apartments",
  rating: 9.2,
  location: "Golem, Albania",
  lat: 41.2500, 
  lng: 19.5200,
  description:
    "Located in Golem, Brezdeti Apartments offers accommodation with a terrace or a balcony, free WiFi and flat-screen TV, as well as a private beach area and a garden. Each unit is fitted with air conditioning, private bathroom and a kitchen including a fridge, oven and a stovetop.",
  images: [
    { src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=1000&fit=crop", alt: "Green plant leaves" },
    { src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop", alt: "Laptop on desk" },
    { src: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop", alt: "Seagull flying" },
    { src: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop", alt: "Water droplets on leaf" },
    { src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop", alt: "Wooden sign" },
  ],
  stats: { occupancy: 88, revenue: "$4.2k", rating: 9.2 },
  price: 65,
  currency: "€",
  amenities: ["Free WiFi", "Beachfront", "Free parking", "Air conditioning"],
  facilities: [
    "Free WiFi", "Beachfront", "Free parking", "Air conditioning",
    "Kitchen", "Flat-screen TV", "Private bathroom", "Garden",
  ],
  host: {
    name: "Besnik",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Besnik",
    joinedDate: "May 2019",
    responseRate: "100%",
    responseTime: "Within a few hours",
    phone: "+355 69 123 4567",
    email: "host@example.com",
  },
  houseRules: [
    { icon: "clock" as const, title: "Check-in", description: "After 2:00 PM" },
    { icon: "clock" as const, title: "Check-out", description: "Before 11:00 AM" },
    { icon: "info" as const, title: "Smoking", description: "No smoking allowed" },
    { icon: "users" as const, title: "Parties", description: "No parties or events" },
  ],
  importantInfo:
    "Please inform Brezdeti Apartments in advance of your expected arrival time. You can use the Special Requests box when booking, or contact the property directly with the contact details provided in your confirmation.",
  reviews: {
    overall: 9.2,
    total: 1,
    categories: [
      { name: "Cleanliness", score: 9.5 },
      { name: "Location", score: 9.8 },
      { name: "Service", score: 9.0 },
      { name: "Value", score: 9.2 },
    ],
    items: [
      {
        id: "1",
        author: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        date: "March 2024",
        rating: 10.0,
        comment: "Amazing location right by the beach. The apartment was clean and very comfortable.",
      },
    ],
  },
  rooms: [
    { id: "1", name: "One-Bedroom Apartment", description: "1 large double bed, 1 sofa bed", maxGuests: 4, price: 455, nights: 7, freeCancellation: true },
    { id: "2", name: "Studio Apartment", description: "1 large double bed", maxGuests: 2, price: 315, nights: 7, freeCancellation: false },
    { id: "3", name: "Two-Bedroom Apartment", description: "2 large double beds, 1 sofa bed", maxGuests: 6, price: 665, nights: 7, freeCancellation: true },
  ],
}

const LeafletMap = dynamic(() => import("@/components/property/LeafletMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />, // optional nice loader
});

export default function PropertyDetailsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">

          {/* Header — PropertyHeader needs onReserve, so we wrap it inside the client shell */}
          <div className="rounded-xl bg-card p-4 sm:p-6 shadow-sm border border-border">
            <PropertyHeader
              name={propertyData.name}
              rating={propertyData.rating}
              location={propertyData.location}
              
              // onReserve wired up inside PropertyBookingShell via a shared trigger
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_340px]">
            {/* Left Column — all static, rendered on the server */}
            <div className="space-y-4 sm:space-y-6">
              <PropertyGallery images={propertyData.images} />
              <PropertyStats
                occupancy={propertyData.stats.occupancy}
                revenue={propertyData.stats.revenue}
                rating={propertyData.stats.rating}
              />
              <PropertyAbout description={propertyData.description} />
              <PropertyFacilities facilities={propertyData.facilities} />
              <PropertyHouseRules
                rules={propertyData.houseRules}
                importantInfo={propertyData.importantInfo}
              />
              {/* Find the PropertyLocation tag around line 114 */}
              <PropertyLocation 
               address={propertyData.location} 
               lat={propertyData.lat}
               lng={propertyData.lng}
              />
              <ContactHost
                hostName={propertyData.host.name}
                phone={propertyData.host.phone}
                email={propertyData.host.email}
                hasWhatsApp={true}
                website="brezdeti.com"
              />
              <PropertyReviews
                overallRating={propertyData.reviews.overall}
                totalReviews={propertyData.reviews.total}
                categories={propertyData.reviews.categories}
                reviews={propertyData.reviews.items}
              />

              {/*
               * AvailabilityTable + BookingModal + mobile sticky footer all share
               * the same open/close state, so they live inside the client shell.
               */}
              <PropertyBookingShell
                propertyName={propertyData.name}
                price={propertyData.price}
                currency={propertyData.currency}
                rooms={propertyData.rooms}
              />
            </div>

            {/* Right Column — BookingSidebar is static display; onBookNow triggers the modal */}
            <div className="hidden lg:block">
              <BookingSidebar
                propertyName={propertyData.name}
                price={propertyData.price}
                currency={propertyData.currency}
                amenities={propertyData.amenities}
                host={propertyData.host}
                onCheckAvailability={() => {}}
                // onBookNow also needs to open the modal — move BookingSidebar
                // inside PropertyBookingShell if you want it wired up too.
                onBookNow={() => {}}
                
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}