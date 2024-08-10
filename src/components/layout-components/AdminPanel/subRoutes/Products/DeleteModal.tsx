import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import CompoundModal from "@/components/UI/Modal/Modal";
import useRemoveProduct from "@/hooks/product/useRemoveProduct";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type DeleteModalType = {
  isDeleteOpen: boolean;
  setIsDeleteOpen: () => void;
  productId :string|undefined
};
function DeleteModal({ isDeleteOpen, setIsDeleteOpen,productId }: DeleteModalType) {
    const { refresh } = useRouter();
    const { isRemoveLoading, removeProduct } = useRemoveProduct();
    const removeHandler = (productId: string) => {
      removeProduct(productId, {
        onSuccess: (data: any) => {
          toast.success(data.message);
          setIsDeleteOpen()
          refresh();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message);
        },
      });
    };
  return (
    <div className="">
      <CompoundModal
        className="w-[500px] top-[30%] bg-slate-100 "
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
              آیا از حذف محصول اطمینان دارید؟
            </p>
            <div className="flex items-center gap-x-5 pb-4 pl-2 justify-end w-full">
              <MainBtn
              onClick={()=>setIsDeleteOpen()}
                size="small"
                variant="roundedSecondary"
                className="w-[100px] ">
                    لغو
              </MainBtn>
              <MainBtn
                size="small"
                variant="roundedPrimary"
                className="w-[100px] bg-red-500 hover:bg-red-600"
                onClick={()=>{
                    if(productId === undefined) return
                    removeHandler(productId)
                }}  
              >
         {isRemoveLoading ? <Loader loadingCondition={isRemoveLoading}/> : "حذف"}
              </MainBtn>
            </div>
          </div>
        </CompoundModal.Body>
      </CompoundModal>
    </div>
  );
}

export default DeleteModal;
