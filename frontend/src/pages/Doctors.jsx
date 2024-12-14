import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UseAppContext } from "@/context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { Circle } from "lucide-react";
import { UserX, RefreshCw, ArrowLeft } from "lucide-react";
const specialties = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

export default function Doctors() {
  const navigate = useNavigate();
  const { specialty } = useParams(); // Extract specialty from useParams
  const { doctors } = UseAppContext();

  // Filter doctors based on the specialty parameter
  const filteredDoctors = specialty
    ? doctors.filter(
        (doctor) => doctor.speciality.toLowerCase() === specialty.toLowerCase()
      )
    : doctors; // Show all doctors if no parameter

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-md font-normal text-gray-600 mb-6">
        Browse through the doctors specialist.
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {specialties.map((item, index) => (
            <Button
              key={index}
              onClick={() =>
                navigate(
                  item.toLowerCase() === specialty?.toLowerCase()
                    ? "/doctors"
                    : `/doctors/${item}`
                )
              }
              className={`w-full font-normal px-4 border-2 border-grey py-2 bg-transparent rounded-md transition-colors ${
                item.toLowerCase() === specialty?.toLowerCase()
                  ? "bg-[#EEF2FF] text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <Card
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                key={index}
                className="bg-[#EEF2FF] cursor-pointer hover:bg-[#F3F6FF] border-2 border-[#e9ebf3] rounded-lg hover:translate-y-[-5px] transition-all duration-400 ease-in-out"
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="bg-white p-4 rounded-r-lg rounded-l-lg">
                    <div className="flex items-center gap-1 mb-2">
                      <Circle
                        className={`w-3 h-3 ${
                          doctor.available
                            ? "fill-green-500 text-green-500"
                            : "fill-red-600 text-red-600"
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          doctor.available ? "text-green-500" : "text-red-600"
                        }`}
                      >
                        {doctor.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-md mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-500 text-xs">{doctor.speciality}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex justify-center items-center h-[300px] ml-64 w-full col-span-full">
              <div className="  flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-transparent rounded-lg  p-8 text-center">
                  <div className="mb-6">
                    <UserX size={64} className="mx-auto text-gray-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    No Doctors Available
                  </h1>
                  <p className="text-gray-600 mb-6">
                    {`We couldn't find any doctors for the
                    ${specialty} speciality. Please try a different speciality or
                    check back later.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
