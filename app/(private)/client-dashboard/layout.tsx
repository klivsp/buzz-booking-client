import { Sidebar } from "@/components/client-dashboard/sidebar";
import { MobileHeader } from "@/components/client-dashboard/mobile-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden lg:flex w-72 flex-col border-r bg-white">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <MobileHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}