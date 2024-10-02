import Badge from "@/components/UI/badge/Badge";
import Loader from "@/components/UI/loader/Loader";
import LogoLink from "@/components/UI/LogoLink/LogoLink";
import NavItem from "@/components/UI/NavItem/NavItem";
import Overlay from "@/components/UI/Overlay/Overlay";
import NotificationWrapper from "@/components/Utils-components/notifications/NotificationWrapper";
import useLogOut from "@/hooks/authHooks/useLogout";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
import useGetBasketData from "@/hooks/orders/useGetBasketData";
import useGetWishList from "@/hooks/wishList/useGetWishList";
import { GetMetype } from "@/types/auth.type";
import { subMenuTitles, subUserMenu } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import SideBarBasket from "../SideBarBasket/SideBarBasket";
import AsideUserContainer from "./AsideUserContainer";
import styles from "./Navbar.module.css";
function DesktopMenu({
  user,
  userLoading,
}: {
  user: GetMetype;
  userLoading: boolean;
}) {
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState<boolean>(false);
  const [isOpen, { close, open }] = useDisclosure();
  const { userBasket, basketLoading } = useGetBasketData();
  const { logout } = useLogOut();
  const { push } = useRouter();
  const { wishList: getData, isLoading } = useGetWishList();
  useScrollLocker(isOpen || isDesktopCartOpen);
  const logOutHandler = () => {
    logout();
  };
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
            <NavItem
              targetLink="/categories"
              label="فروشگاه"
              icon={<IoChevronDown />}
              subMenuItem={subMenuTitles}
            />
            <NavItem targetLink="/blogs" label="وبلاگ" />
            <NavItem targetLink="/contact-us" label="تماس با ما" />
            <NavItem targetLink="/about-us" label="درباره ما" />
            <NavItem targetLink="/policy" label="قوانین" />
            {userLoading ? (
              <Loader loadingCondition={userLoading} />
            ) : user ? (
              <NavItem
                targetLink="/my-account"
                label={user.userName}
                icon={<IoChevronDown />}
                subMenuItem={subUserMenu}
                optionalSubMenu={
                  user.role === "ADMIN"
                    ? [
                        { label: "پنل ادمین", action:()=> push("/p-admin") },
                        { label: "خروج", action: logOutHandler },
                      ]
                    : [{ label: "خروج", action: logOutHandler }]
                }
              />
            ) : (
              <div className="py-2" onClick={() => open()}>
                <NavItem targetLink="#" label="ورود/عضویت" />
              </div>
            )}
          </ul>
        </div>
        <div className=" text-main flex-center my-auto gap-x-6">
       <NotificationWrapper/>
          <Link href={"/my-account/wishlist"} className="relative">
            {isLoading
              ? ""
              : getData.length > 0 && (
                  <Badge
                    additionalClass="text-lg w-5 h-5 flex-center bg-main_brown 
          text-white rounded-full absolute -top-[5px] -left-[4px]"
                  >
                    {getData.length.toLocaleString("fa-Ir")}
                  </Badge>
                )}
            <FaRegHeart size={28} />
          </Link>
          <div
            onClick={() => setIsDesktopCartOpen(true)}
            className="cursor-pointer relative"
          >
            <Badge
              additionalClass="text-lg w-5 h-5 flex-center bg-main_brown 
          text-white rounded-full absolute -top-[5px] -left-[4px]"
            >
              {userBasket ? userBasket?.length.toLocaleString("fa-Ir"):"۰"}
            </Badge>
            <AiOutlineShoppingCart className="cursor-pointer" size={28} />
          </div>
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
          <SideBarBasket
            basketLoading={basketLoading}
            getCart={userBasket ?? []}
            setIsCartOpen={setIsDesktopCartOpen}
          />
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
