import AlertContextProvider from "@/app/context/AlertContext";
import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import ProgressBarLink from "@/components/Utils-components/ProgressBar/ProgressBar";
import { SingleProductType } from "@/types/models/categories.type";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import ProductCardHeader from "./ProductCardHeader";
function ProductCard({ productData }: { productData: SingleProductType }) {
  return (
    <div className="flex flex-col gap-y-2 max-h-[360px]  gap-x-2  mx-auto   max-w-fit  ">
      {/* cover */}
        <AlertContextProvider>
      <ProgressBarLink />
      <QueryClientProviderWrapper>
          <ProductCardHeader productData={productData} />
      </QueryClientProviderWrapper>
      <ProductCardBody productData={productData} />
      {/* card detail */}
      <ProductCardFooter productData={productData} />
        </AlertContextProvider>
    </div>
  );
}

const ProductCardBody = ({
  productData,
}: {
  productData: SingleProductType;
}) => {
  return (
    <div className="px-2.5 md:child:text-base text-sm max-w-[250px]  child:font-Shabnam_M child:leading-5">
      <Link
        href={`/categories/${productData._id}`}
        className="text-main hover:text-main/55 tr-200  flex-center mt-2 text-center   sm:line-clamp-2  md:max-w-[250px] max-h-max overflow-x-hidden"
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
        <>
          {Array(productData.score)
            .fill(0)
            .map((_, index) => {
              return <FaStar key={index} className="text-[#FFCE00]" />;
            })}
          {Array(productData.score !== undefined ? 5 - productData.score : null)
            .fill(0)
            .map((_, index) => {
              return <FaRegStar key={index} />;
            })}
        </>
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
