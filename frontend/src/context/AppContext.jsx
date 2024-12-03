import { doctors } from "@/assets/assets";
import { useContext, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const value = { doctors };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
