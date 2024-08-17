import { replyAdminTicket } from "@/services/tickets&departments/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useReplyAdminTicket = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: replyAdmin, isPending: isReplyLoading } = useMutation({
    mutationFn: replyAdminTicket,
    onSuccess: (data: any) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["allTickets"] });
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { replyAdmin, isReplyLoading };
};
export default useReplyAdminTicket;
