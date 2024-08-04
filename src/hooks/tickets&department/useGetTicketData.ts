import { getSingleTicketData } from "@/services/tickets&departments/ticketServices";
import { TicketType } from "@/types/models/ticket.type";
import { useQuery } from "@tanstack/react-query";

const useGetTicketData = (ticketId: string,initData:TicketType[]) => {
  const { data: ticket, isPending: isTicketLoading } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => getSingleTicketData(ticketId),
    initialData:initData
  });
  return { ticket, isTicketLoading };
};
export default useGetTicketData;
