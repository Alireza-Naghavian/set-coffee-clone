"use client";
import DropDown from "@/components/UI/DropDown/DropDown";
import NavItem from "@/components/UI/NavItem/NavItem";
import Overlay from "@/components/UI/Overlay/Overlay";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import useNotfication from "@/hooks/helper-hooks/useNotfication";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
import { GetMetype } from "@/types/auth.type";
import { AdminSideBarItem, DropDownAdminItem } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ImReply } from "react-icons/im";
import { IoMdHome } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdOutlineWavingHand } from "react-icons/md";
import LogoutBtn from "../UserPanelPage/subRoutes/LogoutBtn";
import styles from "./adminPanel.module.css";
import Notification from "@/components/UI/Notification/Notification";
type AdminPanelType = {
  children: React.ReactNode;
  user: GetMetype;
};
const AdminPanelLayout: React.FC<AdminPanelType> = ({ user, children }) => {
  const [isOpen, { open, close }] = useDisclosure();
  useScrollLocker(isOpen);
  const path = usePathname();
  const { clearNotification, notifications } = useNotfication();
  const handleItemClick = (type: string) => {
    clearNotification(type);
    close();
  };
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
            <h3
              className=" text-white text-right font-Shabnam_B text-xl  
             border-b-2 border-b-gray-300 pb-2"
            >
              <span className="mr-3">پنل ادمین</span>
            </h3>
            {/* link list */}
            <ul
              className={`${styles.Sidbar_list} !w-full child:child:!w-full  `}
            >
              <NavItem
                targetLink="/p-admin"
                className={`!w-full  ${
                  path === "/p-admin" ? "bg-main/55" : "bg-transparent"
                }`}
                icon={<ImReply />}
                onClick={() => close()}
                label="پیشخوان"
              />

              {DropDownAdminItem.map((item, index: number) => {
                return (
                  <DropDown
                    key={index}
                    className={` gap-x-2 py-0 hover:!bg-transparent ${
                      path.startsWith(item.targetLink)
                        ? "bg-main/55"
                        : "bg-transparent"
                    }`}
                    bgColor="bg-transparent"
                    activeBg="bg-transparent px-2"
                    icon={<item.icon />}
                    isMenuOpen={isOpen}
                    label={item.label}
                  >
                    <div className=" flex flex-col gap-y-8  child-hover:bg-transparent py-2 hover:bg-main_brown">
                      <div className="child:mr-3 child:text-base flex flex-col gap-y-2 child:mt-2 child-hover:bg-transparent">
                        <NavItem
                          onClick={() => close()}
                          targetLink={item.subTargetLink}
                          icon={<item.subIcon />}
                          label={item.subLabel}
                        />
                        <NavItem
                          onClick={() => close()}
                          targetLink={item.subTargetLink_2}
                          icon={<item.subIcon_2 />}
                          label={item.subLabel_2}
                        />
                      </div>
                    </div>
                  </DropDown>
                );
              })}
              {AdminSideBarItem.map((item) => {
                return (
                  <div
                    key={item.label}
                    className={` 
                  ${styles.NavItem} 
                  ${
                    path === item.targetLink ? "bg-main/55" : "bg-transparent"
                  }`}
                  >
                    <NavItem
                      className="!w-full  col-span-4"
                      onClick={() => handleItemClick(item.section)}
                      targetLink={item.targetLink}
                      icon={<item.icon />}
                      label={item.label}
                    />
                    {notifications[item.section] && (
                      <Notification className="my-auto" />
                    )}{" "}
                    {/* نمایش نوتیفیکیشن */}
                  </div>
                );
              })}
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
