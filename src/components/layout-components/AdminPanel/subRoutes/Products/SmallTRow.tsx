"use client";
import Loader from "@/components/UI/loader/Loader";
import Table from "@/components/UI/Table/Table";
import useRemoveProduct from "@/hooks/product/useRemoveProduct";
import { SingleProductType } from "@/types/models/categories.type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function SmallTRow({ product }: { product: SingleProductType }) {
  const { isRemoveLoading, removeProduct } = useRemoveProduct();
  const { refresh } = useRouter();
  const removeHandler = (productId: string) => {
    removeProduct(productId, {
      onSuccess: (data: any) => {
        toast.success(data.message);
        refresh();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    });
  };
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

      <td className="flex flex-col w-full ">
        <span className="text-right flex justify-between items-center my-auto gap-x-2  !mb-2">
          <Link
            href={`/categories/${product._id}`}
            className="text-sm font-Shabnam_B line-clamp-4 tr-300 hover:text-mute"
          >
            {product.title}
          </Link>
          <button
            onClick={() => {
              if (product._id == undefined) return;
              removeHandler(product._id);
            }}
            className="mr-auto  my-auto h-full text-2xl text-red-500   w-fit flex justify-center"
          >
            {isRemoveLoading ? (
              <Loader loadingCondition={isRemoveLoading} />
            ) : (
              <MdDelete />
            )}
          </button>
        </span>
        <span
          className="flex flex-col gap-y-4  child:flex 
                  child:justify-between child:items-center child:w-full
                   child:text-sm  child:pb-[2px] child:child:pb-[2px]"
        >
          <span>
            <span>قیمت:</span>
            <span>{product.price.toLocaleString("fa-Ir")} تومان</span>
          </span>
          <span className="">
            <span>موجودی:</span>
            <span>{product.entities.toLocaleString("fa-Ir")} عدد</span>
          </span>
          <span className="!border-b-0">
            <span> سفارش ثبت شده:</span>
            <span className="font-Shabnam_B">
              {product?.sold?.toLocaleString("fa-Ir")} عدد
            </span>
          </span>
          <span className="!border-b-0">
            <span>ویرایش:</span>
            <button className="text-2xl text-blue-500">
              <FaEdit />
            </button>
          </span>
        </span>
      </td>
    </Table.Row>
  );
}

export default SmallTRow;
