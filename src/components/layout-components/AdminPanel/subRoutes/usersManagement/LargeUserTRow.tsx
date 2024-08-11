import Table from "@/components/UI/Table/Table";
import { UserRoleType } from "@/types/auth.type";
import { useState } from "react";
import { FaBan, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditRoleModal from "./EditRoleModal";
function LargeUserTRow({ user, index }: { user: UserRoleType; index: number }) {
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);

  return (
    <Table.Row variant="singleHead" className=" !hidden md:!grid">
      <td>{index}</td>
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
        <span className="text-base text-mute ml-4">{user?.role === "ADMIN" ? "ادمین" : "کاربر عادی"}</span>
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
      <EditRoleModal user={user} isRoleOpen={isRoleOpen} setIsRoleOpen={()=>setIsRoleOpen(false)}/>
      {/* <DeleteModal
    //   productId={product._id}
    //   isDeleteOpen={isDeleteOpen}
    //   setIsDeleteOpen={() => setIsDeleteOpen(false)}
    />
  
    /> */}
    </Table.Row>
  );
}

export default LargeUserTRow;
