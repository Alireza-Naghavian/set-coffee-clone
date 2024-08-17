import dbConnection from "@/dbConfigs/db";
import TicketModel from "@/models/tickets/ticket";
import { MessagesType } from "@/types/models/ticket.type";
import { getUser } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
    }
    const { ticketId } = params;
    if (!isValidObjectId(ticketId)) return notFound();
    const reqBody = await req.json();
    const { body, sendAt, sender }: MessagesType = reqBody;
    if (!sender || !body.trim()) {
      return Response.json(
        { message: "پاسخ ارسالی نامعتبر است" },
        { status: 400 }
      );
    }
    const ticket = await TicketModel.findById(ticketId);
    if (!ticket) return notFound();
    ticket.adminMessages.push({
      sender,
      body,
      sendAt: new Date(),
    });
    await TicketModel.findOneAndUpdate(
      { _id: ticketId },
      { $set: { isAnswered: true, isPending: false } }
    );
    await ticket.save();
    return Response.json(
      { message: "پاسخ شما برای کاربر ارسال گردید" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
