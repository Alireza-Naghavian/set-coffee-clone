import Table from "@/components/UI/Table/Table";
import { TicketType } from "@/types/models/ticket.type";
import { priorityValues, ticketStatus } from "@/utils/constants";
import React from "react";
import { ImReply } from "react-icons/im";
import { IoLockClosed } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function SmallTicketTRow({ ticket }: { ticket: TicketType }) {
  let ticketCurrCondition = {
    isPending: ticket.isPending,
    isAnswered: ticket.isAnswered,
    isOpen: ticket.isOpen,
  };
  const ticketCondition = ticketStatus.find((ticketSt) => {
    return JSON.stringify(ticketSt.cond) == JSON.stringify(ticketCurrCondition);
  });
  return (
    <Table.Row
      className="my-1 child:my-auto
      !flex flex-col md:!hidden  h-full  w-full  bg-slate-200 px-4  border-b py-2"
      variant="singleHead"
    >
      <td className="flex items-center justify-between w-full">
        <span
          className={`font-Shabnam_B !ml-3 px-2 rounded-lg text-gray-200  ${ticketCondition?.className} `}
        >
          {ticket.user.userName}
        </span>
        <span className="text-right flex  items-center my-auto gap-x-4  mr-auto !mb-4">
          <button
            // onClick={() => setIsDeleteOpen(true)}
            className="  my-auto h-full text-3xl text-red-500   w-fit flex justify-center"
          >
            <MdDelete />
          </button>
          <button
            // onClick={() => setIsEditOpen(true)}
            className="  my-auto h-full text-3xl text-blue-500   w-fit flex justify-center"
          >
            <IoLockClosed />
          </button>
        </span>
      </td>
      <td className="flex flex-col w-full ">
        <span
          className="flex flex-col gap-y-2 child:pt-1  child:flex 
                child:justify-between child:items-center child:w-full
                 child:text-sm  child:pb-[2px]  child:child:pb-[2px]"
        >
          <span className="font-Shabnam_B">
            <span> عنوان :</span>
            <span className="line-clamp-2 max-w-[190px]">{ticket.title}</span>
          </span>
          <span className="font-Shabnam_B">
            <span>دپارتمان:</span>
            <span>{ticket.dept.title}</span>
          </span>
          <span className="font-Shabnam_B">
            <span> اولویت:</span>
            <span className="">
              {priorityValues.find((value) => {
                return value.value == ticket.priority.toString();
              })?.label || "نامشخص"}
            </span>
          </span>
          <span className="font-Shabnam_B mt-1">
            <span>مشاهده / پاسخ:</span>
            <div className="flex justify-center items-center ">
              <button
                // onClick={() => setIsReplyOpen(true)}
                className="text-2xl text-blue-500"
              >
                <ImReply />
              </button>
            </div>
          </span>
        </span>
      </td>
    </Table.Row>
  );
}

export default SmallTicketTRow;
