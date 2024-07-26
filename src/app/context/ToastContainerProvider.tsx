"use client";

import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "@/app/ReactToastify.css"
const ToastContext = createContext<typeof toast | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer className={"!font-Shabnam_M text-dark_shade"} autoClose={1500} rtl={true} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
