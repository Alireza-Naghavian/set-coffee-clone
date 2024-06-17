"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import "./swiper-bundle.min.css"
import { register } from "swiper/element/bundle";
function Swiper() {
  useEffect(() => {
    register();
  }, []);
  return (
    <div className="relative">
      <div className="!h-full relative !w-full">
        <swiper-container slides-per-view="1" loop="true" autoplay="true">
          <swiper-slide>
            <Image
              width={1920}
              priority={true}
              height={1200}
              src={"/images/slider_1.jpg"}
              alt="seCoffee"
              className="!h-full !w-full object-cover"
            />
          </swiper-slide>
          <swiper-slide>
            <Image
              width={1920}
              height={1200}
              priority={true}
              src={"/images/slider_3.jpg"}
              alt="seCoffee"
              className="!h-full !w-full object-cover"
            />
          </swiper-slide>
          <swiper-slide>
            <Image
              width={1920}
              height={1200}
              priority={true}
              src={"/images/slider_4.jpg"}
              alt="seCoffee"
              className="!h-full !w-full object-cover"
            />
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Swiper;
