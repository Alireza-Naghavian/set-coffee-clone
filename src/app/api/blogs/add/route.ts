import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
import { MainBlogType } from "@/types/blog.type";
import { authAdmin } from "@/utils/auth/authHelper";
import { blogSchema } from "@/utils/validator/blogs/blogsValidator";
export const dynamic = "force-dynamic";
export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      return Response.json(
        { message: "شما اجازه دسترسی ندارید" },
        { status: 403 }
      );
    }
    const reqBody: MainBlogType = await req.json();
    const { cover, longDesc, provider, shortDesc, title } = reqBody;
    await blogSchema.validateAsync(reqBody);

    await BlogsModel.create({ cover, longDesc, provider, shortDesc, title });

    return Response.json(
      { message: "مقاله با موفقیت افزوده شد" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
