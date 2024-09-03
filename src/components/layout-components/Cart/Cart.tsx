"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import Loader from "@/components/UI/loader/Loader";
import MainTextField from "@/components/UI/TextFiels/MainTextField";
import useApplyOfferCode from "@/hooks/offers/useApplyOfferCode";
import useGetBasketData from "@/hooks/orders/useGetBasketData";
import useUpdateUserBasket from "@/hooks/orders/useUpdateUserBasket";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductTable from "./ProductTable/ProductTable";
import TotalPriceSection from "./TotalPriceSection/TotalPriceSection";
type dataType = {
  code: string;
};
function Cart() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<dataType>();

  const { userBasket, basketLoading } = useGetBasketData();
  const [lockCounter, setLockCounter] = useState(false);
  const { updateBasketPrice } = useUpdateUserBasket();
  const { applyCode, isApplying } = useApplyOfferCode();

  const offerHandler = async (data: dataType) => {
    try {
      await applyCode(
        { code: data.code },
        {
          onSuccess: async (data) => {
            await updateBasketPrice({
              value: "setCoffeeBasket",
              offerPercent: data.data.percent,
            });
            reset();
            setLockCounter(true);
          },
        }
      );
    } catch (error) {
      return null
    }
  };
  if (basketLoading)
    return (
      <div className="flex-center gap-y-4 gap-x-4 mt-10 w-full h-full">
        <Loader loadingCondition={basketLoading} height="h-[55px]" width="" />
        <span className="text-xl font-Shabnam_B">درحال بارگزاری ...</span>
      </div>
    );
  if (!userBasket || userBasket?.length === 0 )
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
  if (userBasket !== undefined)
    return (
      <div className="px-4 sm:px-12 mt-10 mx-auto w-full relative flex-center lg:flex-row flex-col gap-x-8 ">
        <div className="lg:w-[70%] w-full flex flex-col">
          <ProductTable userBasket={userBasket} lockCounter={lockCounter} />
          <div className="pt-5 flex lg:justify-between lg:flex-row gap-y-4 flex-col md:mr-8 lg:items-center">
            <form
              onSubmit={handleSubmit(offerHandler)}
              className="flex w-full child:w-full lg:w-auto gap-y-2 sm:flex-row flex-col justify-between gap-x-2 items-center"
            >
              <MainTextField
                variant="outLine"
                placeHolder="کد تخفیف را وارد کنید..."
                required={false}
                type="text"
                name="code"
                id="code"
                register={register}
                className="sm:w-[340px] lg:mb-1.5"
                errors={errors}
                validattionschema={{
                  required: {
                    value: true,
                    message: "این فیلد نمیتواند خالی باشد",
                  },
                }}
              />
              <MainBtn
                disabled={!isValid || !Object.keys(dirtyFields).length}
                className={`px-8 mt-2 lg:mt-0
            ${
              !isValid || !Object.keys(dirtyFields).length
                ? "opacity-50"
                : "opacity-100"
            }`}
                size="small"
              >
                {isApplying ? (
                  <Loader loadingCondition={isApplying} />
                ) : (
                  "اعمال کد"
                )}
              </MainBtn>
            </form>
          </div>
        </div>
        <div className="lg:w-[30%] w-full xl:h-[540px] lg:mt-0 mt-10 flex flex-col justify-start shadow-md border-2 rounded-md border-mute/55">
          <TotalPriceSection userBasket={userBasket} />
        </div>
      </div>
    );
}

export default Cart;
