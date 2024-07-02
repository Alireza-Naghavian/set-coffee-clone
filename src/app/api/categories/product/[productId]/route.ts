import dbConnection from "@/dbConfigs/db";
import CommentModel from "@/models/comment/comment";
import ProductModel from "@/models/categories&products/product";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
export const GET = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const { productId } = params;
    if (!isValidObjectId(productId)) {
      throw notFound();
    }
    await CommentModel.find().limit(0);
    const product = await ProductModel.findOne({ _id: productId }, "-__v")
      .populate({
        path: "category",
        select: "-__v",
        populate: { path: "products", options: { limit: 4 } },
      })
      .populate({ path: "ProductComment", select: "-__v" })
      .lean();

    if (!product) throw notFound();
    return Response.json({ data: product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
