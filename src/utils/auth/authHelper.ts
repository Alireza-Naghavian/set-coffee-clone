import dbConnection from "@/dbConfigs/db";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./auth";
import UserModel from "@/models/user/user";

const getUser = async () => {
  try {
    await dbConnection();
    const token = cookies().get("SetCoffeeToken");

    if (!token) throw new Error("خطا در احراز هویت");
    let user = null;
    if (token) {
      const tokenPayLoad: any = verifyAccessToken(token.value);
      if (tokenPayLoad) {
        user = await UserModel.findOne(
          { email: tokenPayLoad?.email },
          "userName email phoneNumber role isActive password postCode"
        );
      }
    }
    return user;
  } catch (error) {
    console.log("something went wrong =>", error);
  }
};

const authAdmin = async () => {
  try {
    await dbConnection();
    const token = cookies().get("SetCoffeeToken");
    if (!token) throw new Error("خطا در احراز هویت");

    if (token) {
      const tokenPayLoad: any = verifyAccessToken(token.value);
      if (!tokenPayLoad) throw new Error("خطا در اعتبارسنجی توکن");
      const user = await UserModel.findOne(
        { email: tokenPayLoad?.email },
        "userName email phoneNumber role isActive password postCode"
      );
      if (!user || user.role !== "ADMIN") {
        throw new Error("شما اجازه دسترسی ندارید");
      }
      return user
    }
  } catch (error) {
    console.log("something went wrong  with auth admin =>", error);
  }
};
export { getUser, authAdmin };
