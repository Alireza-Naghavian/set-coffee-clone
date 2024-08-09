import Table from "@/components/UI/Table/Table";
import { SingleProductType } from "@/types/models/categories.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function SmallTRow({ product }: { product: SingleProductType }) {
  return (
    <Table.Row
      className="my-1 child:my-auto
        !flex md:!hidden gap-x-4  border-b py-2"
      variant="singleHead"
    >
     <td className="">
      <Image
        src={product.cover}
        alt={product.title}
        className="lg:!w-[80px] lg:!h-[80px] md:!w-[220px] md:!h-[95px] !w-[100px]  object-contain "
        width={80}
        height={80}
      />
    </td>

    <div className="flex flex-col w-full ">
      <th className="text-right flex justify-between items-center my-auto gap-x-2  !mb-2">
        <Link
          href={`/categories/${product._id}`}
          className="text-sm font-Shabnam_B line-clamp-4 tr-300 hover:text-mute"
        >
          {product.title}
        </Link>
        <button
     
          className="mr-auto  my-auto h-full text-2xl text-red-500   w-fit flex justify-center"
        >
        <MdDelete />
        </button>
      </th>
      <tr
        className="flex flex-col gap-y-4  child:flex 
                  child:justify-between child:items-center child:w-full
                   child:text-sm  child:pb-[2px] child:child:pb-[2px]"
      >
        <th>
          <span>قیمت:</span>
          <span>
            {product.price.toLocaleString("fa-Ir")} تومان
          </span>
        </th>
        <th className="">
          <span>موجودی:</span>
          <span>
          {product.entities.toLocaleString("fa-Ir")} عدد
          </span>
        </th>
        <th className="!border-b-0">
          <span> سفارش ثبت شده:</span>
          <span className='font-Shabnam_B'>{product?.sold?.toLocaleString("fa-Ir")} عدد</span>
        </th>
        <th className="!border-b-0">
          <span>ویرایش:</span>
          <button className="text-2xl text-blue-500">    <FaEdit /></button>
        </th>
      </tr>
    </div>
    </Table.Row>
  );
}

export default SmallTRow;
