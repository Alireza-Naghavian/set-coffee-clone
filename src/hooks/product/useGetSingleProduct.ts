import { getSingleProductData } from "@/services/product/productServices";
import { useQuery } from "@tanstack/react-query";

const useGetSingleProduct = (productId: string) => {
  const { data: product, isPending: isProductLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProductData(productId),
  });
  return { product, isProductLoading };
};
export default useGetSingleProduct;
