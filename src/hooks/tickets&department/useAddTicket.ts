import { useAlert } from "@/app/context/AlertContext";
import { AddNewTicket } from "@/services/tickets&departments/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddTicket = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutateAsync: addTicket, isPending: isAddLoading } = useMutation({
    mutationFn: AddNewTicket,
    onSuccess: (data: any) => {
      showAlert("success", data?.message);
      queryClient.invalidateQueries({ queryKey: ["allTickets"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { addTicket, isAddLoading };
};
export default useAddTicket;
