'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Added LogOut and LifeBuoy (Help) icons
import { LayoutDashboard, Building2, CalendarDays, BarChart3, MessageSquare, Settings, LifeBuoy, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { id: 'properties', icon: Building2, label: 'Properties', href: '/properties' },
  { id: 'bookings', icon: CalendarDays, label: 'Bookings', href: '/bookings' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { id: 'messages', icon: MessageSquare, label: 'Messages', href: '/messages' },
  { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Logic for clearing Redux state / Auth tokens
    console.log("Logging out...");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-6 left-6 z-60 p-2 glass rounded-xl shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden" onClick={toggleSidebar} />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-55 glass border-r border-glass-border flex flex-col transition-all duration-300",
        isOpen ? "translate-x-0 w-64 p-6" : "-translate-x-full md:translate-x-0",
        "md:sticky md:top-0 md:h-screen md:w-20 md:p-4 lg:w-64 lg:p-6"
      )}>
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-10 overflow-hidden px-2">
          <div className="w-10 h-10 bg-glass-accent rounded-xl flex items-center justify-center text-white font-black text-xl shrink-0">B</div>
          <span className="text-xl font-extrabold text-glass-accent lg:block hidden">BuzzManager</span>
        </div>
        
        {/* Primary Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl text-sm font-semibold h-12 px-3 transition-all",
                  isActive ? "bg-white text-glass-accent shadow-sm" : "text-slate-500 hover:bg-white/40"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-glass-accent" : "text-slate-400")} />
                <span className="lg:block hidden">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* --- BOTTOM SECTION (Help & Logout) --- */}
        <div className="pt-4 mt-4 border-t border-glass-border space-y-2">
          {/* Help/Support Link */}
          <Link
            href="/support"
            className="flex items-center gap-3 rounded-xl text-sm font-semibold h-12 px-3 text-slate-500 hover:bg-white/40 transition-all"
          >
            <LifeBuoy className="h-5 w-5 shrink-0 text-slate-400" />
            <span className="lg:block hidden">Help & Support</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl text-sm font-semibold h-12 px-3 text-red-500 hover:bg-red-50/50 transition-all"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="lg:block hidden">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}