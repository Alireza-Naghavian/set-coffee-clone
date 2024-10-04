import dbConnection from "@/dbConfigs/db";
import subscribeModel from "@/models/subscription/subsctipton";

export const POST = async (request: Request) => {
  try {
    await dbConnection();
    const subscription = await request.json();
    const newSubscription = new subscribeModel(subscription);
    await newSubscription.save();
    return Response.json({ message: "اشتراک فعال شد" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
