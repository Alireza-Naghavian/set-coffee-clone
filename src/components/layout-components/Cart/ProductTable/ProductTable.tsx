import Table from "@/components/UI/Table/Table";
import useGetBasketData from "@/hooks/helper-hooks/useGetBasketData";
import { ProductCartType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
function ProductTable() {
  const { userBasket } = useGetBasketData();
  return (
    <div className=" h-[400px] !overflow-y-auto px-2">
      <Table variant="singleHead" className="w-full relative mt-10 table ">
        <Table.Header variant="singleHead" className=" hidden md:block">
          <tr className="grid grid-cols-6  rounded-lg child:ml-3 child:text-center p-4
           bg-main_brown   text-white">
            <th>عملیات</th>
            <th>کاور</th>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>تعداد</th>
            <th>جمع جزء</th>
          </tr>
        </Table.Header>
        <Table.Body variant="singleHead" className="child:md:grid-cols-6 grid-cols-2">
          {userBasket?.map((product: ProductCartType) => {
            return (
              // large devices
              <>
                <Table.Row variant="singleHead"
                  key={product._id}
                  className=" !hidden md:!grid"
                >
                  <td>
                    <button className="mx-auto w-fit my-auto h-full">
                      <IoIosClose size={32} />
                    </button>
                  </td>
                  <td className=" w-full lg:!w-[80px] lg:!h-[80px]  mx-auto ">
                    <Image
                      src={product.cover}
                      alt={product.title}
                      className="lg:!w-[80px] lg:!h-[80px] md:!w-[220px] md:!h-[95px] object-contain "
                      width={80}
                      height={80}
                    />
                  </td>
                  <td>
                    <Link
                      href={`/categories/${product._id}`}
                      className="text-sm line-clamp-4 tr-300 hover:text-mute"
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <span className="text-base text-mute">
                      {product.price.toLocaleString("fa-Ir")} تومان
                    </span>
                  </td>
                  <td className="!mr-4">
                    <ProductCounter product={product} />
                  </td>
                  <td className="!mr-4 !flex xl:flex-row  lg:flex-col md:flex-col flow-row">
                    <span>
                      {(product.price * product.count).toLocaleString("fa-Ir")}
                    </span>
                    <span>تومان</span>
                  </td>
                </Table.Row>
                {/* small devices */}
                <Table.Row variant="singleHead"
                  key={product._id}
                  className="my-1 child:my-auto  !flex md:!hidden gap-x-4  border-b py-2"
                >
                  <td className="">
                    <Image
                      src={product.cover}
                      alt={product.title}
                      className="lg:!w-[80px] lg:!h-[80px] md:!w-[220px] md:!h-[95px] !w-[100px]  object-contain "
                      width={80}
                      height={80}
                    />
                  </td>
                  <tr className="flex flex-col w-full ">
                    <td className="text-right flex justify-between items-center my-auto gap-x-2  !mb-2">
                      <Link
                        href={`/categories/${product._id}`}
                        className="text-sm font-Shabnam_B line-clamp-4 tr-300 hover:text-mute">
                        {product.title}
                      </Link>
                    <button className="mx-auto w-fit my-auto h-full">
                      <IoIosClose size={24} />
                    </button>
                    </td>
                    <tr
                      className="flex flex-col gap-y-4  child:flex 
                                    child:justify-between child:items-center child:w-full
                                     child:text-sm  child:pb-[2px] child:child:pb-[2px]">
                      <td>
                        <span>قیمت:</span>
                        <span>

                          {product.price.toLocaleString("fa-Ir")} تومان
                        </span>
                      </td>
                      <td className="">
                        <span>تعداد:</span>
                        <span>
                
                          <ProductCounter product={product} />
                        </span>
                      </td>
                      <td className="!border-b-0">
                        <span>جمع جزء:</span>
                        <span className="font-Shabnam_B">
                
                        {product.price.toLocaleString("fa-Ir")} تومان
                        </span>
                      </td>
                    </tr>
                  </tr>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

const ProductCounter = ({ product }: { product: ProductCartType }) => {
  const [counter, setCounter] = useState<number>(product.count);
  return (
    <>
      <div className="flex gap-x-0 items-center child:text-base md:child:py-2 child:py-[2px] child:px-2 md:child:px-3 child:font-bold  child:border">
        <button
          aria-label="کاهش تعداد"
          onClick={() => setCounter((prev) => prev - 1)}
          disabled={counter <= 1}
          className="tr-200 hover:text-white hover:bg-main_brown "
        >
          -
        </button>
        <span>{counter}</span>
        <button
          aria-label="افزایش تعداد"
          onClick={() => setCounter((prev) => prev + 1)}
          className="tr-200 hover:text-white hover:bg-main_brown "
        >
          +
        </button>
      </div>
    </>
  );
};
export default ProductTable;
