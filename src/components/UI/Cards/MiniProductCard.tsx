import useRemoveFromBasket from "@/hooks/helper-hooks/useRemoveFromBasket";
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
              width={800}
              height={800}
              src={cover}
              className="w-full h-full object-cover"
              alt={title}
              />
          </div>
          <div className="desc flex gap-x-2 my-auto pl-2">
            <div className="h-full">
              <h2 className="text-main tracking-tighter text-sm w-[130px] line-clamp-2 font-Shabnam_M">
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
            <IoIosClose onClick={handleRemove} className="md:text-[35px] cursor-pointer text-[50px] pl-2"  />
      </li></>
  );
}

export default MiniProductCard;
