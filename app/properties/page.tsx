"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Search, SlidersHorizontal, Heart, } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const properties = [
  {
    id: "brezdeti-apartments",
    name: "Brezdeti Apartments",
    location: "Golem, Albania",
    rating: 9.2,
    reviews: 24,
    price: 65,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Beachfront", "Free parking"],
    type: "Apartment"
  },
  {
    id: "seaside-villa",
    name: "Seaside Villa Resort",
    location: "Durres, Albania",
    rating: 8.9,
    reviews: 56,
    price: 120,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    amenities: ["Pool", "Spa", "Restaurant"],
    type: "Villa"
  },
  {
    id: "mountain-retreat",
    name: "Mountain Retreat Lodge",
    location: "Theth, Albania",
    rating: 9.5,
    reviews: 18,
    price: 85,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
    amenities: ["Mountain view", "Hiking trails", "Fireplace"],
    type: "Lodge"
  },
  {
    id: "city-center-hotel",
    name: "City Center Hotel",
    location: "Tirana, Albania",
    rating: 8.7,
    reviews: 142,
    price: 75,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    amenities: ["Central location", "Restaurant", "Gym"],
    type: "Hotel"
  },
  {
    id: "coastal-apartment",
    name: "Coastal Breeze Apartment",
    location: "Saranda, Albania",
    rating: 9.0,
    reviews: 31,
    price: 55,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    amenities: ["Sea view", "Air conditioning", "Kitchen"],
    type: "Apartment"
  },
  {
    id: "historic-guesthouse",
    name: "Historic Guesthouse",
    location: "Berat, Albania",
    rating: 9.3,
    reviews: 27,
    price: 45,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    amenities: ["Historic building", "Garden", "Breakfast included"],
    type: "Guesthouse"
  }
]

function getRatingLabel(rating: number) {
  if (rating >= 9) return "Excellent"
  if (rating >= 8) return "Very Good"
  if (rating >= 7) return "Good"
  return "Pleasant"
}

export default function PropertiesPage() {
  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground mt-1">Browse and manage your property listings</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search properties..." 
                  className="pl-9 bg-secondary/50"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {properties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative aspect-4/3">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button 
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <Badge className="absolute top-3 left-3 bg-white text-foreground">
                    {property.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-1">{property.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {property.rating}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    {getRatingLabel(property.rating)} · {property.reviews} reviews
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs font-normal">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <span className="text-lg font-bold text-foreground">€{property.price}</span>
                      <span className="text-sm text-muted-foreground"> / night</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
