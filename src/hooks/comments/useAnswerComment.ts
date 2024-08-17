import { useAlert } from "@/app/context/AlertContext";
import { AnswerComment } from "@/services/comments/commentsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAnswerComment = () => {
  const queryclient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutateAsync: answerComment, isPending: isAnswerLoading } =
    useMutation({
      mutationFn: AnswerComment,
      onSuccess: (data: any) => {
        showAlert("success", data?.message);
        queryclient.invalidateQueries({ queryKey: ["allComments"] });
      },
      onError: (err: any) => {
        showAlert("error", err?.response?.data?.message);
      },
    });
  return { answerComment, isAnswerLoading };
};
export default useAnswerComment;
