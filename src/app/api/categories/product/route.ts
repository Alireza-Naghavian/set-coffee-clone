import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import { productSchema } from "@/utils/validator/categories/categoriesValidator";
import { writeFile } from "fs/promises";
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

export const GET = async () => {
  try {
    await dbConnection();

    const allProducts = await ProductModel.find({}, "-__v -updatedAt -longDesc -shortDesc")
      .populate("category", "-products -__v ")
      .lean();

    return Response.json({ data: allProducts }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
