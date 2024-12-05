import React, { useState } from "react";
import { addDays, format, setHours, setMinutes, isBefore } from "date-fns";
import { CheckCircle2, Clock, DollarSign, Calendar } from "lucide-react";
import { useParams } from "react-router-dom";
import { UseAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

import Error from "./Error";
import RelatedDoctor from "@/components/RelatedDoctor";

export default function DoctorProfile() {
  const { doctors } = UseAppContext(); // Assuming doctors are available in AppContext
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const { docId } = useParams(); // Get the doctor ID from the URL

  // Find the doctor with the matching ID
  const doctor = doctors.find((doc) => doc._id === docId);

  // Generate next 7 days starting from today
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  // Generate time slots
  const timeSlots = [
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 pm",
    "12:30 pm",
    "01:00 pm",
    "01:30 pm",
    "02:00 pm",
    "02:30 pm",
    "03:00 pm",
    "03:30 pm",
    "04:00 pm",
    "04:30 pm",
    "05:00 pm",
    "05:30 pm",
    "06:00 pm",
  ];

  // Filter out past time slots for today
  const currentDate = new Date();
  const filteredTimeSlots = timeSlots.filter((slot) => {
    const [time, modifier] = slot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "pm" && hours !== 12) hours += 12; // Convert PM hours to 24-hour format
    if (modifier === "am" && hours === 12) hours = 0; // Convert 12am to 0 hours

    const slotDate = setMinutes(setHours(currentDate, hours), minutes);

    // Include time slots only if they are in the future or for later days
    return (
      selectedDate.toDateString() !== currentDate.toDateString() ||
      !isBefore(slotDate, currentDate)
    );
  });

  if (!doctor) {
    // If no doctor is found, show an error or redirect
    return <Error />;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden my-6">
        <div className="md:flex">
          {/* Left Column */}
          <div className="md:w-1/3 bg-[#5f6fff]/80 p-8 text-white">
            <div className="mb-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-48 h-48 rounded-full mx-auto border-4 border-white shadow-lg"
              />
            </div>
            <div className="flex items-center mb-3">
              <h1 className="text-2xl font-bold text-center">{doctor.name}</h1>
              <CheckCircle2 className="w-6 h-6 ml-2" />
            </div>
            <div className="mb-6">
              <span className="text-md font-medium bg-black/30 rounded-full px-3 py-1">
                {doctor.degree} - {doctor.speciality}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{doctor.experience} Experience</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3" />
                <span>Available Mon-Fri</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-3" />
                <span>Appointment fee: ${doctor.fees}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-2/3 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                About {doctor.name}
              </h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Select Appointment Date
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {weekDays.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      flex flex-col items-center justify-center w-20 h-20 rounded-2xl
                      transition-all duration-200 flex-shrink-0
                      ${
                        selectedDate.toDateString() === date.toDateString()
                          ? "bg-[#5f6fff] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }
                    `}
                  >
                    <span className="text-sm font-medium">
                      {format(date, "EEE")}
                    </span>
                    <span className="text-2xl font-bold">
                      {format(date, "d")}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Select Appointment Time
              </h3>
              <div className="overflow-x-auto pb-4">
                <div
                  className="flex flex-wrap gap-3 w-max"
                  style={{
                    maxHeight: "200px", // Ensures two rows of time slots
                  }}
                >
                  {filteredTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
          py-2 px-4 rounded-full text-sm font-medium
          transition-all duration-200 flex-shrink-0
          ${
            selectedTime === time
              ? "bg-[#5f6fff] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }
        `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full bg-[#5f6fff] text-white py-4 px-8 rounded-full text-lg font-medium hover:bg-[#5f6fff]/90 transition-colors duration-200">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <RelatedDoctor
        speciality={doctor.speciality}
        currentDoctor={doctor._id}
      />
    </div>
  );
}
