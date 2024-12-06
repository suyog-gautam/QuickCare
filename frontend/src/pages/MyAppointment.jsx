"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { assets } from "@/assets/assets";
import { UseAppContext } from "@/context/AppContext";

export default function MyAppointment() {
  const { doctors } = UseAppContext();
  const handleCancel = (appointmentId) => {
    console.log("Cancelling appointment:", appointmentId);
  };

  const handlePayment = (appointmentId) => {
    console.log("Processing payment for:", appointmentId);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl my-5 ">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      <div className="space-y-4 mt-4">
        {doctors.slice(0, 3).map((appointment) => (
          <Card key={appointment._id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24  ">
                  <AvatarImage
                    src={appointment.image}
                    alt={appointment.name}
                    className="w-full h-full bg-slate-200 scale-125 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                  />

                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {appointment.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {appointment.specialty}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-medium">Address:</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.address.line1}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.address.line2}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {appointment.dateTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {/* {appointment.status === "unpaid" && ( */}
                  <Button
                    className="w-40 bg-[#5f6fff] hover:bg-[#4b5cff]"
                    onClick={() => handlePayment(appointment.id)}
                  >
                    Pay here
                  </Button>
                  {/* )} */}
                  {/* {appointment.status === "paid" && (
                    <Button className="w-40" variant="secondary" disabled>
                      Paid
                    </Button>
                  )} */}
                  <Button
                    variant="outline"
                    className="w-40 hover:bg-destructive hover:text-white transition-all duration-200 ease-in-out"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel appointment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
