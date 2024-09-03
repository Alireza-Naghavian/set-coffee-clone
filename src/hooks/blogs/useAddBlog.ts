import { useAlert } from "@/app/context/AlertContext";
import { addNewBlogs } from "@/services/blogs/blogsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddBlog = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { mutateAsync: addBlog, isPaused: isAddLoading } = useMutation({
    mutationFn: addNewBlogs,
    onSuccess: (data) => {
      showAlert("success", data?.message);
      queryClient.invalidateQueries({queryKey:["blog"]})
      queryClient.invalidateQueries({queryKey:["blogs"]})
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { addBlog, isAddLoading };
};
export default useAddBlog;
