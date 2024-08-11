import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import CompoundModal from "@/components/UI/Modal/Modal";
import Select from "@/components/Utils-components/Select/Select";
import useChangeRole from "@/hooks/authHooks/useChangeRole";
import useGetMe from "@/hooks/authHooks/useGetMe";
import { UserRoleType } from "@/types/auth.type";
import { roleOptions } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
type RoleModalType ={
    user:UserRoleType,
    isRoleOpen:boolean,
    setIsRoleOpen:()=>void
}
function EditRoleModal({ isRoleOpen, setIsRoleOpen, user }:RoleModalType) {
    const {replace} = useRouter();
    const {user:userData} = useGetMe();
    useEffect(()=>{
        if(userData?.role === "USER") replace("/")
    },[user?.role,replace])
  const [role, setRole] = useState<string>(user.role);
  const {isRoleUpdate,updateRole} = useChangeRole()
  const roleHandler =async( e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(role);
try {
    await updateRole({userId:user?._id,data:{role}},{
        onSuccess:(data:any)=>{
            toast.success(data.message)
            setIsRoleOpen();
        },
        onError:(err:any)=>{
            setIsRoleOpen();
            toast.error(err?.response?.data?.message)
        }
    })
} catch (error:any) {
    console.log(error?.response?.data?.message);
}
  }
  return (
    <CompoundModal
      effect="ease_out"
      isShow={isRoleOpen}
      onClose={setIsRoleOpen}
      className="md:w-[550px] w-[310px]  sm:w-[380px]  
                overflow-y-auto top-[40%] bg-slate-100"
    >
      <CompoundModal.Header className=" mt-2" onClose={setIsRoleOpen}>
        <div className="pr-4  ">
          <span className="text-lg font-Shabnam_M">تغییر سطح کاربر</span>
        </div>
      </CompoundModal.Header>
      <CompoundModal.Body>
        <form
        onSubmit={roleHandler}
          className="flex flex-col gap-y-4 
                    justify-center px-6 my-4"
        >
          <Select
          className="bg-gray-100 shadow-sm appearance-auto text-sm  
             focus:outline-none px-2 py-2 rounded-md"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            selectTitle="سطح کاربر:"
            options={roleOptions}
          />
          <MainBtn type="submit" variant="roundedPrimary">
            {isRoleUpdate ? <Loader loadingCondition={isRoleUpdate}/>:"اعمال"}
          </MainBtn>
        </form>
      </CompoundModal.Body>
    </CompoundModal>
  );
}

export default EditRoleModal;
