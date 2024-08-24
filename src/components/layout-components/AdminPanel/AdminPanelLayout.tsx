"use client";
import DropDown from "@/components/UI/DropDown/DropDown";
import NavItem from "@/components/UI/NavItem/NavItem";
import Overlay from "@/components/UI/Overlay/Overlay";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
import { GetMetype } from "@/types/auth.type";
import Link from "next/link";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaPlus, FaShoppingBag, FaUsers } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { ImReply } from "react-icons/im";
import { IoMdHome } from "react-icons/io";
import { IoDocument, IoMenu } from "react-icons/io5";
import { MdManageAccounts, MdOutlineWavingHand, MdSms } from "react-icons/md";
import LogoutBtn from "../UserPanelPage/subRoutes/LogoutBtn";
import styles from "./adminPanel.module.css";
import { FaListUl } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { usePathname } from "next/navigation";
type AdminPanelType = {
  children: React.ReactNode;
  user: GetMetype;
};
const AdminPanelLayout: React.FC<AdminPanelType> = ({ user, children }) => {
  const [isOpen, { open, close }] = useDisclosure();
  useScrollLocker(isOpen);
  const path = usePathname();
  console.log(path);
  return (
    <>
      <Overlay
        openCondition={isOpen}
        onClose={() => {
          close();
        }}
      />

      <div className="w-full relative px-0 flex ">
        <div
          className={` flex md:flex-row flex-col lg:relative fixed
         right-0 tr-300 z-50 transform  lg:overflow-y-hidden
          lg:translate-x-0 !w-[min(355px,75vw)]
         ${isOpen ? "translate-x-0" : "translate-x-[40rem]"} `}
        >
          {/* side bar */}
          <aside className={`${styles.sideBar_section} `}>
            <h3 className=" text-white text-right font-Shabnam_B text-xl   border-b-2 border-b-gray-300 pb-2   ">
              <span className="mr-3">پنل ادمین</span>
            </h3>
            {/* link list */}
            <ul className={`${styles.Sidbar_list} !w-full child:child:!w-full  `}>
              <NavItem
                targetLink="/p-admin"
                className={`!w-full  ${
                  path === "/p-admin" 
                  ? "bg-main/55"
                   : "bg-transparent"
                }`}
                icon={<ImReply />}
                onClick={() => close()}
                label="پیشخوان"
              />
              <DropDown
                className={` gap-x-2 py-0 hover:!bg-transparent ${
                  path.startsWith("/p-admin/products")
                    ? "bg-main/55"
                    : "bg-transparent"
                }`}
                bgColor="bg-transparent"
                activeBg="bg-transparent px-2"
                icon={<FaShoppingBag className="" />}
                isMenuOpen={isOpen}
                label="محصولات"
              >
                <div className=" flex flex-col gap-y-8  child-hover:bg-transparent py-2 hover:bg-main_brown">
                  <div className="child:mr-3 child:text-base flex flex-col gap-y-2 child:mt-2 child-hover:bg-transparent">
                    <NavItem
                      onClick={() => close()}
                      targetLink="/p-admin/products"
                      icon={<FaPlus />}
                      label="افزودن"
                    />
                    <NavItem
                      onClick={() => close()}
                      targetLink="/p-admin/products/manage"
                      icon={<MdManageAccounts />}
                      label="مدیریت محصولات"
                    />
                  </div>
                </div>
              </DropDown>
              <NavItem
                className={`${
                  path === "/p-admin/users"
                   ? "bg-main/55" 
                   : "bg-transparent"
                }`}
                onClick={() => close()}
                targetLink="/p-admin/users"
                icon={<FaUsers />}
                label="کاربران"
              />
              <NavItem
                className={`${
                  path === "/p-admin/comments" 
                  ? "bg-main/55"
                   : "bg-transparent"
                }`}
                onClick={() => close()}
                targetLink="/p-admin/comments"
                icon={<MdSms />}
                label="کامنت ها"
              />
              <NavItem
                className={`${
                  path === "/p-admin/tickets"
                   ? "bg-main/55"
                   : "bg-transparent"
                }`}
                onClick={() => close()}
                targetLink="/p-admin/tickets"
                icon={<HiTicket />}
                label="تیکت ها"
              />
              <DropDown
                  className={`gap-x-2 py-0 hover:!bg-transparent ${
                    path.startsWith("/p-admin/offers")
                      ? "bg-main/55"
                      : "bg-transparent"
                  }`}
                bgColor="bg-transparent"
                activeBg="bg-transparent px-2"
                icon={<BiSolidOffer className="text-2xl" />}
                isMenuOpen={isOpen}
                label="تخفیفات"
              >
                <div className=" flex flex-col gap-y-8  child-hover:bg-transparent py-2 hover:bg-main_brown">
                  <div className="child:mr-3 child:text-base flex flex-col gap-y-2 child:mt-2 child-hover:bg-transparent">
                    <NavItem
                      onClick={() => close()}
                      targetLink="/p-admin/offers/create"
                      icon={<FaPlus />}
                      label="افزودن کد تخفیف"
                    />
                    <NavItem
                      onClick={() => close()}
                      targetLink="/p-admin/offers/list"
                      icon={<FaListUl />}
                      label="لیست کد ها"
                    />
                  </div>
                </div>
              </DropDown>
              <DropDown
              
                className={`gap-x-2 py-0 hover:!bg-transparent ${
                  path.startsWith("/p-admin/blogs")
                    ? "bg-main/55"
                    : "bg-transparent"
                }`}
                bgColor="bg-transparent"
                activeBg="bg-transparent px-2"
                icon={<FaNewspaper className="text-2xl" />}
                isMenuOpen={isOpen}
                label="مقاله ها"
              >
                <div className=" flex flex-col gap-y-8  child-hover:bg-transparent py-2 hover:bg-main_brown">
                  <div className="child:mr-3 child:text-base flex flex-col gap-y-2 child:mt-2 child-hover:bg-transparent">
                    <NavItem
                      onClick={() => close()}
                      targetLink="/p-admin/blogs/add"
                      icon={<FaPlus />}
                      label="افزودن"
                    />
                    <NavItem
                      onClick={() => close()}
                      targetLink="/p-admin/blogs/list"
                      icon={<IoDocument />}
                      label="لیست  مقالات"
                    />
                  </div>
                </div>
              </DropDown>
             <div className="child:cursor-pointer -mr-1 child:text-white">
             <LogoutBtn className="flex  child:text-[22px] items-center gap-x-2 " />
             </div>
            </ul>
          </aside>
        </div>
        {/* content */}
        <div className="relative w-full bg-gray-100 flex flex-col  ">
          <div className=" w-full flex justify-between flex-wrap items-center  h-[70px] px-4 bg-main_brown p-2 ">
            <div className=" flex items-center gap-x-2">
              <div
                className="lg:hidden block text-white text-4xl cursor-pointer"
                onClick={() => open()}
              >
                <IoMenu />
              </div>
              <h2 className="font-Shabnam_B text-white text-right text-lg sm:text-xl flex items-center gap-x-2">
                <span>خوش آمدی {user?.userName} عزیز </span>
                <MdOutlineWavingHand className="" />
              </h2>
            </div>
            <div className="text-white  mr-auto">
              <Link
                className="rounded-lg bg-main px-2 py-2 hidden sm:block"
                href={"/"}
              >
                بازگشت به سایت
              </Link>
              <Link href={"/"} className="sm:hidden ">
                <IoMdHome className="h-8 w-8" />
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminPanelLayout;
