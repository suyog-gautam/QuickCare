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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const AllAppointment = () => {
  const { aToken, getAllAppointments, appointments } = UseAdminContext();
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="text-base font-medium bg-slate-200">
            <TableRow>
              <TableHead className="text-center text-black">Patient</TableHead>
              <TableHead className="text-center text-black">Doctor</TableHead>
              <TableHead className="text-center text-black">Date</TableHead>
              <TableHead className="text-center text-black">Time</TableHead>
              <TableHead className="text-center text-black">Status</TableHead>
              <TableHead className="text-center text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAppointments.map((appointment) => (
              <TableRow
                key={appointment._id}
                className="hover:bg-gray-50 text-slate-700"
              >
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
                    <Avatar className="h-10 w-10 bg-slate-200">
                      <AvatarImage
                        src={appointment.docData.image}
                        alt={appointment.docData.name}
                      />
                      <AvatarFallback>
                        {appointment.docData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {appointment.docData.name}
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
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      appointment.cancelled
                        ? "bg-red-100 text-red-800"
                        : appointment.isCompleted
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appointment.cancelled
                      ? "Cancelled"
                      : appointment.isCompleted
                      ? "Completed"
                      : "Scheduled"}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/appointments/${appointment._id}`}>
                      View Details
                    </Link>
                  </Button>
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
  );
};
