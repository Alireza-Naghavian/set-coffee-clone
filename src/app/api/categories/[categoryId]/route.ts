import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import mongoose, { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";
export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    await dbConnection();
    const { categoryId } = params;
    if (!isValidObjectId(categoryId))
      return Response.json({ message: "آیدی معتبر نیست" });

    const searchParams = req.nextUrl.searchParams;
    const sort = searchParams.get("sort");
    const minPrice = parseInt(searchParams.get("minPrice") || "0", 10);
    const maxPrice = parseInt(searchParams.get("maxPrice") || "100000000", 10);
    const minWeight = parseInt(searchParams.get("minweight") || "0", 10);
    const maxWeight = parseInt(searchParams.get("maxweight") || "100", 10);
    const rateStar = parseInt(searchParams.get("rateStar") || "5", 10);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const limit = limitParam ? parseInt(limitParam, 10) : 4;
    const skip = (page - 1) * limit;
    let sortQuery: any = { "products.createdAt": 1 };
    switch (sort) {
      case "latest":
        sortQuery = { "products.createdAt": -1 };
        break;

      case "earliest":
        sortQuery = { "products.createdAt": 1 };
        break;

      case "expensive":
        sortQuery = { "products.price": -1 };
        break;

      case "lower_price":
        sortQuery = { "products.price": 1 };
        break;

      default:
        sortQuery = { "products.createdAt": -1 };
        break;
    }
    const matchQuery: any = {
      "products.price": { $gte: minPrice, $lte: maxPrice },
      "products.weight": { $gt: minWeight, $lt: maxWeight },
      "products.score": { $eq: rateStar },
    };
    const category = await CategoryModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(categoryId) } },
      { $unwind: "$products" },
      { $sort: sortQuery },
      { $match: matchQuery },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          "products._id": 1,
          "products.score": 1,
          "products.price": 1,
          "products.cover": 1,
          "products.title": 1,
          "products.createdAt": 1,
          "products.weight": 1,
        },
      },
      { $group: { _id: "$_id", products: { $push: "$products" } } },
    ]);
    if (!category.length)
      return Response.json({ message: "دسته بندی یافت نشد", data: null });

    return Response.json({ data: category });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
