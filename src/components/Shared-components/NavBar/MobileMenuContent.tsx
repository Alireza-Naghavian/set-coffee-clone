import DropDown from "@/components/UI/DropDown/DropDown";
import Loader from "@/components/UI/loader/Loader";
import NavItem, { SubItemType } from "@/components/UI/NavItem/NavItem";
import { GetMetype } from "@/types/auth.type";
import { SetState } from "@/types/global.type";
import { subMenuTitles, subUserMenu } from "@/utils/constants";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { RiAdminFill } from "react-icons/ri";
import styles from "./Navbar.module.css";
type MobileMenuContentType = {
  user: GetMetype | null;
  setIsMenuOpen: SetState<boolean>;
  isMenuOpen: boolean;
  userLoading: boolean;
  userRole: string | undefined;
};
function MobileMenuContent({
  user,
  setIsMenuOpen,
  isMenuOpen,
  userLoading,
  userRole,
}: MobileMenuContentType) {
  return (
    <ul className="mobile-menu-wrapper min-h-screen overflow-y-auto">
      <div className="flex relative mt-2 px-5 py-3 font-Shabnam_M shadow-md">
        <span>منوی دسترسی</span>
      </div>
      <ul
        className="text-main/90 child:font-Shabnam_M 
                    justify-center my-auto flex-col child:my-auto 
                    child:py-[12px] mt-4 child:border-b last:border-none 
                    child:px-4"
      >
        <div className="" onClick={() => setIsMenuOpen(false)}>
          <NavItem targetLink="/" label="صفحه اصلی" />
        </div>
        <div className="w-full !p-0">
          <DropDown className="px-6 cursor-pointer" isMenuOpen={isMenuOpen} label={"فروشگاه"}>
            <ul
              className={`text-main/90 mt-2  child:font-Shabnam_M justify-center 
              my-auto flex-col tr-300 child:py-[6px] 
              child:border-b last:child:border-none child:px-2 `}
            >
              {subMenuTitles.map((subItem: SubItemType, index: number) => {
                return (
                  <li key={index} onClick={() => setIsMenuOpen(false)}>
                    <Link
                      href={subItem.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="tr-200 !px-5 w-full"
                    >
                      {subItem.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </DropDown>
        </div>
        <div className="" onClick={() => setIsMenuOpen(false)}>
          <NavItem targetLink="/contact-us" label="تماس با ما" />
        </div>
        <div className="" onClick={() => setIsMenuOpen(false)}>
          <NavItem targetLink="/policy" label="قوانین" />
        </div>
        <div className="" onClick={() => setIsMenuOpen(false)}>
          <NavItem targetLink="/blogs" label="وبلاگ" />
        </div>
        <div className="" onClick={() => setIsMenuOpen(false)}>
          <NavItem targetLink="/about-us" label="درباره ما" />
        </div>
        <div className="mr-2" onClick={() => setIsMenuOpen(false)}>
          <NavItem
            targetLink="/my-account/wishlist"
            label="لیست علاقه مندی ها"
            icon={<FaRegHeart />}
          />
        </div>
        {userRole === "ADMIN" && (
          <div className="mr-2" onClick={() => setIsMenuOpen(false)}>
            <NavItem
              targetLink="/p-admin"
              label="پنل ادمین"
              icon={<RiAdminFill />}
            />
          </div>
        )}

        {userLoading ? (
          <Loader loadingCondition={userLoading} />
        ) : !user ? (
          <Link
            className={`flex items-center relative mr-2 gap-x-px ${styles.hasSubMenu} `}
            href={"/register-login"}
          >
            <NavItem
              targetLink="/register-login"
              label="عضویت/ورورد"
              icon={<LuUser2 />}
            />
          </Link>
        ) : (
          <div className="w-full !p-0">
            <DropDown className="px-6 cursor-pointer" isMenuOpen={isMenuOpen} label={user.userName}>
              <ul
                className={`text-main/90 mt-2  child:font-Shabnam_M justify-center 
              my-auto flex-col tr-300 child:py-[6px] 
              child:border-b last:child:border-none child:px-2 `}
              >
                {subUserMenu.map((subItem: SubItemType, index: number) => {
                  return (
                    <li key={index} onClick={() => setIsMenuOpen(false)}>
                      <Link href={subItem.href} className="tr-200 !px-5 w-full">
                        {subItem.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </DropDown>
          </div>
        )}
      </ul>
    </ul>
  );
}

export default MobileMenuContent;
