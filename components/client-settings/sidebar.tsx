"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, CalendarDays,
  BarChart3, MessageSquare, Settings, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { id: 'properties', icon: Building2,      label: 'Properties', href: '/properties' },
  { id: 'bookings',   icon: CalendarDays,   label: 'Bookings',   href: '/bookings' },
  { id: 'analytics',  icon: BarChart3,      label: 'Analytics',  href: '/analytics' },
  { id: 'messages',   icon: MessageSquare,  label: 'Messages',   href: '/messages' },
  { id: 'settings',   icon: Settings,       label: 'Settings',   href: '/settings' },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  // Helper to determine if the link is active
  const checkActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex flex-col h-full bg-white border-r p-6">
      {/* Brand Section */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
          B
        </div>
        <span className="text-xl font-extrabold tracking-tight text-slate-900">
          Buzz<span className="text-blue-600">Manager</span>
        </span>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = checkActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl text-sm font-semibold h-12 px-3 transition-all duration-200 group",
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform group-hover:scale-110",
                isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions Section */}
      <div className="pt-6 mt-6 border-t border-slate-100">
        <button
          onClick={() => {
            /* Handle Logout Logic */
            onClose?.();
          }}
          className="flex w-full items-center gap-3 rounded-xl text-sm font-semibold h-12 px-3 text-black hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}