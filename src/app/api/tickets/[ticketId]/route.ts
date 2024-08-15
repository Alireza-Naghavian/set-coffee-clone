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
    const { ticketId } = params;
    if (!isValidObjectId(ticketId)) return notFound();
    const reqBody: MessagesType = await req.json();
    const { body, sendAt, sender } = reqBody;
    if (!sender || !body.trim()) {
      return Response.json(
        { message: "پاسخ ارسالی نامعتبر است" },
        { status: 400 }
      );
    }

    const ticket = await TicketModel.findById(ticketId);
    if (!ticket) return notFound();

    ticket.messages.push({
      sender,
      body,
      sendAt: new Date(),
    });

    await ticket.save();

    return Response.json({ data: ticket }, { status: 201 });
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
    const { ticketId } = params;
    if (!isValidObjectId(ticketId)) return notFound();
    const userTickets = await TicketModel.findOne({ _id: ticketId }, "-__v")
      .populate("user", "userName")
      .lean();
    return Response.json({ data: userTickets }, { status: 200 });
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
    const { ticketId } = params;
    if (!isValidObjectId(ticketId))
      return Response.json(
        { message: "شناسه تیکت معتبر نمیباشد" },
        { status: 404 }
      );
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
    }
    await TicketModel.findOneAndDelete({ _id: ticketId });
    return Response.json(
      { message: "تیکت مورد نظر حذف گردید" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
