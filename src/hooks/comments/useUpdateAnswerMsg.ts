import { UpdateAnswerMsg } from "@/services/comments/commentsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useUpdateAnswerMsg = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateMsg, isPending: isMsgUpdating } = useMutation({
    mutationFn: UpdateAnswerMsg,
    onSuccess: (data: any) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["allComments"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { updateMsg, isMsgUpdating };
};
export default useUpdateAnswerMsg;
