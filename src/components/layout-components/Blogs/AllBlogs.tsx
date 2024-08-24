"use client";
import BlogCard from "@/components/Shared-components/BlogCard/BlogCard";
import Loader from "@/components/UI/loader/Loader";
import Pagination from "@/components/UI/Pagination/Pagination";
import useGetAllBlogs from "@/hooks/blogs/useGetAllBlogs";
import { MainBlogType } from "@/types/blog.type";
import { useState } from "react";

function AllBlogs({ allBlogs }: { allBlogs: MainBlogType[] }) {
  const [page, setPage] = useState<number>(1);
  const { blogs, isBlogsLoading } = useGetAllBlogs({allBlogs,page});
  if (isBlogsLoading) {
    <div className="flex items-center gap-x-2">
      <Loader loadingCondition={isBlogsLoading} />
      <span>درحال بارگزاری...</span>
    </div>;
  }
  return (
    <div className="flex justify-between flex-col w-full mt-8 px-4 sm:px-8 ">
      <div
        className="relative grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
       gap-x-4 sm:gap-x-8 mx-auto gap-y-8 "
      >
        {blogs?.blogs?.map((blog: MainBlogType) => {
          if (blog._id !== undefined)
            return <BlogCard key={blog._id} {...blog} isBlogsLoading={false} />;
        })}
      </div>
      <div className="mt-10 flex-center w-full">
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          pageSize={parseInt(blogs?.pageSize || "8")}
          totalCount={blogs?.totalBLogs}
        />

      </div>
    </div>
  );
}

export default AllBlogs;
