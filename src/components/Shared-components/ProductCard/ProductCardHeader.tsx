"use client";
import { useAlert } from "@/app/context/AlertContext";
import MainBtn from "@/components/UI/Buttons/MainBtn";
import Loader from "@/components/UI/loader/Loader";
import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import useAddToBasket from "@/hooks/helper-hooks/useAddToBasket";
import useAddToWishList from "@/hooks/helper-hooks/useAddToWishList";
import { SingleProductType } from "@/types/models/categories.type";
import { isProductInWishlist } from "@/utils/StorageHandlers/WishList";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import styles from "./productCard.module.css";
import QuickAccessModal from "./QuickAccessModal";
import { IoSearch } from "react-icons/io5";
import useDisclosure from "@/hooks/helper-hooks/useDisclosure";

const ProductCardHeader = ({productData}: {productData: SingleProductType}) => {
  const [isExist, setIsExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToWishList } = useAddToWishList();
  const { addToBasket } = useAddToBasket();
  const { showAlert, hideAlert } = useAlert();
  const [isQAcessOpen,{open,close}] = useDisclosure();
  useEffect(() => {
    if (productData._id === undefined) return;
    setIsExist(isProductInWishlist(productData._id));
  }, [isExist, productData?._id]);
  const newItem = {
    cover: productData.cover,
    _id: productData._id,
    title: productData.title,
    price: productData.price,
    score: productData.score,
    count: 1,
  };
  const wishListHandler = async () => {
    await addToWishList(newItem, {
      onSuccess: () => {
        setIsExist(true);
      },
    });
  };
  const addToCartHandler = useCallback(() => {
    setIsLoading(true);
    showAlert("success", "محصول به سبد خرید افزوده شد");
    const timeOut = setTimeout(async () => {
      await addToBasket(
        { product: newItem, value: "setCoffeeBasket", counter: 1 },
        {
          onSuccess: () => {
            setIsLoading(false);
            hideAlert();
          },
        }
      );
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [hideAlert, newItem, showAlert, addToBasket]);

  return (
    <>
      <QuickAccessModal isQAcessOpen={isQAcessOpen} productData={productData} close={close} />
      <div className={`flex justify-center mx-auto ${styles["cover-option"]}`}>
        {/* card overlay */}
        <div className={`${styles["overlay-cover"]}`}>
          <div className=" flex-center h-full w-full relative ">
            <div
              className=" bg-transparent child:text-white border
                         border-white  indent-0 relative  mx-auto  !my-auto "
            >
              <button
                onClick={() => addToCartHandler()}
                className={`${styles["add-to-cart-btn"]}`}
              >
                {isLoading ? (
                  <Loader loadingCondition={isLoading} />
                ) : (
                  <>
                    <span className={`${styles["add-to-basket-text"]}`}>
                      افزودن به سبد خرید
                    </span>
                    <span className={`${styles["add-to-basket-icon"]}`}>
                      <AiOutlineShoppingCart size={22} />
                    </span>
                  </>
                )}
              </button>
            </div>
            <div
              className={`${styles["icon-wrapper"]} flex flex-col gap-y-4  absolute left-0 mt-10 pl-2 items-end  
                        bg-transparent h-full child:text-white child:cursor-pointer w-max z-40`}
            >
              <IoSearch
                size={22}
                title="دسترسی سریع"
                onClick={() => open()}
              />

              {isExist ? (
                <MdOutlineDone className="" title="پسندیدن" size={20} />
              ) : (
                <FaRegHeart
                  onClick={wishListHandler}
                  size={22}
                  title="پسندیدن"
                />
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
              <MdOutlineDone className="text-xl" title="پسندیدن" />
            ) : (
              <FaRegHeart
                className="text-xl "
                onClick={wishListHandler}
                title="پسندیدن"
              />
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
            onClick={() => addToCartHandler()}
            variant="primary"
            size="small"
            className="lg:hidden  font-Shabnam_B  tracking-tighter "
          >
            {isLoading ? (
              <Loader loadingCondition={isLoading} />
            ) : (
              <span>افزودن به سبد خرید</span>
            )}
          </MainBtn>
        </div>
      </div>
    </>
  );
};

export default ProductCardHeader;
