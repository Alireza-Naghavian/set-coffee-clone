"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import React from "react";
import { useForm } from "react-hook-form";
const AccountDetail = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <div>
      <form className="flex flex-col gap-y-4 relative">
        <div className="flex sm:flex-row flex-col gap-y-4 sm:gap-y-0  gap-x-4 child:w-full sm:child:w-1/2">
          <MainTextField
            label="نام کاربری"
            register={register}
            errors={errors}
            name="userName"
            id="userName"
            variant="outLine"
            type="text"
            readOnly
          />
          <MainTextField
            label="ایمیل"
            register={register}
            errors={errors}
            name="email"
            id="email"
            variant="outLine"
            type="email"
            readOnly
          />
        </div>
        <div className=" child:w-full sm:child:w-1/2 sm:pl-4">
          <MainTextField
            label="شماره موبایل"
            register={register}
            errors={errors}
            name="phoneNumber"
            id="phoneNumber"
            variant="outLine"
            type="text"
            readOnly
            className="w-full"
          />
        </div>
      </form>
      <div className="mt-12">
        <form className="flex  flex-col gap-y-4 relative border">
          <h3
            className="text-right text-lg font-Shabnam_B px-4 py-4 
              bg-white  absolute right-6 -top-[1.80rem] text-dark_shade"
          >
            ویرایش اطلاعات
          </h3>
          <div className="flex  gap-x-4  mt-6 px-8 py-4  sm:flex-row flex-col gap-y-4 sm:gap-y-0   child:w-full sm:child:w-1/2">
            <MainTextField
              label="گذر واژه پیشین"
              register={register}
              errors={errors}
              name="password"
              id="password"
              variant="outLine"
              type="password"
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
              className="w-full"
            />
            <MainTextField
              label="گذر واژه جدید"
              register={register}
              errors={errors}
              name="newPassword"
              id="newPassword"
              variant="outLine"
              type="password"
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
              className="w-full"
            />
          </div>
          <div className=" sm:pl-12  px-8 pb-4 flex  gap-x-4  
          sm:flex-row flex-col  sm:gap-y-0  
           child:w-full sm:child:w-1/2">
            <MainTextField
              label="نام کاربری جدید"
              register={register}
              errors={errors}
              name="newUserName"
              id="newUserName"
              variant="outLine"
              type="text"
              validattionschema={{
                required: "پر کردن این فیلد الزامی است",
                minLength: {
                  value: 4,
                  message: "حداقل ۴ کاراکتر",
                },
                maxLength: {
                  value: 15,
                  message: "حداکثر ۱۵ کاراکتر",
                },
              }}
              className="w-full"
            />
          </div>
          <div className="  px-8 pb-4 w-full flex justify-start">
            <MainBtn size="small" type="submit">
              ویرایش
            </MainBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetail;
