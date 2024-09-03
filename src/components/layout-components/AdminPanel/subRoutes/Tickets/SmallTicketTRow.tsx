import Table from "@/components/UI/Table/Table";
import useRemoveTicket from "@/hooks/tickets&department/useRemoveTicket";
import { TicketStatusType, TicketType } from "@/types/models/ticket.type";
import { priorityValues, ticketOptions, ticketStatus } from "@/utils/constants";
import React, { FormEvent, useState } from "react";
import { ImReply } from "react-icons/im";
import { IoLockClosed } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../modals/DeleteModal";
import useUpdateTicketST from "@/hooks/tickets&department/useUpdateTicketST";
import SelectModal from "../modals/SelectModal";
import EditModal from "../modals/EditModal";
import ReplyModal from "./ReplyModal";
import { useRouter } from "next/navigation";

function SmallTicketTRow({ ticket }: { ticket: TicketType }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { isRemoveLoading, removeTicket } = useRemoveTicket();
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [isOpenTicket, setIsOpenTicket] = useState<boolean>(ticket.isOpen);
  const { isUpdateLoading, updateTicketSt } = useUpdateTicketST();
  const {refresh} = useRouter();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const removeHandler = async () => {
    try {
      if (ticket._id === undefined) return;
      await removeTicket(ticket._id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          refresh();
        },
        onError: () => {
          setIsDeleteOpen(false);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const selectHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (ticket._id === undefined) return;
      const updateTicketCondtion: TicketStatusType = {
        isPending: false,
        isAnswered: true,
        isOpen: isOpenTicket,
      };
      await updateTicketSt(
        { ticketId: ticket._id, data: updateTicketCondtion },
        {
          onSuccess: () => {
            setIsSelectOpen(false);
          },
          onError: () => {
            setIsSelectOpen(false);
          },
        }
      );
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };
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
            onClick={() => setIsDeleteOpen(true)}
            className="  my-auto h-full text-3xl text-red-500   w-fit flex justify-center"
          >
            <MdDelete />
          </button>
          <button
            onClick={() => setIsSelectOpen(true)}
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
            <span className="line-clamp-2 max-w-[130px] text-right">
              {ticket.title}
            </span>
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
                onClick={() => setIsReplyOpen(true)}
                className="text-2xl text-blue-500"
              >
                <ImReply />
              </button>
            </div>
          </span>
        </span>
      </td>
      {ticket._id !== undefined && (
        <DeleteModal
          identifier={ticket._id}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={() => setIsDeleteOpen(false)}
          isLoading={isRemoveLoading}
          removeHandler={removeHandler}
          subjectTitle="تیکت"
        />
      )}
      <SelectModal
        isLoading={isUpdateLoading}
        isOpen={isSelectOpen}
        modalTitle={"تغییر وضعیت تیکت"}
        value={String(isOpenTicket)}
        setIsOpen={() => setIsSelectOpen(false)}
        onSelectChange={(e) => setIsOpenTicket(e.target.value)}
        selectHanlder={selectHandler}
        subjectTitle="باز / بستن تیکت"
        options={ticketOptions}
      />
      {ticket._id !== undefined && (
        <EditModal
          isOpen={isReplyOpen}
          setIsOpen={() => setIsReplyOpen(false)}
          modalTitle="پاسخ به تیکت"
          className="!w-[100%] !h-auto  overflow-y-auto py-2 !top-[2%]"
        >
          <div className="h-full py-2">
            <ReplyModal ticketId={ticket._id} />
          </div>
        </EditModal>
      )}
    </Table.Row>
  );
}

export default SmallTicketTRow;
