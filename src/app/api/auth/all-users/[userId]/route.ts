import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import { getUser } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user?.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید!" },
        { status: 422 }
      );
    }
    const reqBody = await req.json();
    const { role }: { role: string } = reqBody;
    const { userId } = params;
    if (!isValidObjectId(userId))
      return Response.json(
        { message: "شناسه کاربری معتبر نمی باشد" },
        { status: 404 }
      );

    await UserModel.findOneAndUpdate({ _id: userId }, {$set:{role}});

    return Response.json({ message: "نقش کاربر آپدیت گردید" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};

export const DELETE = async(req:Request,{params}:Params)=>{
  try {
    await dbConnection();
    const user = await getUser();
    if (user?.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید!" },
        { status: 422 }
      );
    }
    const { userId } = params;
    if (!isValidObjectId(userId))
      return Response.json(
        { message: "شناسه کاربری معتبر نمی باشد" },
        { status: 404 }
      );

      await UserModel.findOneAndDelete({_id:userId}).populate("userCart").lean();

      return Response.json({message:"کاربر با موفقیت حذف گردید"},{status:201})
  } catch (error) {
        return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
}
