import { removeUser } from "@/services/users/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteUser, isPending: isRemoveLoading } = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
  return { deleteUser, isRemoveLoading };
};
export default useRemoveUser;
