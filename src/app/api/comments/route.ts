import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import { getUser } from "@/utils/auth/authHelper";

export const GET = async () => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
    }
    await ProductModel.findOne({},"")
    const allComments = await CommentModel.find({}, "-__v").populate("productData","title").lean();
    return Response.json({ data: allComments });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
