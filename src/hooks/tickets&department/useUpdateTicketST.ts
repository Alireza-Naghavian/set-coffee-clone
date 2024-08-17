import { useAlert } from "@/app/context/AlertContext";
import { changeTicketSt } from "@/services/tickets&departments/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const useUpdateTicketST = () => {
  const queryClient = useQueryClient();
  const {showAlert} = useAlert();
  const { mutateAsync: updateTicketSt, isPending: isUpdateLoading } =
    useMutation({
      mutationFn: changeTicketSt,
      onSuccess(data: any) {
        showAlert("success",data.message)
        queryClient.invalidateQueries({ queryKey: ["allTickets"] });
        queryClient.invalidateQueries({ queryKey: ["ticket"] });
      },
      onError(error: any) {
      showAlert("error",error?.response?.data?.message)
      },
    });
  return { updateTicketSt, isUpdateLoading };
};
export default useUpdateTicketST;
