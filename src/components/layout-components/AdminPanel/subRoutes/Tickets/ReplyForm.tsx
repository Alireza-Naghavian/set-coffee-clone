import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useReplyAdminTicket from "@/hooks/tickets&department/useReplyAdminTicket";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

function ReplyForm({ ticketId }: { ticketId: string }) {
  const { user } = useGetMe();
  const {refresh} = useRouter();
  const {
    register,
    formState: { errors, isValid, dirtyFields },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });
  const { isReplyLoading, replyAdmin } = useReplyAdminTicket();
  const sendReplyHandler = async ({ body }: FieldValues) => {
    try {
      await replyAdmin(
        { ticketId, data: { body, sendAt: new Date(), sender: user?._id } },
        {
          onSuccess: () => {
            reset();
            refresh();
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(sendReplyHandler)}
      className="bg-slate-800 p-4 w-full  rounded-lg text-white mt-4 flex flex-col"
    >
      <h4 className="text-lg text-right  font-Shabnam_B  border-b pb-1 ">
        پاسخ شما
      </h4>
      <div className="flex flex-col gap-y-2">
        <TextAriaField
          type="text"
          name="body"
          id="body"
          register={register}
          errors={errors}
          variant="outLine"
          required={false}
          label=""
          className="!bg-slate-800 !text-white"
        />
        <MainBtn
          className={` mr-auto  ${
            !isValid || !Object.keys(dirtyFields).length
              ? "opacity-50"
              : "opacity-100"
          }`}
          disabled={!isValid || !Object.keys(dirtyFields).length}
          type="submit"
          variant="roundedPrimary"
          size="small"
        >
          {isReplyLoading ? (
            <Loader loadingCondition={isReplyLoading} />
          ) : (
            "ارسال"
          )}
        </MainBtn>
      </div>
    </form>
  );
}

export default ReplyForm;
