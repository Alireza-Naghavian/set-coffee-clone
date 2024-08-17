import { useAlert } from "@/app/context/AlertContext";
import { addCommentOnProduct } from "@/services/product/productServices";
import { useMutation } from "@tanstack/react-query";

const useAddNewComment = () => {
  const { showAlert } = useAlert();
  const { mutate: postComment, isPending: isCommentSending } = useMutation({
    mutationFn: addCommentOnProduct,
    onSuccess: (data) => {
      showAlert("success", data?.message);
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.error?.message);
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { postComment, isCommentSending };
};
export default useAddNewComment;
