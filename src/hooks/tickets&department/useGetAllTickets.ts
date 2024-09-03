import { getAllTickets } from "@/services/tickets&departments/ticketServices";
import { useQuery } from "@tanstack/react-query";

const useGetAllTickets = () => {
  const { data: tickets, isPending: isTicketsLoading } = useQuery({
    queryKey: ["allTickets"],
    queryFn: getAllTickets,
  });
  return { tickets, isTicketsLoading };
};
export default useGetAllTickets;
