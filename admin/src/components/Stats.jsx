import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, UserRound } from "lucide-react";

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Doctors</CardTitle>
          <Users className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">14</div>
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
          <div className="text-2xl font-bold">2</div>
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
