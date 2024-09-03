import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import useReplyTicketMsg from "@/hooks/tickets&department/useReplyTicketMsg";
import { TicketType } from "@/types/models/ticket.type";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
type TicketFormType = {
  ticketId: string;
  ticket: TicketType;
};
function ReplyFormHandler({ ticketId, ticket }: TicketFormType) {
  const { SendReply, isSending } = useReplyTicketMsg();
  const { refresh } = useRouter();
  const {
    register,
    formState: { errors, isValid, dirtyFields },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });
  const sendReplyHandler = async ({ body }: FieldValues) => {
    await SendReply(
      {
        ticketId,
        data: { body, sender: ticket?.user?._id, sendAt: new Date() },
      },
      {
        onSuccess: () => {
          reset();
          refresh();
        },
      }
    );
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
          {isSending ? <Loader loadingCondition={isSending} /> : "ارسال"}
        </MainBtn>
      </div>
    </form>
  );
}

export default ReplyFormHandler;
