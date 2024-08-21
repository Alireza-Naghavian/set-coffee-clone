import { getAllBlogs } from "@/services/blogs/blogsServices";
import { useQuery } from "@tanstack/react-query";

const useGetAllBlogs = () => {
  const { data: blogs, isPending: isBlogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
  return { blogs, isBlogsLoading };
};
export default useGetAllBlogs;
