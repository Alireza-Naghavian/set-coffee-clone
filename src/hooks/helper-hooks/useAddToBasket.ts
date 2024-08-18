import { ProductCartType } from "@/types/products.type";
import { decryptData, encryptData } from "@/utils/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export type BasketType = {
  product: ProductCartType;
  value: string;
  counter: number;
};

const addProductTocart = async ({
  product,
  value = "setCoffeeBasket",
  counter = 1,
}: BasketType) => {
  const cart: string | null = localStorage.getItem(value);
  const getData: ProductCartType[] = cart ? decryptData(cart) ?? [] : [];
  if (!getData.some((data: any) => data._id === product._id)) {
    getData.push(product);
    const encryptedData = encryptData(getData);
    if (encryptedData) {
      localStorage.setItem(value, encryptedData);
    }
  } else {
    getData.forEach((data: any) => {
      if (data._id === product._id) {
        data.count = data.count + counter;
      }
    });
    const encryptedData = encryptData(getData);
    if (encryptedData) {
      localStorage.setItem(value, encryptedData);
    }
  }
};
const useAddToBasket = () => {
  const queryclient = useQueryClient();
  const { mutateAsync: addToBasket } = useMutation({
    mutationFn: addProductTocart,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["userBasket"] });
    },
  });

  return { addToBasket };
};
export default useAddToBasket;
