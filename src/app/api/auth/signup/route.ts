import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import { UserType } from "@/types/models/user.type";
import { generateAccessToken, hashPassword } from "@/utils/auth/auth";
import { signUpUserSchema } from "@/utils/validator/user/userValidator";

export async function POST(req: Request) {
  try {
    await dbConnection();
    const body = await req.json();
    await signUpUserSchema.validateAsync(body);

    const { password, phoneNumber, userName, email }: UserType = body;

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
    const accessToken = generateAccessToken({ userName });

    const users: UserType[] = await UserModel.find({});

    await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      role: users.length > 0 ? "USER" : "ADMIN",
      phoneNumber,
    });

    return Response.json(
      { message: "ثبت نام با موفقیت انجام شد" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `SetCoffeeToken=${accessToken};path=/;httpOnly=true`,
        },
      }
    );
  } catch (error:any) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
}
