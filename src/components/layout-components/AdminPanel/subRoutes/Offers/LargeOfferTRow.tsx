import Table from "@/components/UI/Table/Table";
import { OfferModelType } from "@/types/models/offers.type";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../modals/DeleteModal";
import useRemoveOfferCode from "@/hooks/offers/useRemoveOfferCode";

function LargeOfferTRow({ offer }: { offer: OfferModelType }) {
  const { isRemoveLoading, removeOffer } = useRemoveOfferCode();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const removeHandler = async () => {
    try {
      if (offer._id === undefined) return;
      await removeOffer(offer._id, {
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
          درصد
        </span>
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
          onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-red-500 mx-auto  w-fit flex justify-center "
        >
          <MdDelete />
        </button>
      </td>

      {offer._id !== undefined && (
        <DeleteModal
          identifier={offer._id}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={() => setIsDeleteOpen(false)}
          isLoading={isRemoveLoading}
          removeHandler={removeHandler}
          subjectTitle={"کد تخفیف"}
        />
      )}
    </Table.Row>
  );
}

export default LargeOfferTRow;
