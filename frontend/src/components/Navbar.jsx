import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState("op");

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "ALL DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Prescripto" className="h-8 w-8" />
            <span className="font-bold text-[#000b6d]">Quick Care</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors hover:text-[#5f6fff] py-5 relative
                ${
                  location.pathname === link.path
                    ? "text-gray-900 after:absolute after:bottom-2 after:left-0 after:right-0 after:rounded-full after:h-1 after:bg-[#5f6fff] after:m-auto"
                    : "text-gray-600"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop create account button or user menu */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/myappointment")}>
                  My Appointments
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="bg-primary rounded-3xl hover:bg-[primary]/80 text-white"
              onClick={() => navigate("/login")}
            >
              Create account
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-[#5f6fff] py-2 relative w-full text-center
                  ${
                    location.pathname === link.path
                      ? "text-gray-900 after:absolute after:bottom-0 after:left-1/4 after:right-1/4 after:rounded-full after:h-1 after:bg-[#5f6fff]"
                      : "text-gray-600"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {token ? (
              <>
                <Button
                  variant="ghost"
                  className="w-3/4 justify-start"
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                >
                  My Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-3/4 justify-start"
                  onClick={() => {
                    navigate("/myappointment");
                    setIsMenuOpen(false);
                  }}
                >
                  My Appointments
                </Button>
                <Button
                  variant="ghost"
                  className="w-3/4 justify-start"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                className="bg-primary hover:bg-primary/80 text-white w-3/4"
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
              >
                Create account
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
