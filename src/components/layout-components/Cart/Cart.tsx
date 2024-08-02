"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import useGetBasketData from "@/hooks/helper-hooks/useGetBasketData";
import { useForm } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductTable from "./ProductTable/ProductTable";
import TotalPriceSection from "./TotalPriceSection/TotalPriceSection";
import Loader from "@/components/UI/loader/Loader";

function Cart() {
  const { register, handleSubmit, formState = { Error } } = useForm();
  const { userBasket, basketLoading } = useGetBasketData();
  if (basketLoading)
    return (
      <div className="flex-center gap-y-4 gap-x-4 mt-10 w-full h-full">
        <Loader loadingCondition={basketLoading} height="h-[55px]" width=""  />
        <span className="text-xl font-Shabnam_B">درحال بارگزاری ...</span>
      </div>
    );
  if (userBasket?.length === 0)
    return (
      <EmptyResult
        icon={<AiOutlineShoppingCart size={120} />}
        title={"سبد خرید شما خالی است."}
        firstDesc={
          "قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید."
        }
        secondDesc={"در صفحه فروشگاه محصولات جالبی خواهید یافت."}
      />
    );
  return (
    <div className="px-4 sm:px-12 mt-10 mx-auto w-full relative flex-center lg:flex-row flex-col gap-x-8 ">
      <div className="lg:w-[70%] w-full flex flex-col">
        <ProductTable userBasket={userBasket} />
        <div className="pt-5 flex lg:justify-between lg:flex-row gap-y-4 flex-col md:mr-8 lg:items-center">
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
        </div>
      </div>
      <div className="lg:w-[30%] w-full xl:h-[540px] lg:mt-0 mt-10 flex flex-col justify-start shadow-md border-2 rounded-md border-mute/55">
        <TotalPriceSection userBasket={userBasket}/>
      </div>
    </div>
  );
}

export default Cart;
