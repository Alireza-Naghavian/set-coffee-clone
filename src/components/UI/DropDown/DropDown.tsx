"use client";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import React, { useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

type DropDownType = {
  label: string;
  children: React.ReactNode;
  isMenuOpen: boolean;
  bgColor ?: string,
  activeBg?:string,
  icon?:React.JSX.Element,
  className?:string
};

const DropDown: React.FC<DropDownType> = ({ label,className,icon, children, isMenuOpen,activeBg="bg-gray-200",bgColor="bg-white" }) => {
  const [isOpen, { toggle, close }] = useDisclosure();
  useEffect(() => {
    setTimeout(() => close(), 1000);
  }, [isMenuOpen]);
  return (
    <div className="">
      {/* toggler */}
      <div
        className={`flex items-center tr-200 py-2 ${className}  w-full ${
          isOpen ? `${activeBg}` : {bgColor}
        }`}
        onClick={() => toggle()}
      >
        {icon ? icon : null}
        <span className="w-full block p-0">{label}</span>
        <div className={`tr-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <FaChevronDown />
        </div>
      </div>

      <div
        className={`tr-300 flex overflow-hidden transition-max-height duration-300 ${
          isOpen ? "max-h-[240px]" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
