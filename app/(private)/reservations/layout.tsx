import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
