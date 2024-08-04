import dbConnection from "@/dbConfigs/db";
import TicketModel from "@/models/tickets/ticket";
import { TicketType } from "@/types/models/ticket.type";
import { getUser } from "@/utils/auth/authHelper";
import { TicketSchema } from "@/utils/validator/tickets/ticketValidator";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const reqBody: TicketType = await req.json();
    const { body, dept, priority, title ,user,isOpen} = reqBody;
    const IsUser = await getUser();
    if (!IsUser)
      return Response.json(
        { message: "لطفا ثبت نام کنید/وارد شوید." },
        { status: 401 }
      );
    await TicketSchema.validateAsync({
      body,
      dept,
      priority,
      title,
      user,
    });
    await TicketModel.create({ title, user: IsUser._id, priority, dept, body,isOpen });
    return Response.json(
      { message: "تیکت با موفقیت ایجاد شد." },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
