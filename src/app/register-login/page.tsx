"use client";
import LoginForm from "@/components/Shared-components/Forms/LoginForm";
import SignUpForm from "@/components/Shared-components/Forms/SignUpForm";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Link from "next/link";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import { ToastProvider } from "../context/ToastContainerProvider";
import React, { useEffect, useState } from "react";
import CheckOtp from "@/components/Shared-components/Forms/CheckOtp";
import { SetState } from "@/types/global.type";
import useCountDownTimer from "@/hooks/helper-hooks/useCountDownTimer";

export type MainWrapperType = {
  setSendOtp: SetState<boolean>;
  setIdentifier: SetState<string>;
  startCountDown: () => void;
  setAuthStep: SetState<number>;
};

const REgisterLogin = (): React.ReactNode => {
  const [authStep, setAuthStep] = useState<number>(1);
  const [sendOtp, setSendOtp]: [boolean, SetState<boolean>] = useState(false);
  const [identifier, setIdentifier]: [string, SetState<string>] = useState("");
  const { isActive, minutes, seconds, startCountDown } = useCountDownTimer(
    2,
    0
  );
  const renderStep = () => {
    switch (authStep) {
      case 1:
        return !sendOtp ? (
          <LoginFormWrapper
            setAuthStep={setAuthStep}
            startCountDown={startCountDown}
            setIdentifier={setIdentifier}
            setSendOtp={setSendOtp}
          />
        ) : (
          <CheckOtp
            startCountDown={startCountDown}
            isActive={isActive}
            minutes={minutes}
            seconds={seconds}
            identifier={identifier}
          />
        );

      case 2:
        return !sendOtp ? (
          <SignUpFormWrapper
            setAuthStep={setAuthStep}
            setIdentifier={setIdentifier}
            startCountDown={startCountDown}
            setSendOtp={setSendOtp}
          />
        ) : (
          <CheckOtp
            startCountDown={startCountDown}
            isActive={isActive}
            minutes={minutes}
            seconds={seconds}
            identifier={identifier}
          />
        );
    }
  };
  return (
    <QueryClientProviderWrapper>
      <ToastProvider>
        <>{renderStep()}</>
      </ToastProvider>
    </QueryClientProviderWrapper>
  );
};

const LoginFormWrapper = ({
  setSendOtp,
  setIdentifier,
  startCountDown,
  setAuthStep,
}: MainWrapperType) => {
  return (
    <div className=" w-[380px] form-wrapper  py-6  shadow-md mx-auto bg-white ">
      <LoginForm
        startCountDown={startCountDown}
        setSendOtp={setSendOtp}
        setIdentifier={setIdentifier}
      />
      <div className="flex flex-col gap-y-4 px-4 mt-2 ">
        <span className="font-Shabnam text-right">حساب کاربری ندارید؟</span>

        <MainBtn
          onClick={() => setAuthStep(2)}
          className="w-full"
          variant="secondary"
        >
          ثبت نام
        </MainBtn>
      </div>
    </div>
  );
};

const SignUpFormWrapper = ({
  setSendOtp,
  startCountDown,
  setAuthStep,
  setIdentifier,
}: MainWrapperType) => {
  return (
    <div className=" w-[380px] form-wrapper    shadow-md mx-auto bg-white ">
      <SignUpForm
        setAuthStep={setAuthStep}
        setIdentifier={setIdentifier}
        startCountDown={startCountDown}
        setSendOtp={setSendOtp}
      />
    </div>
  );
};
export default REgisterLogin;
