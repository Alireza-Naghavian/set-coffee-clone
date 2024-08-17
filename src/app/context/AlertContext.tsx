"use client";
import Alert from "@/components/UI/Alert/Alert";
import React, { createContext, ReactNode, useContext, useState } from "react";
type AlertContexType = {
  showAlert: (status: string, title: string, duration?: number) => void;
};
const AlertContext = createContext<AlertContexType | undefined>(undefined);
function AlertContextProvider({ children }: { children: ReactNode }) {
  const [alertData, setAlertData] = useState<{
    status: string;
    title: string;
    show: boolean;
  } >({ show: false, status: "", title: "" });
  const showAlert = (
    status: string,
    title: string,
    duration: number = 2000
  ) => {
    setAlertData({ status, title, show: true });
    setTimeout(() => {
      setAlertData({ ...alertData, show: false });
    }, duration);
  };
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
   
        <Alert status={alertData.status} title={alertData.title} startShow={alertData.show} />
    
    </AlertContext.Provider>
  );
}
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export default AlertContextProvider;
