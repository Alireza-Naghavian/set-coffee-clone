"use client";
import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import Loader from "@/components/UI/loader/Loader";
import FilteredCategory from "@/components/Utils-components/FIlter/FilteredCategory";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import useGetInitialCategoryPageData from "@/hooks/product/useGetInitialCategoryPageData";
import { SingleProductType } from "@/types/models/categories.type";
import "rc-slider/assets/index.css";
import { FaSortAmountDown } from "react-icons/fa";
import { Suspense, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./MainShopPageStyle.module.css";
function MainShopPage({
  initialPageData,
}: {
  initialPageData: SingleProductType[];
}) {
  const { isProductsLoading, products } =
    useGetInitialCategoryPageData(initialPageData);
  const [iOpen, { toggle }] = useDisclosure();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  return (
    <div className="relative  child:sm:px-10 child:px-4">
      <div
        className={` ${styles.categoryWrapper} w-full relative mx-auto  
        flex-center headerWrapper  text-white flex-col pt-[50px] sm:pt-[100px] lg:pt-[215px]`}
      >
        <h1 className="text-[clamp(24px,5vw,68px)] font-Shabnam_B text-center">
          فروشگاه
        </h1>
        <span
          className="cursor-pointer flex md:hidden gap-x-2 items-center tracking-tighter  py-4"
          onClick={() => toggle()}
        >
          <span>دسته بندی</span>
          <FaChevronDown
            className={`${iOpen ? "rotate-180" : "rotate-0"} tr-300`}
          />
        </span>
        <div
          className={`max-w-[1280px] ${
            iOpen ? "h-[320px]" : "h-0"
          } md:!h-[320px]  
            lg:!h-max  tr-300  overflow-y-auto   overflow-hidden  w-full 
           child:text-white flex flex-col items-center lg:py-[20px]`}
        >
          {/* category list */}
          <ul
            className={` flex flex-col md:flex-row justify-start md:justify-center 
                            items-start xs:!py-8 md:py-0  
                            flex-wrap   mt-2.5   w-full 
                            child:flex child:flex-col md:gap-x-8 gap-y-6 child:gap-y-1 `}
          >
            <li>
              <span className="text-white font-Shabnam_M">فروش سازمانی</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">EXOTIC SERIES</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">هورکا</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">
                COMMERCIAL COFFEE
              </span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">PREMIUM COFFEE</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">
                SPECIALTY COFFEE
              </span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">EXOTIC</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">
                قهوه های خاص و محدود
              </span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">
                WORLD CLASS SPECIALTY
              </span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">کپسول قهوه</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex gap-x-8    py-12">
        {/* filter component must be spilt it */}
        <FilteredCategory
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <div className=" bg-white  flex-col flex gap-y-6 w-full">
          <div className="w-full flex px-2 justify-between items-center  py-4 border-b md:border-none ">
            <div className="md:self-start mt-2">
              <Breadcrumb
                firstTarget={"/"}
                firstTitle={"خانه"}
                nestedStep={1}
                nestedLinks={[
                  {
                    title: "فروشگاه",
                    target: `/category`,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-y-2 justify-end ">
              <span className="text-sm  text-right text-dark_shade font-Shabnam_M">
                <span className="hidden md:block"> مرتب سازی :</span>
              </span>
              <select
                className=" bg-gray-100 shadow-sm  
              appearance-auto text-sm md:max-w-[300px] md:w-[300px]
              child:w-fit focus:outline-none px-2 py-2 rounded-md before:content-['fsdf']  "
              >
                <option className="text-sm" value="">
                  بر اساس پیش‌فرض
                </option>
                <option className="text-sm" value="">
                  بر اساس جدیدترین
                </option>
                <option className="text-sm" value="">
                  بر اساس ارزانترین
                </option>
                <option className="text-sm" value="">
                  بر اساس گرانترین
                </option>
              </select>
            </div>
          </div>
          {/* show mobile filter section */}
          <span
            className="md:hidden flex gap-x-1 w-fit items-center cursor-pointer"
            onClick={() => setIsFilterOpen(true)}
          >
            <FaSortAmountDown className="mr-2 text-lg" />
            <span>نمایش فیلتر ها</span>
          </span>
          {/* product grid */}
          <Suspense fallback={<Loader loadingCondition={isProductsLoading} />}>
            <div
              className={`grid ${styles.productWrapper}  mt-4   gap-x-4 gap-y-5`}
            >
              {products?.map((product: SingleProductType) => {
                return <ProductCard key={product?._id} productData={product} />;
              })}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default MainShopPage;
