import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import HeaderTitle from "@/components/UI/HeaderTitle/HeaderTitle";
import Swiper from "@/components/UI/Swiper/Swiper";
const productData = {
  cover: "/images/sample.jpeg",
  title: "دانه قهوه کلمبیا بدون کافئین (Decaf)مقدار ۲۵۰گرم ",
  price: 149000,
};
function HomePageLayout() {
  return (
    <>
      <div className="w-full">
        <Swiper />
      </div>
      {/* below code have to change in unit compontent */}
      <div className="mt-[90px]">
        <HeaderTitle title="انواع قهوه" subTitle={"coffee"} />
        <div className="mt-5 ">
          <div className="sm:px-8 px-2 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-2 md:gap-x-8 gap-x-2 gap-y-6 !lg:container">
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
        
          </div>
        </div>
      </div>
      <div className="mt-[90px]">
        <HeaderTitle title="کپسول های SETPRESSO" subTitle={"سازگار با دستگاه نسپرسو"} />
        <div className="mt-5 ">
          <div className="sm:px-8 px-2 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-2 md:gap-x-8 gap-x-2 gap-y-6 !lg:container">
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          
          </div>
        </div>
      </div>
      <div className="mt-[90px]">
        <HeaderTitle title="یک کیلویی ها" subTitle={"فروش سازمانی"} />
        <div className="mt-5 ">
          <div className="sm:px-8 px-2 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-2 md:gap-x-8 gap-x-2 gap-y-6 !lg:container">
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          <ProductCard productData={productData}/>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageLayout;
