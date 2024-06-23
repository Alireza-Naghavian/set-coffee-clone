import dbConnection from "@/dbConfigs/db";
import { cookies } from "next/headers";

export const POST = async () => {
  const cookieNames: string[] = ["SetCoffeeToken", "refresh-token"];
  try {
    await dbConnection();
    const cookiesManager = cookies();
    cookieNames.forEach((cookie) => {
      return cookiesManager.delete(cookie);
    });
    return Response.json({ message: "خروج موفق" });
  } catch (error) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
