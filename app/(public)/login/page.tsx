import { Suspense } from "react";
import { GuestGuard } from "@/components/auth/guest-guard";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 py-16">
        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Loading…</div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </GuestGuard>
  );
}
