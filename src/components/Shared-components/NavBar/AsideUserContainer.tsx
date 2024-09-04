import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import LoginForm from "../Forms/LoginForm";
import { SideBarBasketType } from "../SideBarBasket/SideBarBasket";
import { useState } from "react";
import { SetState } from "@/types/global.type";
import CheckOtp from "../Forms/CheckOtp";
import useCountDownTimer from "@/hooks/helper-hooks/useCountDownTimer";
function AsideUserContainer({ setIsCartOpen, isOpen }: SideBarBasketType) {
  const { isActive, minutes, seconds, startCountDown } = useCountDownTimer(2,0);
  const [sendOtp, setSendOtp]: [boolean, SetState<boolean>] = useState(false);
  const [identifier, setIdentifier]: [string, SetState<string>] = useState("");
  return (
    <>
      <aside>
        <div className="relative z-50 h-full flex flex-col justify-between ">
          <div
            className="h-[68px] max-h-[70px]  bg-white 
                  flex-between-center py-5 px-[15px] text-main text-lg
                   border-b shadow-sm font-Shabnam_B"
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
        {!sendOtp && (
          <LoginForm
            startCountDown={startCountDown}
            setIsCartOpen={setIsCartOpen}
            setSendOtp={setSendOtp}
            setIdentifier={setIdentifier}
          />
        )}
        {sendOtp && (
          <CheckOtp
            startCountDown={startCountDown}
            isActive={isActive}
            minutes={minutes}
            seconds={seconds}
            setSendOtp={setSendOtp}
            setIsCartOpen={setIsCartOpen}
            isOpen={isOpen}
            identifier={identifier}
          />
        )}
        <div
          className="mt-10 border-t border-t-black/55 mx-auto w-[90%]  
          flex flex-col items-center"
        >
          <FiUser className="text-[100px] text-gray-500 mt-12" />
          <div className="flex flex-col gap-y-2">
            <span className="font-Shabnam_M text-center text-lg">
              حساب کاربری ندارید؟
            </span>
            <Link
              className="font-Shabnam_B text-center text-main_green
             hover:text-main_green_dark tr-200"
              href={"/register-login"}
            >
              عضویت
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AsideUserContainer;
