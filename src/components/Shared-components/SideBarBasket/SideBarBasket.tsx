import MainBtn from "@/components/UI/Buttons/MainBtn";
import MiniProductCard from "@/components/UI/Cards/MiniProductCard";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import Loader from "@/components/UI/loader/Loader";
import { ProductCartType } from "@/types/products.type";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
export const dynamic = "force-dynamic";
export type SideBarBasketType = {
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getCart?: ProductCartType[];
  isOpen?: boolean;
  basketLoading?: boolean;
};
function SideBarBasket({
  setIsCartOpen,
  getCart,
  basketLoading,
}: SideBarBasketType) {
  const totalprice = getCart?.reduce((acc, curr) => {
    return acc + curr.price * curr.count;
  }, 0);
  return (
    <div className="relative z-50 h-full flex flex-col justify-between ">
      <div
        className="h-[68px] max-h-[70px]  bg-white 
                  flex-between-center py-5 px-[15px] text-main text-lg border-b shadow-sm font-Shabnam_B">
        <span>سبد خرید</span>
        <div
          className="flex gap-x-1 items-center cursor-pointer"
          onClick={() => setIsCartOpen(false)}>
          <span>بستن</span>
          <IoIosClose size={28} />
        </div>
      </div>
      <div className=" h-full overflow-y-auto relative">
        <ul className="h-full  ">
          {basketLoading && <Loader loadingCondition={basketLoading} /> }
          
          {getCart === undefined || getCart?.length === 0 &&  (
          <div className="mt-8">
              <EmptyResult
              icon={<AiOutlineShoppingCart size={50} />}
              title={"سبد خرید شما خالی است."}
              firstDesc={""}
              secondDesc={""}
            />
          </div>
          )}
          {getCart?.map((data: ProductCartType, index: number) => {
            return (
              <MiniProductCard
                key={index}
                count={data.count}
                cover={data.cover}
                price={data.price}
                setIsCartOpen={setIsCartOpen}
                title={data.title}
                _id={data._id}
              />
            );
          })}
        </ul>
      </div>
      {
        getCart?.length !==0 &&
      <div className="flex flex-col h-[160px] justify-between 
       px-4 py-2 bg-white border-t shadow-sm">
        <h5 className="font-Shabnam_B text-lg">جمع کل سبد خرید :</h5>
        <p className="font-Shabnam_B text-lg text-left pb-2">
          {totalprice?.toLocaleString("fa-Ir")}تومان
        </p>
        <div className="w-full">
          <Link href={"/user-cart"}>
          <MainBtn onClick={()=>setIsCartOpen(false)} size="medium" variant="primary">
            مشاهده سبد خرید
          </MainBtn>
          </Link>
        </div>
      </div>
      }
    </div>
  );
}

export default SideBarBasket;
