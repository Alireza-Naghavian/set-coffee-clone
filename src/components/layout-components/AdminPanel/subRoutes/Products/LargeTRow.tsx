"use client";
import Table from "@/components/UI/Table/Table";
import useRemoveProduct from "@/hooks/product/useRemoveProduct";
import { SingleProductType } from "@/types/models/categories.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import EditProductForm from "./EditProductForm";

function LargeTRow({ product }: { product: SingleProductType }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { refresh } = useRouter();
  const { isRemoveLoading, removeProduct } = useRemoveProduct();
  const removeHandler = (productId: string) => {
    removeProduct(productId, {
      onSuccess: (data: any) => {
        toast.success(data.message);
        setIsDeleteOpen(false);
        refresh();
      },
      onError: (err: any) => {
        setIsDeleteOpen(false);
        toast.error(err?.response?.data?.message);
      },
    });
  };
  return (
    <Table.Row variant="singleHead" className=" !hidden md:!grid p-4">
      <td>
        <Link
          href={`/categories/${product._id}`}
          className="text-sm line-clamp-3 font-Shabnam_M px-2 tr-300 hover:text-mute "
        >
          {product.title}
        </Link>
      </td>
      <td>
        <span className="text-base text-mute font-Shabnam_M">
          {product.price.toLocaleString("fa-Ir")} تومان
        </span>
      </td>
      <td>
        <span className="text-base text-mute">
          {product.entities.toLocaleString("fa-Ir")} عدد
        </span>
      </td>
      <td>
        <span className="text-base text-mute">
          {product?.sold?.toLocaleString("fa-Ir")} عدد
        </span>
      </td>
      <td className="">
        <button
          onClick={() => setIsEditOpen(true)}
          className="text-2xl text-blue-500 mx-auto  w-fit flex justify-center "
        >
          <FaEdit />
        </button>
      </td>
      <td className="">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-red-500 mx-auto  w-fit flex justify-center "
        >
          <MdDelete />
        </button>
      </td>
      {product._id !== undefined && (
        <DeleteModal
          identifier={product._id}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={() => setIsDeleteOpen(false)}
          isLoading={isRemoveLoading}
          removeHandler={removeHandler}
          subjectTitle="محصول"
        />
      )}
      <EditModal
        isOpen={isEditOpen}
        modalTitle="ویرایش محصول"
        setIsOpen={() => setIsEditOpen(false)}>
        <EditProductForm
          product={product}
          setIsOpen={() => setIsEditOpen(false)}
        />
      </EditModal>
    </Table.Row>
  );
}

export default LargeTRow;
