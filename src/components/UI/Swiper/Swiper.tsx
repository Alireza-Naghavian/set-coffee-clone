"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper-bundle.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay } from "swiper/modules";
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
            <Image
              width={1920}
              priority={true}
              height={1200}
              src={"/images/slider_1.jpg"}
              alt="seCoffee"
              className="!h-full !w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              width={1920}
              height={1200}
              priority={true}
              src={"/images/slider_3.jpg"}
              alt="seCoffee"
              className="!h-full !w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              width={1920}
              height={1200}
              priority={true}
              src={"/images/slider_4.jpg"}
              alt="seCoffee"
              className="!h-full !w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperSlider;
