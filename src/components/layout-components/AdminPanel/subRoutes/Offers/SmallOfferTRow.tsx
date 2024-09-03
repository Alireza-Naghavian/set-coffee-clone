import Table from '@/components/UI/Table/Table'
import useRemoveOfferCode from '@/hooks/offers/useRemoveOfferCode';
import { OfferModelType } from '@/types/models/offers.type'
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import DeleteModal from '../modals/DeleteModal';

function SmallOfferTRow({offer}:{offer:OfferModelType}) {
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
    return null
    }
  };
  return (
    <Table.Row
    className="my-1 child:my-auto
  !flex flex-col md:!hidden gap-y-1  h-full  w-full  bg-slate-200 px-4  border-b py-2"
    variant="singleHead"
  >
    <td className="flex items-center justify-between w-full">
      <span className="font-Shabnam_M "> {offer.code}</span>
      <span className="text-right flex justify-between items-center my-auto gap-x-2  !mb-2">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="mr-auto  my-auto h-full text-2xl text-red-500   w-fit flex justify-center"
        >
          <MdDelete />
        </button>
      </span>
    </td>
    <td className="flex flex-col w-full ">
      <span
        className="flex flex-col gap-y-4  child:flex 
              child:justify-between child:items-center child:w-full
               child:text-sm  child:pb-[2px] child:child:pb-[2px]"
      >
        <span className="">
          <span>درصد تخفیف:</span>
          <span className="xs:max-w-[150px] sm:max-w-[330px] font-Shabnam_M text-wrap line-clamp-1">
            {offer?.percent.toLocaleString("fa-Ir")}&nbsp;درصد
          </span>
        </span>
        <span className="">
          <span> تعداد دفعات:</span>
          <span className='font-Shabnam_M'>{offer.maxUsage.toLocaleString("fa-Ir")}&nbsp;مرتبه</span>
        </span>
        <span className="">
          <span>استفاده شده:</span>
          <span className="font-Shabnam_M">
            <span className=" text-mute font-Shabnam_M">
              {offer?.uses?.toLocaleString("fa-Ir")}&nbsp;مرتبه
            </span>
          </span>
        </span>
      </span>
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
  )
}

export default SmallOfferTRow