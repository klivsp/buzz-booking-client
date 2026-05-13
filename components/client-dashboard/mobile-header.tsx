"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";

export function MobileHeader() {
  return (
    <header className="flex lg:hidden items-center justify-between p-4 border-b bg-white">
      <h1 className="font-black text-blue-600">BUZZMGR</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">Application navigation sidebar</SheetDescription>
        <Sidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
}