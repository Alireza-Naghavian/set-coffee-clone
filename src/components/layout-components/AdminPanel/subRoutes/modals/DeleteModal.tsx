import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import CompoundModal from "@/components/UI/Modal/Modal";
import { DeleteModalType } from "@/types/modal.type";
import React from "react";

function DeleteModal({
  isDeleteOpen,
  removeHandler,
  setIsDeleteOpen,
  subjectTitle,
  identifier,
  isLoading
}: DeleteModalType) {
  return (
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
            آیا از حذف {subjectTitle} اطمینان دارید؟
          </p>
          <div className="flex items-center gap-x-5 pb-4 pl-2 justify-end w-full">
            <MainBtn
              onClick={() => setIsDeleteOpen()}
              size="small"
              variant="roundedSecondary"
              className="!w-[100px] "
            >
              لغو
            </MainBtn>
            <MainBtn
              size="small"
              variant="roundedPrimary"
              className="!w-[100px] bg-red-500 hover:bg-red-600"
              onClick={() => {
                if (identifier === undefined) return;
                removeHandler(identifier);
              }}
            >
              {isLoading ? (
                <Loader loadingCondition={isLoading} />
              ) : (
                "حذف"
              )}
            </MainBtn>
          </div>
        </div>
      </CompoundModal.Body>
    </CompoundModal>
  );
}

export default DeleteModal;
