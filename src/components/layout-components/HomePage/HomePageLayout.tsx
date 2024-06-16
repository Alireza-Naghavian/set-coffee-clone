"use client";
import Swiper from "@/components/UI/Swiper/Swiper";
import React, { useEffect } from "react";
import { register } from "swiper/element/bundle";
function HomePageLayout() {
  useEffect(() => {
    register();
  }, []);
  return (
    <>
      <div className="w-full">
        <Swiper />
      </div>
    </>
  );
}

export default HomePageLayout;
