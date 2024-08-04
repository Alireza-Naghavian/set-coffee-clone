import { AddNewTicket } from "@/services/tickets&departments/ticketServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddTicket = () => {
  const { mutateAsync: addTicket, isPending: isAddLoading } = useMutation({
    mutationFn: AddNewTicket,
    onSuccess: (data: any) => {
      toast.success(data?.message);
    },
    onError:(err:any)=>{
        toast.error(err?.reseponse?.data?.message)
    }
  });
  return { addTicket, isAddLoading };
};
export default useAddTicket;
