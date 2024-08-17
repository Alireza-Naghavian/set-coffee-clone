import { logOutUser } from "@/services/users/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useLogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate:logout, isPending } = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      router.replace("/")
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
      toast.success("خروج موفقیت آمیز");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { logout, isPending };
};
export default useLogOut;
