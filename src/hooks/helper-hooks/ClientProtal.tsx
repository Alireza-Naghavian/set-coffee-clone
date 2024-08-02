"use client"
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const ClientOnlyPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return createPortal(children, document.body);
};
export default ClientOnlyPortal;
