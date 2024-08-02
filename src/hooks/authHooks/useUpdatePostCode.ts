import { UpdateUserPostCode } from "@/services/users/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdatePostCode = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: UpdatePostCode, isPending: isUpdating } = useMutation({
    mutationFn: UpdateUserPostCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
    },
  });
  return { UpdatePostCode, isUpdating };
};
export default useUpdatePostCode;
