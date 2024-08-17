import { useAlert } from "@/app/context/AlertContext";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import useUpdateProduct from "@/hooks/product/useUpdateProduct";
import { SingleProductType } from "@/types/models/categories.type";
import { UpdateProductField } from "@/types/products.type";
import { convertToEnglishDigits } from "@/utils/convertors/ToEnDigits";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ProductEntityCounter from "./ProductEntityCounter";
type EditModlaType = {
  product: SingleProductType;
  setIsOpen: () => void;
};
function EditProductForm({ product, setIsOpen }: EditModlaType) {
  const {
    register,
    handleSubmit,

    formState: { errors, isValid, dirtyFields },
  } = useForm<UpdateProductField>({
    defaultValues: {
      price: String(product.price),
      title: product.title,
      shortDesc: product.shortDesc,
      smell: product.smell,
      weight: String(product.weight),
      suitableFor: product.suitableFor,
    },
    mode: "onChange",
  });
  const [counter, setCounter] = useState(product.entities);
  const { refresh } = useRouter();
  const {showAlert} = useAlert();
  const queryClient = useQueryClient();
  const { isProdUpdating, updateProduct } = useUpdateProduct();
  const updateHandler = async (data: UpdateProductField) => {
    const { price, shortDesc, smell, suitableFor, title, weight } = data;
    const ToEndPrice = convertToEnglishDigits(price);
    const ToEndWeight = convertToEnglishDigits(weight);
    const ProductData = {
      entities: counter,
      shortDesc,
      smell,
      suitableFor,
      title,
      weight: ToEndWeight,
      price: ToEndPrice,
    };
    try {
      if (product._id === undefined) return;
      await updateProduct(
        { productId: product._id, data: ProductData },
        {
          onSuccess: (data: any) => {
           

             showAlert("success",data.message)
            setIsOpen();
            queryClient.invalidateQueries({
              queryKey: ["product", product._id],
            });
            refresh();
          },
          onError: (err: any) => {
            setIsOpen();
           
             showAlert("error",err?.response?.data?.message)
          },
        }
      );
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateHandler)}
      className="flex flex-col gap-y-4 justify-center px-6 my-4"
    >
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
          {isProdUpdating ? (
            <Loader loadingCondition={isProdUpdating} />
          ) : (
            "ویرایش"
          )}
        </MainBtn>
      </div>
    </form>
  );
}

export default EditProductForm;
