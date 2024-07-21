import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/auth/auth";
import { signInUserSchema } from "@/utils/validator/user/userValidator";
import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body = await req.json();
    const { password, identifier }: { identifier: string; password: string } = body;
    await signInUserSchema.validateAsync(body);
    const isUserExist = await UserModel.findOne({ email:identifier });
    if (!isUserExist)
      return Response.json({ message: "کاربری با این اطلاعات وجود ندارد" },{status:404});

    const isValidPassword = await verifyPassword(
      password,
      isUserExist.password
    );
    if (!isValidPassword)
      return Response.json(
        { message: "اطلاعات وارد شده صحیح نمی باشد" },
        { status: 422 }
      );
     
    const accessToken = generateAccessToken({ email:isUserExist.email });
    const refreshToken = generateRefreshToken({ email:isUserExist.email });

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `SetCoffeeToken=${accessToken};Path=/; HttpOnly; Max-Age=43200`
    );
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};Path=/; HttpOnly; Max-Age=1296000`
    );
    revalidatePath("/","layout")
    return Response.json({
      message:"شما با موفقیت وارد شدید"
    },{status:200,headers})
  } catch (error: any) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
