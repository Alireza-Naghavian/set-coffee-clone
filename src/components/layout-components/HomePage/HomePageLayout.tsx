import BlogsCard from "@/components/Shared-components/ProductCard/BlogsCard";
import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import HeaderTitle from "@/components/UI/HeaderTitle/HeaderTitle";
import Swiper from "@/components/UI/Swiper/Swiper";
import WhySetCoffee from "@/components/UI/WhySetCoffee/WhySetCoffee";
import {
  SingleProductType,
  categoriesType,
} from "@/types/models/categories.type";
import Image from "next/image";

interface FilteredProdouctsType extends categoriesType {
  productCount?: number;
}
async function HomePageLayout({
  filteredProdoucts,
}: {
  filteredProdoucts: FilteredProdouctsType[];
}) {
  return (
    <>
      <div className="w-full">
        <Swiper />
      </div>
      <div className="mt-[70px]">
        <HeaderTitle
          title={filteredProdoucts[0]?.title}
          subTitle={"Coffee Capsule"}
        />
        <div className="mt-5 ">
          <div className="sm:px-8 px-2 grid  lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-1  gap-x-2 gap-y-6 ">
            {filteredProdoucts[0].products
              .slice(0, 10)
              .map((product: SingleProductType) => {
                return <ProductCard key={product?._id} productData={product} />;
              })}
          </div>
        </div>
      </div>

      {/* <div className="mt-[70px]">
        <HeaderTitle
          title={filteredProdoucts[1].title}
          subTitle={"قهوه تجاری"}
        />
        <div className="mt-5 ">
          <div className="sm:px-8 px-2 grid  lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-1  gap-x-2 gap-y-6 ">
            {filteredProdoucts[1].products
              .slice(0, 10)
              .map((product: SingleProductType) => {
                return <ProductCard key={product?._id} productData={product} />;
              })}
          </div>
        </div>
      </div> */}
      <div className="sm:mt-[70px] mt-10  ">
        <div className="w-full lg:h-[300px] sm:container xs:px-4 px-0">
          <Image
            width={1920}
            height={1080}
            quality={100}
            src="/images/setpresso-860x214.jpg"
            className="w-full h-full "
            alt=""
          />
        </div>
      </div>
      {/* <div className="mt-[70px]">
        <HeaderTitle
          title={filteredProdoucts[3].title}
          subTitle={"قهوه ممتاز"}
        />
        <div className="mt-5 ">
          <div className="sm:px-8 px-2 grid  lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-1  gap-x-2 gap-y-6 ">
            {filteredProdoucts[3].products
              .slice(0, 10)
              .map((product: SingleProductType) => {
                return <ProductCard key={product?._id} productData={product} />;
              })}
          </div>
        </div>
      </div> */}
      <WhySetCoffee />
      <div className="mt-[70px]">
        <HeaderTitle
          title="مقالات ما"
          subTitle={"دانستنی های جذاب دنیای قهوه"}
        />
        <div className="mt-5 ">
          <div className="sm:px-8 px-2 grid sm:grid-cols-3  child:max-w-max grid-cols-1 md:gap-x-8 gap-x-2 gap-y-6 md:container">
            <BlogsCard
              publishDay={"04"}
              PublishMonth={"خرداد"}
              category={"قهوه"}
              title={"آیا کرما برای تهیه اسپرسوی عالی ضروری است ؟"}
              cover={"/images/weblog_cover_1.webp"}
            />
            <BlogsCard
              publishDay={"04"}
              PublishMonth={"خرداد"}
              category={"قهوه"}
              title={"آیا کرما برای تهیه اسپرسوی عالی ضروری است ؟"}
              cover={"/images/weblog_cover_1.webp"}
            />
            <BlogsCard
              publishDay={"04"}
              PublishMonth={"خرداد"}
              category={"قهوه"}
              title={"آیا کرما برای تهیه اسپرسوی عالی ضروری است ؟"}
              cover={"/images/weblog_cover_1.webp"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageLayout;
