import { addNewOrder } from "@/services/orders/orderServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddNewOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: addOrder, isPending: isOrderLoading } = useMutation({
    mutationFn: addNewOrder,
    onSuccess: (data: any) => {
      toast.success(data.message);
      localStorage.removeItem("setCoffeeBasket");
      queryClient.invalidateQueries({ queryKey: ["userBasket"] });
      queryClient.invalidateQueries({queryKey:["orders"]})
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { addOrder, isOrderLoading };
};
export default useAddNewOrder;
