"use client";
import BlogsCard from "@/components/Shared-components/ProductCard/BlogsCard";
import Loader from "@/components/UI/loader/Loader";
import useGetAllBlogs from "@/hooks/blogs/useGetAllBlogs";
import { MainBlogType } from "@/types/blog.type";
import React from "react";

function BlogCardHomePage({ allBlogs }: { allBlogs: MainBlogType[] }) {
  const { isBlogsLoading, blogs } = useGetAllBlogs({ limit: "8", allBlogs });
  if (isBlogsLoading) {
    return <Loader loadingCondition={isBlogsLoading} />;
  }
  return (
    <>
      {blogs?.blogs?.slice(0, 3).map((blog: MainBlogType) => {
        if (blog.createdAt === undefined || blog._id === undefined) return;
        return (
          <React.Fragment key={blog._id}>
            <BlogsCard
            identifier={blog?._id}
              publishDay={new Date(blog.createdAt).toLocaleDateString("fa-Ir", {
                day: "2-digit",
              })}
              PublishMonth={new Date(blog.createdAt).toLocaleDateString(
                "fa-Ir",
                { month: "long" }
              )}
              category={"قهوه"}
              title={blog.title}
              cover={blog.cover}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default BlogCardHomePage;
