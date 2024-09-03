import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import EmptySearch from "@/components/UI/EmptySearch/EmptySearch";
import TextLoader from "@/components/UI/loader/TextLoader";
import FilteredCategory from "@/components/Utils-components/FIlter/FilteredCategory";
import Select from "@/components/Utils-components/Select/Select";
import { SingleProductType } from "@/types/models/categories.type";
import { FilterProductType } from "@/types/products.type";
import { optionValues } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { FaSortAmountDown } from "react-icons/fa";
import styles from "./MainShopPageStyle.module.css";

function Filter_Result({
  filtersEntity,
  isFilterOpen,
  setIsFilterOpen,
  setMaxPrice,
  setMinPrice,
  setSort,
  sort,
  isProductsLoading,
  products,
}: FilterProductType) {
  const onSortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  const Currlocation = useSearchParams();
  let newParams = new URLSearchParams(Currlocation);
  const handleResetFilters = () => {
    newParams.delete("");
    location.replace("/categories");
  };
  return (
    <div className="w-full flex gap-x-8 py-12">
      <FilteredCategory
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filtersEntity={filtersEntity}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <div className="bg-white flex-col flex gap-y-6 w-full">
        <div className="w-full flex px-2 items-center py-4 border-b md:border-none">
          <div className="md:self-start mt-2 ml-auto">
            <Breadcrumb
              firstTarget={"/"}
              firstTitle={"خانه"}
              nestedStep={1}
              nestedLinks={[{ title: "فروشگاه", target: `/categories` }]}
            />
          </div>

          <Select
            className={`bg-gray-100 shadow-sm appearance-auto text-sm lg:max-w-[300px] lg:w-[300px] md:max-w-[200px] md:w-[200px] child:w-fit focus:outline-none px-2 py-2 rounded-md`}
            onChange={onSortHandler}
            options={optionValues}
            value={sort}
            selectTitle={"مرتب سازی :"}
          />

          <div className="max-w-[120px] mr-8 hidden lg:block">
            <MainBtn
              onClick={handleResetFilters}
              size="small"
              className="!bg-gray-600 hover:!bg-gray-700 mt-6 rounded-sm text-sm"
            >
              حذف فیلتر ها
            </MainBtn>
          </div>
        </div>
        <span
          className="md:hidden flex gap-x-1 w-fit items-center cursor-pointer"
          onClick={() => setIsFilterOpen(true)}
        >
          <FaSortAmountDown className="mr-2 text-lg" />
          <span>نمایش فیلتر ها</span>
        </span>
        <div className={`grid ${styles.productWrapper} mt-4 gap-x-4 gap-y-5`}>
          {isProductsLoading ? (
            <TextLoader loadingCondition={isProductsLoading} />
          ) : products?.products?.length === 0 ? (
            <EmptySearch />
          ) : (
            products?.products?.map((product: SingleProductType) => (
              <ProductCard key={product?._id} productData={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter_Result;
