import { BiSolidOffer } from "react-icons/bi";
import { FaShoppingBag, FaUsers } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { ImReply } from "react-icons/im";
import { IoDocument } from "react-icons/io5";
import { MdSms } from "react-icons/md";
import LogoutBtn from "../UserPanelPage/subRoutes/LogoutBtn";
import styles from "./adminPanel.module.css";
import NavItem from "@/components/UI/NavItem/NavItem";
function SideBarAdminPanel({isOpen}:{isOpen:boolean}) {
  return (
    <aside className={`${styles.sideBar_section} ${styles.sideBar_section_sm} tr-300 ${isOpen ? " z-50  right-0 absolute" : ""}  `} >
    <h3 className=" text-white text-right font-Shabnam_B text-xl   border-b-2 border-b-gray-300 pb-2   ">
      <span className="mr-3">پنل ادمین</span>
    </h3>
    {/* link list */}
    <ul
      className={`${styles.Sidbar_list}`}>
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
  )
}

export default SideBarAdminPanel