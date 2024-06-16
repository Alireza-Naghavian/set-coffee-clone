"use client";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

type DropDownType = {
  label: string;
  children: React.ReactNode;
};

const DropDown: React.FC<DropDownType> = ({ label, children }) => {
  const [isOpen, { toggle }] = useDisclosure();
  return (
    <div className="w-full">
      {/* toggler */}
      <div
        className={`flex items-center tr-200 px-4 py-2  w-full ${isOpen ? "bg-gray-200" : "bg-white"}`}
        onClick={() => toggle()}
      >
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
