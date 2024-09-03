import { ReplyTicketMsg } from "@/services/tickets&departments/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReplyTicketMsg =  () => {
  const QueryClient = useQueryClient();
  const { mutateAsync: SendReply, isPending: isSending } = useMutation({
    mutationFn:  ReplyTicketMsg,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["ticket"] });
      QueryClient.invalidateQueries({ queryKey: ["allTickets"] });
    },
  });
  return { SendReply, isSending };
};
export default useReplyTicketMsg;
