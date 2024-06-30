import dbConnection from "@/dbConfigs/db";
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
    console.log(user);
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
    return Response.json(
      {
        message:
          "کامنت با موفقیت ثبت شد پس از تایید مدیریت نمایش داده خواهد شد",
        comment: comment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
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
