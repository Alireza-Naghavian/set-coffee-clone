"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import React from "react";
import { useForm } from "react-hook-form";

function OfferForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm();
  return (
    <form className="flex flex-col justify-between items-center mt-8 p-6 border border-main_brown">
      <div className="flex sm:flex-row flex-col gap-y-4 sm:gap-y-0 w-full child:w-full gap-x-6  items-center">
        <MainTextField
          type="text"
          register={register}
          errors={errors}
          id="code"
          name="code"
          variant="borderFill"
          label="کد تخفیف"
          className="w-full border-main_brown"
        />
        <MainTextField
          type="number"
          register={register}
          errors={errors}
          id="percent"
          name="percent"
          variant="borderFill"
          label="درصد تخفیف"
          className="w-full border-main_brown"
        />
      </div>
      <div className="w-full mt-4  gap-x-6 flex sm:flex-row  flex-col gap-y-4 sm:gap-y-0 ">
        <div className="sm:w-1/2 sm:pl-3">
          <MainTextField
            type="number"
            register={register}
            errors={errors}
            id="maxUsage"
            name="maxUsage"
            variant="borderFill"
            label="تعداد مجاز استفاده"
            className=" border-main_brown !w-full "
          />
        </div>

        <MainBtn size="medium" className="mr-auto mt-auto w-full sm:w-[190px]">
          ایجاد کد
        </MainBtn>
      </div>
    </form>
  );
}

export default OfferForm;
