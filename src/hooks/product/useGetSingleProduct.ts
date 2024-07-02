import { getSingleProductData } from "@/services/product/productServices";
import { SingleProductType } from "@/types/models/categories.type";
import { useQuery } from "@tanstack/react-query";

const useGetSingleProduct = (productId: string,initialProductData:SingleProductType) => {
  const { data: product, isPending: isProductLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProductData(productId),
    initialData:initialProductData
  });
  return { product, isProductLoading };
};
export default useGetSingleProduct;
