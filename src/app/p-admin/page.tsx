import AdminPanel from "@/components/layout-components/AdminPanel/AdminPanel";
import dbConnection from "@/dbConfigs/db";
import CartModel from "@/models/cart/cart";
import UserModel from "@/models/user/user";
import { getUser } from "@/utils/auth/authHelper";
import dataParser from "@/utils/dataParser/dataParser";
import { notFound } from "next/navigation";
export const revalidate = 900;
async function page() {
  await dbConnection();
  const user = await getUser();
  if (user?.role !== "ADMIN") return notFound();

  const allOrders = await CartModel.find({}, "-__V -updatedAt").sort({
    createdAt: 1,
  });
  const growthData = await UserModel.find(
    {},
    "userName createdAt userCart role email "
  )
    .populate("userCart")
    .lean();
  return (
    <main className="relative max-w-[1920px]">
      <AdminPanel
        allOrders={dataParser(allOrders)}
        growthData={dataParser(growthData)}
      />
    </main>
  );
}

export default page;
