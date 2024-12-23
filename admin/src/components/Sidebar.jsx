import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  LayoutDashboard,
  Plus,
  Users,
  LogOut,
  Lock,
} from "lucide-react";
import { UseAdminContext } from "@/context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UseDoctorContext } from "@/context/DoctorContext";
export function Sidebar({ className }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { aToken, setAToken } = UseAdminContext();
  const { dToken, setDToken } = UseDoctorContext();

  const adminItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
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
      href: "/doctor-list",
      icon: Users,
    },
  ];

  const doctorItems = [
    {
      title: "Dashboard",
      href: "/doctor-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Appointments",
      href: "/doctor-appointments",
      icon: CalendarDays,
    },
    {
      title: "Profile",
      href: "/doctor-profile",
      icon: Users,
    },
    {
      title: "Change Password",
      href: "/doctor-change-password",
      icon: Lock,
    },
  ];

  const items = aToken ? adminItems : dToken ? doctorItems : [];
  const handleLogout = () => {
    setAToken(null);
    localStorage.removeItem("aToken");
    localStorage.removeItem("dToken");
    navigate("/login");
    toast.success("Logged out successfully");
  };
  return (
    <div className={cn("w-64 bg-white border-r flex-shrink-0", className)}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 p-4 border-b lg:border-b w-56">
          <img src="/logo.png" alt="QuickCare Logo" className="h-8 w-auto" />
          <span className="text-lg font-semibold">QuickCare</span>
          <Badge className="ml-auto hidden lg:block">
            {aToken ? "Admin" : "Doctor"}
          </Badge>
        </div>

        <nav className="flex-1 flex flex-col gap-1 p-4">
          {items.map((item) => (
            <Link key={item.title} to={item.href}>
              <Button
                variant={
                  location.pathname === item.href ? "secondary" : "ghost"
                }
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
            onClick={() => handleLogout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
