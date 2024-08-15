import { AnswerComment } from "@/services/comments/commentsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAnswerComment = () => {
  const queryclient = useQueryClient();
  const { mutateAsync: answerComment, isPending: isAnswerLoading } =
    useMutation({
      mutationFn: AnswerComment,
      onSuccess: (data: any) => {
        toast.success(data.message)
        queryclient.invalidateQueries({ queryKey: ["allComments"] });
      },
      onError: (err: any) => {
      toast.error(err?.response?.data?.message)
      },
    });
  return { answerComment, isAnswerLoading };
};
export default useAnswerComment;
