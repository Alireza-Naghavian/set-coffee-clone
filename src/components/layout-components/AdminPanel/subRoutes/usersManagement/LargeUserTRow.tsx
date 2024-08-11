import Table from '@/components/UI/Table/Table'
import Link from 'next/link'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import DeleteModal from '../Products/DeleteModal'
import EditProdModal from '../Products/EditProdModal'
import { GetMetype } from '@/types/auth.type'
import { FaBan } from "react-icons/fa";
function LargeUserTRow({user,index}:{user:GetMetype,index:number}) {
  return (
    <Table.Row variant="singleHead" className=" !hidden md:!grid">
    <td>
    {index}
    </td>
    <td>
      <span className="text-base text-mute font-Shabnam_M">
        {user?.userName}
      </span>
    </td>
    <td>
      <span className="text-sm text-mute line-clamp-2 max-w-[150px]">
        {user?.email} 
      </span>
    </td>
    <td>
      <span className="text-base text-mute ml-4">
        {user?.userCart?.length?.toLocaleString("fa-Ir")} تراکنش
      </span>
    </td>
    <td>
      <span className="text-base text-mute ml-4">
        {user?.role}
      </span>
    </td>
    <td className="ml-12">
      <button
        // onClick={() => setIsEditOpen(true)}
        className="text-2xl text-blue-500 mx-auto ml-6 w-fit flex justify-center "
      >
        <FaEdit />
      </button>
    </td>
    <td className="ml-12">
      <button
        // onClick={() => setIsDeleteOpen(true)}
        className="text-2xl text-red-500 mx-auto ml-8 w-fit flex justify-center "
      >
        <MdDelete />
      </button>
    </td>
    <td className="ml-13">
      <button
        // onClick={() => setIsDeleteOpen(true)}
        className="text-2xl text-red-500 mx-auto ml-10 w-fit flex justify-center "
      >
       <FaBan />
      </button>
    </td>
    {/* <DeleteModal
    //   productId={product._id}
    //   isDeleteOpen={isDeleteOpen}
    //   setIsDeleteOpen={() => setIsDeleteOpen(false)}
    />
    <EditProdModal
    //   product={product}
    //   isEditOpen={isEditOpen}
    //   setIsEditOpen={() => setIsEditOpen(false)}
    /> */}
  </Table.Row>
  )
}

export default LargeUserTRow