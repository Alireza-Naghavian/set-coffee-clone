import MainBtn from "@/components/UI/Buttons/MainBtn";
import RateStar from "@/components/UI/RateStart/RateStar";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import Loader from "@/components/UI/loader/Loader";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useAddNewComment from "@/hooks/product/useAddNewComment";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
export type SubmitCommentType = {
  score: number;
  commentBody: string;
  productId: string;
};
function CommentForm({ productId }: { productId: string }) {
  const [score, setScore] = useState<number>(3);
  const queryclient = useQueryClient();
  const {user}= useGetMe();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SubmitCommentType>();
  const { isCommentSending, postComment } = useAddNewComment();
  const submitCommentHandler = async (
    data: Omit<SubmitCommentType, "productId">
  ) => {
    if(!user){
      toast.error("ابتدا وارد شوید/ثبت نام کنید")
      return
    }
    postComment(
      { data: { ...data, score, productId } },
      {
        onSuccess: () => {
          queryclient.invalidateQueries({ queryKey: ["product"] });
          reset();
        },
      }
    );
  };
  return (
    <div className="max-h-[470px] h-[470px] w-full bg-gray-50/55 ">
      <form
        onSubmit={handleSubmit(submitCommentHandler)}
        className="flex flex-col  px-2 py-2"
      >
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
            label="دیدگاه شما"
            errors={errors}
            id="commentBody"
            name="commentBody"
            register={register}
            validattionschema={{
              required:{value:true,message:"دیدگاه نمی تواند خالی باشد"}
            }}
            variant="borderFill"
            type="text"
          />
        </div>
        <div className="mt-4 max-w-[120px]  ">
          <MainBtn type="submit" size="small">
          {isCommentSending ?  <Loader loadingCondition={isCommentSending}/> : "ثبت"}
          </MainBtn>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
