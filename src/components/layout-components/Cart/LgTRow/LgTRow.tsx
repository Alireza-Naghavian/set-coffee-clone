import Table from "@/components/UI/Table/Table";
import { ProductCartType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { ProductCounter } from "../ProductTable/ProductTable";
export type TRowType = {
  removeHandler:(product:ProductCartType)=>void
  product:ProductCartType
  lockCounter:boolean
}
function LgTRow({product,removeHandler,lockCounter}:TRowType) {
  return (
    <Table.Row
      variant="singleHead"
      className=" !hidden md:!grid"
    >
      <td>
        <button
          onClick={() => removeHandler(product)}
          className="mx-auto w-fit my-auto h-full"
        >
          <IoIosClose size={32} />
        </button>
      </td>
      <td className=" w-full lg:!w-[80px] lg:!h-[80px]  mx-auto ">
        <Image
          src={product.cover}
          alt={product.title}
          className="lg:!w-[80px] lg:!h-[80px] md:!w-[220px] md:!h-[95px] object-contain "
          width={80}
          height={80}
        />
      </td>
      <td>
        <Link
          href={`/categories/${product._id}`}
          className="text-sm line-clamp-4 tr-300 hover:text-mute"
        >
          {product.title}
        </Link>
      </td>
      <td>
        <span className="text-base text-mute">
          {product.price.toLocaleString("fa-Ir")} تومان
        </span>
      </td>
      <td className="!mr-4">
        <ProductCounter lockCounter={lockCounter}  product={product}  />
      </td>
      <td className="!mr-4 !flex xl:flex-row  lg:flex-col md:flex-col flow-row">
        <span>{(product.price * product.count).toLocaleString("fa-Ir")}</span>
        <span>تومان</span>
      </td>
    </Table.Row>
  );
}

export default LgTRow;
