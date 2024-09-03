import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
export const dynamic = "force-dynamic";
export const GET = async (request: Request) => {
  try {
    await dbConnection();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);
    const skip = (page - 1) * limit;
    const totalBLogs = await BlogsModel.countDocuments();
    const blogs = await BlogsModel.find({}, "-__v -updatedAt -longDesc ")
      .populate("provider", "userName").skip(skip).limit(limit)
      .lean()
    return Response.json({blogs, totalBLogs, page, limit}, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
