import { useAlert } from "@/app/context/AlertContext";
import { replyAdminTicket } from "@/services/tickets&departments/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReplyAdminTicket = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutateAsync: replyAdmin, isPending: isReplyLoading } = useMutation({
    mutationFn: replyAdminTicket,
    onSuccess: (data: any) => {
      showAlert("success", data?.message);
      queryClient.invalidateQueries({ queryKey: ["allTickets"] });
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { replyAdmin, isReplyLoading };
};
export default useReplyAdminTicket;
