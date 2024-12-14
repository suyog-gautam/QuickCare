import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { use } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState("");
  //get doctors data
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          token,
        },
      });
      if (data.success) {
        setUserData(data.userData); // Updates the state asynchronously
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setUserData(false);
    }
  }, [token]);

  useEffect(() => {
    getDoctorsData();
  }, []);
  const value = {
    doctors,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    getUserData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
