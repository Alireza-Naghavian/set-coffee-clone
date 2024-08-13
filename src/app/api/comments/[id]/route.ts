import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import { CommentModeltype } from "@/types/models/comment.type";
import { getUser } from "@/utils/auth/authHelper";
import { commentSchema } from "@/utils/validator/comments/commentsValidator";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const body = await req.json();
    const { productId, commentBody, score }: CommentModeltype = body;
    const { id } = params;
    await commentSchema.validateAsync(body);
    const user = await getUser();
    if (!user) {
      return Response.json(
        { message: "لطفا ثبت نام کنید یا وارد شوید" },
        { status: 422 }
      );
    }

    const comment = await CommentModel.create({
      productId: id,
      commentBody,
      userName: user.userName,
      score,
    });
    //dynamic product score
    const allProductComments = await CommentModel.find({ productId: id });
    const map = allProductComments.map((comment) => {
      return comment.score;
    });

    //sum all product comment scores
    const sumScore = map.reduce((a, b) => {
      return a + b;
    }, 0);

    const averageScore = Math.round(sumScore / allProductComments.length);

    const updatedProuductScore = await ProductModel.findOneAndUpdate(
      { _id: id },
      {
        $set: allProductComments.length
          ? { score: averageScore }
          : { score: 5 },
      },
      { new: true }
    );
    //update product in category
    await CategoryModel.findOneAndUpdate(
      { _id: updatedProuductScore.category, "products._id": id },
      {
        $set: allProductComments.length
          ? { "products.$.score": averageScore }
          : { "products.$.score": 5 },
      }
    );
    revalidatePath("/p-admin/comments")
    return Response.json(
      {
        message:
          "کامنت با موفقیت ثبت شد پس از تایید مدیریت نمایش داده خواهد شد",
        comment: comment,
      },
      { status: 201 }
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
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
    }
    const { id } = params;
    if (!isValidObjectId(id))
      return Response.json(
        { message: "شناسه کامنت معتبر نمی باشد." },
        { status: 404 }
      );
    const comment = await CommentModel.findOne({ productId: id });
    return Response.json({ data: comment });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
    }
    const { id } = params;
    if (!isValidObjectId(id))
      return Response.json(
        { message: "شناسه کامنت معتبر نمی باشد." },
        { status: 404 }
      );
    await CommentModel.findOneAndDelete({ _id: id });
    return Response.json(
      { message: "کامنت مورد نظر  با موفقیت حذف گردید" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
