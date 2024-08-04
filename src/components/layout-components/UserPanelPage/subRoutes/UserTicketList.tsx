import Badge from "@/components/UI/badge/Badge";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import { TicketType } from "@/types/models/ticket.type";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { HiTicket } from "react-icons/hi2";
{
  /* <HiTicket className="text-[65px]" /> */
}
function UserTicketList({ allTickets }: { allTickets: TicketType[] }) {
  return (
    <div className="relative px-2 sm:px-8 py-4 rounded-md bg-gray-200 h-full w-full">
      <div className=" flex justify-between items-center w-full border-b pb-1 border-b-main_brown">
        <h1 className="text-xl font-Shabnam_B text-dark_shade text-right md:text-2xl">
          <span className="mr-3 ">تیکت ها</span>
        </h1>
        <Link
          className="font-Shabnam_M flex items-center gap-x-1 text-white
         px-2 py-2 ml-2 rounded-sm bg-main_brown"
          href={"/my-account/tickets"}
        >
          <FaPlus />
          <span>ثبت تیکت جدید</span>
        </Link>
      </div>
      {allTickets?.length === 0 ? (
        <EmptyResult
          firstDesc="نظرات و مشکلات خود را میتوانید به اطلاع ما برسانید"
          secondDesc=""
          title="تیکتی ثبت نشده است."
          icon={<HiTicket className="text-[65px]" />}
          addressLink={false}
        />
      ) : (
        <div className="flex flex-col mt-4">
          <ul className="flex flex-col gap-y-4 child:flex child:justify-between child:items-center">
            {allTickets.map((ticket: TicketType) => {
              return (
                <li
                  key={ticket?._id}
                  className="tr-200 py-2 px-2 rounded-lg bg-gray-300  hover:bg-gray-400 w-full"
                >
                  <Link
                    className="w-full flex justify-between items-center"
                    href={`/my-account/tickets/all-user-tickets/${ticket?._id}`}
                  >
                    <span className="text-dark_shade font-Shabnam_M">
                      {ticket.title}
                    </span>
                    <span className="flex gap-x-2 items-center">
                      <Badge additionalClass="bg-main_brown rounded-lg px-2 py-1 text-sm text-white">
                        {ticket?.dept?.title}
                      </Badge>
                      <Badge additionalClass="bg-main_brown rounded-lg px-2 py-1 text-sm text-white">
                        {ticket?.isOpen ? "باز" : "بسته شده"}
                      </Badge>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserTicketList;
