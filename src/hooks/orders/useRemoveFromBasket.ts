import { ProductCartType } from "@/types/products.type";
import { decryptData, encryptData } from "@/utils/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type RemoveType = {
    key: string, value: ProductCartType
}
 const RemoveFromBasket = async({key, value}:RemoveType) => {
    const storedData: string | null = localStorage.getItem(key);
    const getData:ProductCartType[] = storedData ? decryptData(storedData) ?? [] : [];
    const dataIndex = getData.findIndex((data: ProductCartType) => {
      return data._id === value._id;
    });
    if (dataIndex !== -1) {
      getData.splice(dataIndex, 1);
      const encyptedData = encryptData(getData)
      if(encyptedData)
      localStorage.setItem(key, encyptedData);
    }
  };
const useRemoveFromBasket = ()=>{
    const queryClient = useQueryClient();

const {mutateAsync:removeFromCart} = useMutation({
    mutationFn:RemoveFromBasket,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["userBasket"]});
    }
})
return {removeFromCart}
}
export default useRemoveFromBasket ;