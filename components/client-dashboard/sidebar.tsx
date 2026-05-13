'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, Heart, Settings, LogOut, X } from "lucide-react";

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/client-dashboard', icon: LayoutDashboard },
  { label: 'Profile', href: '/client-dashboard/profile', icon: User },
  { label: 'Favorites', href: '/client-dashboard/favorites', icon: Heart },
  { label: 'Settings', href: '/client-dashboard/settings', icon: Settings },
];

export function Sidebar({  className }: {  className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tighter text-blue-600">
          BUZZ<span className="text-slate-900">MANAGER</span>
        </h1>
      
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} >
              <span className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}>
                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
                <span className="font-bold">{item.label}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl h-12">
          <LogOut className="h-5 w-5" />
          <span className="font-bold">Logout</span>
        </Button>
      </div>
    </div>
  );
}