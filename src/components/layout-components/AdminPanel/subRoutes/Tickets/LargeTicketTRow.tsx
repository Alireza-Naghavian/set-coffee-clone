import Table from "@/components/UI/Table/Table";
import { TicketType } from "@/types/models/ticket.type";
import { priorityValues, ticketStatus } from "@/utils/constants";
import { ImReply } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import DeleteModal from "../modals/DeleteModal";
import { useState } from "react";
import useRemoveTicket from "@/hooks/tickets&department/useRemoveTicket";
type LgTRowType = {
  ticket: TicketType;
  index: number;
};
function LargeTicketTRow({ ticket, index }: LgTRowType) {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  let ticketCurrCondition = {
    isPending: ticket.isPending,
    isAnswered: ticket.isAnswered,
    isOpen: ticket.isOpen,
  };
  const { isRemoveLoading, removeTicket } = useRemoveTicket();
  const removeHandler = async () => {
    try {
      if (ticket._id === undefined) return;
      await removeTicket(ticket._id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
        },
        onError: () => {
          setIsDeleteOpen(false);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const ticketCondition = ticketStatus.find((ticketSt) => {
    return JSON.stringify(ticketSt.cond) == JSON.stringify(ticketCurrCondition);
  });
  return (
    <Table.Row
      variant="singleHead"
      className=" !hidden md:!grid mx-auto p-4 py-2 h-full "
    >
      <td className="font-Shabnam_B text-base">
        {(index + 1).toLocaleString("fa-Ir")}
      </td>
      <td className="w-full h-full flex-center">
        <p
          className={` text-white w-[70%] mx-auto
         rounded-md h-[30px] my-auto flex-center ${ticketCondition?.className}
         `}
        >
          {ticket?.user?.userName}
        </p>
      </td>
      <td>
        <span className="text-base text-mute font-Shabnam_B line-clamp-2">
          {ticket.title}
        </span>
      </td>
      <td>
        <span className="font-Shabnam_M">{ticket.dept.title}</span>
      </td>
      <td>
        <span className="text-base text-main_brown font-Shabnam_M ">
          {priorityValues.find((value) => {
            return value.value == ticket.priority.toString();
          })?.label || "نامشخص"}
        </span>
      </td>
      <td className=" flex items-center gap-x-4">
        <button
          // onClick={() => setIsReplyOpen(true)}
          className="text-2xl text-blue-500 mx-auto  w-fit flex justify-center "
        >
          <ImReply />
        </button>
      </td>
      <td className=" flex items-center gap-x-4">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-red-500 mx-auto  w-fit flex justify-center "
        >
          <MdDelete />
        </button>
        <button
          // onClick={() => setIsEditOpen(true)}
          className="text-2xl text-emerald-700 mx-auto  w-fit flex justify-center "
        >
          <IoLockClosed />
        </button>
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
    </Table.Row>
  );
}

export default LargeTicketTRow;
