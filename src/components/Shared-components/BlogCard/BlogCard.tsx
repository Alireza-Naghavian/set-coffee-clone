import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import { BlogsCard, MainBlogType } from "@/types/blog.type";
import Link from "next/link";
import React from "react";

function BlogCard({ cover, shortDesc, title,_id,provider,createdAt,isBlogsLoading }: MainBlogType&{isBlogsLoading:boolean}) {
  if(_id === undefined) return
  return (
    <div className="relative  flex flex-col   gap-y-2 bg-gray-100">
      <Link className="w-full h-full relative " href={`blogs/${_id}`}>
      <ResponsiveImage
        className="w-full h-[250px] sm:h-[300px]  "
        imageStyles="w-full h-full object-cover !absolute "
        src={cover}
        alt={title}
        blurDataURL={cover}/>
          <div
          className=" h-[56px]      absolute top-0 child:font-Shabnam_M !z-50  child:text-lg 
                child:text-main flex flex-col
                    gap-y-px ml-auto 
                    justify-center shadow-md 
                    items-center bg-white mt-[15px] mr-[15px] ">
          <span className="!px-2">{createdAt&& new Date(createdAt).toLocaleDateString("fa-Ir",{day:"2-digit"})} </span>
          <span className="!px-2">{createdAt&& new Date(createdAt).toLocaleDateString("fa-Ir",{month:"long"})}</span>
        </div>
        <span className={`w-full h-[40px] bg-gray-100 shadow-none outline-none absolute bottom-0 ${isBlogsLoading ? "hidden" : "block"}`}></span>
      </Link>
     <div className=" w-full flex flex-col gap-y-3 py-2  px-3 -mt-6 ">
     <Link href={`blogs/${_id}`} className="text-right font-Shabnam_B mt-2 text-dark_shade ">
        {title}
      </Link>
      <p className="line-clamp-3 w-full text-mute  ">{shortDesc}</p>
      <Link
        className="text-white bg-main_brown px-2 py-1 rounded-md mr-auto"
        href={`blogs/${_id}`}
      >
        ادامه مطلب
      </Link>
     </div>
    </div>
  );
}

export default BlogCard;
