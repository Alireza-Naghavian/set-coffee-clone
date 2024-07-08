import { getInitialCategoryData } from "@/services/product/productServices";
import { SingleProductType } from "@/types/models/categories.type";
import { useQuery } from "@tanstack/react-query";

const useGetInitialCategoryPageData = (initialData: SingleProductType[]) => {
  const { data, isPending: isProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getInitialCategoryData,
    retry: 3,
    initialData
  });
  const products = data || [];

  return { products, isProductsLoading };
};
export default useGetInitialCategoryPageData;
