import { AddNewTicket } from "@/services/tickets&departments/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddTicket = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addTicket, isPending: isAddLoading } = useMutation({
    mutationFn: AddNewTicket,
    onSuccess: (data: any) => {
      toast.success(data?.message);
queryClient.invalidateQueries({queryKey:["allTickets"]})
    },
    onError:(err:any)=>{
        toast.error(err?.reseponse?.data?.message)
    }
  });
  return { addTicket, isAddLoading };
};
export default useAddTicket;
