import MainBtn from "@/components/UI/Buttons/MainBtn";
import { SingleProductType } from "@/types/models/categories.type";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import styles from "./productCard.module.css";
function ProductCard({ productData }: { productData: SingleProductType }) {
  return (
    <div className="flex flex-col gap-y-2 max-h-[360px]  gap-x-2  mx-auto   max-w-fit  ">
      {/* cover */}
      <ProductCardHeader productData={productData} />
      {/* card detail */}
      <ProductCardBody productData={productData} />

      <ProductCardFooter productData={productData} />
    </div>
  );
}

const ProductCardHeader = ({
  productData,
}: {
  productData: SingleProductType;
}) => {
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
            <FaRegHeart size={22} title="پسندیدن" />
          </div>
        </div>
      </div>
      <div className="flex-center flex-col bg-transparent">
        <div
          className="w-7 h-7 lg:hidden rounded-full  flex items-center justify-center  
             bg-gray-100 absolute sm:left-6 left-1 top-6 "
        >
          <FaRegHeart className="  text-xl " title="پسندیدن" />
        </div>
        <div className="w-[202px] lg:w-[222px]  bg-transparent h-[202px] lg:h-[222px]">
          <Image
            width={1280}
            height={720}
            src={productData.cover}
            className={`w-full h-full  object-cover ${styles["cover-image"]} `}
            alt={productData.title}
          />
        </div>
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

const ProductCardBody = ({
  productData,
}: {
  productData: SingleProductType;
}) => {
  return (
    <div className="px-2.5 md:child:text-base text-sm max-w-[250px]  child:font-Shabnam_M child:leading-5">
      <Link
        href={"#"}
        className="text-main hover:text-main/55 tr-200  flex-center mt-2 text-center   sm:line-clamp-2 lg:line-clamp-3 md:max-w-[250px] max-h-max overflow-x-hidden"
      >
        {productData.title}
      </Link>
    </div>
  );
};

const ProductCardFooter = ({
  productData,
}: {
  productData: SingleProductType;
}) => {
  return (
    <>
      <div className="flex mx-auto justify-center child:text-[#EABE12]">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>

      <div className="child:text-[15px] child:text-main child:leading-5 ">
        <span className="text-center mx-auto gap-x-1 flex justify-center font-Shabnam_B">
          <span>{productData.price.toLocaleString("fa-IR")}</span>{" "}
          <span> تومان</span>
        </span>
      </div>
    </>
  );
};
export default ProductCard;
