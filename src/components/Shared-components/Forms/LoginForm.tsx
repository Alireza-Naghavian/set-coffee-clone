import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import Link from "next/link";
import React from "react";

function LoginForm() {
  return (
    <div className=" px-4 py-2  mt-4">
      <form className="flex flex-col gap-y-4">
        <MainTextField
          id="emailId"
          name="identifier"
          type="text"
          variant="outLine"
          label="ایمیل/شماره موبایل"
          labelVariant="boldSize"
        />
        <MainTextField
          id="test"
          name="password"
          type="password"
          variant="outLine"
          label="گذرواژه"
          labelVariant="boldSize"
        />
        <MainBtn variant="primary" size="medium">
          ورود
        </MainBtn>
        <Link
          href={"#"}
          className="text-main font-Shabnam text-right 
          tr-200 hover:text-main/55 mt-2"
        >
          گذرواژه خود را فراموش کرده اید ؟
        </Link>
        <MainBtn size="medium" variant="primary">ورود با کد یکبار مصرف</MainBtn>
      </form>
    </div>
  );
}

export default LoginForm;
