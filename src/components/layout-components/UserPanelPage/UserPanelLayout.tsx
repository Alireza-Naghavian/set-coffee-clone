import Link from "next/link";
import React from "react";
import { TbChecklist } from "react-icons/tb";
import styles from "./myAccount.module.css";
import { FaMapLocationDot, FaShuffle } from "react-icons/fa6";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
function UserPanelLayout() {
  return (
    <div>
      <DefaultPage />
    </div>
  );
}

const DefaultPage = () => {
  return (
    <div className="flex flex-col  relative ">
      <div className="w-full  text-mute">
        <p className=" text-right  ">
          <span>سلام</span>
          &nbsp;
          <b>alireza</b>
        </p>
        <p className="mt-2 pb-2">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
      </div>
      <div className={styles.defaultPage_Grid_Sec}>
        <Link href={""} className="flex-center flex-col">
          <TbChecklist className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">سفارش ها</span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <FaMapLocationDot className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">آدرس</span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <HiOutlineUserCircle className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">جزئیات حساب</span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <FaShuffle className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">مقایسه</span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <FaRegHeart className="text-[65px]" />
          <span className="text-lg font-Shabnam_M tracking-tighter ">
            لیست علاقه مندی ها
          </span>
        </Link>
        <Link href={""} className="flex-center flex-col">
          <IoIosLogOut className="text-[65px]" />
          <span className="text-lg font-Shabnam_M ">خروج</span>
        </Link>
      </div>
    </div>
  );
};
export default UserPanelLayout;
