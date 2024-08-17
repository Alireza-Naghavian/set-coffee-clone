"use client";
import Loader from "@/components/UI/loader/Loader";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useGetTicketData from "@/hooks/tickets&department/useGetTicketData";
import { ChildrenProps } from "@/types/global.type";
import { MessagesType } from "@/types/models/ticket.type";
import React from "react";

const  SingleTicket :React.FC<ChildrenProps&{ticketId:string}> =({ticketId,children}) => {
  const { ticket, isTicketLoading } = useGetTicketData(ticketId);
  const { user, isUserloading } = useGetMe();
  if (isTicketLoading || isUserloading)
    return (
      <div className=" flex gap-x-2">
        <span>
          <Loader loadingCondition={isTicketLoading || isUserloading} />
        </span>
        <span>در حال بارگزاری ...</span>
      </div>
    );
  const adminMsgs = ticket?.adminMessages || [];
  const userMsgs = ticket?.messages || [];
  const concatMsgs = [...adminMsgs, ...userMsgs].sort(
    (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime()
  );
  return (
    <div className=" w-full sm:px-4 h-full">
      <div className=" rounded-lg !relative bg-gray-200 !h-[550px] overflow-y-auto p-4">
        <div className="">
          <h1
            className="text-right font-Shabnam_B
                 text-mute text-xl md:text-2xl border-b-2 pb-2 border-white"
          >
            {ticket?.title}
          </h1>
        </div>
        {/* chat box */}
        <div className="w-full ">
          <div
            className={`
            mt-4 p-4  flex flex-col shadow-sm text-gray-200   
            xs:max-w-[90%] sm:max-w-[60%] rounded-xl 
            ${
              String(ticket?.user?._id) === String(user?._id)
                ? `rounded-tr-none bg-gray-500 `
                : `bg-slate-700 mr-auto rounded-tl-none`
            }`}>
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
          {concatMsgs.length > 0 &&
            concatMsgs.map((message: MessagesType, index: number) => {
              const isOwnMessage =
                String(message.sender._id) == String(user?._id ||"");
              return (
                <div
                  key={index}
                  className={`mt-4 p-4 flex  flex-col shadow-sm text-gray-200 
                 xs:max-w-[90%] sm:max-w-[60%]  rounded-xl
            ${
              isOwnMessage
                ? "bg-gray-500  rounded-tr-none"
                : "bg-slate-700 mr-auto rounded-tl-none"
            }`}
                >
                  <p className="md:text-xl text-right font-Shabnam_M w-fit">
                    {message.sender.userName}
                  </p>
                  <span className="w-fit mt-px text-base tx">
                    {new Date(message.sendAt).toLocaleDateString("fa-Ir")}
                  </span>
                  <p className="w-fit text-right mt-6 mr-2 font-Shabnam_M">
                    {message.body}
                  </p>
                </div>
              );
            })}
        </div>
        {/* reply form */}
        {ticket?.isOpen ? (
          children
        ) : (
          <div className="w-full  mt-2 py-2 px-2 text-center mx-auto  text-white bg-slate-900">
            <p>این تیکت بسته شده است</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleTicket;
