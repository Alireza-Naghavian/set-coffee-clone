import { MainBlogType } from "@/types/blog.type";
import api from "../httpServices";

export const addNewBlogs = async ({ data }: { data: MainBlogType }) => {
  return api.post("blogs/add", data).then((response) => response.data);
};

export const getAllBlogs = async (queryParams:URLSearchParams,limit?:string) => {
  return api.get(`/blogs?${queryParams?.toString()}`).then((response) => response.data);
};

export const getSingleBlog =async(blogId:string)=>{
return api.get(`/blogs/add/${blogId}`).then((response)=>response.data)
}
export const removeBlog =async (blogId:string)=>{
  return api.delete(`/blogs/add/${blogId}`).then((response)=>response.data)
}