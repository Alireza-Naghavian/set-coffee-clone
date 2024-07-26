"use client"
import Alert from "@/components/UI/Alert/Alert";
import React, { createContext, ReactNode, useContext, useState } from "react";
type AlertContexType = {
  showAlert: (status: string, title: string) => void;
  hideAlert: () => void;
};
const AlertContext = createContext<AlertContexType | undefined>(undefined);
function AlertContextProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<{ status: string; title: string } | null>(
    null
  );
  const showAlert = (status: string, title: string) => {
    setAlert({ status, title });
  };

  const hideAlert = () => {
    setAlert(null);
  };
  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <Alert status={alert.status} title={alert.title} startShow={!!alert} />
      )}
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
