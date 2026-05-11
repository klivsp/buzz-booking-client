'use client'
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings } from "lucide-react"
import Link from "next/link"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

// In a real app, these would be fetched server-side (e.g. via DB or API)
const favorites = [
  {
    id: "1",
    name: "Seaside Villa",
    location: "Durres, Albania",
    rating: 9.4,
    price: 85,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Mountain Retreat",
    location: "Theth, Albania",
    rating: 9.1,
    price: 65,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
  },
]

const activities = [
  {
    id: "1",
    action: "Viewed property",
    property: "Brezdeti Apartments",
    date: "2 hours ago",
  },
  {
    id: "2",
    action: "Added to favorites",
    property: "Seaside Villa",
    date: "1 day ago",
  },
  {
    id: "3",
    action: "Searched for",
    property: "Hotels in Golem",
    date: "3 days ago",
  },
]

const user = {
  name: "Traveler Guest",
  email: "guest.user@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=traveler",
  type: "leisure traveler",
  language: "English",
  currency: "EUR",
}

// This is now a Server Component — no "use client" needed
export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Profile Header Card — purely presentational, no interactivity */}
        <Card className="mb-6 lg:mb-8 overflow-hidden">
          <div className="bg-linear-to-r from-primary/5 to-primary/10 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-card shadow-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>TG</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {user.name}
                  </h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-0"
                    >
                      {user.type}
                    </Badge>
                    <Badge variant="outline">{user.language}</Badge>
                    <Badge variant="outline">{user.currency}</Badge>
                  </div>
                </div>
              </div>
              <Link href="/settings" className="self-center sm:self-start">
                <Button variant="outline" className="gap-2 bg-card">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Interactive tabs are isolated in a Client Component */}
        <DashboardTabs favorites={favorites} activities={activities} />
      </div>
    </MainLayout>
  )
}
