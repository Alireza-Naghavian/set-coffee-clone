"use client";
import ProductComments from "@/components/Shared-components/ProductDetails/ProductComments";
import ProductDescription from "@/components/Shared-components/ProductDetails/ProductDescription";
import ProductShortDetail from "@/components/Shared-components/ProductDetails/ProductShortDetail";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import RelateProductSlider from "@/components/UI/Swiper/RelateProductSlider";
import TabSelection from "@/components/UI/TabSelection/TabSelection";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import Image from "next/image";
import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
function ProductPageLayout() {
  const [activeTab, setActiveTab] = useState<string>("desc");
  return (
    <div className="relative">
      <div className=" w-[95%] mx-auto relative  sm:px-8 px-2  mt-[180px] ">
        <div className="flex  w-full gap-x-2 ">
          {/* right side */}
          <div className="w-[35%] h-full flex">
            <Image
              width={1280}
              height={720}
              className="!w-full !h-full object-cover"
              src={"/uploads/171946837318944-700x700.jpg"}
              alt=""
            />
          </div>
          {/* left side */}
          <div className="flex-col flex items-end   w-[65%]   ">
            {/* breadcrumb */}
            <Breadcrumb
              firstTarget={"/"}
              secondTarget={"/category"}
              lastTarget={`/category/productId`}
              firstTitle={"خانه"}
              secondTitle={"sepecialty coffee"}
              lastTitle={"پودر قهوه ترک ویژه عربیکا ۷۰ درصد مقدار ۲۵۰ گرم"}
            />
            {/* product title & short desc */}

            <div className="mt-6 child:font-Shabnam_B child:text-3xl child:text-right ml-auto  child:tracking-tight">
              <h1>پودر قهوه ترک ویژه عربیکا ۷۰ درصد مقدار ۲۵۰ گرم</h1>
            </div>
            {/* product rate */}
            <div className="ml-auto mt-6">
              <ProductRate />
            </div>
            {/* product price */}
            <div className="ml-auto mt-4 child:text-main child:text-2xl child:font-Shabnam_M">
              <span> 194,500 تومان</span>
            </div>
            {/* short desc */}
            <div className="w-full mt-4 border-b-2 pb-4 ">
              <div className="flex max-w-[700px]  max-h-[200px] w-full">
                <p className="w-full h-full text-justify text-[#777777]">
                  شاید یکی از سنتی‌ترین روش مصرف قهوه در ایران استفاده از قهوه
                  آسیاب شده به صورت کاملا پودر و ظرف قهوه جوش ،جذوه، بر روی
                  حرارت باشد که اصطلاحا به آن قهوه ترک گفته می‌شود. در مناطقی
                  نظیر یونان و یا قبرس و ارمنستان که از جذوه برای تهیه قهوه
                  استقاده می شود از درصد بالای عربیکا در ترکیباتتشان استفاده می
                  شود . در تهیه قهوه ویژه جذوه «ست» از دانه‌های مرغوب قهوه که
                  درصدی در حدود 70 شامل دانه های عربیکا می باشد استفاده شده است
                  . و مانند قهوه ترک عادی دم آوری می شود
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
                  Premium Coffee, قهوه, محصولات ویژه, همه موارد
                </p>
              </div>
              <div className="flex gap-x-2 items-center  text-main text-right">
                <p className="font-Shabnam_B">برچسب :</p>
                <p className="text-sm  mt-1">
                  انواع دانه قهوه،قهوه ترکیبی،قهوه ست،قهوه اسپرسو،قهوه روبوستا
                  برزیل،قهوه عربیکا برزیل،قهوه بلند،بهترین ترکیب عربیکا و
                  روبوستا
                </p>
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
              <ProductDescription />
            ) : activeTab === "moreDetail" ? (
              <ProductShortDetail />
            ) : (
              <ProductComments />
            )}
          </TabSelection>
          <div className="mt-16 px-[70px]">
            <p className="text-2xl font-Shabnam_B text-dark_shade mb-8">محصولات مرتبط</p>
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
