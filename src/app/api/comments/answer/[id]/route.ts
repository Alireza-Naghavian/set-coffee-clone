import dbConnection from "@/dbConfigs/db";
import CommentModel from "@/models/comment/comment";
import { MessagesType } from "@/types/models/ticket.type";
import { getUser } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const IsUser = await getUser();
    if (!IsUser)
      return Response.json(
        { message: "لطفا ثبت نام کنید/وارد شوید." },
        { status: 401 }
      );
      const {id} = params;
      if(!isValidObjectId(id)) return Response.json({message:"شناسه کامنت نامعتبر است"},{status:404})
      const reqbody:MessagesType = await req.json();
        const {body,sendAt,sender} =reqbody;
        const message = await CommentModel.findById(id);
        if(!message) return notFound();
        message.messages.push({
          sender,
          body,
          sendAt:new Date()
        })

        await CommentModel.findOneAndUpdate({_id:id},{$set:{isAccept:true}})
        await message.save();
        return Response.json({message:"پاسخ شما با موفقیت ارسال گردید"},{status:201})
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
