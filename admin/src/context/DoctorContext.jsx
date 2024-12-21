import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";
import { set } from "date-fns";

const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : null
  );

  const [appointments, setAppointments] = useState([]);
  const [doctorData, setDoctorData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        {
          headers: {
            dToken,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/details`, {
        headers: {
          dToken,
        },
      });
      if (data.success) {
        setDoctorData(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    if (dToken) {
      getDoctorData();
    } else {
      setDoctorData(false);
    }
  }, [dToken]);

  useEffect(() => {
    getDoctorData();
  }, []);
  const value = {
    dToken,
    setDToken,
    getAllAppointments,
    appointments,
    backendUrl,
    getDoctorData,
    doctorData,
    setDoctorData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export const UseDoctorContext = () => useContext(DoctorContext);
export default DoctorContextProvider;
