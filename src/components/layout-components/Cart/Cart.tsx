"use client";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import { useForm } from "react-hook-form";
import ProductTable from "./ProductTable/ProductTable";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import TotalPriceSection from "./TotalPriceSection/TotalPriceSection";

function Cart() {
  const { register, handleSubmit, formState = { Error } } = useForm();
  return (
    <div className="px-4 sm:px-12 mt-10 mx-auto w-full relative flex-center lg:flex-row flex-col gap-x-8 ">
      <div className="lg:w-[70%] w-full flex flex-col">
        <ProductTable />
        <div className="lg:mt-16 flex lg:justify-between lg:flex-row gap-y-4 flex-col lg:items-center">
          <form className="flex w-full child:w-full lg:w-auto gap-y-2 sm:flex-row flex-col justify-between gap-x-2 items-center">
            <MainTextField
              variant="outLine"
              placeHolder="کد تخفیف را وارد کنید..."
              required={false}
              type="text"
              name="offerCode"
              id="offerCode"
              register={register}
              className="sm:w-[340px] lg:mb-1.5"
              errors={Error}
            />
            <MainBtn className="px-8 mt-2 lg:mt-0" size="small">
              اعمال کد
            </MainBtn>
          </form>
          <div className="flex items-center mt-1.5 lg:mt-0">
            <MainBtn className="bg-gray-500 hover:bg-gray-800 ">
              آپدیت سبد خرید
            </MainBtn>
          </div>
        </div>
      </div>
      <div className="lg:w-[30%] w-full xl:h-[540px] lg:mt-0 mt-10 flex flex-col justify-start shadow-md border-2 rounded-md border-mute/55">
        <TotalPriceSection/>
      </div>
    </div>
  );
}

export default Cart;
