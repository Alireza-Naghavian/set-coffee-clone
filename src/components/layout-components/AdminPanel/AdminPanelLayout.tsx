"use client";
import NavItem from "@/components/UI/NavItem/NavItem";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import { GetMetype } from "@/types/auth.type";
import Link from "next/link";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaShoppingBag, FaUsers } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { ImReply } from "react-icons/im";
import { IoDocument, IoMenu } from "react-icons/io5";
import { MdOutlineWavingHand, MdSms } from "react-icons/md";
import LogoutBtn from "../UserPanelPage/subRoutes/LogoutBtn";
import styles from "./adminPanel.module.css";
import Overlay from "@/components/UI/Overlay/Overlay";
import { IoMdHome } from "react-icons/io";
type AdminPanelType = {
  children: React.ReactNode;
  user: GetMetype;
};
const AdminPanelLayout: React.FC<AdminPanelType> = ({ user, children }) => {
  const [isOpen, { open, close }] = useDisclosure();
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
         right-0 tr-300 z-50 transform lg:h-screen lg:overflow-y-hidden
          lg:translate-x-0 !w-[min(355px,75vw)]
         ${isOpen ? "translate-x-0" : "translate-x-[40rem]"} `}
      >
        {/* side bar */}
        <aside className={`${styles.sideBar_section} `}>
          <h3 className=" text-white text-right font-Shabnam_B text-xl   border-b-2 border-b-gray-300 pb-2   ">
            <span className="mr-3">پنل ادمین</span>
          </h3>
          {/* link list */}
          <ul className={styles.Sidbar_list}>
            <NavItem targetLink="/p-admin" icon={<ImReply />} label="پیشخوان" />
            <NavItem
              targetLink="/p-admin/products"
              icon={<FaShoppingBag />}
              label="محصولات"
            />
            <NavItem
              targetLink="/p-admin/users"
              icon={<FaUsers />}
              label="کاربران"
            />
            <NavItem
              targetLink="/p-admin/comments"
              icon={<MdSms />}
              label="کامنت ها"
            />
            <NavItem
              targetLink="/p-admin/tickets"
              icon={<HiTicket />}
              label="تیکت ها"
            />
            <NavItem
              targetLink="/p-admin/offers"
              icon={<BiSolidOffer />}
              label="تخفیفات"
            />
            <NavItem
              targetLink="/p-admin/blogs"
              icon={<IoDocument />}
              label="مقاله ها"
            />
            <LogoutBtn className="flex items-center gap-x-2 " />
          </ul>
        </aside>
     
      </div>
      {/* content */}
      <div className="relative w-full bg-gray-100 flex flex-col">
        <div className=" w-full flex justify-between flex-wrap items-center  h-[64px] px-4 bg-main_brown p-2 ">
          <div className=" flex items-center gap-x-2">
            <div
              className="lg:hidden block text-white text-4xl cursor-pointer"
              onClick={() => open()}
            >
              <IoMenu />
            </div>
            <h2 className="font-Shabnam_B text-white text-right text-xl flex items-center gap-x-2">
              <span>خوش آمدی {user?.userName} عزیز </span>
              <MdOutlineWavingHand className=""/>
            </h2>
          </div>
          <div className="text-white  mr-auto">
            <Link className="rounded-lg bg-main px-2 py-2 hidden sm:block" href={"/"}>
              بازگشت به سایت
            </Link>
            <Link href={"/"} className="sm:hidden ">
            <IoMdHome className="h-8 w-8"/>
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