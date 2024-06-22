import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import { verifyAccessToken } from "@/utils/auth/auth";
import { JwtPayload } from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    await dbConnection();
    const token: RequestCookie | undefined = cookies().get("SetCoffeeToken");
    let user: string | null | JwtPayload = null;
    if (token) {
      const tokenPayload = verifyAccessToken(token.value);
      if (tokenPayload) {
        user = await UserModel.findOne(
          {
            email: tokenPayload?.email,
          },
          "-password -refreshToken -__v"
        );
      }
      return Response.json({ message: user }, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
