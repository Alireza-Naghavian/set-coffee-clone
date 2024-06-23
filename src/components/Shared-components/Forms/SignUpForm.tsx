import { MainWrapperType } from "@/app/register-login/page";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import Loader from "@/components/UI/loader/Loader";
import useSignUpUser from "@/hooks/authHooks/useSignUpUser";
import { SignUpFromType } from "@/types/auth.type";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function SignUpForm({
  setSendOtp,
  startCountDown,
  setAuthStep,
  setIdentifier,
}: MainWrapperType) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFromType>();
  const { isSignUpLoading, signUp } = useSignUpUser();
  const signUpHandler = async (data: SignUpFromType) => {
    const { phoneNumber: identifier } = data;
    try {
      await signUp(data, {
        onSuccess: () => {
          setSendOtp(true);
          reset();
          setIdentifier(identifier);
          startCountDown();
        },
        onError: () => {
          setAuthStep(1);
        },
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className=" px-4 py-2  mt-4">
      <form
        onSubmit={handleSubmit(signUpHandler)}
        className="flex flex-col gap-y-4 ">
        <MainTextField
          errors={errors}
          register={register}
          id="userName"
          name="userName"
          type="text"
          variant="outLine"
          label="نام کاربری"
          labelVariant="boldSize"
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
        />
        <MainTextField
          errors={errors}
          register={register}
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          variant="outLine"
          label="شماره موبایل"
          labelVariant="boldSize"
          validattionschema={{
            required: "پر کردن این فیلد الزامی است.",
            pattern: {
              value: /^(\\+98|0)?9[0-9]{9}$/,
              message: "شماره موبایل وارد شده معتبر نمی باشد",
            },
          }}
        />
        <MainTextField
          errors={errors}
          register={register}
          id="email"
          name="email"
          type="email"
          variant="outLine"
          label="ایمیل"
          labelVariant="boldSize"
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
          register={register}
          id="password"
          name="password"
          type="password"
          variant="outLine"
          label="گذر واژه"
          labelVariant="boldSize"
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
        <MainBtn variant="primary" type="submit" size="medium">
          {isSignUpLoading 
          ? 
          (<Loader loadingCondition={isSignUpLoading} className={"font-extrabold text-lg "}/>) 
            : 
            ("ثبت نام")}
        </MainBtn>
      </form>
    </div>
  );
}

export default SignUpForm;
