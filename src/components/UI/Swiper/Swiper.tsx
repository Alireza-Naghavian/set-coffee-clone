"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper-bundle.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay } from "swiper/modules";
import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
function SwiperSlider() {
  return (
    <div className="relative">
      <div className="!h-full relative !w-full">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <ResponsiveImage
              dimensions="!w-full lg:h-[95vh] md:h-[80vh] sm:h-[65vh] h-[35vh] object-cover"
              alt="setCoffee"
              src={"/images/slider_1.jpg"}
              priority={true}
              blurDataURL="/images/slider_1.jpg"
              imageStyles="o"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ResponsiveImage
              dimensions="!w-full lg:h-[95vh] md:h-[80vh] sm:h-[65vh] h-[35vh] object-cover"
              alt="setCoffee"
              src={"/images/slider_3.jpg"}
              priority={true}
              blurDataURL="/images/slider_3.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ResponsiveImage
              dimensions="!w-full lg:h-[95vh] md:h-[80vh] sm:h-[65vh] h-[35vh] object-cover"
              alt="setCoffee"
              src={"/images/slider_4.jpg"}
              priority={true}
              blurDataURL="/images/slider_4.jpg"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperSlider;
