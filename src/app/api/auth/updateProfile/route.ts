import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import { GetMetype } from "@/types/auth.type";
import { hashPassword, verifyPassword } from "@/utils/auth/auth";
import { getUser } from "@/utils/auth/authHelper";
import { updateProfileSchema } from "@/utils/validator/user/userValidator";
export type UpdateProfileType = {
  [key: string]: string;
};
export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body = await req.json();
    const { lastPassword, newPassword, newUserName }: UpdateProfileType = body;
    await updateProfileSchema.validateAsync(body);
    const user: GetMetype = await getUser();
    if (!user)
      return Response.json(
        { message: "لطفا وارد حساب کاربری خود شوید" },
        { status: 404 }
      );
      if(user.password ===undefined) return
      const isValidPassword = await verifyPassword(lastPassword,user.password)
    if (!isValidPassword)
      return Response.json(
        { message: "کلمه عبور فعلی صحیح نیست!" },
        { status: 422 }
      );

      const hashedPassword = await hashPassword(newPassword)
    const newProfileData = { password: hashedPassword, userName: newUserName.trim() || user.userName };
    await UserModel.findOneAndUpdate({email: user.email},{$set:newProfileData});
    return Response.json(
      { message: "اطلاعات با موفقیت آپدیت شد" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
