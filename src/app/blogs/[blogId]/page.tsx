import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import SingleBlogPage from "@/components/layout-components/Blogs/SingleBlogPage";
import BlogsModel from "@/models/blogs/blogs";
import dataParser from "@/utils/dataParser/dataParser";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import React from "react";
type SingleBlogType = {
  blogId: string;
};
async function page({ params }: { params: SingleBlogType }) {
  const { blogId } = params;
  if (!isValidObjectId(blogId)) return notFound();
  const blogData = await BlogsModel.findOne({ _id: blogId }, "-__v -updatedAt")
    .populate("provider", "userName")
    .lean();
  return (
    <QueryClientProviderWrapper>
      <SingleBlogPage blogData={dataParser(blogData)} />
    </QueryClientProviderWrapper>
  );
}

export default page;
