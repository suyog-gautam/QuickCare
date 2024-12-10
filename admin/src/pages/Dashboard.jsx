"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Stats } from "@/components/Stats";
import { AppointmentList } from "@/components/AppointmentList";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <div className="hidden w-64 bg-white border-r lg:block">
        <div className="flex items-center gap-2 p-6">
          <img src="/logo.png" alt="logo" className="h-6 w-6" />
          <span className="text-lg font-semibold">QuickCare</span>
          <Badge>Admin</Badge>
        </div>
        <Sidebar className="px-4" />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b lg:hidden">
          <div className="flex items-center px-4 py-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex items-center gap-2 p-6">
                  <img src="/logo.png" alt="logo" className="h-6 w-6" />
                  <span className="text-lg font-semibold">QuickCare</span>
                </div>
                <Sidebar className="px-4" />
              </SheetContent>
            </Sheet>
            <span className="text-lg font-semibold ml-4">Dashboard</span>
          </div>
        </header>
        <main className="p-6 space-y-6">
          <Stats />
          <AppointmentList />
        </main>
      </div>
    </div>
  );
}
