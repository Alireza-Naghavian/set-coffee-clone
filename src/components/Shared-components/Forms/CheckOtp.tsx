"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import useCheckOtpCode from "@/hooks/authHooks/useCheckOtpCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
function CheckOtp({ identifier }: { identifier: string }) {
  const [otp, setOtp] = useState("");
  const { replace } = useRouter();
  const { handleSubmit } = useForm();
  const { checkOtp, isPending } = useCheckOtpCode();
  const checkOtpHandler = async () => {
    try {
      await checkOtp(
        { phoneNumber: identifier, code: otp },
        {
          onSuccess: () => {
            replace("/");
          },
        }
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex-col flex gap-y-8 ">
      <div className="w-[380px] form-wrapper  h-[420px] shadow-md mx-auto bg-white py-12">
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
          <p className="mt-6 flex-center  ">
            <button className="text-sm  text-main font-Shabnam_M text-center">
              ارسال مجدد کد تایید
            </button>
          </p>
          <p className="mt-6  flex-center gap-x-2  child:text-main_brown child:text-xs child:font-Shabnam_M ">
            <span>02:12</span>
            <span>مانده تا ارسال مجدد</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CheckOtp;
