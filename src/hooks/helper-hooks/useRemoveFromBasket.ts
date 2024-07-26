import { ProductCartType } from "@/types/products.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type RemoveType = {
    key: string, value: ProductCartType
}
 const RemoveFromBasket = async({key, value}:RemoveType) => {
    const storedData: string | null = localStorage.getItem(key);
    const getData: ProductCartType[] = storedData ? JSON.parse(storedData) : [];
    const dataIndex = getData.findIndex((data: ProductCartType) => {
      return data._id === value._id;
    });
    if (dataIndex !== -1) {
      getData.splice(dataIndex, 1);
      localStorage.setItem(key, JSON.stringify(getData));
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