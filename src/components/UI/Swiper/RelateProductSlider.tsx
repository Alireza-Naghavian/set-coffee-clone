import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import { SingleProductType } from "@/types/models/categories.type";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper-bundle.min.css";
import "./swiper.css";
function RelateProductSlider({
  productData,
}: {
  productData: SingleProductType[] | [];
}) {
  return (
    <div className="relative">
      <div className=" relative ">
        <Swiper
          loop={false}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            "320": {
              slidesPerView: 1,
            },
            "500": {
              slidesPerView: 1,
            },
            "640": {
              slidesPerView: 3,
            },
            "768": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "1024": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[Navigation, Pagination]}
        >
          {productData?.map((productData) => {
            return (
              <SwiperSlide key={productData._id}>
                <ProductCard productData={productData} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default RelateProductSlider;
