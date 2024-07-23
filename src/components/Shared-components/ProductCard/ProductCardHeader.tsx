"use client";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import { SingleProductType } from "@/types/models/categories.type";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import styles from "./productCard.module.css";
import { MdOutlineDone } from "react-icons/md";
import { useRouter } from "next/navigation";
import { addProductToWishlist, isProductInWishlist } from "@/utils/StorageHandlers/WishList";

const ProductCardHeader = ({
  productData,
}: {
  productData: SingleProductType;
}) => {
  const [isExist, setIsExist] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (productData._id === undefined) return;
    setIsExist(isProductInWishlist(productData._id));
  }, [isExist, productData?._id]);
  const AddTowishList = () => {
    const newItem = {
      cover: productData.cover,
      _id: productData._id,
      title: productData.title,
      price: productData.price,
      score: productData.score,
    };
    if (addProductToWishlist(newItem)) setIsExist(true);

    router.refresh();
  };
  return (
    <div className={`flex justify-center mx-auto ${styles["cover-option"]}`}>
      {/* card overlay */}

      <div className={`${styles["overlay-cover"]}`}>
        <div className=" flex-center h-full w-full relative ">
          <div
            className=" bg-transparent child:text-white border
                         border-white  indent-0 relative  mx-auto  !my-auto "
          >
            <button className={`${styles["add-to-cart-btn"]}`}>
              <span className={`${styles["add-to-basket-text"]}`}>
                افزودن به سبد خرید
              </span>
              <span className={`${styles["add-to-basket-icon"]}`}>
                <AiOutlineShoppingCart size={22} />
              </span>
            </button>
          </div>
          <div
            className={`${styles["icon-wrapper"]} flex flex-col gap-y-4  absolute left-0 mt-6 pl-2 items-end  
                              bg-transparent h-full child:text-white child:cursor-pointer w-max z-40`}
          >
            <FaShuffle size={22} title="مقایسه" />
            <IoSearch size={22} title="دسترسی سریع" />
            {isExist ? (
              <MdOutlineDone className="" title="پسندیدن" size={20} />
            ) : (
              <FaRegHeart onClick={AddTowishList} size={22} title="پسندیدن" />
            )}
          </div>
        </div>
      </div>
      <div className="flex-center flex-col bg-transparent">
        <div
          className="w-7 h-7 lg:hidden rounded-full z-[6] flex items-center justify-center  
               bg-gray-100 absolute sm:left-6 left-1 top-6 "
        >
             {isExist ? (
              <MdOutlineDone className="text-xl" title="پسندیدن"  />
            ) : (
              <FaRegHeart className="text-xl " onClick={AddTowishList}  title="پسندیدن" />
            )}
        </div>
        <ResponsiveImage
          alt={productData.title}
          dimensions="w-[202px] lg:w-[222px] h-[202px] lg:h-[222px] z-[5] "
          src={productData.cover}
          blurDataURL={productData.cover}
          imageStyles={`object-cover ${styles["cover-image"]} `}
          sizes="w-[202px] lg:w-[222px] h-[202px] lg:h-[222px]"
        />
        <MainBtn
          variant="primary"
          size="small"
          className="lg:hidden  font-Shabnam_B  tracking-tighter "
        >
          افزودن به سبد خرید
        </MainBtn>
      </div>
    </div>
  );
};

export default ProductCardHeader;
