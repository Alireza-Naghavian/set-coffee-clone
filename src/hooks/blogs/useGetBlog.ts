import { getSingleBlog } from "@/services/blogs/blogsServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useGetBlog = (blogId: string) => {
  const { data: blogData, isPending: isBlogLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getSingleBlog(blogId),
  });
  return { isBlogLoading, blogData };
};
export default useGetBlog;
