import { getSingleBlog } from "@/services/blogs/blogsServices";
import { MainBlogType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

const useGetBlog = (blogId: string,initialData:MainBlogType) => {
  const { data: blogData, isPending: isBlogLoading } = useQuery({
    queryKey: ["blog",blogId],
    queryFn: () => getSingleBlog(blogId),
    initialData
  });
  return { isBlogLoading, blogData };
};
export default useGetBlog;
