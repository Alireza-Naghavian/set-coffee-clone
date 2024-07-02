import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import { customeBlurDataURL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function LogoLink() {
  return (
    <Link href={"/"} className=" 
     flex-center mx-auto my-auto">
      <ResponsiveImage
       alt="set coffee"
       imageStyles="object-cover"
       src={"/images/logo.png"}
       priority={true}
       dimensions=" w-[171px] h-[43px]"
       blurDataURL={"/images/logo.png"?? customeBlurDataURL}
      />
    </Link>
  );
}

export default LogoLink;
