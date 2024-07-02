import { addCommentOnProduct } from "@/services/product/productServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddNewComment = () => {
  const { mutate: postComment, isPending: isCommentSending } = useMutation({
    mutationFn: addCommentOnProduct,
    onSuccess: (data) => {
      toast.success(data?.message)
    },
    onError: (err:any) => {
      toast.error(err?.response?.data?.error?.message);
      toast.error(err?.response?.data?.message);
    },
  });
  return { postComment, isCommentSending };
};
export default useAddNewComment;
