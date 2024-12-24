import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import SuccesssPayment from "./pages/SuccessPayment";
import FailurePayment from "./pages/FailurePayment";
export default function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Toaster position="top-center" richColors />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:specialty" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/myappointment" element={<MyAppointment />} />
        <Route path="/success-payment" element={<SuccesssPayment />} />
        <Route path="/failure-payment" element={<FailurePayment />} />

        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}
