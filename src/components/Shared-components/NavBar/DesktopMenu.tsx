import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import LogoLink from "@/components/UI/LogoLink/LogoLink";
import NavItem from "@/components/UI/NavItem/NavItem";
import styles from "./Navbar.module.css";
import Link from "next/link";
import SideBarBasket from "../SideBarBasket/SideBarBasket";
import Overlay from "@/components/UI/Overlay/Overlay";
export const subMenuTitles = [
  "Specialty coffee",
  "World Class Specialty",
  "Premium Coffee",
  "Commercial Coffee",
  "Coffee Capsule",
  "Italian Passion",
];
function DesktopMenu() {
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState<boolean>(false);
  return (
    <>
      <div className="hidden lg:grid grid-cols-12 h-full relative">
        <LogoLink />
        <div className="col-span-8 mx-auto">
          <ul
            className="child:text-main child:font-Shabnam_M
        flex items-center h-full
        xl:gap-x-12 gap-x-8"
          >
            <NavItem label="صفحه اصلی" />
            <NavItem
              label="فروشگاه"
              icon={<IoChevronDown />}
              subMenuItem={subMenuTitles}
            />
            <NavItem label="وبلاگ" />
            <NavItem label="تماس با ما" />
            <NavItem label="درباره ما" />
            <NavItem label="قوانین" />
            <NavItem label="ورود/عضویت" />
          </ul>
        </div>
        <div className="col-span-2 text-main flex-center my-auto gap-x-6">
          <Link href={""}>
            <FaRegHeart size={28} />
          </Link>
          <Link href={""}>
            <FaShuffle size={26} />
          </Link>
          <AiOutlineShoppingCart
          className="cursor-pointer"
            onClick={() => setIsDesktopCartOpen(true)}
            size={28}
          />
        </div>
      </div>
      <>
        <div
          className={`${styles.BasketSideBar} ${
            isDesktopCartOpen ? "translate-x-[0rem] " : "translate-x-[-40rem]"}`}>
          <SideBarBasket setIsCartOpen={setIsDesktopCartOpen} />
        </div>
        <Overlay
          openCondition={isDesktopCartOpen}
          onClose={() => setIsDesktopCartOpen(false)}
        />
      </>
    </>
  );
}

export default DesktopMenu;
