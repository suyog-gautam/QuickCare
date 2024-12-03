import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex  gap-1">
              <img
                src="/logo.png"
                alt="Prescripto Logo"
                width={35}
                height={35}
                className=""
              />
              <span className="text-2xl font-bold text-[#000b6d]">
                QuickCare
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Your trusted healthcare companion for booking medical appointments
              online. We connect patients with qualified healthcare
              professionals, making healthcare access simple, fast, and
              reliable.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4 ">
            <h3 className="text-gray-700 font-semibold uppercase text-lg">
              Company
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-[#4263EB] text-sm"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-[#4263EB] text-sm"
              >
                About us
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-[#4263EB] text-sm"
              >
                Contact us
              </Link>
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-[#4263EB] text-sm"
              >
                Privacy policy
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-gray-700 font-semibold uppercase text-lg">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm">
                <a href="tel:+9779811156986" className="hover:text-[#4263EB]">
                  +977 9811156986
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                <a
                  href="mailto:contact.quickcare@gmail.com"
                  className="hover:text-[#4263EB]"
                >
                  contact.quickcare@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600">
            Copyright © {new Date().getFullYear()} Suyog - All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
