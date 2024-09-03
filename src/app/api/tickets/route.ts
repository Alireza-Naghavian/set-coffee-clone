import dbConnection from "@/dbConfigs/db";
import DeptModel from "@/models/department/department";
import TicketModel from "@/models/tickets/ticket";
import UserModel from "@/models/user/user";
import { TicketType } from "@/types/models/ticket.type";
import { authAdmin, getUser } from "@/utils/auth/authHelper";
import { TicketSchema } from "@/utils/validator/tickets/ticketValidator";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const reqBody: TicketType = await req.json();
    const { body, dept, priority, title, user, isOpen, isAnswered, isPending } =
      reqBody;
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
      isAnswered,
      isPending,
    });
    await TicketModel.create({
      title,
      user: IsUser._id,
      priority,
      dept,
      body,
      isOpen,
      isAnswered: false,
      isPending: true,
    });
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
export const GET = async () => {
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }
    await DeptModel.findOne({},"_id").limit(1)
    await UserModel.findOne({},"_id").limit(1)
    const tickets = await TicketModel.find({}, "-__v -createdAt -updatedAt")
      .populate("dept", "title")
      .populate("user", "userName").lean();
    return Response.json({ tickets }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
