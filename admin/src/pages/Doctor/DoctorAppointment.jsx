import React, { useEffect, useState } from "react";
import { UseAdminContext } from "./../../context/AdminContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parse, format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X, Check } from "lucide-react";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UseDoctorContext } from "@/context/DoctorContext";
import { toast } from "sonner";
export const DoctorAppointment = () => {
  const { dToken, getAllAppointments, appointments, backendUrl } =
    UseDoctorContext();
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;

  useEffect(() => {
    if (dToken) {
      getAllAppointments();
    }
  }, [dToken]);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
  const handleCancelAppointment = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/cancelAppointment/`,
          {
            appointmentId: id,
          },
          {
            headers: {
              dToken,
            },
          }
        );
        if (data.success) {
          getAllAppointments();
          toast.success(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleCompleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to complete this appointment?")) {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/completeAppointment/`,
          {
            appointmentId: id,
          },
          {
            headers: {
              dToken,
            },
          }
        );
        if (data.success) {
          getAllAppointments();
          toast.success(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    dToken && (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Appointments</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="text-base font-medium bg-slate-200">
              <TableRow>
                <TableHead className="text-center text-black">SN</TableHead>
                <TableHead className="text-center text-black">
                  Patient
                </TableHead>
                <TableHead className="text-center text-black">
                  Payment
                </TableHead>
                <TableHead className="text-center text-black">Date</TableHead>
                <TableHead className="text-center text-black">Time</TableHead>

                <TableHead className="text-center text-black">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAppointments.map((appointment, index) => (
                <TableRow
                  key={appointment._id}
                  className="hover:bg-gray-50 text-slate-700"
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <Avatar className="h-10 w-10 bg-slate-400">
                        <AvatarImage
                          className="bg-slate-400"
                          src={appointment.userData.image}
                          alt={appointment.userData.name}
                        />
                        <AvatarFallback>
                          {appointment.userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {appointment.userData.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          appointment.payment
                            ? "bg-red-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {appointment.payment ? "Paid" : "Cash"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {format(
                      parse(appointment.slotDate, "d_M_yyyy", new Date()),
                      "MMMM d, yyyy"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {appointment.slotTime}
                  </TableCell>

                  <TableCell className="text-center">
                    {/* Conditionally show appointment status */}
                    {appointment.cancelled ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    ) : appointment.isCompleted ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Completed
                      </span>
                    ) : (
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() =>
                            handleCancelAppointment(appointment._id)
                          }
                        >
                          <X className="mr-1 h-8 w-8 text-white font-bold transform scale-110" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-500 text-white hover:bg-green-600"
                          onClick={() =>
                            handleCompleteAppointment(appointment._id)
                          }
                        >
                          <Check className="mr-1 h-4 w-4 text-white" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
  );
};
