import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import { productSchema } from "@/utils/validator/categories/categoriesValidator";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import path from "path";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const formData = await req.formData();
    const category = formData.get("category") as string;
    const cover = formData.get("cover") as File;
    const longDesc = formData.get("longDesc") as string;
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const shortDesc = formData.get("shortDesc") as string;
    const smell = formData.get("smell") as string;
    const tags = (formData.get("tags") as string).split(",");
    const weight = parseFloat(formData.get("weight") as string);
    const suitableFor = formData.get("suitableFor") as string;

    const productData = {
      category,
      cover: "",
      longDesc,
      title,
      price,
      shortDesc,
      smell,
      tags,
      weight,
      suitableFor,
    };

    const isProductExist = await ProductModel.findOne({ title });
    if (isProductExist) {
      return Response.json(
        { message: "این کالا از قبل وجود دارد" },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await cover.arrayBuffer());
    const fileName = Date.now() + path.extname(cover.name);
    const imgPath = path.join(process.cwd(), "public/uploads/" + fileName);
    await writeFile(imgPath, buffer);
    productData.cover = `http://localhost:3000/uploads/${fileName}`;
    await productSchema.validateAsync(productData);

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
const buildMatchQuery = (minPrice: number, maxPrice: number, rateStar: number, categoryId?: string) => {
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
    const searchParams = req.nextUrl.searchParams;
    const sort = searchParams.get("sort") || "latest";
    const categoryId = searchParams.get("categoryId") || "";
    const minPrice = parseInt(searchParams.get("minPrice") || "0", 10);
    const maxPrice = parseInt(searchParams.get("maxPrice") || "10000000", 10);
    const rateStar = parseInt(searchParams.get("rateStar") || "5", 10);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const limit = limitParam ? parseInt(limitParam, 10) : 4;
    const skip = (page - 1) * limit;
    let sortQuery: any = { "createdAt": 1 };
    switch (sort) {
      case "latest":
        sortQuery = { "createdAt": -1 };
        break;

      case "earliest":
        sortQuery = { "createdAt": 1 };
        break;

      case "expensive":
        sortQuery = { "price": -1 };
        break;

      case "lower_price":
        sortQuery = { "price": 1 };
        break;

      default:
        sortQuery = { "createdAt": -1 };
        break;
    }
    const matchQuery = buildMatchQuery(minPrice, maxPrice, rateStar, categoryId);
    const products = await ProductModel.find(matchQuery,"cover title score price createdAt")
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate("category", "-products -__v ")
      .lean();
    return Response.json({ data: products }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
