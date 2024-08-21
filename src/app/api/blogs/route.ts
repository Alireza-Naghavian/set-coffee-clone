import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
import { authAdmin } from "@/utils/auth/authHelper";

export const GET = async () => {
  try {
    await dbConnection();
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      return Response.json(
        { message: "شما اجازه دسترسی ندارید" },
        { status: 403 }
      );
    }

    const blogs = await BlogsModel.find({}, "-__v -updatedAt -longDesc ")
      .populate("provider", "userName")
      .lean();
    return Response.json(blogs, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
