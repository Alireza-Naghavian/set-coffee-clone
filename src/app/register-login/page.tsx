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

function page() {
  const [authStep, setAuthStep] = useState<number>(1);
  const [sendOtp, setSendOtp]: [boolean, SetState<boolean>] = useState(false);
  const [identifier, setIdentifier]: [string, SetState<string>] = useState("");

  switch (authStep) {
  }
  return (
    <QueryClientProviderWrapper>
      <ToastProvider>
        <div>
          {sendOtp && <CheckOtp identifier={identifier} />}
          {!sendOtp && (
            <LoginFormWrapper
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

export default page;

const LoginFormWrapper = ({
  setSendOtp,
  setIdentifier,
}: {
  setSendOtp: SetState<boolean>;
  setIdentifier: SetState<string>;
}) => {
  return (
    <div className=" w-[380px] form-wrapper  py-6  shadow-md mx-auto bg-white ">
      <LoginForm setSendOtp={setSendOtp} setIdentifier={setIdentifier} />
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

const SignUpFormWrapper = () => {
  return (
    <div className=" w-[380px] form-wrapper  h-[376px]  shadow-md mx-auto bg-white ">
      <SignUpForm />
    </div>
  );
};
