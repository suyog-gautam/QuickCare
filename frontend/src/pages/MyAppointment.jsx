"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { parse, format, set } from "date-fns";
import { UseAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "@/components/Loader";

export default function MyAppointment() {
  const { token, backendUrl, getDoctorsData } = UseAppContext();
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointment-list`,
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);
  const handleCancel = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        toast.success("Appointment Cancelled ");
        getUserAppointment();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async (appointmentId, amount) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/user/initiate-payment`,
        {
          amount,
          productId: uuidv4(),
          appointmentId,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        window.location.href = response.data.url;
        getUserAppointment();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl my-5 ">
      {loading && <Loader loaderText="Processing Payment..." />}
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      <div className="space-y-4 mt-4">
        {appointments.map((appointment) => (
          <Card key={appointment._id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24  ">
                  <AvatarImage
                    src={appointment.docData.image}
                    alt={appointment.docData.name}
                    className="w-full h-full bg-slate-200 scale-125 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                  />

                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {appointment.docData.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {appointment.docData.speciality}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-medium">Address:</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.docData.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {format(
                          parse(appointment.slotDate, "d_M_yyyy", new Date()),
                          "MMMM d, yyyy"
                        )}{" "}
                        | {appointment.slotTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {!appointment.cancelled && (
                    <div>
                      {!appointment.payment && (
                        <Button
                          className="w-40 bg-[#5f6fff] hover:bg-[#4b5cff]"
                          onClick={() =>
                            handlePayment(appointment._id, appointment.amount)
                          }
                        >
                          Pay here
                        </Button>
                      )}
                      {appointment.payment && (
                        <Button className="w-40" variant="secondary" disabled>
                          Paid
                        </Button>
                      )}
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="w-40 hover:bg-destructive hover:text-white transition-all duration-200 ease-in-out"
                    onClick={() => handleCancel(appointment._id)}
                    disabled={appointment.cancelled}
                  >
                    {appointment.cancelled ? "Cancelled" : "Cancel appointment"}
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
