import dbConnection from "@/dbConfigs/db";
import CommentModel from "@/models/comment/comment";
import { AnswerAdminType, MessagesType } from "@/types/models/ticket.type";
import { authAdmin } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }
    const { id } = params;
    if (!isValidObjectId(id))
      return Response.json(
        { message: "شناسه کامنت نامعتبر است" },
        { status: 404 }
      );
    const reqbody: MessagesType = await req.json();
    const { body, sendAt, sender } = reqbody;
    const message = await CommentModel.findById(id);
    if (!message) return notFound();
    message.messages.push({
      sender,
      body,
      sendAt: new Date(),
    });

    await CommentModel.findOneAndUpdate(
      { _id: id },
      { $set: { isAccept: true } }
    );
    await message.save();
    return Response.json(
      { message: "پاسخ شما با موفقیت ارسال گردید" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }
    const reqBody = await req.json();
    const { senderId, body } = reqBody;
    const { id } = params;
    if (!isValidObjectId(id))
      return Response.json(
        { message: "شناسه کامنت نامعتبر است" },
        { status: 404 }
      );
    const comment = await CommentModel.findById(id);
    const lastAdminMsgs = comment.messages
      .filter(
        (message: AnswerAdminType) => message.sender
      )
      .pop();
    if (!lastAdminMsgs) {
      return Response.json(
        { message: "پیام ادمین یافت نشد." },
        { status: 404 }
      );
    }
    lastAdminMsgs.body = body;
    lastAdminMsgs.sendAt = new Date();
    await comment.save();
    return Response.json(
      { message: "پیام با موفقیت ویرایش شد." },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
