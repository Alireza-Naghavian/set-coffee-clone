import { useMutation, useQueryClient } from "@tanstack/react-query";

 const addProductToWishlist = async (product: any,value: string = "setCoffeeWishlist") => {
    const storedData: string | null = localStorage.getItem(value);
    const getData = storedData ? JSON.parse(storedData) : [];
    if (!getData.some((data: any) => data._id === product._id)) {
        getData.push(product);
        localStorage.setItem("setCoffeeWishlist", JSON.stringify(getData));
        return true
    }
    return false
    
  };



const useAddToWishList = ()=>{
    const QueryClient = useQueryClient();
const {mutateAsync:addToWishList,isPending} = useMutation({
        mutationFn:addProductToWishlist,
        onSuccess:()=>{
            QueryClient.invalidateQueries({queryKey:['wishlist']})
        }
})
return {addToWishList,isPending}
}
export default useAddToWishList