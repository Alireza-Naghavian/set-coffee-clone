import { Url } from "next/dist/shared/lib/router/router";
import { GetMetype } from "./auth.type";

export type BlogsCard = {
  cover: string;
  title: string;
  shortDesc: string;
  identifier:string
};
export type MainBlogType = Pick<BlogsCard, "shortDesc" | "title"> & {
  longDesc: string;
  isActiveNotif?:boolean;
  provider: GetMetype;
  cover: string;
  createdAt?:Date
  _id?:string
};
