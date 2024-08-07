import dbConnection from "@/dbConfigs/db";
import DeptModel from "@/models/department/department";
import { DepartmentType } from "@/types/models/ticket.type";
import { getUser } from "@/utils/auth/authHelper";

export const POST = async (req: Request) => {
  try {
    await dbConnection();


    // admin validation
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
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
