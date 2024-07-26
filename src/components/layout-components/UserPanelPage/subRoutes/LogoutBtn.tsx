"use client";
import useLogOut from "@/hooks/authHooks/useLogout";
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LogoutBtn() {
  const {  logout } = useLogOut();
  const logoutHandler =  () => {
     logout();
     toast.success("خروج موفقیت آمیز")
  };
  return (
    <>
      <button onClick={logoutHandler} className="flex-center flex-col">
        <IoIosLogOut className="text-[65px]" />
        <span className="text-lg font-Shabnam_M ">خروج</span>
      </button>
    </>
  );
}

export default LogoutBtn;
