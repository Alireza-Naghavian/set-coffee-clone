"use client";
import ProductComments from "@/components/Shared-components/ProductDetails/ProductComments";
import ProductDescription from "@/components/Shared-components/ProductDetails/ProductDescription";
import ProductShortDetail from "@/components/Shared-components/ProductDetails/ProductShortDetail";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import RelateProductSlider from "@/components/UI/Swiper/RelateProductSlider";
import TabSelection from "@/components/UI/TabSelection/TabSelection";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import useMediaQuery from "@/hooks/helper-hooks/useMediaQuery";
import useGetSingleProduct from "@/hooks/product/useGetSingleProduct";
import { CommentModeltype } from "@/types/models/comment.type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
function ProductPageLayout({}) {
  const [activeTab, setActiveTab] = useState<string>("desc");
  const isDesktop = useMediaQuery("(max-width:820px)");
  const { productId }: { productId: string } = useParams();
  const { product, isProductLoading } = useGetSingleProduct(productId);
  const filterAcceptableComments = product?.ProductComment?.filter((comment:CommentModeltype)=>{
    return comment.isAccept
  })

  return (
    <div className="relative">
      <div
        className={`w-[95%] relative mx-auto mt-[10px]  sm:px-8 px-2 ${
          !isDesktop ? "lg:mt-[180px]" : "mt-[20px] "
        }`}
      >
        <div
          className={` flex   w-full gap-x-2 ${
            !isDesktop ? "" : "!flex-col justify-center items-center"
          }`}
        >
          {/* right side */}
          <div
            className={` h-full flex ${!isDesktop ? "!w-[35%] " : " !w-[70%]"}`}>
            {isProductLoading ? (
              <div
                className={`!w-screen !h-screen blur-md ml-4 bg-gray-200 tr-300 ${
                  isProductLoading ? "opacity-100" : "opacity-0"}`}></div>)
                   : 
                   (
                   <Image
                width={600}
                height={600}
                className="!w-full !h-full !object-cover"
                src={product?.cover}
                priority
                onError={(e) => (e.currentTarget.src = "/images/sample.jpeg")}
                alt=""
              />
            )}
          </div>
          {/* left side */}
          <div
            className={`sm:mt-0 flex  flex-col gap-y-4 mt-8 ${
              !isDesktop
                ? "  items-end  w-[65%]"
                : "  w-full flex flex-col gap-y-8  "
            }`}
          >
            {/* breadcrumb */}
            <Breadcrumb
              firstTarget={"/"}
              firstTitle={"خانه"}
              secondTarget={`/${product?.category?._id}`}
              lastTarget={`/category/${product?._id}`}
              secondTitle={product?.category?.title}
              lastTitle={product?.title}
            />
            {/* product title & short desc */}

            <div className="sm:mt-8 mt-12  child:font-Shabnam_B  child:text-2xl sm:child:text-3xl child:text-right ml-auto  child:tracking-tight">
              <h1>{product?.title}</h1>
            </div>
            {/* product rate */}
            <div className="ml-auto mt-6">
              <ProductRate />
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
                <p className="text-sm  mt-1">
                {product?.category?.title}
                </p>
              </div>
              <div className="flex gap-x-4 lg:gap-x-2 items-center  text-main text-right">
                <span className="font-Shabnam_B">برچسب </span>
                <span className="text-sm  lg:mt-1">
                  {product?.tags}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <TabSelection
            comments="comments"
            desc="desc"
            moreDetail="moreDetail"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          >
            {activeTab === "desc" ? (
              <ProductDescription productDesc={product?.longDesc} />
            ) : activeTab === "moreDetail" ? (
              <ProductShortDetail smell={product?.smell} suitableFor={product?.suitableFor} weight={product?.weight} />
            ) : (
              <ProductComments commentFor={product?.title} filterAcceptableComments={filterAcceptableComments} />
            )}
          </TabSelection>
          <div className="mt-16 xl:px-[70px]">
            <p className="text-2xl font-Shabnam_B text-dark_shade mb-8">
              محصولات مرتبط
            </p>
            <RelateProductSlider />
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductRate = () => {
  return (
    <>
      <div className="flex   text-[26px] child:text-[#FFCE00]">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <div className="flex-center my-auto  child:font-Shabnam_M child:text-base mr-2 mt-px child:text-main_green_dark">
          <p>(دیدگاه ۱کاربر)</p>
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
