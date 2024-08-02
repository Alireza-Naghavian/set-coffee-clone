import { ProductCartType } from "@/types/products.type";
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
  const getData: ProductCartType[] = cart ? JSON.parse(cart) : [];
  if (!getData.some((data: any) => data._id === product._id)) {
    getData.push(product);
    localStorage.setItem(value, JSON.stringify(getData));
  } else {
    getData.forEach((data: any) => {
      if (data._id === product._id) {
        data.count = data.count + counter;
      }
    });
    localStorage.setItem(value, JSON.stringify(getData));
  }
};
const useAddToBasket = () => {
    const queryclient = useQueryClient();
  const { mutateAsync: addToBasket } = useMutation({
    mutationFn: addProductTocart,
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:["userBasket"]});
    }
  });

  return { addToBasket };
};
export default useAddToBasket;
