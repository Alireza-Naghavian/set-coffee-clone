import { updateUserProfile } from "@/services/users/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data: any) => {
      toast.success(data);
      queryClient.invalidateQueries({queryKey:["getMe"]})
      queryClient.refetchQueries({queryKey:["getMe"]})
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { updateProfile, isUpdating };
};
export default useUpdateUserProfile;
