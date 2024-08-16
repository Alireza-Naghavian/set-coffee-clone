import { changeTicketSt } from "@/services/tickets&departments/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useUpdateTicketST = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateTicketSt, isPending: isUpdateLoading } =
    useMutation({
      mutationFn: changeTicketSt,
      onSuccess(data: any) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["allTickets"] });
      },
      onError(error: any) {
        toast.error(error?.response?.data?.message);
      },
    });
  return { updateTicketSt, isUpdateLoading };
};
export default useUpdateTicketST;
