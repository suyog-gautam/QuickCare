import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchDoctors = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        {
          headers: {
            aToken,
          },
        }
      );

      // Access response.data
      if (response.data.success) {
        setDoctors(response.data.doctors); // Correct path to doctors
      } else {
        console.error("Failed to fetch doctors:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching doctors:",
        error.response?.data || error.message
      );
    }
  };
  const changeAvailibility = async (doctorId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/doctor-availability`,
        { doctorId }, // Wrap doctorId in an object
        {
          headers: { aToken }, // Ensure aToken is valid
        }
      );

      if (data.success) {
        toast.success(
          data.message || "Doctor availability changed successfully"
        );
        fetchDoctors(); // Refresh the list after change
      } else {
        toast.error(
          data.message || "Error occurred while changing doctor availability"
        );
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      console.error("Error in changeAvailibility:", error);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/appointmentAdmin`,

        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointements);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    fetchDoctors,
    changeAvailibility,
    getAllAppointments,
    appointments,

    setAppointments,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
export const UseAdminContext = () => useContext(AdminContext);
