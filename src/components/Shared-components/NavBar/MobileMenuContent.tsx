import DropDown from "@/components/UI/DropDown/DropDown";
import NavItem from "@/components/UI/NavItem/NavItem";
import SearchFields from "@/components/UI/TextFiels/SearchFields";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { subMenuTitles } from "./DesktopMenu";
import styles  from "./Navbar.module.css"
import Link from "next/link";
function MobileMenuContent() {
  return (
    <ul className="mobile-menu-wrapper min-h-screen overflow-y-auto">
      <form className="flex relative mt-2 px-1 py-3 shadow-md">
        <SearchFields placeholder="جستجو محصولات" type="text" />
      </form>
      <ul
        className="text-main/90 child:font-Shabnam_M 
                    justify-center my-auto flex-col child:my-auto 
                    child:py-[12px] mt-2 child:border-b last:border-none 
                    child:px-5"
      >
        <NavItem targetLink="/" label="صفحه اصلی" />
        <div className="w-full !p-0">
          <DropDown label={"فروشگاه"}>
            <ul
              className={`text-main/90 mt-2  child:font-Shabnam_M justify-center 
              my-auto flex-col tr-300 child:py-[6px] 
              child:border-b last:child:border-none child:px-2 `}>
                
              {subMenuTitles.map((title: string, index: number) => {
                return (
                  <li key={index} className="tr-200 !px-5 w-full ">
                    {title}
                  </li>
                );
              })}
            </ul>
          </DropDown>
        </div>

        <NavItem targetLink="/" label="تماس با ما" />
        <NavItem targetLink="/" label="درباره ما" />
        <NavItem targetLink="/" label="لیست علاقه مندی ها" icon={<FaRegHeart />} />
        <NavItem targetLink="/" label="مقایسه" icon={<FaShuffle />} />
        <Link className={`flex items-center relative gap-x-px ${styles.hasSubMenu} `} href={"/register-login"}>
        <NavItem targetLink="/register-login" label="عضویت/ورورد" icon={<LuUser2 />} />
        </Link>
      </ul>
    </ul>
  );
}

export default MobileMenuContent;
