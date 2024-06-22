import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import Loader from "@/components/UI/loader/Loader";
import useSignInwithEmail from "@/hooks/authHooks/useSignInwithEmail.";
import { LoginFormType } from "@/types/auth.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function LoginForm() {
  const { isPending, signIn } = useSignInwithEmail();
  const {replace} = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();
  const loginFromHandler: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    try {
      await signIn(data,{
        onSuccess:()=>{
          replace("/")
        }
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
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
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "ایمیل وارد شده معتبر نمی باشد",
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
            required: "پر کردن این فیلد الزامی است.",
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
        <MainBtn size="medium" variant="primary">
          ورود با کد یکبار مصرف
        </MainBtn>
      </form>
    </div>
  );
}

export default LoginForm;
