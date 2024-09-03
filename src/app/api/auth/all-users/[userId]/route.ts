import dbConnection from "@/dbConfigs/db";
import UserModel from "@/models/user/user";
import { authAdmin } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();

    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
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
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};

export const DELETE = async(req:Request,{params}:Params)=>{
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
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
