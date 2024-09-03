"use client";
import Chart from "@/components/UI/Chart/Chart";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import { CartType } from "@/types/models/cart.type";
import { IoStatsChart } from "react-icons/io5";
import { Bar } from "recharts";
function SaleChart({ allOrders }: { allOrders: CartType[] }) {
  if (allOrders.length === 0) {
    return (
      <EmptyResult
        icon={<IoStatsChart />}
        firstDesc="اطلاعاتی برای رصد نمودار موجود نیست"
        secondDesc="ممکن است که تراکنشی صورت نگرفته باشد"
        title="هیچ دیتایی موجود نیست"
        addressLink={false}
      />
    );
  }
  // best month besed sales
  const bestSalesMonth = allOrders?.sort((a, b) => b.totalPrice - a.totalPrice);
  // most popular product & its order quantity
  const flatCart = allOrders.flatMap((order: any) => order.cart);
  const productMap = new Map();
  flatCart.forEach((product: any) => {
    const { _id, count } = product;
    if (productMap.has(_id)) {
      productMap.set(_id, productMap.get(_id) + count);
    } else {
      productMap.set(_id, count);
    }
  });
  let mostPopularProduct = { _id: null, count: 0, title: "" };
  productMap.forEach((count, _id) => {
    if (count > mostPopularProduct.count) {
      const prodInfo = flatCart.find((p: any) => p._id === _id);
      mostPopularProduct = {
        _id,
        count,
        title: prodInfo ? prodInfo.title : "نامشخص",
      };
    }
  });

  const salesData = bestSalesMonth.reduce((acc: any, order: any) => {
    const date = new Date(order.createdAt).toLocaleDateString("fa-Ir");
    if (!acc[date]) {
      acc[date] = { تاریخ: date, فروش: 0, تعداد_فروش: 0 };
    }
    acc[date].تعداد_فروش += order.totalItem;
    acc[date].فروش += order.totalPrice;
    return acc;
  }, {});
  const formattedSalesData = Object.values(salesData);
  const maxSales = Math.max(
    ...formattedSalesData.map((data: any) => data.فروش)
  );
  const YAxisMax = maxSales + 1_000_000;
  return (
    <div
      className="w-full bg-main_brown/5 px-2
       flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 items-center sm:items-start overflow-x-hidden
        py-4 "
    >
      <div className="flex flex-col gap-y-4 sm:px-4 justify-start  items-start h-full mt-12">
        <div className="font-Shabnam_B text-gray-100 rounded-md  bg-main_brown/55 p-2 flex items-start  gap-x-2 ">
          <span className="">پرفروش ترین ماه :</span>
          <span>
            {bestSalesMonth[0]?.createdAt !== undefined &&
              new Date(bestSalesMonth[0]?.createdAt).toLocaleDateString(
                "fa-Ir"
              )}
          </span>
        </div>
        <div className="font-Shabnam_B text-gray-100  leading-7 rounded-md bg-main_green/55 p-2 flex flex-col gap-y-4 items-start  gap-x-2 ">
          <p className="">
            <span className="">پرفروش ترین محصول:</span>
            <span className="line-clamp-2">{mostPopularProduct.title}</span>
          </p>
          <p className="">
            <span className="">شناسه:&nbsp;{mostPopularProduct._id}</span>
          </p>
          <p className="">
            <span className="">
              سفارش ثبت شده:&nbsp;{" "}
              {mostPopularProduct.count.toLocaleString("fa-Ir")} عدد
            </span>
          </p>
        </div>
      </div>
      <Chart mainData={formattedSalesData} YDomain={[0, YAxisMax]}>
        <Bar
          dataKey={"تعداد_فروش"}
          stroke="#711D1C"
          fill="#711D1C"
          width={100}
          height={40}
        />
        <Bar
          dataKey={"فروش"}
          stroke="#82ca9d"
          fill="#8884d8"
          width={100}
          height={40}
        />
      </Chart>
    </div>
  );
}

export default SaleChart;
