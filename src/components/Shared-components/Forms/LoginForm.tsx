import { useAlert } from "@/app/context/AlertContext";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import Loader from "@/components/UI/loader/Loader";
import useSignInWithOtp from "@/hooks/authHooks/useSignInWithOtp";
import useSignInwithEmail from "@/hooks/authHooks/useSignInwithEmail.";
import { LoginFormType } from "@/types/auth.type";
import { SetState } from "@/types/global.type";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type LoginForEntriesType = {
  setSendOtp: SetState<boolean>;
  setIdentifier: SetState<string>;
  setIsCartOpen?: SetState<boolean> | undefined;
  startCountDown: () => void;
};
function LoginForm({
  setSendOtp,
  setIdentifier,
  setIsCartOpen,
  startCountDown,
}: LoginForEntriesType) {

  const { isPending, signIn } = useSignInwithEmail();
  const [loginWIthOtp, setLoginWIthOtp] = useState<boolean>(false);
  const { isPending: isOtpLoading, signInWithOtp } = useSignInWithOtp();
  const queryClient = useQueryClient()
  const {showAlert} = useAlert();
  const { replace, refresh } = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const loginFromHandler: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    if (!loginWIthOtp) {
      try {
        await signIn(data, {
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["getMe"]})
            replace("/");
            refresh();
            setIsCartOpen && setIsCartOpen(false);
            reset();
          },
        });
      } catch (error: any) {
      
        showAlert("error", error?.response?.data?.message);
      }
    } else {
      try {
        const { identifier } = data;
        await signInWithOtp(
          { identifier },
          {
            onSuccess: () => {
              reset();
              startCountDown();
              setSendOtp(true);
              setIdentifier(identifier);
            },
          }
        );
      } catch (error: any) {
       
         showAlert("error", error?.response?.data?.message);
      }
    }
  };
  return (
    <div className=" px-4 py-2  mt-4">
      <form
        onSubmit={handleSubmit(loginFromHandler)}
        className="flex flex-col gap-y-4 "
      >
        <MainTextField
          id="emailId"
          name="identifier"
          type="text"
          variant="outLine"
          errors={errors}
          label="ایمیل/شماره موبایل"
          labelVariant="boldSize"
          register={register}
          validattionschema={{
            required: "پر کردن این فیلد الزامی است.",
            pattern: {
              value: loginWIthOtp
                ? /^(\\+98|0)?9[0-9]{9}$/
                : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: loginWIthOtp
                ? "شماره موبایل وارد شده معتبر نمی باشد"
                : "ایمیل وارد شده معتبر نمی باشد",
            },
          }}
        />
        <MainTextField
          errors={errors}
          id="test"
          name="password"
          type="password"
          variant="outLine"
          label="گذرواژه"
          labelVariant="boldSize"
          register={register}
          validattionschema={{
            required: !loginWIthOtp ? "پر کردن این فیلد الزامی است." : false,
            minLength: {
              value: 4,
              message: "کلمه عبور باید حداقل۴ کاراکتر باشد",
            },
            maxLength: {
              value: 12,
              message: "کلمه عبور باید حداکثر ۱۲ کاراکتر باشد.",
            },
          }}
        />
        <MainBtn type="submit" variant="primary" size="medium">
          {isPending ? (
            <Loader
              loadingCondition={isPending}
              className={"font-extrabold text-lg "}
            />
          ) : (
            "ورود"
          )}
        </MainBtn>
        <Link
          href={"#"}
          className="text-main font-Shabnam text-right 
          tr-200 hover:text-main/55 mt-2"
        >
          گذرواژه خود را فراموش کرده اید ؟
        </Link>
        <MainBtn
          onClick={() => {
            setLoginWIthOtp(true);
          }}
          size="medium"
          variant="primary"
        >
          {isOtpLoading ? (
            <Loader
              loadingCondition={isOtpLoading}
              className={"font-extrabold text-lg "}
            />
          ) : (
            "ورود با کد یکبار مصرف"
          )}
        </MainBtn>
      </form>
    </div>
  );
}

export default LoginForm;
