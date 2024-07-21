import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import { CheckOtpType } from "@/types/models/user.type";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth/auth";
import { checkOtpSchema } from "@/utils/validator/user/userValidator";
import axios from "axios";

export const POST = async (req: Request) => {
  const date = new Date();
  const now = date.getTime();
  try {
    await dbConnection();
    const body = await req.json();
    const { code, phoneNumber }: CheckOtpType = body;
    await checkOtpSchema.validateAsync(body);
    const user = await UserModel.findOne({
      phoneNumber,
    });

    const response = await axios.post(
      "https://api.limosms.com/api/checkcode",
      {
        Mobile: phoneNumber,
        Code: code,
      },
      {
        headers: {
          ApiKey: process.env.LIMO_API_KEY,
        },
      }
    );
    if (user && user?.expTime > now) {
      return Response.json(
        { message: "کد اعتبار سنجی منقضی شده است" },
        { status: 410 }
      );
    }
    if (response.data?.success !== true)
      return Response.json({ message: response.data?.message },{status:422});


    const accessToken = generateAccessToken({  email: user.email });
    const refreshToken = generateRefreshToken({  email: user.email });
    const headers = new Headers();
    if (user.isActive) {
      headers.append(
        "Set-Cookie",
        `SetCoffeeToken=${accessToken};Path=/; HttpOnly; Max-Age=43200`
      );
      headers.append(
        "Set-Cookie",
        `refresh-token=${refreshToken};Path=/; HttpOnly; Max-Age=1296000`
      );
      return Response.json(
        { message: "ورود با موفقیت انجام شد" },
        { status: 200,headers}
      );
    } else {
      await UserModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { isActive: true } }
      );
      return Response.json(
        { message: "ثبت نام با موفقیت انجام شد" },
        {
          status: 201,
          headers: {
            "Set-Cookie": `SetCoffeeToken=${accessToken};Path=/; HttpOnly; Max-Age=43200`,
            
          },
        }
      );
    }
  } catch (error: any) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
