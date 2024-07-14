import { getInitialCategoryData } from "@/services/product/productServices";
import { useQuery } from "@tanstack/react-query";

const useGetInitialCategoryPageData = (
  filtersEntity: any,
  applyPrice: [number, number]
) => {
  const { sort, stars, page } = filtersEntity;
  const { data, isPending: isProductsLoading } = useQuery({
    queryKey: ["products", sort, stars, page ,applyPrice],
    queryFn: () => getInitialCategoryData(filtersEntity),
    staleTime:0,
  
  });
  const products = data || [];

  return { products, isProductsLoading };
};
export default useGetInitialCategoryPageData;
