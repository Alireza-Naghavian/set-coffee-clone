"use client";
import ProductComments from "@/components/Shared-components/ProductDetails/ProductComments";
import ProductDescription from "@/components/Shared-components/ProductDetails/ProductDescription";
import ProductShortDetail from "@/components/Shared-components/ProductDetails/ProductShortDetail";
import RelateProductSlider from "@/components/UI/Swiper/RelateProductSlider";
import TabSelection from "@/components/UI/TabSelection/TabSelection";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import Loader from "@/components/UI/loader/Loader";
import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import useAddToWishList from "@/hooks/wishList/useAddToWishList";
import useGetSingleProduct from "@/hooks/product/useGetSingleProduct";
import { SingleProductType } from "@/types/models/categories.type";
import { CommentModeltype } from "@/types/models/comment.type";
import { customeBlurDataURL, productSelectionOption } from "@/utils/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdClose, MdOutlineDone } from "react-icons/md";
import AddToBasket from "./AddToBasket";
import SingleProductRate from "./SingleProductRate";
export const isProductInWishlist = (productId: string): boolean => {
  const storedData: string | null = localStorage.getItem("setCoffeeWishlist");
  const getData = storedData ? JSON.parse(storedData) : [];
  return getData.some((data: any) => data._id === productId);
};
function ProductPageLayout({
  initialProductData,
}: {
  initialProductData: SingleProductType;
}) {
  const [activeTab, setActiveTab] = useState<string>("desc");
  const { productId }: { productId: string } = useParams();
  const [isExist, setIsExist] = useState(false);
  const { product } = useGetSingleProduct(productId, initialProductData);
  const filterAcceptableComments = product?.ProductComment?.filter(
    (comment: CommentModeltype) => {
      return comment.isAccept;
    }
  );
  const { addToWishList, isPending } = useAddToWishList();
  useEffect(() => {
    setIsExist(isProductInWishlist(productId));
  }, [productId]);
  const AddTowishList = async () => {
    const newItem = {
      cover: product.cover,
      _id: product._id,
      title: product.title,
      price: product.price,
      score: product.score,
      shortDesc:product.shortDesc,
      tags:product.tags
    };
    await addToWishList(newItem, {
      onSuccess: () => {
        setIsExist(true);
      },
    });
  };
  return (
    <div className="">
      <div
        className={`w-full  mx-auto  
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
            src={initialProductData?.cover}
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
                  target: `/categories?categoryId=${product?.category?._id}`,
                  title: product?.category?.title,
                },
                {
                  title: product?.title,
                  target: `/categories/${product?._id}`,
                },
              ]}
            />
            {/* product title & short desc */}

            <div className="sm:mt-8 mt-12  child:font-Shabnam_B  child:text-2xl sm:child:text-3xl child:text-right ml-auto  child:tracking-tight">
              <h1>{product?.title}</h1>
            </div>
            {/* product rate */}
            <div className="ml-auto mt-6">
              <SingleProductRate
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
              <AddToBasket product={product} />
              <div className="flex gap-x-4 xs:flex-col sm:flex-row child:items-center
               text-[15px] font-Shabnam_M xs:gap-y-2 sm:gap-y-0
               sm:items-center child:flex  child:gap-x-2 mt-2">
                {isPending ? (
                  <Loader loadingCondition={isPending} />
                ) : isExist ? (
                  <span className="flex items-center">
                    <span>
                      <MdOutlineDone className="" size={20} />
                    </span>
                    <span>به لیست افزوده شد</span>
                  </span>
                ) : (
                  <button onClick={AddTowishList} className="bg-transparent">
                    <FaRegHeart />
                    <span>افزودن به علاقمندی ها</span>
                  </button>
                )}
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
            </div>
            {/* tegs & category title */}
            <div className="flex flex-col mt-8 ml-auto gap-y-2 border-b-2 pb-4 w-full">
              <div className="flex gap-x-2 items-center  text-main text-right">
                <p className="font-Shabnam_B">دسته :</p>
                <p className="text-sm  mt-1">{product?.category?.title}</p>
              </div>
              <div className="   items-center  text-main text-right">
                <span className="font-Shabnam_B">برچسب :</span>

                  {product?.tags?.split("،")?.map((tag: string,index:number) =>{

                    return <span className="" key={index}>{tag},</span>
                  } 
                  )}
                
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <TabSelection
          options={productSelectionOption}
          optionalValue={filterAcceptableComments?.length.toLocaleString("fa-Ir")}
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
export default ProductPageLayout;
