import { ChildrenProps } from "@/types/global.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
function layout({ children }: ChildrenProps) {
  return (
    <div className="w-full   h-screen flex items-center">
      <div className="w-1/2  bg-main h-full hide">
        <Image
          src={"/images/coffee-brain.webp"}
          className="!h-full !w-full "
          quality={80}
          width={1920}
          priority={true}
          height={1080}
          alt=""
        />
      </div>
      <div className="w-1/2 overflow-y-auto   sibling_divider sm:flex-center my-auto flex-col  bg-slate-100/20">
        {children}

        <Link
          href={"/"}
          className="text-main font-Shabnam_M w-fit   mx-auto block text-center mt-4  ">
          لغو
        </Link>
      </div>
    </div>
  );
}

export default layout;
