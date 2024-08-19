import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import { authAdmin } from "@/utils/auth/authHelper";
export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    await dbConnection();
   const isAdmin =  await authAdmin();

    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }
    await ProductModel.findOne({},"_id")
    const allComments = await CommentModel.find({}, "-__v").populate("productData","title").lean();
    return Response.json({ allComments });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
