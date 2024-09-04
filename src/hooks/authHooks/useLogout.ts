import { useAlert } from "@/app/context/AlertContext";
import { logOutUser } from "@/services/users/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logOutUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
      router.replace("/");
      router.refresh();
      showAlert("success", "خروج موفقیت آمیز");
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { logout, isPending };
};
export default useLogOut;
