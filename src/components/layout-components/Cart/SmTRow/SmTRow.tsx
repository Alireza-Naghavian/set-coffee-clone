import Table from '@/components/UI/Table/Table'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosClose } from 'react-icons/io'
import { TRowType } from '../LgTRow/LgTRow'
import { ProductCounter } from '../ProductTable/ProductTable'

function SmTRow({product,removeHandler,lockCounter}:TRowType) {
  return (
    <Table.Row
    variant="singleHead"
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

    <div className="flex flex-col w-full ">
      <th className="text-right flex justify-between items-center my-auto gap-x-2  !mb-2">
        <Link
          href={`/categories/${product._id}`}
          className="text-sm font-Shabnam_B line-clamp-4 tr-300 hover:text-mute"
        >
          {product.title}
        </Link>
        <button
          onClick={() => removeHandler(product)}
          className="mr-auto w-fit my-auto h-full"
        >
          <IoIosClose size={24} />
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
          <span>تعداد:</span>
          <span>
            <ProductCounter  lockCounter={lockCounter} product={product}  />
          </span>
        </th>
        <th className="!border-b-0">
          <span>جمع جزء:</span>
          <span className='font-Shabnam_B'>{(product.price * product.count).toLocaleString("fa-Ir")}</span>
        </th>
      </tr>
    </div>
  </Table.Row>
  )
}

export default SmTRow