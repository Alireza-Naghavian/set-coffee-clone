"use client";
import React, { useEffect, useState } from "react";
import MobileMenuContent from "./MobileMenuContent";
import Overlay from "@/components/UI/Overlay/Overlay";
import { FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LogoLink from "@/components/UI/LogoLink/LogoLink";
import styles from "./Navbar.module.css";
import SideBarBasket from "../SideBarBasket/SideBarBasket";
function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen, isCartOpen]);
  return (
    <>
      {/* overlay */}
      <Overlay
        openCondition={isMenuOpen || isCartOpen}
        onClose={() => {
          setIsMenuOpen(false);
          setIsCartOpen(false);
        }}
      />
      {/* overlay */}
      <div
        className={`${styles.sideBars} ${
          isMenuOpen ? "translate-x-[0rem] " : "translate-x-[-40rem]"
        }`}
      >
        <MobileMenuContent />
      </div>
      <div
        className={`${styles.sideBars} ${
          isCartOpen ? "translate-x-[0rem] " : "translate-x-[-40rem]"
        }`}
      >
        <SideBarBasket setIsCartOpen={setIsCartOpen} />
      </div>
      <div className="lg:hidden grid grid-cols-4 h-full">
        <div className="flex sm:pr-8 pr-4 my-auto">
          <FaBars
            className="text-2xl sm:text-4xl"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
        <div className="col-span-2 flex-center mx-auto my-auto">
          <LogoLink />
        </div>
        <div className="flex justify-end sm:pl-8 pl-4 text-main my-auto">
          <AiOutlineShoppingCart
            onClick={() => setIsCartOpen(true)}
            className="text-2xl sm:text-4xl"
          />
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
