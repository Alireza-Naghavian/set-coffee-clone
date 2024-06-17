import { MiniCardType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosClose } from "react-icons/io";

function MiniProductCard({ cover, price, rate, title }: MiniCardType) {
  return (
    <Link href={"#"}>
      <li className=" pb-4 !border-b !border-b-blue-500  last:border-b-0   mt-2">
        <div className="flex gap-x-2 w-full">
          <div className="sm:w-[100px]">
            <Image
              width={800}
              height={800}
              src={cover}
              className="w-full h-full object-cover"
              alt={title}
            />
          </div>
          <div className="desc flex gap-x-2 my-auto pl-2">
            <div className="h-full">
              <h2 className="text-main tracking-tighter text-sm w-[130px] line-clamp-2 font-Shabnam_M">
                {title}
              </h2>
              <p className="text-sm font-Shabnam_B my-1">
                امتیاز:
                <span className="text-xs"> {rate}</span>
              </p>
              <p className="text-xs flex items-center gap-x-1">
                1 ×
                <span className="text-sm font-Shabnam_M flex gap-x-1 ">
                  <span>{price.toLocaleString()}</span>
                  <span>تومان</span>
                </span>
              </p>
            </div>
            <IoIosClose size={28} />
          </div>
        </div>
      </li>
    </Link>
  );
}

export default MiniProductCard;
