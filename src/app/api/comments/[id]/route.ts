import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import { CommentModeltype } from "@/types/models/comment.type";
import { getUser } from "@/utils/auth/authHelper";
import { commentSchema } from "@/utils/validator/comments/commentsValidator";
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
      { _id: updatedProuductScore.category, "products._id":id },
      {
        $set: allProductComments.length
          ? { "products.$.score": averageScore  }
          : { "products.$.score": 5   },
      }
    );
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
    const { id } = params;
    const comment = await CommentModel.findOne({ productId: id });
    return Response.json({ data: comment });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
