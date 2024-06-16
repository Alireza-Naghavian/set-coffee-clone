import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import styles from "./Navbar.module.css";
import LogoLink from "@/components/UI/LogoLink/LogoLink";
import NavItem from "@/components/UI/NavItem/NavItem";
import Link from "next/link";
function DesktopMenu() {
  const subMenuTitles = [
    "Specialty coffee",
    "World Class Specialty",
    "Premium Coffee",
    "Commercial Coffee",
    "Coffee Capsule",
    "Italian Passion",
  ];
  return (
    <div className="hidden lg:grid grid-cols-12 h-full">
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
          <AiOutlineShoppingCart size={28} />
        </Link>
        <FaShuffle size={26} />
      </div>
    </div>
  );
}

export default DesktopMenu;
