import dbConnection from "@/dbConfigs/db";
import CommentModel from "@/models/comment/comment";
import ProductModel from "@/models/categories&products/product";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import { getUser } from "@/utils/auth/authHelper";
import CategoryModel from "@/models/categories&products/categories";
import { revalidatePath } from "next/cache";

export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user.role !== "ADMIN")
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید" },
        { status: 422 }
      );
    const { productId } = params;
    if (!isValidObjectId(productId))
      return Response.json(
        { message: "محصولی با این شناسه یافت نشد" },
        { status: 404 }
      );
    const product = await ProductModel.findOneAndDelete({ _id: productId });
    if (!product)
      return Response.json(
        { message: "محصولی با این شناسه یافت نشد" },
        { status: 404 }
      );
    await CategoryModel.updateMany(
      { "products._id": productId },
      { $pull: { products: { _id: productId } } }
    );
    revalidatePath("/p-admin/products/manage");
    return Response.json(
      { message: "محصول با موفقیت حذف شد." },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};

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
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
