import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import { BlogsCard } from "@/types/blog.type";
import Link from "next/link";
import React from "react";

function BlogCard({ cover, shortDesc, title }: BlogsCard) {
  return (
    <div className="relative  flex flex-col  gap-y-2 bg-gray-100">
      <Link className="w-full h-full relative" href={""}>
      <ResponsiveImage
        dimensions="w-full h-[250px] sm:h-[300px]  "
        imageStyles="w-full h-full object-cover"
        src={cover}
        alt={title}
        
        blurDataURL={cover}
      />
          <div
          className="w-[53px] h-[56px] absolute top-0 child:font-Shabnam_M !z-50  child:text-lg 
                child:text-main flex flex-col
                    gap-y-px ml-auto 
                    justify-center shadow-md 
                    items-center bg-white mt-[15px] mr-[15px] ">
          <span>۰۴ </span>
          <span>خرداد</span>
        </div>
      </Link>
     <div className=" w-full flex flex-col gap-y-3 py-2 px-3">
     <Link href={""} className="text-right font-Shabnam_B mt-2 text-dark_shade ">
        {title}
      </Link>
      <p className="line-clamp-3 w-full text-mute  ">{shortDesc}</p>
      <Link
        className="text-white bg-main_brown px-2 py-1 rounded-md mr-auto"
        href={""}
      >
        ادامه مطلب
      </Link>
     </div>
    </div>
  );
}

export default BlogCard;
