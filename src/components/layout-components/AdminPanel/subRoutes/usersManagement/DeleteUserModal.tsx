import MainBtn from '@/components/UI/Buttons/MainBtn'
import Loader from '@/components/UI/loader/Loader'
import CompoundModal from '@/components/UI/Modal/Modal'
import React, { useId } from 'react'
import { DeleteModalType } from '../Products/DeleteModal'
import useRemoveUser from '@/hooks/authHooks/useRemoveUser'
import { toast } from 'react-toastify'

function DeleteUserModal({setIsDeleteOpen,isDeleteOpen,identifier}:DeleteModalType) {
    const {deleteUser,isRemoveLoading} = useRemoveUser()
  const removeHandler = async(userId:string)=>{
try {
    if(identifier === undefined) return
    await deleteUser({userId:userId},{
        onSuccess:(data:any)=>{
            toast.success(data?.message);
            setIsDeleteOpen();
        },
        onError:(err:any)=>{
            toast.error(err?.response?.data?.message)
            setIsDeleteOpen();
        }
    })
} catch (error:any) {
    console.log(error);
}
  }
    return (
    <div className="">
    <CompoundModal
      className="sm:w-[500px] w-[90vw] top-[30%] bg-slate-100 "
      effect="ease_out"
      isShow={isDeleteOpen}
      onClose={setIsDeleteOpen}
    >
      <CompoundModal.Header onClose={setIsDeleteOpen}>
        <div className=""></div>
      </CompoundModal.Header>
      <CompoundModal.Body>
        <div className="flex flex-col gap-y-2">
          <p className="text-right font-Shabnam_M  p-5">
            آیا از حذف کاربر اطمینان دارید؟
          </p>
          <div className="flex items-center gap-x-5 pb-4 pl-2 justify-end w-full">
            <MainBtn
            onClick={()=>setIsDeleteOpen()}
              size="small"
              variant="roundedSecondary"
              className="!w-[100px] ">
                  لغو
            </MainBtn>
            <MainBtn
              size="small"
              variant="roundedPrimary"
              className="!w-[100px] bg-red-500 hover:bg-red-600"
              onClick={()=>{
                  if(identifier === undefined) return
                  removeHandler(identifier)
              }}  
            >
       {isRemoveLoading ? <Loader loadingCondition={isRemoveLoading}/> : "حذف"}
            </MainBtn>
          </div>
        </div>
      </CompoundModal.Body>
    </CompoundModal>
  </div>
  )
}

export default DeleteUserModal