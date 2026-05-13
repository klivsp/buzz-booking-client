import Sidebar from "@/components/client-settings/sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      <main className="flex-1 w-full">
        <div className="h-full p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}