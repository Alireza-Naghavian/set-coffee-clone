import { useAlert } from "@/app/context/AlertContext";
import { addNewOrder } from "@/services/orders/orderServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddNewOrder = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutate: addOrder, isPending: isOrderLoading } = useMutation({
    mutationFn: addNewOrder,
    onSuccess: (data: any) => {
      showAlert("success", data?.message);
      localStorage.removeItem("setCoffeeBasket");
      queryClient.invalidateQueries({ queryKey: ["userBasket"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      const productQueries = queryClient
      .getQueryCache()
      .findAll({queryKey:["products"]});
      productQueries.forEach(query => {
        queryClient.invalidateQueries({queryKey:query.queryKey});
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { addOrder, isOrderLoading };
};
export default useAddNewOrder;
