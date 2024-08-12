"use client";
import Table from "@/components/UI/Table/Table";
import { SingleProductType } from "@/types/models/categories.type";
import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import EditProdModal from "./EditProdModal";

function LargeTRow({ product }: { product: SingleProductType}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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
      <DeleteModal
        identifier={product._id}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={() => setIsDeleteOpen(false)}
      />
      <EditProdModal
        product={product}
        isEditOpen={isEditOpen}
        setIsEditOpen={() => setIsEditOpen(false)}
      />
    </Table.Row>
  );
}

export default LargeTRow;
