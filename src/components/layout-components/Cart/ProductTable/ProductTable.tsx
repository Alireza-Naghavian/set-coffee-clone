import Table from "@/components/UI/Table/Table";
import useMediaQuery from "@/hooks/helper-hooks/useMediaQuery";
import useRemoveFromBasket from "@/hooks/orders/useRemoveFromBasket";
import { ProductCartType } from "@/types/products.type";
import React, { useState } from "react";
import LgTRow from "../LgTRow/LgTRow";
import SmTRow from "../SmTRow/SmTRow";
import useUpdateBasket from "@/hooks/orders/useUpdateBasket";
function ProductTable({ userBasket,lockCounter }: { userBasket: ProductCartType[],lockCounter:boolean }) {
  const changeTRow = useMediaQuery("(min-width:768px)");
  const { removeFromCart } = useRemoveFromBasket();
  const removeHandler = async (product: ProductCartType) => {
    await removeFromCart({ key: "setCoffeeBasket", value: product });
  };
  return (
    <div
      className={`${
        userBasket?.length == 0 ? "" : " h-[400px] !overflow-y-auto px-2"
      }`}
    >
      <Table variant="singleHead" className="w-full relative mt-10 table ">
        {userBasket?.length > 0 && (
          <Table.Header variant="singleHead" className=" hidden md:block">
            <tr
              className="grid grid-cols-6  rounded-lg child:ml-3 child:text-center p-4
                        bg-main_brown text-white"
            >
              <th>عملیات</th>
              <th>کاور</th>
              <th>عنوان</th>
              <th>قیمت</th>
              <th>تعداد</th>
              <th>جمع جزء</th>
            </tr>
          </Table.Header>
        )}
        <Table.Body
          variant="singleHead"
          className="child:md:grid-cols-6 grid-cols-2"
        >
          {userBasket?.map((product: ProductCartType,index:number) => {
            return (
              <React.Fragment key={product._id || index}>
                {/* // large devices */}
                {changeTRow ? (
                  <LgTRow lockCounter={lockCounter} key={product?._id} removeHandler={removeHandler} product={product} />
                ) : (
                  // small devices
                  <SmTRow lockCounter={lockCounter} key={index} removeHandler={removeHandler} product={product} />
                )}
              </React.Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export const ProductCounter = ({ product,lockCounter }: { product: ProductCartType ,lockCounter:boolean}) => {
  const [counter, setCounter] = useState<number>(product.count);
  const { updateBasketCart } = useUpdateBasket();
  const decrementCounter = () => {
    const newCounter = counter - 1;
    setCounter(newCounter);
    updateBasketCart({ product, value: "setCoffeeBasket", counter:newCounter });
  };
  const incrementCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    updateBasketCart({ product, value: "setCoffeeBasket", counter:newCounter });
  };
  return (
    <>
      <div className="flex gap-x-0 items-center child:text-base md:child:py-2 child:py-[2px] child:px-2 md:child:px-3 child:font-bold  child:border">
        <button
          aria-label="کاهش تعداد"
          onClick={decrementCounter}
          disabled={counter <= 1 ||lockCounter}
          className="tr-200 hover:text-white hover:bg-main_brown "
        >
          -
        </button>
        <span>{counter}</span>
        <button
          aria-label="افزایش تعداد"
          disabled={ product.entities !==undefined  && counter>= product.entities||  lockCounter}
          onClick={incrementCounter}
          className="tr-200 hover:text-white hover:bg-main_brown "
        >
          +
        </button>
      </div>
    </>
  );
};
export default ProductTable;
