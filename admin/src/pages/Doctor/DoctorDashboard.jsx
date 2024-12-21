import React, { useEffect } from "react";
import { parse, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, DollarSign, X } from "lucide-react";
import { UseDoctorContext } from "@/context/DoctorContext";
export function DoctorDashboard() {
  const { dToken, getAllAppointments, appointments, backendUrl } =
    UseDoctorContext();
  useEffect(() => {
    if (dToken) {
      getAllAppointments();
    }
  }, [dToken]);
  // Function to calculate unique patients from the appointments list
  const getUniquePatientsAndEarnings = (appointments) => {
    // Use a Set to collect unique userIds (patients)
    const uniquePatients = new Set();
    let totalEarnings = 0;
    appointments.forEach((appointment) => {
      if (!appointment.cancelled) {
        // Exclude cancelled appointments if necessary
        uniquePatients.add(appointment.userId);
      }
      if (appointment.isCompleted && !appointment.cancelled) {
        totalEarnings += appointment.amount; // Add the appointment amount to total earnings
      }
    });

    // Return the count of unique patients
    return { uniquePatientCount: uniquePatients.size, totalEarnings };
  };

  // Get the unique patient count from the appointments
  const { uniquePatientCount, totalEarnings } =
    getUniquePatientsAndEarnings(appointments);
  const stats = [
    {
      title: "Earnings",
      value: "रु " + totalEarnings,
      icon: DollarSign,
      className: "bg-blue-50",
      iconClassName: "text-blue-500",
    },
    {
      title: "Appointments",
      value: appointments.length,
      icon: CalendarIcon,
      className: "bg-purple-50",
      iconClassName: "text-purple-500",
    },
    {
      title: "Patients",
      value: uniquePatientCount,
      icon: Users,
      className: "bg-green-50",
      iconClassName: "text-green-500",
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardContent className="flex items-center p-6">
              <div className={`${stat.className} p-4 rounded-full mr-4`}>
                <stat.icon className={`w-6 h-6 ${stat.iconClassName}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-semibold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latest Bookings */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            Latest Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.slice(0, 10).map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={booking.userData.image}
                      alt={booking.userData.name}
                    />
                    <AvatarFallback>
                      {booking.userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{booking.userData.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(
                        parse(booking.slotDate, "d_M_yyyy", new Date()),
                        "MMMM d, yyyy"
                      )}{" "}
                      at {booking.slotTime}
                    </p>
                  </div>
                </div>
                {booking.cancelled ? (
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                    Cancelled
                  </span>
                ) : booking.isCompleted ? (
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Completed
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    Schedule
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
