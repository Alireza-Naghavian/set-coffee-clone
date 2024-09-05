"use client";
import Pagination from "@/components/UI/Pagination/Pagination";
import useGetProductData from "@/hooks/product/useGetProductData";
import { ShopPageType } from "@/types/products.type";
import { initialFilterAmount } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CategoryList from "./CategoryList";
import Filter_Result from "./Filter&Result";
function MainShopPage({ allCategories, totalProduct }: ShopPageType) {
  const [sort, setSort] = useState(initialFilterAmount.sortInit);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [categoryData, setCategoryData] = useState<{
    categoryId: null | string;
    productCount: number | null;
  }>({ categoryId: null, productCount: null });
  const [minPrice, setMinPrice] = useState(initialFilterAmount.minPriceInit);
  const [maxPrice, setMaxPrice] = useState(initialFilterAmount.maxPriceInit);
  const [stars, setStars] = useState(initialFilterAmount.starsInit);
  const navigate = useRouter();
  const { products, isProductsLoading } = useGetProductData({ page });
  const Currlocation = useSearchParams();
  let newParams = new URLSearchParams(Currlocation);
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

  const updateParams = (key: string, value: string) => {
    newParams.set(key, value);
    navigate.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const removeParams = (key: string) => {
    newParams.delete(key);
    navigate.replace(`?${newParams.toString()}`);
  };

  useEffect(() => {
    updateParams("page", "1");
  }, [sort, minPrice, maxPrice, stars, categoryData.categoryId]);

  useEffect(() => {
    updateParams("sort", sort);
  }, [sort]);

  useEffect(() => {
    if (categoryData.categoryId) {
      updateParams("categoryId", categoryData.categoryId as string);
      navigate.replace(`/categories?categoryId=${categoryData.categoryId}`);
      setMinPrice(filtersEntity.minPrice);
      setMaxPrice(filtersEntity.maxPrice);
      setSort(filtersEntity.sort);
      setStars(filtersEntity.stars);
    } else {
      removeParams("categoryId");
    }
  }, [
    categoryData.categoryId
  ]);
  return (
    <div className="relative child:sm:px-10 flex flex-col child:px-4">
      <CategoryList
        allCategories={allCategories}
        removeParams={removeParams}
        setCategoryData={setCategoryData}
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
        setSort={setSort}
        setStars={setStars}
        setPage={setPage}
      />
      <Filter_Result
        filtersEntity={filtersEntity}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
        setSort={setSort}
        sort={sort}
        products={products}
        isProductsLoading={isProductsLoading}
      />
      <div
        className="flex self-end mx-auto lg:justify-center md:w-[calc(100vw-320px)] 
      lg:md:w-[calc(100vw-400px)] md:!h-[80px]   md:ml-0  lg:!mr-auto md:mt-4"
      >
        {!categoryData.categoryId &&
          products?.totalProduct !== products?.products?.length && (
            <Pagination
              currentPage={page}
              pageSize={parseInt(products?.limit || "4")}
              totalCount={totalProduct}
              onPageChange={setPage}
            />
          )}
        {categoryData.categoryId &&
          categoryData.productCount &&
          categoryData.productCount !== products?.products?.length && (
            <Pagination
              categoryId={categoryData.categoryId}
              currentPage={page}
              pageSize={parseInt(products?.limit || "4")}
              totalCount={categoryData?.productCount}
              onPageChange={setPage}
            />
          )}
      </div>
    </div>
  );
}

export default MainShopPage;
