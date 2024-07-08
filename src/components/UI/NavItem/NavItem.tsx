import styles from "@/components/Shared-components/NavBar/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
type NavItemType = {
  label: string;
  icon?: React.ReactElement;
  subMenuItem?: null | string[];
  targetLink: string;
};
function NavItem({ targetLink, label, icon, subMenuItem = null }: NavItemType) {
  const {push} = useRouter();
  return (
    <li suppressHydrationWarning  className={`flex items-center relative gap-x-px ${styles.hasSubMenu} `}>
      <div
        onClick={()=>push(targetLink)}
        className="flex items-center gap-x-2 relative cursor-pointer ">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div
        className={`max-w-[220px] w-[220px]  bg-white absolute top-8 right-4 ${styles.subMenu}`}>
        <ul
          className={`py-2 child:py-[6px] child:px-5 child:text-main/60 z-50 child-hover:text-main 
            child:text-right child:rounded-sm ${
              subMenuItem ? "flex flex-col" : "hidden"
            }`}
        >
          {subMenuItem?.map((subItem: string, index: number) => {
            return (
              <div key={index} className="tr-200">
                <Link href={"/category"}>{subItem}</Link>
              </div>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default NavItem;
