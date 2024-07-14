"use client";
import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import Loader from "@/components/UI/loader/Loader";
import FilteredCategory from "@/components/Utils-components/FIlter/FilteredCategory";
import Select from "@/components/Utils-components/Select/Select";
import useGetAllCategories from "@/hooks/categories/useGetCategoryData";
import useGetProdBasedCat from "@/hooks/categories/useGetProdBasedCat";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";
import useGetInitialCategoryPageData from "@/hooks/product/useGetInitialCategoryPageData";
import { SingleProductType } from "@/types/models/categories.type";
import { optionValues } from "@/utils/constants";
import { useEffect, useState } from "react";
import { FaChevronDown, FaSortAmountDown } from "react-icons/fa";
import styles from "./MainShopPageStyle.module.css";
import EmptySearch from "@/components/UI/EmptySearch/EmptySearch";
const initialFilterAmount = {
  minPriceInit:0,
  maxPriceInit:10_000_000,
  sortInit:"",
  starsInit:5,

}
function MainShopPage({initialPageData}: {initialPageData: SingleProductType[];}) 
{
  const { categories, isCatLoading } = useGetAllCategories();
  const [categoryId, setCategoryId] = useState<string>("");
  const [iOpen, { toggle }] = useDisclosure();
  const [sort,setSort] = useState(initialFilterAmount.sortInit);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [page,setPage] = useState<number>(1);
  const [minPrice, setMinPrice] = useState(initialFilterAmount.minPriceInit);
  const [maxPrice, setMaxPrice] = useState(initialFilterAmount.maxPriceInit);
  const [applyPrice,setApplyPrice] = useState<[number,number]>([0,10_000_000])
  const [stars, setStars] = useState(initialFilterAmount.starsInit);
  const filtersEntity = {
    sort,
    minPrice,
    maxPrice,
    stars,
    page
  } 
  const { products,isProductsLoading } = useGetInitialCategoryPageData(filtersEntity,applyPrice);
  const { categoryData, isProductLoading, } = useGetProdBasedCat(categoryId,filtersEntity,applyPrice);
// apply user pric filters
const handleApplyFilters =(filters:any)=>{
setApplyPrice([filters.minPrice,filters.maxPrice])
}
  // reset pages in filter time 
  useEffect(()=>{
    setPage(1)
  },[sort,minPrice,maxPrice,stars])
  // sort handler
  const onSortHandler = (e:  React.ChangeEvent<HTMLSelectElement>)=>{
    setSort(e.target.value)
  }
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
            lg:!h-max  tr-300  overflow-y-auto     w-full 
           child:text-white flex flex-col items-center lg:py-[20px]`}>
          {/* category list */}
          <ul
            className={` flex flex-col md:flex-row justify-start md:justify-center 
                            items-start xs:py-8 md:py-0  
                            flex-wrap   mt-2.5   w-full 
                            child:flex child:flex-col md:gap-x-8 gap-y-6 child:gap-y-1 `}>
            {isCatLoading ? (
              <div className=" w-fit">
                <p>درحال بارگزاری ....</p>
              </div>
            ) : (
              categories?.map((category: any) => {
                return (
                  <li key={category?._id}>
                    <span
                      onClick={() => {
                        setCategoryId(category?._id)
                        setSort(initialFilterAmount.sortInit)
                        setMinPrice(initialFilterAmount.minPriceInit)
                        setMaxPrice(initialFilterAmount.maxPriceInit)
                        setStars(initialFilterAmount.starsInit)
                      }}
                      className="!text-white font-Shabnam_M cursor-pointer"
                    >
                      {category?.title}
                    </span>
                    <span className="!text-mute  text-right font-Shabnam_M">
                      {category?.productCount.toLocaleString("fa-Ir")} محصول
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
      <div className="w-full flex gap-x-8    py-12">
        {/* filter component must be spilt it */}
        <FilteredCategory
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          onApplyFilters= {handleApplyFilters}
          filtersEntity={filtersEntity}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setStars={setStars}
        />
        <div className=" bg-white  flex-col flex gap-y-6 w-full">
          <div className="w-full flex px-2 justify-between items-center  py-4 border-b md:border-none ">
            <div className="md:self-start mt-2">
              <Breadcrumb
                firstTarget={"/"}
                firstTitle={"خانه"}
                nestedStep={1}
                nestedLinks={[{title: "فروشگاه",target: `/category`,}]}
              />
            </div>
              <Select className={`
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
          </div>
          {/* show mobile filter section */}
          <span
            className="md:hidden flex gap-x-1 w-fit items-center cursor-pointer"
            onClick={() => setIsFilterOpen(true)} >

            <FaSortAmountDown className="mr-2 text-lg" />
            <span>نمایش فیلتر ها</span>
          </span>
          {/* product grid */}
          <div
            className={`grid ${styles.productWrapper}  mt-4   gap-x-4 gap-y-5`}>
            {/* { products?.length ===0  && <EmptySearch/>} */}
            {isProductsLoading ||isProductLoading ? (
              <div className="flex items-center gap-x-2">
                <Loader loadingCondition={isProductsLoading|| isProductLoading} />
                <span>درحال بارگزاری...</span>
              </div>
            ) : (
       

               (!categoryId? products : categoryData[0]?.products  )?.map(
                 (product: SingleProductType) => {
                   return (
                     <ProductCard key={product?._id} productData={product} />
                    );
                  }
                )
              )}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainShopPage;
