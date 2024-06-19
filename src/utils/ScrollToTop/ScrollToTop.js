"use client";
import React from "react";
import styles from "./scrollToTop.module.css";
import { FaChevronUp } from "react-icons/fa6";
import useNavBarSticker from "@/hooks/helper-hooks/useNavBarSticker";
import { usePathname } from "next/navigation";
function ScrollToTop() {
  const { fixTop } = useNavBarSticker(120);
  const scrolOnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const pathName = usePathname();
  if(pathName === "/register-login") return
  return (
    <button
      className={`${fixTop ? styles.buttonVisible : styles.button}`}
      onClick={scrolOnTop}
    >
      <FaChevronUp size={28} className="text-white" />
    </button>
  );
}

export default ScrollToTop;
