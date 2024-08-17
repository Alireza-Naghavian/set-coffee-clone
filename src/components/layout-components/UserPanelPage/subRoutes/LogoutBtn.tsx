"use client";
import { useAlert } from "@/app/context/AlertContext";
import useLogOut from "@/hooks/authHooks/useLogout";
import { IoLogOutSharp } from "react-icons/io5";
function LogoutBtn({ className }: { className?: string }) {
  const { logout } = useLogOut();
  const { showAlert } = useAlert();
  const logoutHandler = () => {
    logout();
    showAlert("error", "خروج موفقیت آمیز");
  };
  return (
    <button onClick={logoutHandler} className={`${className}`}>
      <IoLogOutSharp className="text-[65px]" />
      <span className="text-lg font-Shabnam_M  ">خروج</span>
    </button>
  );
}

export default LogoutBtn;
