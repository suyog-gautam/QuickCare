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

const appointments = [
  {
    id: 1,
    doctor: "Dr. Richard James",
    date: "24th July, 2024",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    doctor: "Dr. Richard James",
    date: "24th July, 2024",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    doctor: "Dr. Richard James",
    date: "24th July, 2024",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    doctor: "Dr. Richard James",
    date: "24th July, 2024",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    doctor: "Dr. Richard James",
    date: "24th July, 2024",
    avatar: "/placeholder.svg",
  },
];

export function AppointmentList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Appointments</CardTitle>
        <CardDescription>
          You have {appointments.length} upcoming appointments
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={appointment.avatar}
                  alt={appointment.doctor}
                />
                <AvatarFallback>RJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {appointment.doctor}
                </p>
                <p className="text-sm text-muted-foreground">
                  Booking on {appointment.date}
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
