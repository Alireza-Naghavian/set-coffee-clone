"use client"
import ProductCard from "@/components/Shared-components/ProductCard/ProductCard";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
function UserWishList() {
    const [getData, setGetData] = useState([]);
    const { refresh } = useRouter();
    useEffect(() => {
      const storedData: Storage|string | null = localStorage.getItem("setCoffeeWishlist");
    setGetData(storedData ? JSON.parse(storedData) : []);
  }, [setGetData]);
  const removeFromWishList = (productId: string) => {
    const findData = getData.findIndex((data: any) => data._id === productId);
    if (findData !== -1) {
      getData.splice(findData, 1);
      localStorage.setItem("setCoffeeWishlist", JSON.stringify(getData));
      refresh();
    }
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
      {getData.length === 0 && (
        <EmptyResult
          icon={<FaRegHeart />}
          title="  لیست علاقمندی های خالی است."
          firstDesc="  هیچ محصولی در لیست علاقمندی ها خود ندارید."
          secondDesc=" در صفحه فروشگاه محصولات جالب زیادی پیدا خواهید کرد."
        />
      )}
      <div
        className="grid lg:grid-cols-4 md:grid-cols-3 
      sm:grid-cols-2  gap-x-4"
      >
        {getData?.map((data: any, index) => {
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
