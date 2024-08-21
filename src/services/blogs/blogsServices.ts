import { MainBlogType } from "@/types/blog.type";
import api from "../httpServices";

export const addNewBlogs = async ({ data }: { data: MainBlogType }) => {
  return api.post("blogs/add", data).then((response) => response.data);
};
