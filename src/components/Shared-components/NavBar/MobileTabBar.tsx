import React from "react";
import styles from "./Navbar.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { RiUser3Line } from "react-icons/ri";
import Link from "next/link";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import SideBarBasket from "../SideBarBasket/SideBarBasket";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
import Overlay from "@/components/UI/Overlay/Overlay";
function MobileTabBar() {
  const [isOpen, { close, open }] = useDisclosure();
  useScrollLocker(isOpen);
  return (
    <div className={`${styles.tabBar}`}>
      <div className="w-full sm:px-[55px] flex-between-center sm:gap-x-4 sm:text-base text-sm child:flex child:flex-col  text-black child:items-center">
        <div className="child:sm:text-base child:text-sm ">
          <HiOutlineBuildingStorefront size={24} className="" />
          <span className="font-Shabnam_B text-base ">فروشگاه</span>
        </div>
        <Link className="child:sm:text-base child:text-sm" href={"/homemad"}>
          <RiUser3Line size={24} />
          <span className="font-Shabnam_B text-base">
            <span>حساب</span>&nbsp;
            <span className="hidden sm:inline">کاربری</span>
          </span>
        </Link>
        <div
          className="child:sm:text-base child:text-sm"
          onClick={() => open()}
        >
          <AiOutlineShoppingCart size={24} />
          <span className="font-Shabnam_B text-base">سبد خرید</span>
        </div>

        <Link href={"/"} className="child:sm:text-base child:text-sm">
          <AiOutlineHome size={24} />
          <span className="font-Shabnam_B text-base">خانه</span>
        </Link>
      </div>
      {/* overlay */}
      <Overlay onClose={() => close()} openCondition={isOpen} />
      {/* overlay */}

      {/* open side bar */}
      <div
        className={`${styles.sideBars} ${
          isOpen ? "translate-x-[0rem]" : "translate-x-[-40rem]"
        }`}
      >
        <SideBarBasket setIsCartOpen={() => close()} />
      </div>
    </div>
  );
}

export default MobileTabBar;
