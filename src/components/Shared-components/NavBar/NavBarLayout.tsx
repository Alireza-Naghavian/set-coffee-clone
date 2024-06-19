"use client";
import useNavBarSticker from "@/hooks/helper-hooks/useNavBarSticker";
import NavBarContent from "./NavBarContent";
import styles from "./Navbar.module.css";
import MobileTabBar from "./MobileTabBar";
import { usePathname } from "next/navigation";

function NavBarLayout() {
  const { fixTop } = useNavBarSticker(100);
  const pathName = usePathname();
  if(pathName === "/register-login") return
  return (
    <div className="relative">
      <div className=" flex justify-center   ">
        <nav
          className={`${
            fixTop ? styles.navbar_fixed : `${styles.navbar}  !bg-white    `
          }`}
        >
           
          <NavBarContent />
        </nav>
        <MobileTabBar />
      </div>
    </div>
  );
}
export default NavBarLayout;
