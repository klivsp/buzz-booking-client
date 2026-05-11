"use client"

import { useState } from "react"
import { 
  Calendar, Heart, Clock, User, MapPin, Star, 
  ArrowRight, Search, LayoutGrid, Sliders 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type Favorite = {
  id: string
  name: string
  location: string
  rating: number
  price: number
  image: string
}

type Activity = {
  id: string
  action: string
  property: string
  date: string
}

interface DashboardTabsProps {
  favorites: Favorite[]
  activities: Activity[]
}

export function DashboardTabs({ favorites, activities }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("bookings")

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        
        {/* REFINED NAVIGATION BAR */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your Activity</h2>
            <p className="text-slate-500 mt-1">Track your upcoming trips and saved stays.</p>
          </div>

          <TabsList className="h-12 p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl border border-slate-200 w-full md:w-auto grid grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="bookings" className="px-4 py-2 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-sm transition-all">
              <Calendar className="h-4 w-4 shrink-0" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="favorites" className="px-4 py-2 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-sm transition-all">
              <Heart className="h-4 w-4 shrink-0" /> Favorites
            </TabsTrigger>
            <TabsTrigger value="activity" className="px-4 py-2 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-sm transition-all">
              <Clock className="h-4 w-4 shrink-0" /> Log
            </TabsTrigger>
            <TabsTrigger value="preferences" className="px-4 py-2 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-sm transition-all">
              <User className="h-4 w-4 shrink-0" /> Prefs
            </TabsTrigger>
          </TabsList>
        </div>

        {/* --- BOOKINGS CONTENT --- */}
        <TabsContent value="bookings" className="mt-8 outline-none">
          <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white/70 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="h-24 w-24 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-inner">
                  <Calendar className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Plan your next escape</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  You don&apos;t have any active bookings right now. Time to explore some beautiful coastal apartments!
                </p>
                <Link href="/properties">
                  <Button className="h-12 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/10 group">
                    Start Searching <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- FAVORITES CONTENT --- */}
        <TabsContent value="favorites" className="mt-8 outline-none">
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((property) => (
                <Card key={property.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden aspect-4/3">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="h-10 w-10 rounded-2xl bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-red-500 hover:scale-110 transition-transform">
                        <Heart className="h-5 w-5 fill-current" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur text-slate-900 hover:bg-white px-3 py-1 rounded-xl border-none font-bold">
                        <Star className="h-3.5 w-3.5 mr-1 fill-amber-400 text-amber-400" />
                        {property.rating}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 truncate">{property.name}</h3>
                      <div className="flex items-center text-sm text-slate-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                        {property.location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <p className="font-bold text-lg">
                        €{property.price} <span className="text-xs font-normal text-slate-400">/ night</span>
                      </p>
                      <Button variant="ghost" size="sm" className="rounded-xl text-slate-900 font-bold hover:bg-slate-50">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white/70 rounded-[2.5rem] p-12">
               <div className="flex flex-col items-center justify-center text-center py-10">
                <Heart className="h-12 w-12 text-slate-200 mb-4" />
                <p className="text-slate-500">Your favorites list is empty.</p>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* --- ACTIVITY LOG --- */}
        <TabsContent value="activity" className="mt-8 outline-none">
          <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white/70 rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8 md:p-12 space-y-6">
              {activities.map((activity, idx) => (
                <div key={activity.id} className="group">
                  <div className="flex items-center justify-between py-4 px-2 rounded-2xl hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{activity.action}</p>
                        <p className="text-sm text-slate-500">{activity.property}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      {activity.date}
                    </span>
                  </div>
                  {idx !== activities.length - 1 && <Separator className="mt-2 opacity-50" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- PREFERENCES --- */}
        <TabsContent value="preferences" className="mt-8 outline-none">
          <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white/70 rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8 md:p-12 space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-900 rounded-2xl text-white">
                    <Sliders className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Booking Preferences</h3>
                </div>
                <Link href="/settings">
                  <Button variant="outline" className="rounded-xl border-slate-200 shadow-sm">
                    Modify Settings
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Property Style", value: "Modern Apartments, Luxury Villas", icon: LayoutGrid },
                  { label: "Search Radius", value: "Within 5km of city center", icon: MapPin },
                  { label: "Price Range", value: "€80 — €250 / night", icon: Search },
                  { label: "Travel Type", value: "Leisure & Weekend Getaways", icon: Star },
                ].map((pref, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-start gap-4">
                    <div className="mt-1">
                      <pref.icon className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{pref.label}</p>
                      <p className="font-semibold text-slate-900">{pref.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}