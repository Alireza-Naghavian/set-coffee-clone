import LogoLink from "@/components/UI/LogoLink/LogoLink";
import NavItem from "@/components/UI/NavItem/NavItem";
import Overlay from "@/components/UI/Overlay/Overlay";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import SideBarBasket from "../SideBarBasket/SideBarBasket";
import AsideUserContainer from "./AsideUserContainer";
import styles from "./Navbar.module.css";
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
  const [isOpen, { close, open }] = useDisclosure();
  useScrollLocker(isOpen || isDesktopCartOpen);
  return (
    <>
      <div className="hidden lg:flex  w-full px-[22px] !justify-between h-full ">
        <div className="  flex items-center justify-center">
          <LogoLink />
        </div>
        <div className=" mx-auto">
          <ul
            className="child:text-main child:font-Shabnam_M
        flex items-center h-full
        xl:gap-x-12 gap-x-8"
          >
            <NavItem targetLink="/" label="صفحه اصلی" />
            <NavItem targetLink="/categories"
              label="فروشگاه"
              icon={<IoChevronDown />}
              subMenuItem={subMenuTitles}
            />
            <NavItem targetLink="/categories" label="وبلاگ" />
            <NavItem targetLink="/categories" label="تماس با ما" />
            <NavItem targetLink="/categories" label="درباره ما" />
            <NavItem targetLink="/categories" label="قوانین" />
            <div className="py-2" onClick={() => open()}>
              <NavItem targetLink="#" label="ورود/عضویت" />
            </div>
          </ul>
        </div>
        <div className=" text-main flex-center my-auto gap-x-6">
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
        {/* user aside */}
        <div
          className={`${styles.freeSideBar} ${
            isOpen ? "translate-x-[0rem]" : "translate-x-[-40rem]"
          }`}
        >
          <AsideUserContainer isOpen={isOpen} setIsCartOpen={close} />
        </div>
        {/* user aside */}
        {/* sideBarBasket aside */}
        <aside
          className={`${styles.freeSideBar} ${
            isDesktopCartOpen ? "translate-x-[0rem] " : "translate-x-[-40rem]"
          }`}
        >
          <SideBarBasket setIsCartOpen={setIsDesktopCartOpen} />
        </aside>
        {/* sideBarBasket aside */}
        {/* shared overlay */}
        <Overlay
          openCondition={isDesktopCartOpen || isOpen}
          onClose={() => {
            setIsDesktopCartOpen(false);
            close();
          }}
        />
        {/* shared overlay */}
      </>
    </>
  );
}

export default DesktopMenu;
