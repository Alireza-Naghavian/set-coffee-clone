import { useState } from "react";

const useDisclosure = (initialSate = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialSate);

  const open = () => {
    if (!isOpen) setIsOpen(true);
  };
  const close = () => {
    if (isOpen) setIsOpen(false);
  };
  const toggle = () => {
    isOpen ? close() : open();
  };
  return [isOpen, { open, close, toggle }] as const
};
export default useDisclosure;
