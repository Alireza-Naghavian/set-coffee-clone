import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import CompoundModal from "@/components/UI/Modal/Modal";
import Select from "@/components/Utils-components/Select/Select";
import { SelectModalType } from "@/types/modal.type";
import React from "react";

function SelectModal({
  isLoading,
  isOpen,
  modalTitle,
  selectHanlder,
  setIsOpen,
  subjectTitle,
  value,
  onSelectChange,
  options
}: SelectModalType) {
  return(
    <CompoundModal
    effect="ease_out"
    isShow={isOpen}
    onClose={setIsOpen}
    className="md:w-[550px] w-[310px]  sm:w-[380px]  
              overflow-y-auto top-[40%] bg-slate-100"
  >
    <CompoundModal.Header className=" mt-2" onClose={setIsOpen}>
      <div className="pr-4  ">
        <span className="text-lg font-Shabnam_M">{modalTitle}</span>
      </div>
    </CompoundModal.Header>
    <CompoundModal.Body>
      <form
      onSubmit={selectHanlder}
        className="flex flex-col gap-y-4 
                  justify-center px-6 my-4"
      >
        <Select
        className="bg-gray-100 shadow-sm appearance-auto text-sm  
           focus:outline-none px-2 py-2 rounded-md"
          onChange={onSelectChange}
          value={value}
          selectTitle={subjectTitle}
          options={options}
        />
        <MainBtn type="submit" variant="roundedPrimary">
          {isLoading ? <Loader loadingCondition={isLoading}/>:"اعمال"}
        </MainBtn>
      </form>
    </CompoundModal.Body>
  </CompoundModal>
  );
}

export default SelectModal;
