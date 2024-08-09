import { AddNewProduct } from "@/services/product/productServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

const useAddNewProduct =()=>{
    const queryClient = useQueryClient();
const {mutateAsync:addProduct,isPending:isAddLoading} = useMutation({
mutationFn:AddNewProduct,
onSuccess:(data:any)=>{
  toast.success(data.message)
  queryClient.invalidateQueries({queryKey:["products"]})
},
onError:(err:any)=>{
    toast.error(err?.response?.data?.message)
}
})
return {addProduct,isAddLoading}
}

export default useAddNewProduct