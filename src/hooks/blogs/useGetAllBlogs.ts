import { getAllBlogs } from "@/services/blogs/blogsServices";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { MainBlogType } from './../../types/blog.type';

const useGetAllBlogs = ({limit="8",page ,allBlogs}:{limit?:string,page?:number,allBlogs?:MainBlogType[]}) => {
  const location = useSearchParams();
  const queryParams = new URLSearchParams(location);
  if(page !== undefined ){

    queryParams.set("page",  page.toString()); 
    queryParams.set("limit", limit);
  }
  const { data: blogs, isPending: isBlogsLoading } = useQuery({
    queryKey: ["blogs",queryParams.toString()],
    queryFn: ()=>getAllBlogs(queryParams,limit),
    staleTime:0,
    gcTime:5*60*1000,
    initialData:allBlogs,
   
  });
  return { blogs, isBlogsLoading };
};
export default useGetAllBlogs;
