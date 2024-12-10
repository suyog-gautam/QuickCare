import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  LayoutDashboard,
  Plus,
  Users,
  LogOut,
} from "lucide-react";

export function Sidebar({ className }) {
  const items = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: CalendarDays,
    },
    {
      title: "Add Doctor",
      href: "/add-doctor",
      icon: Plus,
    },
    {
      title: "Doctors List",
      href: "/doctors",
      icon: Users,
    },
  ];

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {items.map((item) => (
        <Link key={item.title} to={item.href}>
          <Button
            variant={item.isActive ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </nav>
  );
}
