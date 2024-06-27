import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

export const GET = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const { productId } = params;
    if (!isValidObjectId(productId)) throw new Error(notFound());
    const product = await ProductModel.findOne({ _id: productId }, "-__v")
      .populate("category", "-products -__v")
      .lean();
    return Response.json({ data: product }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
