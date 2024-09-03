"use client";
import styles from "@/components/Shared-components/NavBar/Navbar.module.css";
import ProgressBarLink from "@/components/Utils-components/ProgressBar/ProgressBar";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import React from "react";
export type SubItemType = { label: string; href: string };
type NavItemType = {
  label: string;
  icon?: React.ReactElement|null;
  subMenuItem?: null | SubItemType[];
  optionalSubMenu?:null |{label:string,action:()=>void}[];
  targetLink: string;
  onClick?:React.MouseEventHandler<HTMLLIElement> ,
  className?:string
};
function NavItem({
  targetLink,
  label,
  icon,
  subMenuItem = [],
  optionalSubMenu = [],
  onClick,
  className
}: NavItemType) {
  const { push } = useRouter();
  return (
    <li
    onClick={onClick}
      suppressHydrationWarning
      className={`${className} flex   items-center relative gap-x-px ${styles.hasSubMenu} `}
    >
      <ProgressBarLink />
      <div
        onClick={() => push(targetLink)}
        className="flex  items-center gap-x-2 relative cursor-pointer "
      >
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div
        className={` ${subMenuItem&& subMenuItem?.length > 0 ? "" : 'hidden'} max-w-[220px] w-[220px]  bg-white absolute top-8 right-4 ${styles.subMenu}`}
      >
        <ul
          className={`py-2 child:py-[6px] child:px-5 child:text-main/60 z-50 child-hover:text-main 
            child:text-right child:rounded-sm  ${
              subMenuItem ? "flex flex-col" : "hidden"
            }`}
        >
          {subMenuItem?.map((subItem: SubItemType, index) => {
            return (
              <div  key={index} className="tr-200 w-full">
                <Link className="w-full" href={subItem.href}>{subItem.label}</Link>
              </div>
            );
          })}
          {optionalSubMenu?.map((subItem:{label:string,action:()=>void}, index:number) => {
            return (
              <div key={index} className="tr-200">
                <button onClick={subItem.action}>{subItem.label}</button>
              </div>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default NavItem;
