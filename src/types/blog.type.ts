import { GetMetype } from "./auth.type";

export type BlogsCard = {
  cover: string;
  title: string;
  shortDesc: string;
};
export type MainBlogType = Pick<BlogsCard, "cover" | "shortDesc" | "title"> & {
  longDesc: string;
  provider: GetMetype;
};
