import Table from "@/components/UI/Table/Table";
import { UserRoleType } from "@/types/auth.type";
import { useState } from "react";
import { FaBan, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteUserModal from "./DeleteUserModal";
import EditRoleModal from "./EditRoleModal";
function LargeUserTRow({ user, index }: { user: UserRoleType; index: number }) {
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  return (
    <Table.Row variant="singleHead" className=" !hidden md:!grid ">
      <td>{index}</td>
      <td>
        <span  className="text-sm line-clamp-3 font-Shabnam_M px-2 tr-300 hover:text-mute">
          {user?.userName}
        </span>
      </td>
      <td className="   w-[95%]   truncate line-clamp-1">
        <p className="text-sm relative  font-Shabnam_M px-2 ">{user?.email}</p>
      </td>
      <td>
        <span className="text-base text-mute ml-4">
          {user?.userCart?.length?.toLocaleString("fa-Ir")} تراکنش
        </span>
      </td>
      <td>
        <span className="text-base text-mute ml-4">
          {user?.role === "ADMIN" ? "ادمین" : "کاربر عادی"}
        </span>
      </td>
      <td className="ml-12">
        <button
          onClick={() => setIsRoleOpen(true)}
          className="text-2xl text-blue-500 mx-auto ml-6 w-fit flex justify-center "
        >
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
      <EditRoleModal
        user={user}
        isRoleOpen={isRoleOpen}
        setIsRoleOpen={() => setIsRoleOpen(false)}
      />
      <DeleteUserModal
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={() => setIsDeleteOpen(false)}
        identifier={user?._id}
      />
    </Table.Row>
  );
}

export default LargeUserTRow;
