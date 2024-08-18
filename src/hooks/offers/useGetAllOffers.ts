import { getAllOffers } from "@/services/offerCodes/offerCodes";
import { useQuery } from "@tanstack/react-query";

const useGetAllOffers = () => {
  const { data: allOfferCodes, isPending: isOfferLoading } = useQuery({
    queryKey: ["offerCodes"],
    queryFn: getAllOffers,
  });
  return { allOfferCodes, isOfferLoading };
};
export default useGetAllOffers;
