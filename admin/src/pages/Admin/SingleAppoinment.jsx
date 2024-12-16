import React from "react";
import { useParams } from "react-router-dom";
import { UseAdminContext } from "../../context/AdminContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  UserIcon,
  UserIcon as UserMdIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
export const SingleAppointment = () => {
  const { id } = useParams();
  const { aToken, backendUrl } = UseAdminContext();
  const [appointment, setAppointment] = useState({});
  const getAppointment = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/getAppointmentById/${id}`,
        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        setAppointment(data.appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      getAppointment();
    }
  }, [aToken]);
  if (!appointment) {
    return <div>Loading...</div>;
  }

  const {
    userId,
    docId,
    slotDate,
    slotTime,
    amount,
    userData,
    docData,
    cancelled,
    payment,
    isCompleted,
  } = appointment;
  const handleCancelAppointment = async () => {
    console.log("Cancelling appointment...");
  };
  return (
    userData && (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Appointment Details</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={
                      userData.image ||
                      `/placeholder.svg?height=80&width=80&text=${userData.name.charAt(
                        0
                      )}`
                    }
                  />
                  <AvatarFallback>
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{userData.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" /> ID: {userId}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MailIcon className="mr-2 h-4 w-4" /> {userData.email}
                </p>
                <p className="flex items-center">
                  <PhoneIcon className="mr-2 h-4 w-4" /> {userData.phone}
                </p>
                <p className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" /> {userData.address}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Doctor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={
                      docData.image ||
                      `/placeholder.svg?height=80&width=80&text=${docData.name.charAt(
                        0
                      )}`
                    }
                  />
                  <AvatarFallback>
                    {docData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{docData.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <UserMdIcon className="mr-2 h-4 w-4" /> ID: {docId}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MailIcon className="mr-2 h-4 w-4" /> {docData.email}
                </p>

                <p className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" /> {docData.address}
                </p>
                <p className="flex items-center">
                  <UserMdIcon className="mr-2 h-4 w-4" /> Specialty:{" "}
                  {docData.speciality}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" /> Date: {slotDate}
                  </p>
                  <p className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4" /> Time: {slotTime}
                  </p>
                  <p className="flex items-center">
                    <CreditCardIcon className="mr-2 h-4 w-4" /> Amount: $
                    {amount}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    Status:
                    <Badge
                      variant={
                        cancelled
                          ? "destructive"
                          : isCompleted
                          ? "success"
                          : "default"
                      }
                      className="ml-2"
                    >
                      {cancelled
                        ? "Cancelled"
                        : isCompleted
                        ? "Completed"
                        : "Scheduled"}
                    </Badge>
                  </p>
                  <p>
                    Payment:
                    <Badge
                      variant={payment ? "success" : "warning"}
                      className="ml-2"
                    >
                      {payment ? "Paid" : "Pending"}
                    </Badge>
                  </p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={cancelled || isCompleted}
                    >
                      Cancel Appointment
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        cancel the appointment.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelAppointment}>
                        Confirm Cancellation
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
};
