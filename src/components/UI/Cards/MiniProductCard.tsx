import useRemoveFromBasket from "@/hooks/orders/useRemoveFromBasket";
import { SetState } from "@/types/global.type";
import { ProductCartType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

function MiniProductCard({ cover, price, count,_id, title,setIsCartOpen }: ProductCartType&{setIsCartOpen:SetState<boolean>}) {
 const pathName = usePathname();
 const {removeFromCart}= useRemoveFromBasket();
 useEffect(()=>{
  setIsCartOpen(false);
 },[pathName,setIsCartOpen])
 const product:ProductCartType = {
count,cover,price,title,_id
 }
const handleRemove = useCallback(async()=>{
await removeFromCart({key:"setCoffeeBasket",value:product})
},[product,removeFromCart])
  return (
    <>
      <li className=" pb-4 !border-b !border-b-gray-300 flex  last:border-b-0   mt-2">
    <Link href={`/categories/${_id}`} >
        <div className="flex gap-x-2 w-full">
          <div className="sm:w-[100px]">
            <Image
              width={500}
              height={500}
              src={cover}
              className="w-full h-full object-cover"
              alt={title}
              />
          </div>
          <div className="desc flex gap-x-2 my-auto pl-1">
            <div className="h-full">
              <h2 className="text-main tracking-tighter text-sm w-[120px] line-clamp-2 font-Shabnam_M">
                {title}
              </h2>
              <p className="text-xs flex items-center gap-x-1">
               {count} ×
                <span className="text-sm font-Shabnam_M flex gap-x-1 ">
                  <span>{price.toLocaleString("fa-Ir")}</span>
                  <span>تومان</span>
                </span>
              </p>
            </div>
          </div>
        </div>
    </Link>
            <IoIosClose onClick={handleRemove} className="md:text-[35px] sm:text-[40px] cursor-pointer -mt-5 sm:mt-0 text-[100px] pl-2"  />
      </li></>
  );
}

export default MiniProductCard;
