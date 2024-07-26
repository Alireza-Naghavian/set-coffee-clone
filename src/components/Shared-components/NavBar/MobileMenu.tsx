"use client";
import LogoLink from "@/components/UI/LogoLink/LogoLink";
import Overlay from "@/components/UI/Overlay/Overlay";
import useGetBasketData from "@/hooks/helper-hooks/useGetBasketData";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
import { GetMetype } from "@/types/auth.type";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import SideBarBasket from "../SideBarBasket/SideBarBasket";
import MobileMenuContent from "./MobileMenuContent";
import styles from "./Navbar.module.css";
import Badge from "@/components/UI/badge/Badge";

function MobileMenu({user,userLoading} :{user:GetMetype,userLoading:boolean}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const {userBasket} = useGetBasketData();
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
        <MobileMenuContent userLoading={userLoading} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} user={user} />
      </aside>
      <aside
        className={`${styles.sideBars} ${
          isCartOpen ? "translate-x-[0rem] " : "translate-x-[-40rem]"
        }`}
      >
        <SideBarBasket getCart={userBasket} setIsCartOpen={setIsCartOpen} />
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
        <div  onClick={() => setIsCartOpen(true)} className="flex justify-end sm:pl-8 pl-4 text-main my-auto relative">
            <Badge
                additionalClass="text-sm w-4 h-4 flex-center bg-main_brown 
          text-white rounded-full absolute -top-[5px] "
              >
                {userBasket?.length.toLocaleString("fa-Ir")}
              </Badge>
          <AiOutlineShoppingCart
            className="text-2xl sm:text-4xl cursor-pointer"
            size={28}
            />
            </div>
      </div>
    </div>
  );
}

export default MobileMenu;
