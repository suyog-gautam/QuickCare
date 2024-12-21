import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { UseAdminContext } from "@/context/AdminContext";
import { Circle } from "lucide-react";
export function DoctorList() {
  const { aToken, doctors, fetchDoctors, changeAvailibility } =
    UseAdminContext();
  useEffect(() => {
    if (aToken) {
      fetchDoctors();
    }
  }, [aToken]);
  const handleAvailabilityChange = async (doctorId) => {
    await changeAvailibility(doctorId);
  };
  return (
    aToken && (
      <section className="w-full py-12 px-8 ">
        <div className=" px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">
            Doctors Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {doctors.map((doctor) => (
              <Card
                key={doctor._id}
                className="bg-[#EEF2FF] hover:bg-[#F3F6FF]  border-2 border-[#e9ebf3] B] rounded-lg hover:translate-y-[-5px] transition-all duration-400 ease-in-out"
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative mb-3  rounded-lg overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="rounded-md"
                    />
                  </div>
                  <div className="bg-white  p-4 rounded-r-lg rounded-l-lg ">
                    <div className="flex items-center justify-between mb-2">
                      {/* Circle and Status */}
                      <div className="flex items-center gap-1">
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

                      {/* Switch */}
                      <Switch
                        checked={doctor.available}
                        onCheckedChange={() =>
                          handleAvailabilityChange(doctor._id)
                        }
                        aria-label={`Toggle availability for ${doctor.name}`}
                        className={`scale-75 ${
                          doctor.available ? "bg-green-500" : "bg-red-600"
                        }`}
                      />
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
        </div>
      </section>
    )
  );
}
