import MainBtn from "@/components/UI/Buttons/MainBtn";
import RateStar from "@/components/UI/RateStart/RateStar";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import { useState } from "react";
function CommentForm() {
  const [score, setScore] = useState<number>(3);
  return (
    <div className="max-h-[470px] h-[470px] w-full bg-gray-50/55 ">
      <form className="flex flex-col  px-2 py-2">
        <p className="font-Shabnam_B text-[14px] text-right  text-dark_shade">
          دیدگاه خود را بنویسید
        </p>
        <span className="text-mute font-Shabnam_M mt-6">
          نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند
          <span className="text-red-400">*</span>
        </span>
        {/* rate to product from user */}
        <div className="flex gap-x-2 items-center">
          <RateStar score={score} setScore={setScore} />
        </div>
        <div className="flex flex-col mt-4 justify-center w-full items-start gap-y-2">
          <TextAriaField
            className="w-full max-h-[200px] h-[200px]"
            label="دیگاه شما"
            errors={""}
            id="commentBody"
            name="commentBody"
            //  register={""}
            variant="borderFill"
            type="text"
          />
        </div>
        <div className="mt-4 max-w-[120px]  ">
        <MainBtn size="small">ثبت</MainBtn>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
