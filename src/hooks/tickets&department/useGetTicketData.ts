import { getSingleTicketData } from "@/services/tickets&departments/ticketServices";
import { useQuery } from "@tanstack/react-query";

const useGetTicketData = (ticketId: string) => {
  const { data: ticket, isPending: isTicketLoading } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => getSingleTicketData(ticketId),
 
  });
  return { ticket, isTicketLoading };
};
export default useGetTicketData;
