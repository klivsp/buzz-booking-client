// app/(private)/layout.tsx
import { AuthGuard } from "@/components/auth/auth-guard";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // return <AuthGuard>{children}</AuthGuard>; // Comment this out
  return <>{children}</>; // Return children directly
}
