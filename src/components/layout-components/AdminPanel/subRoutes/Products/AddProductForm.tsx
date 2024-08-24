import MainBtn from "@/components/UI/Buttons/MainBtn";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import TextAriaField from "@/components/UI/TextFiels/TextAriaField";
import Select from "@/components/Utils-components/Select/Select";
import TextEditor from "@/components/Utils-components/TextEditor/TextEditor";
import useAddNewProduct from "@/hooks/product/useAddNewProduct";
import useGetAllCat from "@/hooks/product/useGetAllCat";
import { ProductFiledValues } from "@/types/products.type";
import { convertToEnglishDigits } from "@/utils/convertors/ToEnDigits";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ProductEntityCounter from "./ProductEntityCounter";
import Loader from "@/components/UI/loader/Loader";
type CategoryType = {
  _id: string;
  title: string;
  productCount: number;
};
function AddProductForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ProductFiledValues>({ mode: "onChange" });
  const { categories, isCatLoading } = useGetAllCat();
  const [counter, setCounter] = useState(1);
  const { addProduct, isAddLoading } = useAddNewProduct();
  const optionValues = categories?.data?.map((category: CategoryType) => {
    return { label: category.title, value: category._id };
  });
  const [catId, setCatId] = useState(
    "667fed928adb606b5273c86b" || optionValues[1].value
  );
  const [longDesc, setLongDesc] = useState<string>("");
  const addProductHanlder = async (data: ProductFiledValues) => {
    const { price, weight } = data;
    const toValidPriceNumb = Number(convertToEnglishDigits(String(price)));
    const toValidWeight = Number(convertToEnglishDigits(String(weight)));
    const prodData = {
      title: data.title,
      price: toValidPriceNumb,
      shortDesc: data.shortDesc,
      weight: toValidWeight,
      suitableFor: data.suitableFor,
      smell: data.smell,
      cover: data.cover,
      tags: data.tags,
      category: catId,
      longDesc,
      entities: counter,
    };
    console.log(prodData);

    await addProduct(prodData, {
      onSuccess: () => {
        setLongDesc("");
        setCounter(1);
        reset();
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(addProductHanlder)}
      className=" w-full space-y-4  py-10 px-2  lg:h-[480px]  overflow-y-auto"
    >
      <div className="grid sm:grid-cols-2 w-full sm:gap-y-0 gap-y-4 gap-x-6 ">
        <MainTextField
          register={register}
          name="title"
          id="title"
          label="عنوان محصول"
          variant="borderFill"
          type="text"
          errors={errors}
          className="border-main_brown"
          labelVariant="boldSize"
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
        <div className="w-full flex xs:flex-col sm:flex-row xs:gap-y-4 sm:items-center sm:gap-x-16 ">
          <MainTextField
            register={register}
            name="price"
            id="price"
            label="قیمت محصول"
            variant="borderFill"
            type="text"
            errors={errors}
            className="border-main_brown !w-full lg:w-[340px] "
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
        </div>
      </div>
      <div className="grid sm:grid-cols-2 w-full sm:gap-y-0 gap-y-4 gap-x-6 ">
        <MainTextField
          register={register}
          name="cover"
          id="cover"
          label="کاور محصول"
          variant="borderFill"
          type="url"
          validattionschema={{
            required: {
              value: true,
              message: "این فیلد الزامی است",
            },
          }}
          placeHolder="لطفا url عکس مورد نظر را وارد کنید"
          errors={errors}
          className="border-main_brown"
        />
        <Select
          className="border-2 py-2 bg-transparent font-Shabnam_B border-main_brown"
          onChange={(e) => setCatId(e.target.value)}
          value={catId}
          selectTitle="دسته بندی"
          options={isCatLoading ? [] : optionValues}
        />
      </div>
      <div className="w-full">
        <TextAriaField
          name="shortDesc"
          id="shortDesc"
          label="توضیحات کوتاه"
          variant="borderFill"
          register={register}
          validattionschema={{
            required: {
              value: true,
              message: "این فیلد الزامی است",
            },
            minLength: {
              value: 10,
              message: "حداقل ۱۰ کاراکتر",
            },
          }}
          errors={errors}
          className="border-main_brown w-full"
          type="text"
        />
      </div>
      <div className="grid sm:grid-cols-2 w-full sm:gap-y-0 gap-y-4 gap-x-6 ">
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
      </div>
      <div className="grid sm:grid-cols-2 w-full sm:gap-y-0 gap-y-4 gap-x-6 ">
        <MainTextField
          register={register}
          name="tags"
          id="tags"
          label="برچسب ها"
          variant="borderFill"
          type="text"
          validattionschema={{
            max: {
              value: 8,
              message: "حداکثر ۱۰ تگ کافی است",
            },
            required: {
              value: true,
              message: "این فیلد الزامی است",
            },
          }}
          placeHolder='برای  جداکردن تگ از ","استفاده کنید'
          errors={errors}
          className="border-main_brown  "
          labelVariant="boldSize"
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
      </div>
      <div className="mt-10 ">
        <TextEditor
          label="توضیحات کامل"
          setEditorContent={setLongDesc}
          editorContent={longDesc}
        />
      </div>
      <div className="max-w-[150px] mr-auto">
        <MainBtn
          disabled={!isValid || !Object.keys(dirtyFields).length}
          type="submit"
          size="medium"
          className={`${
            !isValid || !Object.keys(dirtyFields).length
              ? "opacity-50"
              : "opacity-100"
          }`}
        >
          {isAddLoading ? <Loader loadingCondition={isAddLoading} /> : "افزودن"}
        </MainBtn>
      </div>
    </form>
  );
}

export default AddProductForm;
