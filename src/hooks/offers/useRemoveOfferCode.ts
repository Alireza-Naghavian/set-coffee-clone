import { useAlert } from "@/app/context/AlertContext";
import { removeOfferCode } from "@/services/offerCodes/offerCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveOfferCode = () => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const { mutateAsync: removeOffer, isPending: isRemoveLoading } = useMutation({
    mutationFn: removeOfferCode,
    onSuccess: (data) => {
      showAlert("success", data?.message);
      queryClient.invalidateQueries({ queryKey: ["offerCodes"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { removeOffer, isRemoveLoading };
};
export default useRemoveOfferCode;
