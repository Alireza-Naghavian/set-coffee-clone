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
import { toast } from "react-toastify";
import DeleteModal from "../modals/DeleteModal";
import SelectModal from "../modals/SelectModal";

function SmallUserTRow({ user, index }: { user: UserRoleType; index: number }) {
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { deleteUser, isRemoveLoading } = useRemoveUser();
  const { replace } = useRouter();
  const { user: userData } = useGetMe();
  useEffect(() => {
    if (userData?.role === "USER") replace("/");
  }, [user?.role, replace]);
  const [role, setRole] = useState<string>(user.role);
  const { isRoleUpdate, updateRole } = useChangeRole();
  const roleHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateRole(
        { userId: user?._id, data: { role } },
        {
          onSuccess: (data: any) => {
            toast.success(data.message);
            setIsRoleOpen(false);
          },
          onError: (err: any) => {
            setIsRoleOpen(false);
            toast.error(err?.response?.data?.message);
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
            toast.success(data?.message);
            setIsDeleteOpen(false);
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message);
            setIsDeleteOpen(false);
          },
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Table.Row
      className="my-1 child:my-auto
      !flex md:!hidden gap-x-4 h-full   bg-slate-200 px-2  border-b py-2"
      variant="singleHead"
    >
      <td className="font-Shabnam_B ">{user?.userName}</td>
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
          <span className="">
            <span>ایمیل:</span>
            <span className="xs:max-w-[150px] sm:max-w-[330px] text-wrap line-clamp-1">
              {user?.email}
            </span>
          </span>
          <span className="">
            <span>تراکنش ها:</span>
            <span>{user?.userCart?.length.toLocaleString("fa-Ir")} عدد</span>
          </span>
          <span className="">
            <span>نقش:</span>
            <span className="font-Shabnam_B">
              <span className=" text-mute">
                {user?.role === "ADMIN" ? "ادمین" : "کاربر عادی"}
              </span>
            </span>
          </span>
          <span className="">
            <span>تغییر سطح:</span>
            <button
              onClick={() => setIsRoleOpen(true)}
              className="text-2xl text-blue-500"
            >
              <FaEdit />
            </button>
          </span>
        </span>
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

export default SmallUserTRow;
