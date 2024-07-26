import { useQuery } from "@tanstack/react-query";

const useGetBasketData = ()=>{

    const {data:userBasket,isPending:basketLoading} = useQuery({
        queryKey:["userBasket"],
        queryFn:async()=>{
            const storedData = localStorage.getItem("setCoffeeBasket");
            return JSON.parse(storedData || "[]")
        }
    })
    return {userBasket,basketLoading}
}
 export default useGetBasketData;