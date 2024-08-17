import { useAlert } from "@/app/context/AlertContext";
import { changeCommentStatus } from "@/services/comments/commentsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditCommentData = () => {
  const queryClinet = useQueryClient();
  const { showAlert } = useAlert();
  const { mutateAsync: editComment, isPending: isOperateLoading } = useMutation(
    {
      mutationFn: changeCommentStatus,
      onSuccess: (data: any) => {
        queryClinet.invalidateQueries({ queryKey: ["allComments"] });
        showAlert("success", data?.message);
      },
      onError: (err: any) => {
        showAlert("error", err?.response?.data?.message);
      },
    }
  );
  return { isOperateLoading, editComment };
};
export default useEditCommentData;
