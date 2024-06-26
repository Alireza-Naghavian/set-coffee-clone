import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import { categoriesType } from "@/types/models/categories.type";
import { categorySchema } from "@/utils/validator/categories/categoriesValidator";
import products from "@/models/categories&products/product"; 
export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body: categoriesType = await req.json();
    const { title } = body;
    await categorySchema.validateAsync(body);
    const isCatExist = await CategoryModel.findOne({
      title,
    });

    if (isCatExist)
      return Response.json(
        { message: "این دسته بندی قبلا ثبت شده است" },
        { status: 402 }
      );
    await CategoryModel.create({
      title,
    });

    return Response.json(
      { message: "دسته بندی با موفقیت ایجاد شد" },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};

export const GET = async ():Promise<Response> => {
  try {
    await dbConnection();
    const allCategories = await CategoryModel.find({}, "-__v").lean()
    return Response.json({ data: allCategories }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
