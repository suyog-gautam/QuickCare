import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, UserRound } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { UseAdminContext } from "../context/AdminContext";
export function Stats() {
  const { doctors, appointments, getAllAppointments, aToken, fetchDoctors } =
    UseAdminContext();
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
      fetchDoctors();
    }
  }, [aToken]);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Doctors</CardTitle>
          <Users className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{doctors.length}</div>
          <p className="text-xs text-muted-foreground">
            Total registered doctors
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Appointments</CardTitle>
          <CalendarDays className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appointments.length}</div>
          <p className="text-xs text-muted-foreground">Scheduled today</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Patients</CardTitle>
          <UserRound className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-muted-foreground">Active patients</p>
        </CardContent>
      </Card>
    </div>
  );
}
