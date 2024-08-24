import Chart from "@/components/UI/Chart/Chart";
import { GrowthDataType } from "@/types/auth.type";
function GrowthChart({ growthData }: { growthData: GrowthDataType }) {
  const numOfUser = growthData.length;

  const grow = growthData.reduce((acc: any, user: any) => {
    const joinDate = new Date(user.createdAt).toLocaleDateString("fa-Ir");
    const totalRevenue = user.userCart.reduce(
      (total: number, cart: any) => total + Number(cart.totalPrice),
      0
    );
    if (!acc[joinDate]) {
      acc[joinDate] = {
        تاریخ: joinDate,
        تعداد_کاربران_جدید: 0,
        مجموع_درآمد_کاربر: 0,
      };
    }
    acc[joinDate].تعداد_کاربران_جدید += 1;
    acc[joinDate].مجموع_درآمد_کاربر += totalRevenue;
    return acc;
  }, {});
  const growthDataValues = Object.values(grow);
  const maxRevenue = Math.max(
    ...growthDataValues.map((data: any) => data["مجموع_درآمد_کاربر"])
  );
  const yAxisMax = maxRevenue + 1_000_000;

  const grossIncoming = growthDataValues.reduce(
    (acc: number, data: any) => acc + data["مجموع_درآمد_کاربر"],
    0
  );

  return (
    <div
      className="w-full bg-main_brown/5 px-1 
       flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 items-center sm:items-start overflow-x-hidden
        py-4 "
    >
      <div className="flex flex-col gap-y-4 sm:px-4 justify-start w-[230px]  items-start h-full mt-12">
        <div className="font-Shabnam_B text-gray-100 rounded-md w-full   bg-main_brown/55 p-2 flex items-start  gap-x-2 ">
          <span className="">تعداد کاربران :</span>
          <span>{numOfUser}&nbsp; کاربر</span>
        </div>
        <div className="font-Shabnam_B text-gray-100  w-full  leading-7 rounded-md bg-main_green/55 p-2 flex flex-col gap-y-4 items-start  gap-x-2 ">
          <p className="">
            <span className="">درآمد ناخالص:</span>
            <span className="line-clamp-2">
              {grossIncoming.toLocaleString("fa-Ir")} تومان
            </span>
          </p>
        </div>
      </div>
    <Chart mainData={growthDataValues} YDomain={[0,yAxisMax]}/>
    </div>
  );
}

export default GrowthChart;
