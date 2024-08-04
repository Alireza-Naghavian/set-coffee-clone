import { GetMetype } from '@/types/auth.type';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { TbChecklist } from 'react-icons/tb';
import LogoutBtn from './LogoutBtn';
import styles from "./myAccount.module.css";
import { HiTicket } from "react-icons/hi2";
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
            مشاهده،  صورتحساب‌تان را مدیریت و جزییات حساب
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
          <Link href={"/my-account/wishlist"} className="flex-center flex-col">
            <FaRegHeart className="text-[65px]" />
            <span className="text-lg font-Shabnam_M tracking-tighter ">
              لیست علاقه مندی ها
            </span>
          </Link>
          <Link href={"/my-account/tickets"} className="flex-center flex-col">
            <HiTicket className="text-[65px]" />
            <span className="text-lg font-Shabnam_M tracking-tighter ">
             تیکت ها
            </span>
          </Link>
        <LogoutBtn/>
        </div>
      </div>
    );
  };

export default UserPanelHomePage