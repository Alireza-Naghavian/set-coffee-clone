import CheckOtp from "@/components/Shared-components/Forms/CheckOtp";
import LoginForm from "@/components/Shared-components/Forms/LoginForm";
import SignUpForm from "@/components/Shared-components/Forms/SignUpForm";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Link from "next/link";
function page() {
  return (
    <div>
      {/* <CheckOtp /> */}
      <LoginFormWrapper/>
      {/* <SignUpFormWrapper/> */}
    </div>
  );
}

export default page;

const LoginFormWrapper = () => {
  return (
    <div className=" w-[380px] form-wrapper  h-[480px]  shadow-md mx-auto bg-white ">
      <LoginForm />
      <div className="flex flex-col gap-y-4 px-4 mt-2 ">
        <span className="font-Shabnam text-right">حساب کاربری ندارید؟</span>
        <Link className="h-full w-full " href={"#"}>
          <MainBtn className="w-full  " variant="secondary">
            ثبت نام
          </MainBtn>
        </Link>
      </div>
    </div>
  );
};

const SignUpFormWrapper = () => {
  return (
    <div className=" w-[380px] form-wrapper  h-[376px]  shadow-md mx-auto bg-white ">
      <SignUpForm />
    </div>
  );
};
