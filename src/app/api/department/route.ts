import dbConnection from "@/dbConfigs/db";
import DeptModel from "@/models/department/department";
import { DepartmentType } from "@/types/models/ticket.type";
import { authAdmin } from "@/utils/auth/authHelper";

export const POST = async (req: Request) => {
  try {
    await dbConnection();


    // admin validation
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
    }
    const reqBody: DepartmentType = await req.json();
    const { title } = reqBody;
    await DeptModel.create({ title });
    return Response.json(
      { message: "دپارتمان با موفقیت ایجاد شد ." },
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

    const allDept = await DeptModel.find({}, "-__v ");
    return Response.json(allDept, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
