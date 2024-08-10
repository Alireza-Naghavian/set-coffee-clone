import CompoundModal from "@/components/UI/Modal/Modal";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import { SingleProductType } from "@/types/models/categories.type";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProductEntityCounter from "./ProductEntityCounter";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import MainBtn from "@/components/UI/Buttons/MainBtn";
type EditModlaType = {
  product: SingleProductType;
  isEditOpen: boolean;
  setIsEditOpen: () => void;
};
function EditProdModal({ product, isEditOpen, setIsEditOpen }: EditModlaType) {
  const {
    register,
    handleSubmit,

    formState: { errors,isValid,dirtyFields },
  } = useForm({
    
    defaultValues: {
      price: product.price,
      title: product.title,
      shortDesc: product.shortDesc,
      smell: product.smell,
      weight: product.weight,
      suitableFor: product.suitableFor,
    },
    mode:"onChange"
  });
  const [counter, setCounter] = useState(product.entities);
  return (
    <div>
      <CompoundModal
        className="md:w-[550px] w-[310px]  sm:w-[380px] h-[430px] md:h-[500px] overflow-y-auto top-[15%] bg-slate-100 "
        isShow={isEditOpen}
        onClose={setIsEditOpen}
        effect="ease_out"
      >
        <CompoundModal.Header className=" mt-2" onClose={setIsEditOpen}>
          <div className="pr-4  ">
            <span className="text-lg font-Shabnam_M">ویرایش محصول</span>
          </div>
        </CompoundModal.Header>
        <CompoundModal.Body>
          <form className="flex flex-col gap-y-4 justify-center px-6 my-4">
            <MainTextField
              register={register}
              errors={errors}
              type="text"
              label="عنوان محصول"
              variant="outLine"
              id="title"
              name="title"
              validattionschema={{
                minLength: {
                  value: 3,
                  message: "حداقل ۳ کاراکتر",
                },
                maxLength: {
                  value: 200,
                  message: "حداکثر ۲۰۰ کاراکتر",
                },
                required: {
                  value: true,
                  message: "این فیلد الزامی است",
                },
              }}
            />
            <MainTextField
              register={register}
              errors={errors}
              type="text"
              label="قیمت محصول"
              variant="outLine"
              id="price"
              name="price"
              validattionschema={{
                required: {
                  value: true,
                  message: "این فیلد الزامی است",
                },
              }}
            />
            <div className="">
              <ProductEntityCounter counter={counter} setCounter={setCounter} />
            </div>
            <MainTextField
              register={register}
              name="smell"
              id="smell"
              label="رایحه محصول"
              variant="borderFill"
              type="text"
              errors={errors}
              className="border-main_brown  "
              labelVariant="boldSize"
              validattionschema={{
                required: {
                  value: true,
                  message: "این فیلد الزامی است",
                },
                minLength: {
                  value: 3,
                  message: "حداقل ۳ کاراکتر",
                },
              }}
            />
            <MainTextField
              register={register}
              name="weight"
              id="weight"
              label="وزن محصول"
              variant="borderFill"
              type="text"
              errors={errors}
              className="border-main_brown w-full"
              validattionschema={{
                required: {
                  value: true,
                  message: "این فیلد الزامی است",
                },
              }}
            />
            <MainTextField
              register={register}
              name="suitableFor"
              id="suitableFor"
              label="مناسب برای"
              variant="borderFill"
              type="text"
              validattionschema={{
                required: {
                  value: true,
                  message: "این فیلد الزامی است",
                },
                minLength: {
                  value: 3,
                  message: "حداقل ۳ کاراکتر",
                },
              }}
              errors={errors}
              className="border-main_brown w-full"
            />
            <TextAriaField
              name="shortDesc"
              id="shortDesc"
              label="توضیحات کوتاه"
              variant="borderFill"
              register={register}
              validattionschema={{
                minLength: {
                  value: 10,
                  message: "حداقل ۱۰ کاراکتر",
                },
              }}
              errors={errors}
              className="border-main_brown w-full"
              type="text"
            />
            <div className="mt-4">
              <MainBtn
                disabled={!isValid || !Object.keys(dirtyFields).length}
                className={`${
                  !isValid || !Object.keys(dirtyFields).length
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                type="submit"
              >
                ویرایش
              </MainBtn>
            </div>
          </form>
        </CompoundModal.Body>
      </CompoundModal>
    </div>
  );
}

export default EditProdModal;
