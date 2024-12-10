import React from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

import Login from "./pages/Login";
import DoctorLogin from "./pages/DoctorLogin";
import { Route, Routes } from "react-router-dom";
import { UseAdminContext } from "./context/AdminContext";
import Dashboard from "./pages/Dashboard";
export default function App() {
  const { aToken } = UseAdminContext();
  console.log(aToken);
  return (
    <>
      {aToken ? (
        <>
          <Toaster position="top-center" richColors />
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/doctorLogin" element={<DoctorLogin />} />
        </Routes>
      )}
    </>
  );
}
