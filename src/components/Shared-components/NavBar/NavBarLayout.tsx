"use client";
import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import useNavBarSticker from "@/hooks/helper-hooks/useNavBarSticker";
import { GetMetype } from "@/types/auth.type";
import { usePathname } from "next/navigation";
import MobileTabBar from "./MobileTabBar";
import NavBarContent from "./NavBarContent";
import styles from "./Navbar.module.css";
function NavBarLayout({ user }: { user: GetMetype }) {
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
            <NavBarContent user={user } />
          </nav>
          <MobileTabBar user={user } />
        </div>
      </div>
    </QueryClientProviderWrapper>
  );
}
export default NavBarLayout;
