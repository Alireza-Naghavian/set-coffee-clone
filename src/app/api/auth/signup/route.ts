import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import { UserType } from "@/types/models/user.type";
import { hashPassword } from "@/utils/auth/auth";
import { signUpUserSchema } from "@/utils/validator/user/userValidator";
import axios from "axios";
import { StatusCodes as HttpStatus } from "http-status-codes";
const CODE_EXPIRES = 120 * 1000;
export async function POST(req: Request) {
  try {
    await dbConnection();
    const body = await req.json();
    await signUpUserSchema.validateAsync(body);

    const { password, phoneNumber, userName, email,postCode}: UserType = body;

    const isUserExist = await UserModel.findOne({
      $or: [{ userName }, { email }, { phoneNumber }],
    });

    if (isUserExist)
      return Response.json(
        {
          message:
            "نام کاربری، کلمه عبور یا شماره موبایل قبلا استفاده شده است.",
        },
        { status: 422 }
      );

    const hashedPassword = await hashPassword(password);

    const users: UserType[] = await UserModel.find({});

    await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      role: users.length > 0 ? "USER" : "ADMIN",
      phoneNumber,
      expTime: CODE_EXPIRES,
      postCode:0
    });

    await axios
      .post(
        "https://api.limosms.com/api/sendcode",
        {
          Mobile: phoneNumber,
          Footer: "کد دسترسی",
          template: "registerVerify",
        },
        {
          headers: {
            ApiKey: process.env.LIMO_API_KEY,
          },
        }
      )
      .then(function (reaponse) {
        console.log(reaponse.data);
        return Response.json(
          {
            message: `کد تایید برای شماره موبایل ${phoneNumber} ارسال گردید`,
            data: phoneNumber,
          },
          { status: HttpStatus.OK }
        );
      })
      .catch(function (error) {
        console.log(error);
        return Response.json(
          { message: "ارسال پیام اعتبارسنجی ناموفق بود" },
          { status: HttpStatus.INTERNAL_SERVER_ERROR }
        );
      });
    return Response.json(
      {
        message: `کد تایید برای شماره موبایل ${phoneNumber} ارسال گردید`,
        data: phoneNumber,
      },
      { status: HttpStatus.OK }
    );
  } catch (error: any) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
}
