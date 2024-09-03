import { ProductCartType } from "@/types/products.type";
import { BasketType } from "../orders/useAddToBasket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decryptData, encryptData } from "@/utils/auth/auth";

type UpdateType = Pick<BasketType,   "value"> & {
  offerPercent: number;
};
const updateBasketHandler = async ({

  value = "setCoffeeBasket",
  offerPercent,
}: UpdateType) => {
  const cart: string | null = localStorage.getItem(value);
  const getData:ProductCartType[] = cart ? decryptData(cart) ?? [] : [];
  if (getData.length > 0) {
   const updateData=  getData
      .map((product: ProductCartType) => {
        const discount  = (product.price * offerPercent) /100
        product.price -= discount
        return  product;
        
      })
      const encryptedData = encryptData(updateData)
      if(encryptedData)
      localStorage.setItem(value,encryptedData)
    }
};

const useUpdateUserBasket = () => {
  const queryclient = useQueryClient();
  const { mutateAsync: updateBasketPrice } = useMutation({
    mutationFn: updateBasketHandler,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["userBasket"] });
    },
  });
  return { updateBasketPrice };
};
export default useUpdateUserBasket;
