import { GetMetype } from '@/types/auth.type';
import Link from 'next/link';
import React from 'react'
import { FaRegHeart } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { IoIosLogOut } from 'react-icons/io';
import { TbChecklist } from 'react-icons/tb';
import styles from "./myAccount.module.css"
const UserPanelHomePage = ({ user }: { user: GetMetype }) => {
    return (
      <div className="flex flex-col  relative ">
        <div className="w-full  text-mute">
          <p className=" text-right  ">
            <span>سلام</span>
            &nbsp;
            <b>{user.userName}</b>
          </p>
          <p className="mt-2 pb-2">
            از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
            مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
            کاربری و کلمه عبور خود را ویرایش کنید.
          </p>
        </div>
        <div className={styles.defaultPage_Grid_Sec}>
          <Link href={"/my-account/orders"} className="flex-center flex-col">
            <TbChecklist className="text-[65px]" />
            <span className="text-lg font-Shabnam_M ">سفارش ها</span>
          </Link>
          <Link href={"/my-account/details"} className="flex-center flex-col">
            <HiOutlineUserCircle className="text-[65px]" />
            <span className="text-lg font-Shabnam_M ">جزئیات حساب</span>
          </Link>
          <Link href={"/my-account/compare"} className="flex-center flex-col">
            <FaShuffle className="text-[65px]" />
            <span className="text-lg font-Shabnam_M ">مقایسه</span>
          </Link>
          <Link href={"/my-account/wishlist"} className="flex-center flex-col">
            <FaRegHeart className="text-[65px]" />
            <span className="text-lg font-Shabnam_M tracking-tighter ">
              لیست علاقه مندی ها
            </span>
          </Link>
          <Link href={"/my-account/logout"} className="flex-center flex-col">
            <IoIosLogOut className="text-[65px]" />
            <span className="text-lg font-Shabnam_M ">خروج</span>
          </Link>
        </div>
      </div>
    );
  };

export default UserPanelHomePage