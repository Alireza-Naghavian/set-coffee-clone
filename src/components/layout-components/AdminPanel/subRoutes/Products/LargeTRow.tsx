"use client";
import Table from "@/components/UI/Table/Table";
import useRemoveProduct from "@/hooks/product/useRemoveProduct";
import { SingleProductType } from "@/types/models/categories.type";
import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./DeleteModal";

function LargeTRow({ product }: { product: SingleProductType }) {

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <Table.Row variant="singleHead" className=" !hidden md:!grid">
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
      <td className="ml-12">
        <button className="text-2xl text-blue-500 mx-auto ml-6 w-fit flex justify-center ">
          <FaEdit />
        </button>
      </td>
      <td className="ml-12">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-red-500 mx-auto ml-8 w-fit flex justify-center "
        >
            <MdDelete />
        </button>
      </td>
      <DeleteModal
        productId={product._id}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={() => setIsDeleteOpen(false)}
      />
    </Table.Row>
  );
}

export default LargeTRow;
// if (product._id === undefined) return;
// removeHandler(product._id);
