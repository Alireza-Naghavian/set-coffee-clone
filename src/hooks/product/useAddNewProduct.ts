import { useAlert } from "@/app/context/AlertContext";
import { AddNewProduct } from "@/services/product/productServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddNewProduct = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutateAsync: addProduct, isPending: isAddLoading } = useMutation({
    mutationFn: AddNewProduct,
    onSuccess: (data: any) => {
      showAlert("success", data?.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { addProduct, isAddLoading };
};

export default useAddNewProduct;
