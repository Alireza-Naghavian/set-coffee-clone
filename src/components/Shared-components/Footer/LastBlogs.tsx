"use client"
import useGetAllBlogs from "@/hooks/blogs/useGetAllBlogs";
import { MainBlogType } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";

function LastBlogs() {
  const { blogs } = useGetAllBlogs({ limit: "8" });
  return (
    <div>
      {blogs?.blogs?.slice(0, 2).map((blog:MainBlogType) => {
        if(blog.createdAt !==undefined && blog._id !==undefined)
        return (
          <MinBlogCard
          key={blog._id}
          identifier={blog._id}
            cover={blog.cover}
            title={blog.title}
            publishDate={  new Date(blog.createdAt).toLocaleDateString("fa-Ir") }
          />
        );
      })}
    </div>
  );
}

const MinBlogCard = ({title,publishDate,cover,identifier}:
{title:string,publishDate:string,cover:string,identifier:string})=>{
    return(
        <Link
        href={`/blogs/${identifier}`}
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
