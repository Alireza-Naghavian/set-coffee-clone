import { changeCommentStatus } from "@/services/comments/commentsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useEditCommentData = () => {
    const queryClinet = useQueryClient();
  const { mutateAsync: editComment, isPending: isOperateLoading } = useMutation(
    {
      mutationFn: changeCommentStatus,
      onSuccess: (data: any) => {
        queryClinet.invalidateQueries({queryKey:["allComments"]})
        toast.success(data.message);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );
  return { isOperateLoading, editComment };
};
export default useEditCommentData;
