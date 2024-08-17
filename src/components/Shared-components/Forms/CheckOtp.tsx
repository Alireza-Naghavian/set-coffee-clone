"use client";
import { useAlert } from "@/app/context/AlertContext";
import { useCustomQueryClient } from "@/app/context/QueryClientProvider";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import useCheckOtpCode from "@/hooks/authHooks/useCheckOtpCode";
import useSignInWithOtp from "@/hooks/authHooks/useSignInWithOtp";
import { SetState } from "@/types/global.type";
import { convertToEnglishDigits } from "@/utils/convertors/ToEnDigits";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";

type CheckOtpType = {
  setIsCartOpen?: SetState<boolean>;
  identifier: string;
  isOpen?: boolean | undefined;
  isActive?: boolean;
  minutes?: number;
  seconds?: number;
  startCountDown: () => void;
};

function CheckOtp({
  identifier,
  isOpen,
  setIsCartOpen,
  isActive,
  minutes,
  seconds,
  startCountDown,
}: CheckOtpType) {
  const [otp, setOtp] = useState("");
  const { replace } = useRouter();
  const { handleSubmit, reset } = useForm();
  const { signInWithOtp } = useSignInWithOtp();
  const QueryClient = useCustomQueryClient();
  const {showAlert} = useAlert();
  const resendCodeHandler = async () => {
    try {
      await signInWithOtp(
        { identifier },
        {
          onSuccess: () => {
            startCountDown();
          },
        }
      );
    } catch (error: any) {
  
      showAlert("error", error?.response?.data?.message);
    
    }
  };

  const { checkOtp, isPending } = useCheckOtpCode();
  const checkOtpHandler = async () => {
    const enOtp = convertToEnglishDigits(otp);

    try {
      await checkOtp(
        { phoneNumber: identifier, code: enOtp },
        {
          onSuccess: async () => {
            await QueryClient.invalidateQueries({ queryKey: ["getMe"] });
            await QueryClient.refetchQueries({ queryKey: ["getMe"] });
            replace("/");
            setIsCartOpen && setIsCartOpen(false);
            setOtp("");
            reset();
          },
        }
      );
    } catch (error: any) {
      showAlert("error", error?.response?.data?.message);
    }
  };
  return (
    <div className="flex-col flex gap-y-8  ">
      <div
        className={`${
          isOpen ? "w-full" : "w-[380px]"
        } form-wrapper  h-[420px] shadow-md mx-auto   bg-white py-12`}
      >
        <p className="text-[18px] font-Shabnam_M text-main text-center">
          کد تایید
        </p>
        <p className="flex flex-col gap-y-2 text-neutral-500 text-sm text-center mt-8">
          <span>لطفا کد ارسال شده را وارد کنید</span>
          <span>{identifier}</span>
        </p>
        <form
          onSubmit={handleSubmit(checkOtpHandler)}
          className="flex  flex-col items-center"
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={{
              width: "100%",
              position: "relative",
              marginTop: "22px",
              padding: "0px 24px",
              height: "40px",
              display: "flex",
              flexDirection: "row-reverse",
              gap: "4px",
            }}
            inputStyle={{
              border: "1px solid rgb(215,216,217)",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              lineHeight: "40px",
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
            shouldAutoFocus
          />
          <MainBtn className="max-w-[220px] mt-8 " type="submit" size="medium">
            {isPending ? (
              <Loader
                loadingCondition={isPending}
                className={"font-extrabold text-lg "}
              />
            ) : (
              "ثبت کد تایید"
            )}
          </MainBtn>

          <p
            className={`${
              !isActive && "!hidden"
            } mt-6  flex-center gap-x-2  child:text-main_brown child:text-xs child:font-Shabnam_M `}
          >
            <span>
              {seconds && seconds < 10 ? `0${seconds}` : seconds} :
              {minutes && minutes < 10 ? `0${minutes}` : minutes}
            </span>
            <span>مانده تا ارسال مجدد</span>
          </p>
        </form>
        <p
          className={`mt-6 text-center mx-auto w-full  ${
            isActive ? "!hidden" : "!flex-center"
          } `}
        >
          <button
            onClick={() => {
              resendCodeHandler();
            }}
            className={`text-sm  text-main font-Shabnam_M text-center`}
          >
            ارسال مجدد کد تایید
          </button>
        </p>
      </div>
    </div>
  );
}

export default CheckOtp;
