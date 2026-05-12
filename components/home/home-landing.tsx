"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyRegisterDialog } from "@/components/home/property-register-dialog";
import { SignUpDialog } from "@/components/home/sign-up-dialog";

export function HomeLanding() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-background to-muted/40 px-6 py-24">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Buzz booking
          </p>
          <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Manage bookings in one calm place
          </h1>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Sign in, create an account, or list a property to get started.
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-3">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="w-full sm:flex-1">
              <Link href="/login">Log in</Link>
            </Button>
            <SignUpDialog className="w-full sm:flex-1" />
          </div>
          <PropertyRegisterDialog className="w-full" />
        </div>
      </div>
    </div>
  );
}
