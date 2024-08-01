import Table from '@/components/UI/Table/Table'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosClose } from 'react-icons/io'
import { TRowType } from '../LgTRow/LgTRow'
import { ProductCounter } from '../ProductTable/ProductTable'
import { useState } from 'react'

function SmTRow({product,removeHandler}:TRowType) {
  return (
    <Table.Row
    variant="singleHead"
    key={product._id}
    className="my-1 child:my-auto  !flex md:!hidden gap-x-4  border-b py-2"
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
    <tr className="flex flex-col w-full ">
      <td className="text-right flex justify-between items-center my-auto gap-x-2  !mb-2">
        <Link
          href={`/categories/${product._id}`}
          className="text-sm font-Shabnam_B line-clamp-4 tr-300 hover:text-mute"
        >
          {product.title}
        </Link>
        <button
          onClick={() => removeHandler(product)}
          className="mx-auto w-fit my-auto h-full"
        >
          <IoIosClose size={24} />
        </button>
      </td>
      <tr
        className="flex flex-col gap-y-4  child:flex 
                  child:justify-between child:items-center child:w-full
                   child:text-sm  child:pb-[2px] child:child:pb-[2px]"
      >
        <td>
          <span>قیمت:</span>
          <span>
            {product.price.toLocaleString("fa-Ir")} تومان
          </span>
        </td>
        <td className="">
          <span>تعداد:</span>
          <span>
            <ProductCounter  product={product}  />
          </span>
        </td>
        <td className="!border-b-0">
          <span>جمع جزء:</span>
          <span className='font-Shabnam_B'>{(product.price * product.count).toLocaleString("fa-Ir")}</span>
        </td>
      </tr>
    </tr>
  </Table.Row>
  )
}

export default SmTRow