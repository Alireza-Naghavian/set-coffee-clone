import { getSingleProductData } from "@/services/product/productServices";
import { SingleProductType } from "@/types/models/categories.type";
import { useQuery } from "@tanstack/react-query";

const useGetSingleProduct = (productId: string ) => {
  const { data, isPending: isProductLoading } = useQuery({
    queryKey: ["product",productId],
    queryFn: () => getSingleProductData(productId),
  });
  const product = data || {};

  return { product, isProductLoading };
};
export default useGetSingleProduct;
