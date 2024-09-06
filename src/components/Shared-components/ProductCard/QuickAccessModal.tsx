import AddToBasket from "@/components/layout-components/ProductPage/AddToBasket";
import CompoundModal from "@/components/UI/Modal/Modal";
import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import { SingleProductType } from "@/types/models/categories.type";
import { customeBlurDataURL } from "@/utils/constants";
import Link from "next/link";
import { MdClose, MdOutlineDone } from "react-icons/md";
type QAccessType = {
  isQAcessOpen: boolean;
  close: () => void;
  productData: SingleProductType;
};
function QuickAccessModal({
  isQAcessOpen,
  close: onClose,
  productData: product,
}: QAccessType) {
  return (
    <>
      <CompoundModal className="hidden lg:block" effect="ease_out" isShow={isQAcessOpen} onClose={onClose}>
        <CompoundModal.Header onClose={onClose}>
          <div className=""></div>
        </CompoundModal.Header>
        <CompoundModal.Body>
          <div className="w-full  mx-auto  sm:px-8 px-4">
            <div
              className="flex   w-full gap-x-4  md:!flex-row 
            flex-col justify-center "
            >
              {/* right side */}
              <ResponsiveImage
                dimensions={` object-cover md:!h-[380px] w-[min(300px,60vw)] 
              !pb-32 sm:h-[calc(100vh-100px)] xs:h-[calc(100vh-300px)]  lg:h-[400px] md:self-start`}
                src={product?.cover}
                imageStyles="md:object-contain object-cover !w-full !h-full"
                blurDataURL={product?.cover}
                priority
                onError={(e) => (e.currentTarget.src = customeBlurDataURL)}
                alt={product?.title}
              />
              <div
                className="sm:mt-0 flex lg:pr-4   pr-2 flex-col    items-start   
               w-full  lg:gap-y-2 gap-y-4"
              >
                <Link
                  href={`/categories/${product?._id}`}
                  className="   child:font-Shabnam_B 
               mt-8 text-gray-600 hover:text-gray-400 tr-300 child:text-2xl sm:child:text-2xl 
              child:text-right ml-auto  child:tracking-tight"
                >
                  <h1>{product?.title}</h1>
                </Link>
                {/* product price */}
                <div className="ml-auto mt-1 child:text-main child:text-2xl child:font-Shabnam_M">
                  <span> {product?.price?.toLocaleString("fa-Ir")} تومان</span>
                </div>
                {/* short desc */}
                <div className="w-full mt-4 border-b-2 pb-4 ">
                  <div className="flex max-w-[500px]  sm:max-h-[200px] w-full">
                    <p className="w-full h-full text-justify line-clamp-6 text-[#777777]">
                      {product?.shortDesc}
                    </p>
                  </div>
                  <div className="flex  mt-6 gap-y-2 pb-4 w-full  ">
                    <AddToBasket product={product} />
                  </div>
                  {product?.entities >0 ? 
                    <div className="flex items-center text-sm gap-x-1">
                    <span> <MdOutlineDone className="" size={20} /></span>
                    <span>{product?.entities.toLocaleString("fa-Ir")} </span>
                    <span className="block sm:hidden">عدد موجود</span>
                    <span className="sm:block hidden"> عدد موجود در انبار</span>
                  </div> 
                :
                <div className="flex items-center gap-x-2">
                   <span> <MdClose className="text-red-500" size={20} /></span>
                   <span className="text-red-500">ناموجود</span>
                </div>  
                }
                </div>
                <div className="flex flex-col  ml-auto gap-y-2 border-b-2 pb-4 w-full">
                  <div className="flex gap-x-4 lg:gap-x-2   text-main text-right">
                    <span className="font-Shabnam_B">برچسب </span>
                    <span className="text-sm  lg:mt-1">
                      {" "}
                      {product?.tags?.split("،").map((tag: string, index: number) => {
                        return <span key={index}>{tag},</span>;
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CompoundModal.Body>
      </CompoundModal>
    </>
  );
}

export default QuickAccessModal;
