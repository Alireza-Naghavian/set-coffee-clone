import dbConnection from "@/dbConfigs/db";
import CartModel from "@/models/cart/cart";
import UserModel from "@/models/user/user";
import { getUser } from "@/utils/auth/authHelper";
export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user?.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید!" },
        { status: 422 }
      );
    }
    await CartModel.findOne({}, "_id").limit(1);

    const users = await UserModel.find({}, "-createdAt -updatedAt -__v ")
      .populate("userCart", "_id")
      .lean();
    return Response.json({  users }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
