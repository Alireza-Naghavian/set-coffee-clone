import { getAllBlogs } from "@/services/blogs/blogsServices";
import { MainBlogType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

const useGetAllBlogs = (allBlogs?:MainBlogType[]) => {
  const { data: blogs, isPending: isBlogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    initialData:allBlogs
  });
  return { blogs, isBlogsLoading };
};
export default useGetAllBlogs;
