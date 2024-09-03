import MainBtn from "@/components/UI/Buttons/MainBtn";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import useUpdateAnswerMsg from "@/hooks/comments/useUpdateAnswerMsg";
import { useForm } from "react-hook-form";
import { ReplyModalForm } from "./ReplyModalForm";
import Loader from "@/components/UI/loader/Loader";
type EditCommentFormType = Pick<ReplyModalForm, "data" | "setIsEditOpen">;
type EditHandlerType = {
  [props: string]: string;
};
function EditCommentForm({
  data: commentData,
  setIsEditOpen,
}: EditCommentFormType) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isValid },
  } = useForm<EditHandlerType>({ mode: "onChange" });
  const lastAdminReply = commentData.messages.findLast((message) => {
    return message;
  });
  const { isMsgUpdating, updateMsg } = useUpdateAnswerMsg();
  const updateMsgHandler = async (msgData: EditHandlerType) => {
    if (lastAdminReply?.sender !== undefined)
      await updateMsg(
        {
          commentId: commentData._id,
          data: {
            sender: lastAdminReply?.sender,
            body: msgData.body,
            sendAt: new Date(),
          },
        },
        {
          onSuccess: () => {
            setIsEditOpen();
            reset();
          },
          onError: () => {
            setIsEditOpen();
          },
        }
      );
  };
  return (
    <form
      onSubmit={handleSubmit(updateMsgHandler)}
      className="flex flex-col  overflow-y-auto gap-y-4 justify-center px-6 my-4"
    >
      <TextAriaField
        register={register}
        errors={errors}
        type="text"
        label="کامنت کاربر:"
        variant="outLine"
        id="userComment"
        name="userComment"
        required={false}
        value={commentData.commentBody}
        className="!bg-gray-100"
        readOnly={true}
      />
      <TextAriaField
        register={register}
        errors={errors}
        type="text"
        label="آخرین پاسخ ارسالی:"
        variant="outLine"
        id="lastReply"
        name="lastReply"
        className="!bg-gray-100 !h-[100px]"
        required={false}
        value={lastAdminReply?.body}
        readOnly={true}
      />

      <TextAriaField
        name="body"
        id="body"
        label="ویرایش"
        variant="borderFill"
        placeHolder="متن مربوطه جایگزین اخرین  کامنت شما برای کاربر خواهد شد"
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
          {isMsgUpdating ? (
            <Loader loadingCondition={isMsgUpdating} />
          ) : (
            "ویرایش"
          )}
        </MainBtn>
      </div>
    </form>
  );
}

export default EditCommentForm;
