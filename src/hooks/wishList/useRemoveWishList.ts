import { ProductCartType } from "@/types/products.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type RemoveFnType = {
    wishList:ProductCartType[],
    productId:string
}
const removeFromWishList =async ({wishList,productId}:RemoveFnType)=>{
    const findData = wishList.findIndex((data: ProductCartType) => data._id === productId);
    if (findData !== -1) {
        wishList.splice(findData, 1);
      localStorage.setItem("setCoffeeWishlist", JSON.stringify(wishList));
        
    }
    
}
const useRemoveWishList = ()=>{
const QueryClient = useQueryClient();
const {mutateAsync:removeFromList ,isPending:isRemoving} = useMutation({
    mutationFn:removeFromWishList,
    onSuccess:()=>{
        QueryClient.invalidateQueries({queryKey:["wishlist"]})
    }
})
return {removeFromList,isRemoving}
}
export default useRemoveWishList