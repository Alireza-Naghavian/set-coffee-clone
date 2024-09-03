import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
import { authAdmin } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      return Response.json(
        { message: "شما اجازه دسترسی ندارید" },
        { status: 403 }
      );
    }
    const { blogId } = params;
    if (!isValidObjectId(blogId)) {
      return Response.json(
        { message: "شناسه مقاله معتبر نیست " },
        { status: 404 }
      );
    }
    const blog = await BlogsModel.findOne({ _id: blogId });
    return Response.json(blog, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      return Response.json(
        { message: "شما اجازه دسترسی ندارید" },
        { status: 403 }
      );
    }
    const { blogId } = params;
    if (!isValidObjectId(blogId)) {
      return Response.json(
        { message: "شناسه مقاله معتبر نیست " },
        { status: 404 }
      );
    }
    await BlogsModel.findOneAndDelete({ _id: blogId });
    return Response.json(
      { message: "مقاله مورد نظر با موفقیت حذف گردید" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
