import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import React from "react";
import { useForm } from "react-hook-form";
import { ReplyModalForm } from "./ReplyModalForm";
type EditCommentFormType = Pick<ReplyModalForm, "data" | "setIsEditOpen">;
function EditCommentForm({ data, setIsEditOpen }: EditCommentFormType) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isValid },
  } = useForm({ mode: "onChange" });
  return (
    <form
      //   onSubmit={handleSubmit(updateHandler)}
      className="flex flex-col gap-y-4 justify-center px-6 my-4"
    >
      <MainTextField
        register={register}
        errors={errors}
        type="text"
        label="کامنت کاربر:"
        variant="outLine"
        id="userComment"
        name="userComment"
        required={false}
        readOnly={true}
      />
      <MainTextField
        register={register}
        errors={errors}
        type="text"
        label="آخرین پاسخ ارسالی:"
        variant="outLine"
        id="lastReply"
        name="lastReply"
        required={false}
        readOnly={true}
      />

      <TextAriaField
        name="reply"
        id="reply"
        label="پاسخ"
        variant="borderFill"
        register={register}
        validattionschema={{
          minLength: {
            value: 1,
            message: "حداقل ۱ کاراکتر",
          },
        }}
        errors={errors}
        className="border-main_brown w-full"
        type="text"
      />
      <div className="mt-4">
        <MainBtn
          disabled={!isValid || !Object.keys(dirtyFields).length}
          className={`${
            !isValid || !Object.keys(dirtyFields).length
              ? "opacity-50"
              : "opacity-100"
          }`}
          type="submit"
        >
          {/* {isProdUpdating ? <Loader loadingCondition={isProdUpdating}/> : "ویرایش"} */}
          ویرایش
        </MainBtn>
      </div>
    </form>
  );
}

export default EditCommentForm;
