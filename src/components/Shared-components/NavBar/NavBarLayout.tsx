"use client";
import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import useNavBarSticker from "@/hooks/helper-hooks/useNavBarSticker";
import { usePathname } from "next/navigation";
import MobileTabBar from "./MobileTabBar";
import styles from "./Navbar.module.css";
import NavBarContent from "./NavBarContent";
function NavBarLayout() {
  const { fixTop } = useNavBarSticker(100);
  const pathName = usePathname();
  if (pathName === "/register-login") return;
  return (
    <QueryClientProviderWrapper>
      <div className="relative">
        <div className=" flex justify-center   ">
          <nav
            className={`${
              fixTop
                ? styles.navbar_fixed
                : `${styles.navbar}  !bg-white shadow-md`
            }`}
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
