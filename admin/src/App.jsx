import React, { useState } from "react";
import "./App.css";
import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";
import { UseAdminContext } from "./context/AdminContext";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import { Sidebar } from "./components/Sidebar";
import { MobileSidebar } from "./components/MobileSidebar";
import { AllAppointment } from "./pages/Admin/AllAppointment";
import { AddDoctor } from "./pages/Admin/AddDoctor";
import { DoctorList } from "./pages/Admin/DoctorList";
import { SingleAppointment } from "./pages/Admin/SingleAppoinment";
import { UseDoctorContext } from "./context/DoctorContext";
import { DoctorDashboard } from "./pages/Doctor/DoctorDashboard";
import { DoctorAppointment } from "./pages/Doctor/DoctorAppointment";
import { DoctorProfile } from "./pages/Doctor/DoctorProfile";
import { ChangePassword } from "./pages/Doctor/ChangePassword";
export default function App() {
  const { aToken } = UseAdminContext();
  const { dToken } = UseDoctorContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster position="top-center" richColors />
      {aToken || dToken ? (
        <>
          {/* Desktop Sidebar */}
          <Sidebar className="hidden lg:flex" />

          <div className="flex flex-col flex-1">
            <header className="flex items-center h-16 px-4 border-b bg-white lg:hidden">
              <MobileSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <div className="flex items-center gap-2 ml-4">
                <img
                  src="/logo.png"
                  alt="QuickCare Logo"
                  className="h-8 w-auto"
                />
                <span className="text-lg font-semibold">QuickCare</span>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/appointments" element={<AllAppointment />} />
                <Route
                  path="/appointments/:id"
                  element={<SingleAppointment />}
                />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorList />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route
                  path="/doctor-appointments"
                  element={<DoctorAppointment />}
                />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route
                  path="/doctor-change-password"
                  element={<ChangePassword />}
                />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/doctorLogin" element={<DoctorLogin />} />
        </Routes>
      )}
    </div>
  );
}
