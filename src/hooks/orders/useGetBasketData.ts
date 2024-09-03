import { ProductCartType } from "@/types/products.type";
import { decryptData } from "@/utils/auth/auth";
import { useQuery } from "@tanstack/react-query";

const useGetBasketData = ()=>{

    const {data:userBasket,isPending:basketLoading} = useQuery({
        queryKey:["userBasket"],
        queryFn:async()=>{
            const storedData = localStorage.getItem("setCoffeeBasket");
            if(storedData){
                const decryptedData = decryptData(storedData)

                return decryptedData as ProductCartType[]
            }
        }
    })
    return {userBasket,basketLoading}
}
 export default useGetBasketData;