import { useAlert } from "@/app/context/AlertContext";
import Table from "@/components/UI/Table/Table";
import useChangeRole from "@/hooks/authHooks/useChangeRole";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useRemoveUser from "@/hooks/authHooks/useRemoveUser";
import { UserRoleType } from "@/types/auth.type";
import { roleOptions } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../modals/DeleteModal";
import SelectModal from "../modals/SelectModal";
function LargeUserTRow({ user, index }: { user: UserRoleType; index: number }) {
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { deleteUser, isRemoveLoading } = useRemoveUser();
  const { replace } = useRouter();
  const { user: userData } = useGetMe();
  useEffect(() => {
    if (userData?.role === "USER") replace("/");
  }, [user?.role, replace,userData?.role]);
  const [role, setRole] = useState<string>(user.role);
  const { isRoleUpdate, updateRole } = useChangeRole();
  const { showAlert } = useAlert();
  const roleHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateRole(
        { userId: user?._id, data: { role } },
        {
          onSuccess: (data: any) => {
            showAlert("success", data.message);
            setIsRoleOpen(false);
          },
          onError: (err: any) => {
            setIsRoleOpen(false);
            showAlert("error", err?.response?.data?.message);
          },
        }
      );
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };
  const removeHandler = async (userId: string) => {
    try {
      await deleteUser(
        { userId: userId },
        {
          onSuccess: (data: any) => {
            showAlert("success", data?.message);
            setIsDeleteOpen(false);
          },
          onError: (err: any) => {
            showAlert("error", err?.response?.data?.message);
            setIsDeleteOpen(false);
          },
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Table.Row variant="singleHead" className=" !hidden md:!grid p-4 ">
      <td>{index}</td>
      <td>
        <span className="text-sm line-clamp-3 font-Shabnam_M px-2 ">
          {user?.userName}
        </span>
      </td>
      <td className="   w-[95%]   truncate line-clamp-1">
        <p className="text-sm relative  font-Shabnam_M px-2 ">{user?.email}</p>
      </td>
      <td>
        <span className="text-base text-mute ">
          {user?.userCart?.length?.toLocaleString("fa-Ir")} تراکنش
        </span>
      </td>
      <td>
        <span className="text-base text-mute ">
          {user?.role === "ADMIN" ? "ادمین" : "کاربر عادی"}
        </span>
      </td>
      <td className="ml-12">
        <button
          onClick={() => setIsRoleOpen(true)}
          className="text-2xl text-blue-500 mx-auto  w-fit flex justify-center "
        >
          <FaEdit />
        </button>
      </td>
      <td className="ml-12">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-red-500 mx-auto  w-fit flex justify-center "
        >
          <MdDelete />
        </button>
      </td>
      <SelectModal
        isLoading={isRoleUpdate}
        isOpen={isRoleOpen}
        setIsOpen={() => setIsRoleOpen(false)}
        options={roleOptions}
        subjectTitle="تغییر سطح"
        modalTitle="تغییر سطح کاربر"
        onSelectChange={(e) => setRole(e.target.value)}
        value={role}
        selectHanlder={roleHandler}
      />
      {user._id !== undefined && (
        <DeleteModal
          identifier={user._id}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={() => setIsDeleteOpen(false)}
          isLoading={isRemoveLoading}
          removeHandler={removeHandler}
          subjectTitle={"کاربر"}
        />
      )}
    </Table.Row>
  );
}

export default LargeUserTRow;
