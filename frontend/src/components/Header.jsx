import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assets } from "../assets/assets";
export default function Header() {
  return (
    <section className="bg-primary h-[50vh] relative overflow-hidden rounded-xl mt-3">
      <div className="container mx-auto px-8 py-10 h-full flex flex-col justify-between">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 z-10 ml-20 mt-14 ">
            <h1 className="text-white text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
              Book Appointment
              <br />
              With Trusted Doctors
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="h-9 w-27">
                  <img
                    src={assets.group_profiles}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-white/90 text-sm">
                Simply browse through our extensive list of trusted doctors,
                <br />
                schedule your appointment hassle-free.
              </p>
            </div>
            <div className="">
              <a
                href="#speciality"
                className="inline-flex items-center gap-2 bg-white text-[#4263EB] px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors text-sm"
              >
                Book appointment
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="hidden lg:block  bottom-0 right-8 z-10">
            <img
              src={assets.header_img}
              alt="Medical Team"
              width={550}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
