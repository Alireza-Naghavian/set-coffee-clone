import CompoundModal from "@/components/UI/Modal/Modal";
import { EditModalType } from "@/types/modal.type";

const EditModal = ({
  children,
  isOpen,
  modalTitle,
  setIsOpen,
  className
}: EditModalType) => {
  return (
    <div>
      <CompoundModal
        className={`md:w-[550px] w-[310px]  sm:w-[380px] h-[430px] md:h-[500px] overflow-y-auto top-[10%] bg-slate-100 ${className}`}
        isShow={isOpen}
        onClose={setIsOpen}
        effect="ease_out"
      >
        <CompoundModal.Header className=" mt-2" onClose={setIsOpen}>
          <div className="pr-4  ">
            <span className="text-lg font-Shabnam_M">{modalTitle}</span>
          </div>
        </CompoundModal.Header>
        <CompoundModal.Body>{children}</CompoundModal.Body>
      </CompoundModal>
    </div>
  );
};

export default EditModal;
