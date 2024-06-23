"use client";
import LoginForm from "@/components/Shared-components/Forms/LoginForm";
import SignUpForm from "@/components/Shared-components/Forms/SignUpForm";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Link from "next/link";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import { ToastProvider } from "../context/ToastContainerProvider";
import { useState } from "react";
import CheckOtp from "@/components/Shared-components/Forms/CheckOtp";
import { SetState } from "@/types/global.type";
import useCountDownTimer from "@/hooks/helper-hooks/useCountDownTimer";

function REgisterLogin() {
  const [authStep, setAuthStep] = useState<number>(1);
  const [sendOtp, setSendOtp]: [boolean, SetState<boolean>] = useState(false);
  const [identifier, setIdentifier]: [string, SetState<string>] = useState("");
  const {isActive,minutes,seconds,startCountDown} = useCountDownTimer(2,0)
  switch (authStep) {
  }
  return (
    <QueryClientProviderWrapper>
      <ToastProvider>
        <div>
          {sendOtp && <CheckOtp startCountDown={startCountDown} isActive={isActive} minutes={minutes} seconds={seconds}  identifier={identifier} />}
          {!sendOtp && (
            <LoginFormWrapper
            startCountDown={startCountDown}
              setIdentifier={setIdentifier}
              setSendOtp={setSendOtp}
            />
          )}
          {/* <SignUpFormWrapper/> */}
        </div>
      </ToastProvider>
    </QueryClientProviderWrapper>
  );
}


const LoginFormWrapper = ({
  setSendOtp,
  setIdentifier,
  startCountDown
}: {
  setSendOtp: SetState<boolean>;
  setIdentifier: SetState<string>;
  startCountDown:()=>void
}) => {
  return (
    <div className=" w-[380px] form-wrapper  py-6  shadow-md mx-auto bg-white ">
      <LoginForm startCountDown={startCountDown} setSendOtp={setSendOtp} setIdentifier={setIdentifier} />
      <div className="flex flex-col gap-y-4 px-4 mt-2 ">
        <span className="font-Shabnam text-right">حساب کاربری ندارید؟</span>
        <Link className="h-full w-full " href={"#"}>
          <MainBtn className="w-full" variant="secondary">
            ثبت نام
          </MainBtn>
        </Link>
      </div>
    </div>
  );
};

// const SignUpFormWrapper = () => {
//   return (
//     <div className=" w-[380px] form-wrapper  h-[376px]  shadow-md mx-auto bg-white ">
//       <SignUpForm />
//     </div>
//   );
// };
export default REgisterLogin;
