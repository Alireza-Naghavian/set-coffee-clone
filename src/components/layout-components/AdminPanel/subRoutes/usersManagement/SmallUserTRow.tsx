import Table from '@/components/UI/Table/Table'
import { UserRoleType } from '@/types/auth.type';
import React, { useState } from 'react'
import { FaBan, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import EditRoleModal from './EditRoleModal';
import DeleteUserModal from './DeleteUserModal';

function SmallUserTRow({ user, index }: { user: UserRoleType; index: number }) {
    const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);
const [isDeleteOpen,setIsDeleteOpen] = useState<boolean>(false)
    return (
    <Table.Row
    className="my-1 child:my-auto
      !flex md:!hidden gap-x-4 h-full   bg-slate-200 px-2  border-b py-2"
    variant="singleHead"
  >
    <td className="font-Shabnam_B ">
      {user?.userName}
    </td>
    <td className="flex flex-col w-full ">
      <span className="text-right flex justify-between items-center my-auto gap-x-2  !mb-2">
        
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="mr-auto  my-auto h-full text-2xl text-red-500   w-fit flex justify-center"
        >
          <MdDelete />
        </button>
      </span>
      <span
        className="flex flex-col gap-y-4  child:flex 
                child:justify-between child:items-center child:w-full
                 child:text-sm  child:pb-[2px] child:child:pb-[2px]"
      >
        <span className=''>
          <span>ایمیل:</span>
          <span className='xs:max-w-[150px] sm:max-w-[330px] text-wrap line-clamp-1'>{user?.email}</span>
        </span>
        <span className="">
          <span>تراکنش ها:</span>
          <span>{user?.userCart?.length.toLocaleString("fa-Ir")} عدد</span>
        </span>
        <span className="">
          <span>نقش:</span>
          <span className="font-Shabnam_B">
          <span className=" text-mute">{user?.role === "ADMIN" ? "ادمین" : "کاربر عادی"}</span>
          </span>
        </span>
        <span className="">
          <span>تغییر سطح:</span>
          <button  onClick={()=>setIsRoleOpen(true)} className="text-2xl text-blue-500">
            <FaEdit />
          </button>
        </span>
      </span>
    </td>
        <EditRoleModal user={user} isRoleOpen={isRoleOpen} setIsRoleOpen={()=>setIsRoleOpen(false)}/>
        <DeleteUserModal isDeleteOpen={isDeleteOpen} setIsDeleteOpen={()=>setIsDeleteOpen(false)} identifier={user?._id} />
  </Table.Row>
  )
}

export default SmallUserTRow