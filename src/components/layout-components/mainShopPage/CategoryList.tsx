import React from "react";
import styles from "./MainShopPageStyle.module.css";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { categoriesType } from "@/types/models/categories.type";
import { SetState } from "@/types/global.type";
type CategoryListType = {
  setCategoryData: SetState<{
    categoryId: null | string;
    productCount: number | null;
  }>;
  allCategories: categoriesType[];
  removeParams: (key: string) => void;
  setMinPrice: SetState<number>;
  setMaxPrice: SetState<number>;
  setSort: SetState<string>;
  setStars: SetState<number>;
};
function CategoryList({
  allCategories,
  removeParams,
  setCategoryData,
  setMaxPrice,
  setMinPrice,
  setSort,
  setStars,
}: CategoryListType) {
  const [iOpen, { toggle }] = useDisclosure();
  return (
    <div
      className={` ${styles.categoryWrapper} w-full relative mx-auto flex-center 
    headerWrapper text-white flex-col pt-[50px] sm:pt-[100px] lg:pt-[215px]`}
    >
      <h1 className="text-[clamp(24px,5vw,68px)] font-Shabnam_B text-center">
        فروشگاه
      </h1>
      <span
        className="cursor-pointer flex md:hidden gap-x-2 items-center tracking-tighter py-4"
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
        } md:!h-[185px] lg:h-[320px]  tr-300 overflow-y-auto w-full child:text-white flex flex-col items-center lg:py-[20px]`}
      >
        <ul
          className={`flex flex-col md:flex-row justify-start md:justify-center items-start xs:py-8 md:py-0 flex-wrap mt-2.5 w-full child:flex child:flex-col md:gap-x-8 gap-y-6 child:gap-y-1`}
        >
          {allCategories.map((category: any) => (
            <li key={category?._id}>
              <Link
                href={`/categories?categoryId=${category?._id}`}
                onClick={() => {
                  setCategoryData({
                    categoryId: category?._id,
                    productCount: category?.productCount,
                  });
                  removeParams("page");
                  setMinPrice(0);
                  setMaxPrice(10_000_000);
                  setSort("latest");
                  setStars(5);
                }}
                className={`font-Shabnam_M bg-transparent focus:outline-none ${
                  category.productCount !== 0
                    ? "cursor-pointer text-white"
                    : " text-gray-200/50"
                }`}
              >
                {category?.title}
              </Link>
              <span className="text-mute text-right font-Shabnam_M">
                {category?.productCount.toLocaleString("fa-Ir")} محصول
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryList;
