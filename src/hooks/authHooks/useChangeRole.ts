import { updateUserRole } from "@/services/users/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useChangeRole = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateRole, isPending: isRoleUpdate } = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
  return { updateRole, isRoleUpdate };
};
export default useChangeRole;
