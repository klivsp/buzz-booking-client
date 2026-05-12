"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";
import SignupForm from "@/components/auth/signup-form";
import { cn } from "@/lib/utils";

export function PropertyRegisterDialog({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button type="button" variant="secondary" size="lg" className={className}>
          Register your property
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
          )}
        />
        <Dialog.Content
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 max-h-[min(90vh,calc(100dvh-2rem))] w-[min(calc(100vw-2rem),28rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border bg-card p-6 text-card-foreground shadow-lg outline-none",
          )}
        >
          <div className="mb-4 space-y-1.5">
            <Dialog.Title className="text-lg font-semibold tracking-tight">
              Register your property
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              Create your account as a property owner. You can add listing details
              after sign-up.
            </Dialog.Description>
          </div>
          <div data-slot="property-register-form">
            <SignupForm
              initialPropertyOwner
              includePropertyOwnerField={false}
              onSuccess={() => setOpen(false)}
            />
          </div>
          <div className="mt-6 flex justify-end border-t pt-4">
            <Dialog.Close asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
