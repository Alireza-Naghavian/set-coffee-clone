"use client";
import BlogCard from "@/components/Shared-components/BlogCard/BlogCard";
import React, { Suspense } from "react";
import BlogsPagination from "./BlogsPagination";
import { MainBlogType } from "@/types/blog.type";
import useGetAllBlogs from "@/hooks/blogs/useGetAllBlogs";
import Loader from "@/components/UI/loader/Loader";

function AllBlogs({ allBlogs }: { allBlogs: MainBlogType[] }) {
  const { blogs, isBlogsLoading } = useGetAllBlogs(allBlogs);
 if(isBlogsLoading){
  <div className="flex items-center gap-x-2">
  <Loader loadingCondition={isBlogsLoading} />
  <span>درحال بارگزاری...</span>
</div>;
 }
  return (
    <div className="flex justify-between flex-col w-full mt-8 px-4 sm:px-8 ">
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 mx-auto gap-y-8 ">
        {blogs.map((blog: MainBlogType) => {
          if(blog._id !== undefined)
          return (
            <BlogCard
            {...blog}
            isBlogsLoading={isBlogsLoading}
            />
          );
        })}
      </div>
      <div className="mt-10 flex-center w-full">
        <Suspense>
          <BlogsPagination />
        </Suspense>
      </div>
    </div>
  );
}

export default AllBlogs;
