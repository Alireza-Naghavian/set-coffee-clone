"use client";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import Loader from "@/components/UI/loader/Loader";
import Table from "@/components/UI/Table/Table";
import ResponsiveImage from "@/components/Utils-components/ResponsiveImage/ResponsiveImage";
import useGetOrders from "@/hooks/orders/useGetOrders";
import { CartType } from "@/types/models/cart.type";
import { ProductCartType } from "@/types/products.type";
import { BsFillCartXFill } from "react-icons/bs";
const OrderLists = () => {
  const { UserOrders, isOrderLoading } = useGetOrders();
  if (isOrderLoading)
    return (
      <div className="flex gap-x-2">
        <span>
          <Loader loadingCondition={isOrderLoading} />
        </span>
        <span>درحال بارگزاری...</span>
      </div>
    );
    if(!UserOrders?.data.length){
      return <EmptyResult  icon={<BsFillCartXFill/>} title="هیچ سفارشی یافت نشد." 
      firstDesc="هیچ سفارشی تاکنون ثبت نشده است" 
      secondDesc="محصولات مورد نظر خود را سفارش دهید."/>
    }
  return (
    <div className="md:h-[513px] h-[315px] px-4 md:max-h-[513px] overflow-y-auto  ">
      <Table variant="singleHead">
        <Table.Header variant="multipleHead" className="lg:block hidden ">
          <tr
            className="bg-gray-600 text-white w-full  grid grid-cols-5 
           rounded-lg child:ml-3 child:text-center p-4"
          >
            <th>تعداد محصول</th>
            <th>محصولات</th>
            <th>جمع کل سفارش</th>
            <th>تاریخ </th>
            <th>وضعیت</th>
          </tr>
        </Table.Header>
        <Table.Body variant="singleHead">
          {UserOrders?.data?.map((order: CartType) => {
            return (
              <Table.Row
                key={order?._id}
                variant="singleHead"
                className="mt-4 lg:grid-cols-5 grid-cols-1 child:font-Shabnam_M  lg:gap-y-0 gap-y-4" 
              >
                <td className="flex gap-x-1">
                  <span>{order?.totalItem.toLocaleString("fa-Ir")}</span>
                  <span>محصول</span>
                </td>
                <td>
                  <ul className="flex gap-x-1 flex-wrap  ">
                    {order?.cart?.map((product: ProductCartType) => {
                      return (
                        <li key={product._id} className="flex-center">
                          <ResponsiveImage
                            dimensions="w-[50px] h-[50px] flex-center mx-auto "
                            imageStyles="!w-full !h-full !object-cover"
                            blurDataURL={product.cover}
                            src={product.cover}
                            alt={product.title}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td>
                  <span className="flex gap-x-1">
                    <span>{order?.totalPrice?.toLocaleString("fa-Ir")}</span>
                    <span>تومان</span>
                  </span>
                </td>
                <td>
                  <span>
                    {order?.createdAt !== undefined &&
                      new Date(order.createdAt).toLocaleDateString("fa-Ir")}
                  </span>
                </td>
                <td>
                  {UserOrders && (
                    <span className="text-center mx-auto text-main_green font-Shabnam_B">
                      تکمیل شده
                    </span>
                  )}
                </td>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
export default OrderLists;
