import { getInitialCategoryData } from "@/services/product/productServices";
import { SingleProductType } from "@/types/models/categories.type";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
const useGetInitialCategoryPageData = (initProducts:SingleProductType[]) => {
  const location = useSearchParams();
  const queryParams = new URLSearchParams(location)
  const { data, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", queryParams.toString()],
    queryFn: () => getInitialCategoryData(queryParams),
    staleTime:0,
    initialData:initProducts
  });
  const products = data || [];

  return { products, isProductsLoading };
};
export default useGetInitialCategoryPageData;
