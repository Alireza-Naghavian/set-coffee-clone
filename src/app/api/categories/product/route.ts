import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import { SingleProductType } from "@/types/models/categories.type";
import { authAdmin } from "@/utils/auth/authHelper";
import { productSchema } from "@/utils/validator/categories/categoriesValidator";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

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
    const reqBody = await req.json();
    const {
      category,
      cover,
      entities,
      longDesc,
      price,
      shortDesc,
      smell,
      suitableFor,
      tags,
      title,
      weight,
    }: SingleProductType = reqBody;
    const productData = {
      category,
      cover,
      longDesc,
      title,
      price,
      shortDesc,
      smell,
      tags,
      weight,
      suitableFor,
      entities,
    };
    console.log(reqBody);
    const isProductExist = await ProductModel.findOne({ title });
    if (isProductExist) {
      return Response.json(
        { message: "این کالا از قبل وجود دارد" },
        { status: 400 }
      );
    }

    await productSchema.validateAsync(reqBody);

    //add product to category

    const product = await ProductModel.create(productData);
    const categoryDoc = await CategoryModel.findById(category);

    if (!categoryDoc) {
      return Response.json({ message: "دسته بندی پیدا نشد" }, { status: 404 });
    }
    categoryDoc.products.push(product);
    await categoryDoc.save();

    return Response.json(
      { message: "محصول با موفقیت افزوده شد", data: product, categoryDoc },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
const buildMatchQuery = (
  minPrice: number,
  maxPrice: number,
  rateStar: number,
  categoryId?: string
) => {
  const matchQuery: any = {
    price: { $gte: minPrice, $lte: maxPrice },
    score: { $lte: rateStar },
  };

  if (categoryId && mongoose.isValidObjectId(categoryId)) {
    matchQuery.category = new mongoose.Types.ObjectId(categoryId);
  }

  return matchQuery;
};
export const GET = async (req: NextRequest) => {
  try {
    await dbConnection();
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "latest";
    const categoryId = searchParams.get("categoryId") || "";
    const minPrice = parseInt(searchParams.get("minPrice") || "0", 10);
    const maxPrice = parseInt(searchParams.get("maxPrice") || "10000000", 10);
    const rateStar = parseInt(searchParams.get("rateStar") || "5", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);
    const skip = (page - 1) * limit;
    let sortQuery: any = { createdAt: 1 };
    switch (sort) {
      case "latest":
        sortQuery = { createdAt: -1 };
        break;

      case "earliest":
        sortQuery = { createdAt: 1 };
        break;

      case "expensive":
        sortQuery = { price: -1 };
        break;

      case "lower_price":
        sortQuery = { price: 1 };
        break;

      default:
        sortQuery = { createdAt: -1 };
        break;
    }
    const matchQuery = buildMatchQuery(
      minPrice,
      maxPrice,
      rateStar,
      categoryId
    );
    const totalProduct = await ProductModel.countDocuments();
    const products = await ProductModel.find(
      matchQuery,
      "cover title score price createdAt shortDesc"
    )
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate("category", "-products -__v ")
      .lean();
    return Response.json({  products ,totalProduct,page,limit}, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
