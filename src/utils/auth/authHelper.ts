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
      const tokenPayLoad = verifyAccessToken(token.value);
      if (tokenPayLoad) {
        user = await UserModel.findOne(
          { email: tokenPayLoad?.email },
          "userName email phoneNumber role isActive"
        );
      }
    }
    return user;
  } catch (error) {
    console.log("something went wrong =>", error);
  }
};
export { getUser };
