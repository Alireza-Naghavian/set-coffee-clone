import { ProductCartType } from "@/types/products.type";
import { BasketType } from "./useAddToBasket";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateBasket = async ({
  product,
  value = "setCoffeeBasket",
  counter,
}: BasketType) => {
  const cart: string | null = localStorage.getItem(value);
  const getData: ProductCartType[] = cart ? JSON.parse(cart) : [];
  const updatedData = getData.map((data) =>
    data._id === product._id ? { ...data, count: counter } : data
  );
  localStorage.setItem(value, JSON.stringify(updatedData));
};
const useUpdateBasket = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateBasketCart } = useMutation({
    mutationFn: updateBasket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBasket"] });
    },
  });
  return { updateBasketCart };
};
export default useUpdateBasket;
