import { useAlert } from "@/app/context/AlertContext";
import { UpdateAnswerMsg } from "@/services/comments/commentsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateAnswerMsg = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutateAsync: updateMsg, isPending: isMsgUpdating } = useMutation({
    mutationFn: UpdateAnswerMsg,
    onSuccess: (data: any) => {
      showAlert("success", data?.message);
      queryClient.invalidateQueries({ queryKey: ["allComments"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { updateMsg, isMsgUpdating };
};
export default useUpdateAnswerMsg;
