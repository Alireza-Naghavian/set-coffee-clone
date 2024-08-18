import Table from "@/components/UI/Table/Table";
import { OfferModelType } from "@/types/models/offers.type";
import React from "react";
import { MdDelete } from "react-icons/md";

function LargeOfferTRow({ offer }: { offer: OfferModelType }) {
  return (
    <Table.Row variant="singleHead" className=" !hidden md:!grid p-4 ">
      <td>
        <span className="text-sm line-clamp-3 font-Shabnam_M px-2 ">
          {offer.code}
        </span>
      </td>

      <td>
        <span className="text-base text-mute font-Shabnam_M "> 
             {offer.percent.toLocaleString("fa-Ir")} 
             درصد</span>
      </td>
      <td>
        <span className="text-base text-mute font-Shabnam_M ">
            {offer.maxUsage.toLocaleString("fa-Ir")}&nbsp;مرتبه 
            </span>
      </td>
      <td>
        <span className="text-base text-mute font-Shabnam_M">
            {offer?.uses?.toLocaleString("fa-Ir")}&nbsp;مرتبه 
            </span>
      </td>
      <td className="ml-12">
        <button
          // onClick={() => setIsRoleOpen(true)}
          className="text-2xl text-red-500 mx-auto  w-fit flex justify-center "
        >
          <MdDelete />
        </button>
      </td>

      {/* {user._id !== undefined && (
      <DeleteModal
        identifier={user._id}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={() => setIsDeleteOpen(false)}
        isLoading={isRemoveLoading}
        removeHandler={removeHandler}
        subjectTitle={"کاربر"}
      />
    )} */}
    </Table.Row>
  );
}

export default LargeOfferTRow;
