import { useAlert } from "@/app/context/AlertContext";
import { updateUserProfile } from "@/services/users/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data: any) => {
      showAlert("success", data);
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
      queryClient.refetchQueries({ queryKey: ["getMe"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { updateProfile, isUpdating };
};
export default useUpdateUserProfile;
