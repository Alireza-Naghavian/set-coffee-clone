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
    await TicketModel.findOneAndUpdate(
      { _id: ticketId },
      { $set: { isAnswered: false, isPending: true } }
    );
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
    const data = await TicketModel.findOne({ _id: ticketId }, "-__v")
      .populate("messages.sender", "userName role")
      .populate("adminMessages.sender", "userName role")
      .populate("user", "userName")
      .lean();
    return Response.json(data, { status: 200 });
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

export const PATCH = async (req: Request, { params }: Params) => {
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
    const reqBody = await req.json();
    const { isPending, isAnswered, isOpen } = reqBody;
    const ticket = await TicketModel.findOne({ _id: ticketId });
    if (isOpen == true && ticket.isOpen == true) {
      return Response.json(
        { message: "تیکت از قبل باز  است" },
        { status: 422 }
      );
    }
    if (!ticket.isAnswered) {
      return Response.json(
        { message: "ابتدا پاسخ تیکت را بدهید" },
        { status: 403 }
      );
    }

    const newTicketCondition = {
      isPending,
      isAnswered,
      isOpen,
    };
    const updateTicket = await TicketModel.findOneAndUpdate(
      { _id: ticketId },
      { $set: newTicketCondition },
      { new: true }
    );

    return Response.json(
      {
        message: `تیکت مورد نظر${
          updateTicket.isOpen == true ? "باز" : "بسته"
        } شد`,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
