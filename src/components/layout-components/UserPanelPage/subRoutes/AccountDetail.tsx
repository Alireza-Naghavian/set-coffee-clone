"use client";
import { UpdateProfileType } from "@/app/api/auth/updateProfile/route";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import useUpdateUserProfile from "@/hooks/authHooks/useUpdateUserProfile";
import { GetMetype } from "@/types/auth.type";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AddPostCode from "./AddPostCode";
import { convertToEnglishDigits } from "@/utils/convertors/ToEnDigits";
const AccountDetail = ({ user }: { user: GetMetype }) => {
  const {
    register,
    formState: { errors, isValid, dirtyFields },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      lastPassword: "",
      newPassword: "",
      newUserName: user.userName,
      updatePostCode: user.postCode as number,
    },
  });
  const queryClient = useQueryClient();
  const { isUpdating, updateProfile } = useUpdateUserProfile();
  const { refresh } = useRouter();
  const updateProfileHandler = (data: UpdateProfileType) => {
    try {
      const { lastPassword, newPassword, newUserName, updatePostCode } = data;
      const toEnDigit = convertToEnglishDigits(String(updatePostCode));
      const postCodeNumber = parseInt(toEnDigit, 10);
      updateProfile(
        {
          lastPassword,
          newPassword,
          newUserName,
          updatePostCode: postCodeNumber,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getMe"] });
            queryClient.refetchQueries({ queryKey: ["getMe"] });
            reset();
            refresh();
          },
        }
      );
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-y-4 relative">
        <div className="flex sm:flex-row flex-col gap-y-4 sm:gap-y-0  gap-x-4 child:w-full sm:child:w-1/2">
          <MainTextField
            label="نام کاربری"
            required={false}
            register={register}
            errors={errors}
            name="userName"
            id="userName"
            variant="outLine"
            type="text"
            value={user.userName}
            readOnly
          />
          <MainTextField
            label="ایمیل"
            required={false}
            register={register}
            errors={errors}
            name="email"
            id="email"
            variant="outLine"
            type="email"
            value={user.email}
            readOnly
          />
        </div>
        <div className="flex sm:flex-row flex-col gap-y-4 sm:gap-y-0  gap-x-4 child:w-full sm:child:w-1/2">
          <MainTextField
            label="شماره موبایل"
            required={false}
            register={register}
            errors={errors}
            name="phoneNumber"
            id="phoneNumber"
            variant="outLine"
            type="text"
            value={user.phoneNumber}
            readOnly
            className="w-full"
          />
          {user.postCode === 0 ? (
            <AddPostCode />
          ) : (
            <MainTextField
              label="کدپستی"
              required={false}
              register={register}
              errors={errors}
              name="postCode"
              id="postCode"
              variant="outLine"
              type="text"
              value={user.postCode}
              readOnly
              className="w-full"
            />
          )}
        </div>
      </div>
      <div className="mt-12">
        <form
          onSubmit={handleSubmit(updateProfileHandler)}
          className="flex  flex-col gap-y-4 relative border"
        >
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
              name="lastPassword"
              id="lastPassword"
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
          <div
            className={`
           ${user.postCode == 0 && "sm:pl-12"} 
          px-8 pb-4 flex  gap-x-4  
          gap-y-4
          sm:flex-row flex-col  sm:gap-y-0  
           child:w-full sm:child:w-1/2

            `}
          >
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
                  value: 30,
                  message: "حداکثر ۳۰ کاراکتر",
                },
              }}
              className="w-full"
            />
            {user.postCode !== 0 && (
              <MainTextField
                label="کد پستی"
                register={register}
                errors={errors}
                name="updatePostCode"
                id="updatePostCode"
                variant="outLine"
                type="text"
                validattionschema={{
                  required: {
                    value: true,
                    message: "فیلد نمی تواند خالی باشد",
                  },
                  maxLength: {
                    value: 10,
                    message: "کد پستی باید ۱۰ رقم  باشد",
                  },
                  minLength: {
                    value: 10,
                    message: "کد پستی باید ۱۰ رقم  باشد",
                  },
                }}
                className="w-full "
              />
            )}
          </div>
          <div className="  px-8 pb-4 w-full flex justify-start">
            <MainBtn
              className={`tr-300  ${
                !isValid || !Object.keys(dirtyFields).length
                  ? "opacity-50"
                  : "opacity-100"
              }`}
              disabled={!isValid || !Object.keys(dirtyFields).length}
              size="small"
              type="submit"
            >
              {isUpdating ? <Loader loadingCondition={isUpdating} /> : "ویرایش"}
            </MainBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetail;
