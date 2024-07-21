"use client";
import LogoLink from "@/components/UI/LogoLink/LogoLink";
import Overlay from "@/components/UI/Overlay/Overlay";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import SideBarBasket from "../SideBarBasket/SideBarBasket";
import MobileMenuContent from "./MobileMenuContent";
import styles from "./Navbar.module.css";
import { GetMetype } from "@/types/auth.type";
function MobileMenu({user} :{user:GetMetype}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  useScrollLocker(isMenuOpen || isCartOpen);
  return (
    <div className=" w-full  ">
      {/* overlay */}
      <Overlay
        openCondition={isMenuOpen || isCartOpen}
        onClose={() => {
          setIsMenuOpen(false);
          setIsCartOpen(false);
        }}
      />
      {/* overlay */}
      <aside
        className={`${styles.sideBars} ${
          isMenuOpen ? "translate-x-[0rem] " : "translate-x-[-40rem]"
        }`}
      >
        <MobileMenuContent setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} user={user} />
      </aside>
      <aside
        className={`${styles.sideBars} ${
          isCartOpen ? "translate-x-[0rem] " : "translate-x-[-40rem]"
        }`}
      >
        <SideBarBasket setIsCartOpen={setIsCartOpen} />
      </aside>
      <div className="lg:hidden grid grid-cols-4 h-full ">
        <div className="flex sm:pr-8 pr-4 my-auto">
          <FaBars
            className="text-2xl sm:text-4xl text-main cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
        <div className="col-span-2 flex-center mx-auto my-auto">
          <LogoLink />
        </div>
        <div className="flex justify-end sm:pl-8 pl-4 text-main my-auto">
          <AiOutlineShoppingCart
            onClick={() => setIsCartOpen(true)}
            className="text-2xl sm:text-4xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
