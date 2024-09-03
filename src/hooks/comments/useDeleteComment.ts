import { deleteComment } from "@/services/comments/commentsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: removeComment, isPending: isRemoveLoading } =
    useMutation({
      mutationFn: deleteComment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allComments"] });
      },
    });
  return { removeComment, isRemoveLoading };
};
export default useDeleteComment;
