import Slider from "rc-slider";
import React, { useState } from "react";
import "rc-slider/assets/index.css";
import Badge from "@/components/UI/badge/Badge";
import { FaRegStar, FaStar } from "react-icons/fa";
import { SetState } from "@/types/global.type";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import { IoIosClose } from "react-icons/io";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
type FilteredCategoryType = {
  isFilterOpen:boolean,
  setIsFilterOpen:SetState<boolean>
}
function FilteredCategory({isFilterOpen,setIsFilterOpen}:FilteredCategoryType) {
  useScrollLocker(isFilterOpen)
  return (
    <>
    <div className={` md:max-w-[500px] md:w-[500px]  max-h-max  
                       relative hidden  md:flex flex-col px-4 justify-start  bg-white `}>
      <div className={`lg:sticky lg:top-12  my-8  child:border-b-2 last:border-none `}>
        <BasedPrice />
        <BasedWeight />
        <BasedRateStart />
      </div>
    </div>
      <div className={`lg:hidden  child:px-4 overflow-hidden w-full  h-full
         overflow-y-auto  transition-all  fixed right-0 top-0 !z-[99999] tr-400
          bg-white ${isFilterOpen ? "translate-x-[0rem]" : "translate-x-[-100rem]"}`}>
         <div
          className="flex gap-x-1 items-center   w-fit mr-auto child:text-lg  p-4   cursor-pointer "
          onClick={() => setIsFilterOpen(false)}
        >
          <span className="font-Shabnam_M">بستن</span>
          <IoIosClose size={22} />
        </div>
        <BasedPrice />
        <BasedWeight />
        <BasedRateStart />
      <div className="my-8 flex flex-col gap-y-2">
      <MainBtn onClick={()=>setIsFilterOpen(false)} className="">اعمال</MainBtn>
      <MainBtn onClick={()=>setIsFilterOpen(false)} className="bg-rose-800">بستن</MainBtn>
      </div>
      </div>
     </>
  );
}

const BasedPrice = () => {
  const minValue = 256_000;
  const maxValue = 1_256_000;

  const [priceValue, setValue] = useState([minValue, maxValue]);
  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="flex flex-col pb-4">
        <div
          className=" w-full py-2 ml-auto 
                  child:font-Shabnam_M child:text-dark_shade"
        >
          <p>فیلتر بر اساس قیمت:</p>
        </div>
        <div className="py-2 flex flex-col gap-y-4">
          <Slider
            range
            min={minValue}
            max={maxValue - 10}
            defaultValue={[minValue, maxValue]}
            value={priceValue}
            step={1}
            activeDotStyle={{ outline: "0px", backgroundColor: "transparent" }}
            onChange={handleChange}
            styles={{
              handle: {
                backgroundColor: "black",
                border: "black",
                boxShadow: "unset",
                borderRadius: "0px",
                display: "flex",
                width: "4px",
                height: "20px",
              },
              rail: { backgroundColor: "transparent" },
              track: { backgroundColor: "black" },
            }}
          />
          <p
            className="flex gap-x-1 items-center mt-2 justify-start
               child:text-dark_shade child:font-Shabnam_M"
          >
            <span>قیمت: </span>
            <span>{priceValue[0].toLocaleString("fa-Ir")} تومان</span>
            <span>-</span>
            <span>{priceValue[1].toLocaleString("fa-Ir")} تومان</span>
            <button className="mr-auto text-dark_shade bg-gray-200 py-1 px-2 tr-200 hover:bg-gray-300">
              فیلتر
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

const BasedWeight = () => {
  return (
    <div className="flex flex-col gap-y-2  pt-2">
      <div
        className="pt-2 child:font-Shabnam_B
   child:text-dark_shade"
      >
        <p> فیلتر بر اساس وزن :</p>
      </div>
      <div className="">
        <ul
          className="space-y-4 py-2 w-full child:w-full child:flex
                child:cursor-pointer child:items-center child:justify-between"
        >
          <li className="group">
            <span>تا ۲۵۰ گرم</span>
            <span>
              <Badge content={24} />
            </span>
          </li>

          <li className="group">
            <span>۵۰۰ گرم تا ۱ کیلو گرم</span>
            <span>
              <Badge content={12} />
            </span>
          </li>

          <li className="group">
            <span>۱ کیلو به بالا (سازمانی)</span>
            <span>
              <Badge content={7} />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const BasedRateStart = () => {
  return (
    <div className="flex flex-col gap-y-2  pt-2">
      <div
        className="pt-2 child:font-Shabnam_B
       child:text-dark_shade"
      >
        <p> انتخاب بر اساس امتیاز :</p>
      </div>
      <div className="flex flex-col child:cursor-pointer gap-y-4 py-2">
        <div className="flex  w-full items-center  group  ">
          {Array.from({ length: 5 }).map((_, index) => {
            return <FaStar key={index} className="text-goldColor" />;
          })}
          <div className="mr-auto">
            <Badge content={12} />
          </div>
        </div>
        <div className="flex  w-full items-center  group  ">
          {Array.from({ length: 4 }).map((_, index) => {
            return <FaStar key={index} className="text-goldColor" />;
          })}
          {Array.from({ length: 1 }).map((_, index) => {
            return <FaRegStar key={index} className="" />;
          })}
          <div className="mr-auto">
            <Badge content={12} />
          </div>
        </div>
        <div className="flex  w-full items-center  group  ">
          {Array.from({ length: 3 }).map((_, index) => {
            return <FaStar key={index} className="text-goldColor" />;
          })}
          {Array.from({ length: 2 }).map((_, index) => {
            return <FaRegStar key={index} className="" />;
          })}
          <div className="mr-auto">
            <Badge content={12} />
          </div>
        </div>
        <div className="flex  w-full items-center  group  ">
          {Array.from({ length: 2 }).map((_, index) => {
            return <FaStar key={index} className="text-goldColor" />;
          })}
          {Array.from({ length: 3 }).map((_, index) => {
            return <FaRegStar key={index} className="" />;
          })}
          <div className="mr-auto">
            <Badge content={12} />
          </div>
        </div>
        <div className="flex  w-full items-center  group  ">
          {Array.from({ length: 1 }).map((_, index) => {
            return <FaStar key={index} className="text-goldColor" />;
          })}
          {Array.from({ length: 4 }).map((_, index) => {
            return <FaRegStar key={index} className="" />;
          })}
          <div className="mr-auto">
            <Badge content={12} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilteredCategory;
