"use client";
import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import Loader from "@/components/UI/loader/Loader";
import useGetWishList from "@/hooks/helper-hooks/useGetWishList";
import useRemoveWishList from "@/hooks/helper-hooks/useRemoveWishList";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
function UserWishList() {
  const { wishList, isLoading } = useGetWishList();
  const {refresh} = useRouter();
  const {removeFromList} = useRemoveWishList()
  const removeFromWishList =async (productId: string) => {
    await removeFromList({wishList,productId},{onSuccess:()=>{
      refresh();
    }})
  };
  return (
    <div className="flex flex-col  relative">
      <h2
        className="text-dark_shade font-Shabnam_B text-xl 
      text-right pb-2 border-b border-b-gray-400 "
      >
        محصولات مورد علاقه شما
      </h2>
      {/* grid list  */}
      {isLoading && (
        <div className=" flex w-[300px] gap-x-2 mt-4 ">
          <Loader loadingCondition={isLoading} /> 
          <span>در حال بارگزاری...</span>
        </div>
      )}
      {wishList?.length === 0 && (
        <EmptyResult
          icon={<FaRegHeart />}
          title="  لیست علاقمندی ها خالی است."
          firstDesc="  هیچ محصولی در لیست علاقمندی های خود ندارید."
          secondDesc=" در صفحه فروشگاه محصولات جالب زیادی پیدا خواهید کرد."
        />
      )}
      <div
        className="grid lg:grid-cols-4 md:grid-cols-3 
      sm:grid-cols-2  gap-x-4"
      >
        {wishList?.map((data: any, index:number) => {
          return (
            <div key={index} className="flex flex-col gap-y-1 mt-4  ">
              <span className="w h-full pb-px ">
                <IoIosClose
                  onClick={() => removeFromWishList(data?._id)}
                  className="cursor-pointer"
                  size={28}
                />
              </span>
              <ProductCard productData={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserWishList;
