import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";

import { UseAppContext } from "@/context/AppContext";
export default function TopDoctors() {
  const { doctors } = UseAppContext();
  const navigate = useNavigate();
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Top Doctors to Book
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {doctors.slice(0, 10).map((doctor, index) => (
            <Card
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              key={index}
              className="bg-[#EEF2FF] hover:bg-[#F3F6FF]  border-2 border-[#e9ebf3] B] rounded-lg hover:translate-y-[-5px] transition-all duration-400 ease-in-out"
            >
              <CardContent className="p-0">
                <div className="aspect-square relative mb-3  rounded-lg overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-white  p-4 rounded-r-lg rounded-l-lg ">
                  <div className="flex items-center gap-1 mb-2">
                    <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                    <span className="text-green-500 text-xs">Available</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-md mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-500 text-xs">{doctor.speciality}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="rounded-full px-8 bg-[#EEF2FF] hover:bg-[#F3F6FF] border-0"
          >
            <Link to="/doctors">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
