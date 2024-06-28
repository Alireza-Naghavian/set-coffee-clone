import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import { SingleProductType } from "@/types/models/categories.type";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper-bundle.min.css";
import "./swiper.css";
const productData: SingleProductType = {
  cover: "/images/sample.jpeg",
  title: "دانه قهوه کلمبیا بدون کافئین (Decaf)مقدار ۲۵۰گرم ",
  price: 149000,
  category: "",
  longDesc: "",
  shortDesc: "",
  smell: "",
  suitableFor: "",
  tags: "",
  weight: "",
  score: 5,
};
function RelateProductSlider() {
  return (
    <div className="relative">
      <div className=" relative ">
        <Swiper
          slidesPerView={4}
          loop={false}
          navigation={true}
          pagination={{ clickable: true }}
          spaceBetween={0}

          modules={[ Navigation, Pagination]}
        >
          <SwiperSlide>
            <ProductCard productData={productData} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard productData={productData} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard productData={productData} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard productData={productData} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard productData={productData} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard productData={productData} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard productData={productData} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard productData={productData} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default RelateProductSlider;
