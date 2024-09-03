import { useAlert } from "@/app/context/AlertContext";
import { createNewOffCode } from "@/services/offerCodes/offerCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateOfferCode = () => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const { mutateAsync: addNewOffCode, isPending: isCreateLoading } =
    useMutation({
      mutationFn: createNewOffCode,
      onSuccess: (data) => {
        showAlert("success", data?.message);
        queryClient.invalidateQueries({ queryKey: ["offerCodes"] });
      },
      onError: (err: any) => {
        showAlert("error", err?.response?.data?.message);
      },
    });
  return { addNewOffCode, isCreateLoading };
};
export default useCreateOfferCode;
