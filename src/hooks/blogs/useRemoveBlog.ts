import { useAlert } from "@/app/context/AlertContext";
import { removeBlog } from "@/services/blogs/blogsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveBlog = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutateAsync: deleteBlog, isPending: isRemoveLoading } = useMutation({
    mutationFn: removeBlog,
    onSuccess: (data) => {
      showAlert("success", data?.message);
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { deleteBlog, isRemoveLoading };
};

export default useRemoveBlog;
