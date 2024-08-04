"use client";
import Loader from "@/components/UI/loader/Loader";
import useGetTicketData from "@/hooks/tickets&department/useGetTicketData";
import { MessagesType, TicketType } from "@/types/models/ticket.type";
import ReplyFormHandler from "../ReplyFormHandler";

function SingleTicket({
  ticketId,
  initData,
}: {
  ticketId: string;
  initData: TicketType[];
}) {
  const { ticket, isTicketLoading } = useGetTicketData(ticketId, initData);

  if (isTicketLoading)
    return (
      <div className=" flex gap-x-2">
        <span>
          <Loader loadingCondition={isTicketLoading} />
        </span>
        <span>در حال بارگزاری ...</span>
      </div>
    );
  return (
    <div className="relative w-full sm:px-4 h-full">
      <div className=" rounded-lg bg-gray-200 h-full p-4">
        <div className="">
          <h1
            className="text-right font-Shabnam_B
                 text-mute text-xl md:text-2xl border-b-2 pb-2 border-white"
          >
            {ticket?.title}
          </h1>
        </div>
        {/* user ticket box */}
        <div className="w-full !h-[510px] overflow-y-auto">
          <div className="mt-4 p-4 flex flex-col shadow-sm text-gray-200 bg-gray-500  max-w-[60%] rounded-xl rounded-tr-none">
            <p className=" md:text-xl  text-right font-Shabnam_M w-fit">
              {ticket?.user?.userName}
            </p>
            <span className="w-fit  mt-px text-base tx">
              {new Date(ticket?.createdAt).toLocaleDateString("fa-Ir")}
            </span>
            <p className="w-fit text-right mt-6 mr-2 font-Shabnam_M">
              {ticket?.body}
            </p>
          </div>
          {/* reply box */}
          {ticket?.messages.map((message: MessagesType) => (
            <div
              key={message._id}
              className={`mt-4 p-4 flex flex-col shadow-sm text-gray-200 ${
                message.sender === ticket.user._id
                  ? "bg-gray-500 max-w-[60%] rounded-xl rounded-tr-none self-end"
                  : "bg-slate-700 max-w-[60%] rounded-xl rounded-tl-none self-start"
              }`}
            >
              <p className="md:text-xl text-right font-Shabnam_M w-fit">
                {message.sender === ticket.user._id
                  ? ticket.user.userName
                  : "مدیر"}
              </p>
              <span className="w-fit mt-px text-base tx">
                {new Date(message.sendAt).toLocaleDateString("fa-Ir")}
              </span>
              <p className="w-fit text-right mt-6 mr-2 font-Shabnam_M">
                {message.body}
              </p>
            </div>
          ))}

          {/* answer box */}
          <div className="mt-6 p-4 flex flex-col  mr-auto shadow-sm text-gray-200 bg-slate-700  max-w-[60%] rounded-xl rounded-tl-none">
            <p className=" md:text-xl  text-left mr-auto font-Shabnam_M w-fit">
              {ticket?.user?.userName}
            </p>
            <p className="w-fit  mt-px text-base  text-left mr-auto">
              {new Date(ticket?.createdAt).toLocaleDateString("fa-Ir")}
            </p>
            <p className="w-fit text-right mt-6 mr-2 font-Shabnam_M">
              با سلام و احترام... درخواست شما در دست بررسی است از شکیبایی شما
              متشکریم.
            </p>
          </div>
        </div>
        {/* reply form */}
        {ticket?.isOpen ? (
     <ReplyFormHandler ticketId={ticketId} ticket={ticket}/>
        ) : (
          <div className="w-full py-2 px-2 text-center mx-auto  text-white bg-slate-900">
            <p>این تیکت بسته شده است</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleTicket;
