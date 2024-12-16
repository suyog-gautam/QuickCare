import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { UseAdminContext } from "../context/AdminContext";
import { parse, format } from "date-fns";
import { useEffect } from "react";
export function AppointmentList() {
  const { doctors, appointments, getAllAppointments, aToken, fetchDoctors } =
    UseAdminContext();
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
      fetchDoctors();
    }
  }, [aToken]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Appointments</CardTitle>
        <CardDescription>
          You have {appointments.length} upcoming appointments
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {appointments.slice(0, 10).map((appointment) => (
          <div
            key={appointment._id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={appointment.docData.image}
                  alt={appointment.docData.name}
                />
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {appointment.docData.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Booking on{" "}
                  {format(
                    parse(appointment.slotDate, "d_M_yyyy", new Date()),
                    "MMMM d, yyyy"
                  )}{" "}
                  {appointment.slotTime}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
