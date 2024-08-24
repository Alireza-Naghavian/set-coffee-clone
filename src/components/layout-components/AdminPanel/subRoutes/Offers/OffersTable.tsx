"use client";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import Loader from "@/components/UI/loader/Loader";
import Table from "@/components/UI/Table/Table";
import useGetAllOffers from "@/hooks/offers/useGetAllOffers";
import { OfferModelType } from "@/types/models/offers.type";
import dynamic from "next/dynamic";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import LargeOfferTRow from "./LargeOfferTRow";
import SmallOfferTRow from "./SmallOfferTRow";
import TextLoader from "@/components/UI/loader/TextLoader";
const NoSSR = dynamic(() => import("@/components/UI/Table/Table"), {
  ssr: false,
});
function OffersTable() {
  const { allOfferCodes, isOfferLoading } = useGetAllOffers();
  return (
    <div className="h-[480px] overflow-y-auto">
      <NoSSR variant="singleHead" className="w-full relative mt-10 table">
        {allOfferCodes?.length > 0 ? (
          <Table.Header variant="singleHead" className="hidden md:block">
            <tr
              className="grid grid-cols-5  rounded-lg  child:text-center p-4
                bg-main_brown text-white"
            >
              <th>کد</th>
              <th>درصد تخفیف</th>
              <th>تعداد دفعات</th>
              <th>استفاده شده</th>
              <th>حذف</th>
            </tr>
          </Table.Header>
        ) : isOfferLoading ? (
          isOfferLoading && <TextLoader loadingCondition={isOfferLoading} />
        ) : (
          <EmptyResult
            icon={<BiSolidOffer />}
            firstDesc="هنوز هیچ  کد تخفیفی  ثبت نشده است"
            secondDesc=""
            title="کد تخفیف وجود ندارد"
            addressLink={false}
          />
        )}
        <Table.Body
          variant="singleHead"
          className="child:md:grid-cols-5 grid-cols-2"
        >
          {allOfferCodes?.map((offer: OfferModelType, index: number) => {
            return (
              <React.Fragment key={index}>
                {/* large table row */}
                <LargeOfferTRow offer={offer} />
              </React.Fragment>
            );
          })}
          {allOfferCodes?.map((offer: OfferModelType, index: number) => {
            return (
              <React.Fragment key={index}>
                {/* large table row */}
                <SmallOfferTRow offer={offer} />
              </React.Fragment>
            );
          })}
        </Table.Body>
      </NoSSR>
    </div>
  );
}

export default OffersTable;
