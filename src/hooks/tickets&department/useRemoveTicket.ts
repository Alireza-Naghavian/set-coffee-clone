import { deleteTicket } from "@/services/tickets&departments/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useRemoveTicket = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: removeTicket, isPending: isRemoveLoading } = useMutation(
    {
      mutationFn: deleteTicket,
      onSuccess: (data: any) => {
        toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["allTickets"] });
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );
  return { removeTicket, isRemoveLoading };
};
export default useRemoveTicket;
