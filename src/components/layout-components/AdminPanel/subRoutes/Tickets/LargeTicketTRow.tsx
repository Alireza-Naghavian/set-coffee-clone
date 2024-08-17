import Table from "@/components/UI/Table/Table";
import useRemoveTicket from "@/hooks/tickets&department/useRemoveTicket";
import useUpdateTicketST from "@/hooks/tickets&department/useUpdateTicketST";
import { TicketStatusType, TicketType } from "@/types/models/ticket.type";
import { priorityValues, ticketOptions, ticketStatus } from "@/utils/constants";
import { FormEvent, useState } from "react";
import { ImReply } from "react-icons/im";
import { IoLockClosed } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import SelectModal from "../modals/SelectModal";
import ReplyModal from "./ReplyModal";

type LgTRowType = {
  ticket: TicketType;
  index: number;
};
function LargeTicketTRow({ ticket, index }: LgTRowType) {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isOpenTicket, setIsOpenTicket] = useState<boolean>(ticket.isOpen);
  const { isRemoveLoading, removeTicket } = useRemoveTicket();
  const { isUpdateLoading, updateTicketSt } = useUpdateTicketST();

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
          onClick={() => setIsReplyOpen(true)}
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
          onClick={() => setIsSelectOpen(true)}
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
     {ticket._id !== undefined &&
      <EditModal
      isOpen={isReplyOpen}
      setIsOpen={() => setIsReplyOpen(false)}
      modalTitle="پاسخ به تیکت"
      className="!w-[100%] !h-auto  overflow-y-auto py-2 !top-[2%]"
    >
     <div className="h-full py-2">
     <ReplyModal ticketId={ticket._id} />
     </div>
    </EditModal>}
    </Table.Row>
  );
}

export default LargeTicketTRow;
