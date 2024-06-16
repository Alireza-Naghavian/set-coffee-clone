import styles from "@/components/Shared-components/NavBar/Navbar.module.css";
import Link from "next/link";
import React from "react";
type NavItemType = {
  label: string;
  icon?: React.ReactElement;
  subMenuItem?: null | string[];
};
function NavItem({ label, icon, subMenuItem = null }: NavItemType) {
  return (
    <li className={`flex-center relative gap-x-px ${styles.hasSubMenu} `}>
    <Link className="flex-center relative gap-x-px" href={"#"}>
    <span>{label}</span>
    {icon}
    </Link>
      <div
        className={`max-w-[220px] w-[220px]  bg-white absolute top-8 right-4 ${styles.subMenu}`}
      >
        <ul
          className={`py-2 child:py-[6px] child:px-5 child:text-main/60 z-50 child-hover:text-main 
            child:text-right child:rounded-sm ${subMenuItem ? "flex flex-col" : "hidden"}`}
        >
          {subMenuItem?.map((subItem: string, index: number) => {
            return (
              <li key={index} className="tr-200">
               <Link href={"#"}>{subItem}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default NavItem;
