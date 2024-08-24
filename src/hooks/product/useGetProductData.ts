import { getInitialCategoryData } from "@/services/product/productServices";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
const useGetProductData = ({limit="4",page}:{limit?:string,page?:number}) => {
  const location = useSearchParams();
  const queryParams = new URLSearchParams(location)
  if(page !== undefined ){

    queryParams.set("page",  page.toString()); 
    queryParams.set("limit", limit);
  }
  const { data, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", queryParams.toString()],
    queryFn: () => getInitialCategoryData(queryParams),
    staleTime:0,
    gcTime:5*60*1000,
  });
  const products = data || [];

  return { products, isProductsLoading };
};
export default useGetProductData;
