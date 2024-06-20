import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import Link from "next/link";

function SignUpForm() {
  return (
    <div className=" px-4 py-2  mt-4">
    <form className="flex flex-col gap-y-4 ">
      <MainTextField
        id="name"
        name="name"
        type="text"
        variant="outLine"
        label="نام"
        labelVariant="boldSize"
      />
      <MainTextField
        id="phoneNumber"
        name="phoneNumber"
        type="number"
        variant="outLine"
        label="شماره موبایل"
        labelVariant="boldSize"
      />
      <MainTextField
        id="email"
        name="email"
        type="email"
        variant="outLine"
        label="ایمیل"
        labelVariant="boldSize"
      />
      <MainTextField
        id="email"
        name="email"
        type="email"
        variant="outLine"
        label="ایمیل"
        labelVariant="boldSize"
      />
      <MainBtn variant="primary" type="submit" size="medium">
        ثبت نام
      </MainBtn>
    </form>
  </div>
  );
}

export default SignUpForm;
