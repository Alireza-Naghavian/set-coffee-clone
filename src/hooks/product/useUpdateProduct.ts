import { UpdateProductData } from "@/services/product/productServices"
import { useMutation } from "@tanstack/react-query"

const useUpdateProduct = ()=>{
    const {mutateAsync:updateProduct,isPending:isProdUpdating} = useMutation({
        mutationFn:UpdateProductData
    })
    return {updateProduct,isProdUpdating}
}
export default useUpdateProduct