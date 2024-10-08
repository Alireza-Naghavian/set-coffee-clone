"use client";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import TextLoader from "@/components/UI/loader/TextLoader";
import Table from "@/components/UI/Table/Table";
import useGetAllTickets from "@/hooks/tickets&department/useGetAllTickets";
import { TicketType } from "@/types/models/ticket.type";
import dynamic from "next/dynamic";
import React from "react";
import { HiTicket } from "react-icons/hi2";
import HeaderAdminLayout from "../Products/HeaderAdminLayout";
import LargeTicketTRow from "./LargeTicketTRow";
import SmallTicketTRow from "./SmallTicketTRow";
const NoSSR = dynamic(() => import("@/components/UI/Table/Table"), {
  ssr: false,
});
function Tickets() {
  const { isTicketsLoading, tickets } = useGetAllTickets();

  return (
    <HeaderAdminLayout title="تیکت ها">
      <div className="h-[480px] overflow-y-auto">
        <NoSSR variant="singleHead" className="w-full relative mt-10 table">
          {tickets?.tickets?.length > 0 ? (
            <Table.Header variant="singleHead" className="hidden md:block">
              <tr
                className="grid grid-cols-7  rounded-lg  child:text-center p-4
                    bg-main_brown text-white"
              >
                <th>شماره</th>
                <th>کاربر</th>
                <th>عنوان</th>
                <th>دپارتمان</th>
                <th>اولویت</th>
                <th>مشاهده / پاسخ</th>
                <th>حذف / بستن</th>
              </tr>
            </Table.Header>
          ) : isTicketsLoading ? (
            isTicketsLoading && (
              <TextLoader loadingCondition={isTicketsLoading} />
            )
          ) : (
            <EmptyResult
              icon={<HiTicket />}
              firstDesc="هنوز هیچ تیکتی توسط کاربر ثبت نشده است"
              secondDesc=""
              title="تیکت وجود ندارد"
              addressLink={false}
            />
          )}
          <Table.Body
            variant="singleHead"
            className="child:md:grid-cols-7 grid-cols-2"
          >
            {tickets?.tickets?.map((ticket: TicketType, index: number) => {
              return (
                <React.Fragment key={index}>
                  {/* large table row */}
                  <LargeTicketTRow ticket={ticket} index={index} />
                </React.Fragment>
              );
            })}
            {tickets?.tickets?.map((ticket: TicketType, index: number) => {
              return (
                <React.Fragment key={ticket._id}>
                  {/* large table row */}
                  <SmallTicketTRow ticket={ticket} />
                </React.Fragment>
              );
            })}
          </Table.Body>
        </NoSSR>
      </div>
    </HeaderAdminLayout>
  );
}

export default Tickets;
