import { getAllUserOrder } from "@/services/orders/orderServices";
import { useQuery } from "@tanstack/react-query";

const useGetOrders = () => {
  const { data:UserOrders, isPending: isOrderLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllUserOrder,
  });

  return { UserOrders, isOrderLoading };
};

export default useGetOrders;
