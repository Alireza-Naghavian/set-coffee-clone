import MainBtn from "@/components/UI/Buttons/MainBtn";
import MiniProductCard from "@/components/UI/Cards/MiniProductCard";
import React from "react";
import { IoIosClose } from "react-icons/io";
export type SideBarBasketType = {
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function SideBarBasket({ setIsCartOpen }: SideBarBasketType) {
  return (
    <div className="relative z-50 h-full flex flex-col justify-between ">
      <div
        className="h-[68px] max-h-[70px]  bg-white 
                  flex-between-center py-5 px-[15px] text-main text-lg border-b shadow-sm font-Shabnam_B"
      >
        <span>سبد خرید</span>
        <div
          className="flex gap-x-1 items-center cursor-pointer"
          onClick={() => setIsCartOpen(false)}
        >
          <span>بستن</span>
          <IoIosClose size={22} />
        </div>
      </div>
      <div className=" h-full overflow-y-auto relative">
        <ul className="h-full py-3 sm:px-6 ">
          <MiniProductCard
            rate={1750}
            price={194500}
            title=" پودر قهوه ترک ویژه عربیکا ۷۰ درصد مقدار ۲۵۰ گرم"
            cover="/images/sample.jpeg"
          />
        </ul>
      </div>
      <div className="flex flex-col h-[160px] justify-between  px-4 py-2 bg-white border-t shadow-sm">
        <h5 className="font-Shabnam_B text-lg">جمع کل سبد خرید :</h5>
        <p className="font-Shabnam_B text-lg text-left pb-2">1,295,500 تومان</p>
        <div className="w-full">
          <MainBtn size="medium" variant="primary">
            مشاهده سبد خرید
          </MainBtn>
        </div>
      </div>
    </div>
  );
}

export default SideBarBasket;
