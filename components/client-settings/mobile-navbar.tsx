"use client";

import { useState } from "react";
import {
  Sheet, SheetContent, SheetTrigger,
  SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Sidebar from "./sidebar";

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex lg:hidden items-center justify-between p-4 border-b bg-white sticky top-0 z-40">
      <h1 className="font-black text-blue-600 text-lg">BUZZMGR</h1>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="p-0 w-72">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Mobile sidebar navigation</SheetDescription>
          {/* Pass onClose so clicking a link closes the drawer */}
          <Sidebar onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}