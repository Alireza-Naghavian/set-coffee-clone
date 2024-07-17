import Badge from "@/components/UI/badge/Badge";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import useScrollLocker from "@/hooks/helper-hooks/useScrollLocker";
import { MdOutlineDone } from "react-icons/md";
import {
  BasedPriceType,
  BasedRateStartType,
  FilteredCategoryType,
} from "@/types/Filter.type";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
function FilteredCategory({
  isFilterOpen,
  setIsFilterOpen,
  filtersEntity,
  setMinPrice,
  setMaxPrice,
  setStars,
}: FilteredCategoryType) {
  useScrollLocker(isFilterOpen);
  const navigate = useRouter();
  const location = useSearchParams();
  const newParams = new URLSearchParams(location);
  const applyFilters = (): void => {
    newParams.set("minPrice", filtersEntity?.minPrice?.toString());
    newParams.set("maxPrice", filtersEntity?.maxPrice?.toString());
    navigate.replace(`?${newParams.toString()}`, { scroll: false });
    setIsFilterOpen(false);
  };
  return (
    <>
      <div
        className={` md:max-w-[500px] md:w-[500px]  max-h-max  
         relative hidden  md:flex flex-col px-4 justify-start  bg-white `}
      >
        <div
          className={`lg:sticky lg:top-12  my-8  child:border-b-2 last:border-none `}
        >
          <BasedPrice
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            filtersEntity={filtersEntity}
            applyFilters={applyFilters}
          />
          <BasedRateStart
          newParams={newParams}
          navigate={navigate}
            setStars={setStars}
          />
        </div>
      </div>
      <div
        className={`lg:hidden  child:px-4 overflow-hidden w-full  h-full
         overflow-y-auto  transition-all  fixed right-0 top-0 !z-[99999] tr-400
          bg-white ${
            isFilterOpen ? "translate-x-[0rem]" : "translate-x-[-100rem]"
          }`}
      >
        <div
          className="flex gap-x-1 items-center   w-fit mr-auto child:text-lg  p-4   cursor-pointer "
          onClick={() => setIsFilterOpen(false)}
        >
          <span className="font-Shabnam_M">بستن</span>
          <IoIosClose size={22} />
        </div>

        <BasedPrice
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          filtersEntity={filtersEntity}
          applyFilters={applyFilters}
        />
        <BasedRateStart
          newParams={newParams}
          navigate={navigate}
          setStars={setStars}
        />

        <div className="my-8 flex flex-col gap-y-2">
          <MainBtn
            onClick={() => {
              applyFilters();
              setIsFilterOpen(false);
            }}
            className=""
          >
            اعمال
          </MainBtn>
          <MainBtn
            onClick={() => {
              navigate.replace("/categories");
              setIsFilterOpen(false);
            }}
            className="!bg-gray-600 hover:!bg-gray-700"
          >
            حذف فیلتر ها
          </MainBtn>
          <MainBtn
            onClick={() => setIsFilterOpen(false)}
            className="bg-rose-800"
          >
            بستن
          </MainBtn>
        </div>
      </div>
    </>
  );
}

const BasedPrice = ({
  filtersEntity,
  applyFilters,
  setMinPrice,
  setMaxPrice,
}: BasedPriceType) => {
  const handleChange = (newValue: any) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
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
            min={0}
            max={10_000_000}
            defaultValue={[0, 10_000]}
            value={[filtersEntity?.minPrice, filtersEntity?.maxPrice]}
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
          <div
            className="flex flex-col gap-x-1 items-start mt-2 justify-center gap-y-4
               child:text-dark_shade child:font-Shabnam_M"
          >
            <div className="">
              <span>قیمت: </span>
              <span>
                {filtersEntity?.minPrice?.toLocaleString("fa-Ir")} تومان
              </span>
              <span>-</span>
              <span>
                {filtersEntity?.maxPrice?.toLocaleString("fa-Ir")} تومان
              </span>
            </div>
            <div className="self-end">
              <button
                onClick={() => applyFilters()}
                className="mr-auto text-dark_shade bg-gray-200 py-1 px-2 tr-200 hover:bg-gray-300"
              >
                فیلتر
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BasedRateStart = ({newParams,navigate }: BasedRateStartType) => {
  const [select,setSelect] = useState<number>()
  return (
    <div className="flex flex-col gap-y-2  pt-2">
      <div
        className="pt-2 child:font-Shabnam_B
       child:text-dark_shade"
      >
        <p> انتخاب بر اساس امتیاز :</p>
      </div>
      <div className="flex flex-col child:cursor-pointer gap-y-4 py-2">
        {[5, 4, 3, 2, 1].map((stars) => {
          return (
            <div
              key={stars}
              className="flex w-full items-center group"
              onClick={() => {
                setSelect(stars)
                newParams?.set("rateStar",stars.toString())
                navigate.replace(`?${newParams?.toString()}`,{scroll:false})
              }}
            >
              {Array.from({ length: stars }).map((_, index) => (
                <FaStar key={index} className="text-goldColor" />
              ))}
              {Array.from({ length: 5 - stars }).map((_, index) => (
                <FaRegStar key={index} className="" />
              ))}
              <div className="mr-auto">
                <Badge additionalClass="">
                  <FaPlus  className={`rounded-xl text-xl ${stars == select ? "hidden" : "block"}`} />
                  <MdOutlineDone  className={`rounded-xl text-xl ${stars == select ? "block" : "hidden"}`}/>
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FilteredCategory;
