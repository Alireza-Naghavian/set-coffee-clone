import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import { getUser } from "@/utils/auth/authHelper";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body = await req.json();
    const { postCode } = body;
    const isUserLoggedIn = await getUser();
    if (!isUserLoggedIn)
      return Response.json(
        { message: "لطفا ثبت نام کنید /وارد شوید" },
        { status: 422 }
      );


      if (typeof postCode !== 'number') {
        return Response.json(
          { message: "کد پستی باید یک عدد باشد" },
          { status: 422 }
        );
      }
    await UserModel.findOneAndUpdate(
      { _id: isUserLoggedIn._id },
      { $set: { postCode: postCode } }
    );
    return Response.json(
      { message: "کد پستی با موفقیت ذخیره شد" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
