"use client"
import Loader from "@/components/UI/loader/Loader";
import useGetAllBlogs from "@/hooks/blogs/useGetAllBlogs";
import { MainBlogType } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function LastBlogs() {
  const { blogs } = useGetAllBlogs({ limit: "8" });
  return (
    <div>
      {blogs?.blogs?.slice(0, 2).map((blog:MainBlogType) => {
        if(blog.createdAt !==undefined)
        return (
          <MinBlogCard
          key={blog._id}
            cover={blog.cover}
            title={blog.title}
            publishDate={  new Date(blog.createdAt).toLocaleDateString("fa-Ir") }
          />
        );
      })}
    </div>
  );
}

const MinBlogCard = ({title,publishDate,cover}:
{title:string,publishDate:string,cover:string})=>{
    return(
        <Link
        href=""
        className="max-w-[265px] py-4 flex gap-x-4 border-b 
        last:border-b-0 border-b-gray-300/55"
        >
        <Image
        width={800}
        height={600}
        src={cover}
        className="w-[85px] h-[70px] object-cover"
        alt=""
        />
        <div className="flex flex-col gap-y-2">
          <span className="text-white text-sm font-Shabnam_M">
          {title}
          </span>
          <span className="text-gray-300">{publishDate}</span>
        </div>
      </Link>
      
    )
}
export default LastBlogs;
