import { IoIosClose } from "react-icons/io";
import LoginForm from "../Forms/LoginForm";
import { FiUser } from "react-icons/fi";
import { SideBarBasketType } from "../SideBarBasket/SideBarBasket";
import Link from "next/link";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
function AsideUserContainer({ setIsCartOpen }: SideBarBasketType) {

 
  return (
    <>
      <aside>
        <div className="relative z-50 h-full flex flex-col justify-between ">
          <div
            className="h-[68px] max-h-[70px]  bg-white 
                  flex-between-center py-5 px-[15px] text-main text-lg border-b shadow-sm font-Shabnam_B"
          >
            <span>ورود</span>
            <div
              className="flex gap-x-1 items-center cursor-pointer"
              onClick={() => setIsCartOpen(false)}
            >
              <span>بستن</span>
              <IoIosClose size={22} />
            </div>
          </div>
        </div>
        <LoginForm/>
        <div className="mt-10 border-t border-t-black/55 mx-auto w-[90%]  flex flex-col items-center">
          <FiUser className="text-[100px] text-gray-500 mt-12"/>
          <div className="flex flex-col gap-y-2">
            <span className="font-Shabnam_M text-center text-lg">حساب کاربری ندارید؟</span>
            <Link className="font-Shabnam_B text-center text-main_green hover:text-main_green_dark tr-200" href={"#"}>
              عضویت
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AsideUserContainer;
