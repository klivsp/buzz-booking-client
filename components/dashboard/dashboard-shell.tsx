"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="flex items-center justify-between border-b bg-background px-4 py-3 sm:px-6">
        <Link
          href="/dashboard"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Buzz booking
        </Link>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={async () => {
            await logout();
            router.replace("/login");
          }}
        >
          Log out
        </Button>
      </header>
      <main className="flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
