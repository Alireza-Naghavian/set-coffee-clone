import { deleteProduct } from "@/services/product/productServices";
import { useMutation } from "@tanstack/react-query";

const useRemoveProduct = () => {
  const { mutate: removeProduct, isPending: isRemoveLoading } =
    useMutation({
      mutationFn: deleteProduct,
    });
  return { removeProduct, isRemoveLoading };
};
export default useRemoveProduct;
