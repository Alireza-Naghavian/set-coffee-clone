"use client";
import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import { usePathname } from "next/navigation";
import MobileTabBar from "./MobileTabBar";
import styles from "./Navbar.module.css";
import NavBarContent from "./NavBarContent";
function NavBarLayout() {
  const pathName = usePathname();
  if (pathName === "/register-login" || pathName.startsWith("/p-admin") ) return;
  return (
    <QueryClientProviderWrapper>
      <div className="relative">
        <div className=" flex justify-center   ">
          <nav
            className={`${ styles.navbar } !bg-white shadmd`}
          >
            <NavBarContent  />
          </nav>
          <MobileTabBar   />
        </div>
      </div>
    </QueryClientProviderWrapper>
  );
}

export default NavBarLayout;
