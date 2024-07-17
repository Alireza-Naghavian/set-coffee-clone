"use client";
import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import EmptySearch from "@/components/UI/EmptySearch/EmptySearch";
import Loader from "@/components/UI/loader/Loader";
import FilteredCategory from "@/components/Utils-components/FIlter/FilteredCategory";
import Select from "@/components/Utils-components/Select/Select";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import useGetInitialCategoryPageData from "@/hooks/product/useGetInitialCategoryPageData";
import { SingleProductType } from "@/types/models/categories.type";
import { optionValues } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaChevronDown, FaSortAmountDown } from "react-icons/fa";
import styles from "./MainShopPageStyle.module.css";
const initialFilterAmount = {
  minPriceInit: 0,
  maxPriceInit: 10_000_000,
  sortInit: "latest",
  starsInit: 5,
};
function MainShopPage({ allCategories,initProducts }: any) {
  const [iOpen, { toggle }] = useDisclosure();
  const [sort, setSort] = useState(initialFilterAmount.sortInit);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [minPrice, setMinPrice] = useState(initialFilterAmount.minPriceInit);
  const [maxPrice, setMaxPrice] = useState(initialFilterAmount.maxPriceInit);
  const [stars, setStars] = useState(initialFilterAmount.starsInit);
  const navigate = useRouter();
  const { products, isProductsLoading } = useGetInitialCategoryPageData(initProducts);
  const Location = useSearchParams();
  let newParams = new URLSearchParams(Location);
  const filtersEntity = useMemo(
    () => ({
      sort,
      minPrice,
      maxPrice,
      stars,
      page,
    }),
    [sort, minPrice, maxPrice, stars, page]
  );
  // reset pages in filter time
  useEffect(() => {
    setPage(1);
  }, [sort, minPrice, maxPrice, stars]);
  useEffect(() => {
    newParams.set("sort", sort.toString());
    navigate.push(`?${newParams.toString()}`, { scroll: false });
  }, [sort, navigate, newParams]);
  // sort handler
  const onSortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  const handleResetFilters = () => {
    newParams.delete("")
    location.replace("/categories");
  };
  return (
    <div className="relative  child:sm:px-10 child:px-4">
      <div
        className={` ${styles.categoryWrapper} w-full 
        relative mx-auto  
        flex-center headerWrapper  text-white flex-col 
        pt-[50px] sm:pt-[100px] lg:pt-[215px]`}
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
            lg:!h-max  tr-300  overflow-y-auto     w-full 
           child:text-white flex flex-col items-center lg:py-[20px]`}
        >
          {/* category list */}
          <ul
            className={` flex flex-col md:flex-row justify-start md:justify-center 
            items-start xs:py-8 md:py-0  
            flex-wrap   mt-2.5   w-full 
            child:flex child:flex-col md:gap-x-8 gap-y-6 child:gap-y-1 `}
          >
            {allCategories.map((category: any) => {
              return (
                <li key={category?._id}>
                  <button
                    disabled={category?.productCount == 0}
                    onClick={() => {
                      newParams.set("categoryId", category?._id);
                      navigate.replace(`?${newParams}`, { scroll: false });
                    }}
                    className={` font-Shabnam_M  bg-transparent focus:outline-none ${
                      category.productCount !== 0
                        ? "cursor-pointer text-white"
                        : "cursor-not-allowed text-gray-200/50"
                    }`}
                  >
                    {category?.title}
                  </button>
                  <span className="text-mute  text-right font-Shabnam_M">
                    {category?.productCount.toLocaleString("fa-Ir")} محصول
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full flex gap-x-8    py-12">
        {/* filter component must be spilt it */}
        <FilteredCategory
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          filtersEntity={filtersEntity}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setStars={setStars}
        />
        <div className=" bg-white  flex-col flex gap-y-6 w-full">
          <div className="w-full flex px-2  items-center  py-4 border-b md:border-none ">
            <div className="md:self-start mt-2 ml-auto">
              <Breadcrumb
                firstTarget={"/"}
                firstTitle={"خانه"}
                nestedStep={1}
                nestedLinks={[{ title: "فروشگاه", target: `/categories` }]}
              />
            </div>

            <Select
              className={`
                bg-gray-100 shadow-sm  appearance-auto text-sm 
                lg:max-w-[300px] lg:w-[300px] 
                md:max-w-[200px] md:w-[200px] child:w-fit
                focus:outline-none px-2 py-2 rounded-md 
                `}
              onChange={onSortHandler}
              options={optionValues}
              value={sort}
              selectTitle={" مرتب سازی :"}
            />

            <div className="max-w-[120px] mr-8 hidden lg:block">
              <MainBtn
                onClick={ handleResetFilters}
                size="small"
                className="!bg-gray-600 hover:!bg-gray-700  mt-6 rounded-sm text-sm"
              >
                حذف فیلتر ها
              </MainBtn>
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
          <div
            className={`grid ${styles.productWrapper}  mt-4   gap-x-4 gap-y-5`}
          >
            {isProductsLoading ? (
              <div className="flex items-center gap-x-2">
                <Loader loadingCondition={isProductsLoading} />
                <span>درحال بارگزاری...</span>
              </div>
            ) : products?.length === 0 ? (
              <EmptySearch />
            ) : (
              products?.map((product: SingleProductType) => {
                return <ProductCard key={product?._id} productData={product} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainShopPage;
