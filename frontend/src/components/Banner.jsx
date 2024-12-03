import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assets } from "../assets/assets";
export default function Banner() {
  return (
    <section className="bg-primary h-[35vh] relative  rounded-xl mb-10 ">
      <div className="container mx-auto px-8 py-10 h-full flex flex-col justify-between">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 z-10 ml-32 mt-14 leading-4">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl  font-semibold  leading-4">
              Book Appointment With 100+Trusted Doctors
            </h1>

            <div>
              <a
                href="/login"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:translate-y-[-5px] transition-all duration-400 ease-in-out text-sm"
              >
                Create Account
              </a>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2 lg:w-[370px] relative]">
            <img
              src={assets.appointment_img}
              alt="Medical Team"
              width={360}
              className=" absolute bottom-0 right-56  max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
