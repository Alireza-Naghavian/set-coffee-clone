import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useAnswerComment from "@/hooks/comments/useAnswerComment";
import { CommentModeltype } from "@/types/models/comment.type";
import { MessagesType } from "@/types/models/ticket.type";
import { useForm } from "react-hook-form";
export type ReplyModalForm = {
  data: CommentModeltype;
  setIsEditOpen: () => void;
};
type ReplyFormType = {
  userComment: string;
  reply: string;
};
function ReplyModalForm({ data: commentData, setIsEditOpen }: ReplyModalForm) {
  const { user } = useGetMe();
  const { answerComment, isAnswerLoading } = useAnswerComment();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isValid },
  } = useForm<ReplyFormType>({ mode: "onChange" });
  const replyHandler = async (data: ReplyFormType) => {
    if (commentData._id === undefined) return;
    try {
      const { reply } = data;
      const commentInfo: MessagesType = {
        body: reply,
        sender: user?._id,
        sendAt: new Date(),
      };
      await answerComment(
        { commentId: commentData._id, data: commentInfo },
        {
          onSuccess: () => {
            setIsEditOpen();
          },
          onError: () => {
            setIsEditOpen();
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(replyHandler)}
      className="flex flex-col h-[450px] overflow-y-auto gap-y-4 justify-center px-6 my-4"
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
        readOnly={true}

        value={commentData.commentBody}
      />

      <TextAriaField
        name="reply"
        id="reply"
        label="پاسخ"
        variant="borderFill"
        register={register}
        placeHolder="ارسال پاسخ به منزله تایید کامنت کاربر خواهد بود."
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
          {isAnswerLoading ? (
            <Loader loadingCondition={isAnswerLoading} />
          ) : (
            "ارسال"
          )}
        </MainBtn>
      </div>
    </form>
  );
}

export default ReplyModalForm;
