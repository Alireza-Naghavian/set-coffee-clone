import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper-bundle.min.css";
function RelateProductSlider() {
  return (
    <div className="relative">
      <div className="!h-full relative !w-full">
        <Swiper
          slidesPerView={4}
          loop={false}
          navigation={true}
          pagination={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, Pagination]}
        >
          <SwiperSlide>
            <ProductCard productData={}/>
          </SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default RelateProductSlider;
