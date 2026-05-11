"use client"

import { AppSidebar } from "./app-sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      {/* pt-14 for mobile header, lg:pt-0 for desktop */}
      <main className="pt-14 lg:pt-0 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
