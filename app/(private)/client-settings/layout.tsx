import Sidebar from "@/components/client-settings/sidebar";
import { MobileHeader } from "@/components/client-settings/mobile-navbar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50/50">
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Mobile header — visible only on mobile */}
      <MobileHeader />

      {/* Main content */}
      <main className="flex-1 w-full min-w-0">
        <div className="h-full p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}