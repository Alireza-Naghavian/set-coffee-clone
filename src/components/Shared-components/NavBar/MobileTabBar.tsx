import Link from "next/link";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { RiUser3Line } from "react-icons/ri";
import styles from "./Navbar.module.css";

function MobileTabBar() {

  return (
    <div className={`${styles.tabBar} `}>
      <div className="w-full sm:px-[55px] flex-between-center sm:gap-x-4
       sm:text-base text-sm child:flex child:flex-col  text-black child:items-center">
        <Link href={"/categories"} className="child:sm:text-base child:text-sm">
          <HiOutlineBuildingStorefront size={24} className="" />
          <span className="font-Shabnam_B text-base">فروشگاه</span>
        </Link>
        <Link className="child:sm:text-base child:text-sm" href={"/register-login"}>
          <RiUser3Line size={24} />
          <span className="font-Shabnam_B text-base">
            <span>حساب</span>&nbsp;
            <span className="hidden sm:inline">کاربری</span>
          </span>
        </Link>
        <Link href={"#"} className="child:sm:text-base child:text-sm" >
          <AiOutlineShoppingCart size={24} />
          <span className="font-Shabnam_B text-base">سبد خرید</span>
        </Link>
        <Link href={"/"} className="child:sm:text-base child:text-sm">
          <AiOutlineHome size={24} />
          <span className="font-Shabnam_B text-base">خانه</span>
        </Link>
      </div>
    </div>
  );
}

export default MobileTabBar;
