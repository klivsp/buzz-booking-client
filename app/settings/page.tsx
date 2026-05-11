'use client'
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { SettingsTabs } from "@/components/settings/settings-tabs"

// Initial data would typically come from a DB/session server-side
const defaultProfile = {
  fullName: "Traveler Guest",
  email: "guest.user@example.com",
  phone: "+355 69 123 4567",
  language: "english",
  bio:""
}

const defaultNotifications = {
  emailBookings: true,
  emailPromotions: false,
  smsBookings: true,
  smsReminders: true,
  pushNotifications: true,
}

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header — purely presentational, stays in the server component */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Manage your account settings and preferences.
            </p>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <Save className="h-4 w-4" />
            Save All Changes
          </Button>
        </div>

        {/* Interactive tabs isolated in a Client Component */}
        <SettingsTabs
          defaultProfile={defaultProfile}
          defaultNotifications={defaultNotifications}
        />
      </div>
    </MainLayout>
  )
}