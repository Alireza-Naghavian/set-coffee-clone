import dbConnection from "@/dbConfigs/db";
import sendOtpModel from "@/models/user/sendOtp";
import UserModel from "@/models/user/user";
import { sendOtpSchema } from "@/utils/validator/user/userValidator";
import axios from "axios";

import { StatusCodes as HttpStatus } from "http-status-codes";
type PhoneNumberType = {
  phoneNumber: string;
};
const CODE_EXPIRES = 120 * 1000;
export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body = await req.json();
    const { phoneNumber }: PhoneNumberType = body;
    await sendOtpSchema.validateAsync(body);
    const isUserExist = await UserModel.findOne({
      phoneNumber: phoneNumber,
    });

    if (!isUserExist)
      return Response.json({
        message: "کاربری با این شماره موبایل ثبت نشده است",
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
            // data: ` زمان منفضی:${CODE_EXPIRES} \n شماره:${phoneNumber}`,
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

    await sendOtpModel.create({
      phoneNumber,
      expTime: CODE_EXPIRES,
    });
    return Response.json(
        {
          message: `کد تایید برای شماره موبایل ${phoneNumber} ارسال گردید`,
          // data: ` زمان منفضی:${CODE_EXPIRES} \n شماره:${phoneNumber}`,
        },
        { status: HttpStatus.OK }
      );
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
