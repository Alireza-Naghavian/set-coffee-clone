"use client";
import ProductComments from "@/components/Shared-components/ProductDetails/ProductComments";
import ProductDescription from "@/components/Shared-components/ProductDetails/ProductDescription";
import ProductShortDetail from "@/components/Shared-components/ProductDetails/ProductShortDetail";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import RelateProductSlider from "@/components/UI/Swiper/RelateProductSlider";
import TabSelection from "@/components/UI/TabSelection/TabSelection";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import useGetSingleProduct from "@/hooks/product/useGetSingleProduct";
import { SingleProductType } from "@/types/models/categories.type";
import { CommentModeltype } from "@/types/models/comment.type";
import { customeBlurDataURL } from "@/utils/constants";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
function ProductPageLayout({
  initialProductData,
}: {
  initialProductData: SingleProductType;
}) {
  const [activeTab, setActiveTab] = useState<string>("desc");
  const { productId }: { productId: string } = useParams();
  const { product } = useGetSingleProduct(productId, initialProductData);
  const filterAcceptableComments = product?.ProductComment?.filter(
    (comment: CommentModeltype) => {
      return comment.isAccept;
    }
  );
  return (
    <div className="relative">
      <div
        className={`w-full relative mx-auto  
           sm:px-8 px-4 lg:mt-[180px] md:mt-[100px] mt-[20px] `}
      >
        <div
          className={` flex   w-full gap-x-4  md:!flex-row 
            flex-col justify-center items-center`}
        >
          {/* right side */}

          <ResponsiveImage
            dimensions={`md:w-1/2 object-cover md:!h-[380px] w-[min(500px,75vw)] 
              !pb-32 sm:h-[calc(100vh-100px)] xs:h-[calc(100vh-300px)]  lg:h-[400px] md:self-start`}
            src={product?.cover}
            imageStyles="md:object-contain object-cover !w-full !h-full"
            blurDataURL={product?.cover}
            priority
            onError={(e) => (e.currentTarget.src = customeBlurDataURL)}
            alt={product?.title}
          />

          {/* left side */}
          <div
            className={`sm:mt-0 flex lg:pr-12  pr-2 flex-col  mt-8  items-end   
               w-full  lg:gap-y-2 gap-y-4  `}
          >
            {/* breadcrumb */}
            <Breadcrumb
              firstTarget={"/"}
              firstTitle={"خانه"}
              nestedStep={2}
              nestedLinks={[
                {
                  target: `/${product?.category?._id}`,
                  title: product?.category?.title,
                },
                {
                  title: product?.title,
                  target: `/category/${product?._id}`,
                },
              ]}
            />
            {/* product title & short desc */}

            <div className="sm:mt-8 mt-12  child:font-Shabnam_B  child:text-2xl sm:child:text-3xl child:text-right ml-auto  child:tracking-tight">
              <h1>{product?.title}</h1>
            </div>
            {/* product rate */}
            <div className="ml-auto mt-6">
              <ProductRate
                dynamicScore={product?.score}
                filterAcceptableComments={filterAcceptableComments}
              />
            </div>
            {/* product price */}
            <div className="ml-auto mt-4 child:text-main child:text-2xl child:font-Shabnam_M">
              <span> {product?.price?.toLocaleString("fa-Ir")} تومان</span>
            </div>
            {/* short desc */}
            <div className="w-full mt-4 border-b-2 pb-4 ">
              <div className="flex max-w-[700px]  sm:max-h-[200px] w-full">
                <p className="w-full h-full text-justify text-[#777777]">
                  {product?.shortDesc}
                </p>
              </div>
            </div>
            {/* add to basket & like & compare  */}
            <div className="flex flex-col mt-8 ml-auto gap-y-2 border-b-2 pb-4 w-full">
              <ProductCounter />
              <div className="flex gap-x-4 text-[15px] font-Shabnam_M items-center child:flex child:items-center child:gap-x-2 mt-2">
                <button>
                  <FaRegHeart />
                  <span>افزودن به علاقمندی ها</span>
                </button>
                <button>
                  <FaShuffle />
                  <span>مقایسه</span>
                </button>
              </div>
            </div>
            {/* tegs & category title */}
            <div className="flex flex-col mt-8 ml-auto gap-y-2 border-b-2 pb-4 w-full">
              <div className="flex gap-x-2 items-center  text-main text-right">
                <p className="font-Shabnam_B">دسته :</p>
                <p className="text-sm  mt-1">{product?.category?.title}</p>
              </div>
              <div className="flex gap-x-4 lg:gap-x-2 items-center  text-main text-right">
                <span className="font-Shabnam_B">برچسب </span>
                <span className="text-sm  lg:mt-1">{product?.tags}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <TabSelection
            filterAcceptableComments={filterAcceptableComments}
            comments="comments"
            desc="desc"
            moreDetail="moreDetail"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          >
            {activeTab === "desc" ? (
              <ProductDescription productDesc={product?.longDesc} />
            ) : activeTab === "moreDetail" ? (
              <ProductShortDetail
                smell={product?.smell}
                suitableFor={product?.suitableFor}
                weight={product?.weight}
              />
            ) : (
              <ProductComments
                productId={product?._id}
                commentFor={product?.title}
                filterAcceptableComments={filterAcceptableComments}
              />
            )}
          </TabSelection>
          <div className="mt-16 xl:px-[70px]">
            <p className="text-2xl font-Shabnam_B text-dark_shade mb-8">
              محصولات مرتبط
            </p>
            <RelateProductSlider productData={product?.category?.products} />
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductRate = ({
  filterAcceptableComments,
  dynamicScore,
}: {
  filterAcceptableComments: CommentModeltype[] | [];
  dynamicScore: number;
}) => {
  return (
    <>
      <div className="flex   text-[26px] ">
        {filterAcceptableComments?.length ? (
          <>
            {Array(dynamicScore)
              .fill(0)
              .map((_, index) => {
                return <FaStar key={index} className="text-[#FFCE00]" />;
              })}
            {Array(5 - dynamicScore)
              .fill(0)
              .map((_, index) => {
                return <FaRegStar key={index} />;
              })}
          </>
        ) : (
          <>
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar key={index} className="text-[#FFCE00]" />
            ))}
          </>
        )}
        <div className="flex-center my-auto  child:font-Shabnam_M child:text-base mr-2 mt-px child:text-main_green_dark">
          <p>
            (دیدگاه {filterAcceptableComments?.length.toLocaleString("fa-Ir")}
            کاربر)
          </p>
        </div>
      </div>
    </>
  );
};

const ProductCounter = () => {
  return (
    <>
      <div className="flex gap-x-3 items-center">
        <div className="flex gap-x-0 items-center child:text-base child:py-2 child:px-3 child:font-bold child:border">
          <button className="tr-200 hover:text-white hover:bg-main_brown">
            -
          </button>
          <span>1</span>
          <button className="tr-200 hover:text-white hover:bg-main_brown">
            +
          </button>
        </div>
        <MainBtn size="small">افزودن به سبد خرید</MainBtn>
      </div>
    </>
  );
};
export default ProductPageLayout;
