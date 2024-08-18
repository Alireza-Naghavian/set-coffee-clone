import { useAlert } from "@/app/context/AlertContext";
import { useOfferCode } from "@/services/offerCodes/offerCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useApplyOfferCode = () => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const { mutateAsync: applyCode, isPending: isApplying } = useMutation({
    mutationFn: useOfferCode,
    onSuccess: (data) => {
      showAlert("success", data?.message);
      queryClient.invalidateQueries({ queryKey: ["offerCodes"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { applyCode, isApplying };
};
export default useApplyOfferCode;
