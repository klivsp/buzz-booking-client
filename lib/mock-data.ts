// lib/mock-data.ts
import { UserProfile, Property } from "@/types/room";

export const MOCK_USER: UserProfile = {
  id: "u1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://github.com/shadcn.png",
  preferences: {
    language: "English",
    currency: "EUR",
    notifications: true,
    travelType: "leisure"
  },
  favorites: ["p1"],
  reservations: [
    {
      id: "res1",
      propertyId: "p1",
      propertyName: "Luxury Villa",
      propertyImage: "https://images.unsplash.com/photo-1580587767073-41ce69a6862a?q=80&w=1000",
      roomType: "Suite",
      checkIn: "2026-06-01",
      checkOut: "2026-06-10",
      status: "confirmed",
      totalPrice: 1200
    }
  ],
  activities: [
    {
      id: "a1",
      type: "booking",
      description: "Booked Luxury Villa",
      timestamp: new Date().toISOString()
    }
  ]
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Luxury Villa",
    location: "Tirana, Albania",
    pricePerNight: 150,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1580587767073-41ce69a6862a?q=80&w=1000"],
    features: ["Pool", "WiFi", "Parking"]
  }
];