import { ProductCartType } from "@/types/products.type";
import { BasketType } from "../orders/useAddToBasket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decryptData, encryptData } from "@/utils/auth/auth";

const updateBasket = async ({
  product,
  value = "setCoffeeBasket",
  counter,
}: BasketType) => {
  const cart: string | null = localStorage.getItem(value);
  const getData:ProductCartType[] = cart ? decryptData(cart) ?? [] : [];
  const updatedData = getData.map((data) =>
    data._id === product._id ? { ...data, count: counter } : data
  );
  const cryptedNewData  = encryptData(updatedData)
  if(cryptedNewData)
  localStorage.setItem(value, cryptedNewData);
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
