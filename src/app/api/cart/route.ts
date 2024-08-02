import dbConnection from "@/dbConfigs/db";
import CartModel from "@/models/cart/cart";
import { CartType } from "@/types/models/cart.type";
import { getUser } from "@/utils/auth/authHelper";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body = await req.json();
    const {
      postCode,
      cart,
      totalDiscount,
      totalItem,
      totalPrice,
      user,
    }: CartType = body;

    const userLoggedIn = await getUser();

    if (!userLoggedIn)
      return Response.json(
        { message: "ابتدا وارد شوید/ثبت نام کنید" },
        { status: 422 }
      );
    if (postCode === 0)
      return Response.json(
        {
          message: "لطفا از داخل پنل کاربری کد پستی خود را ثبت کنید.",
        },
        { status: 422 }
      );
    if (!postCode || !cart.length || !totalItem || !totalPrice || !user) {
      return Response.json(
        { message: "لطفا اطلاعات را به صورت کامل وارد کنید" },
        { status: 422 }
      );
    }

    const addToCart = await CartModel.create({
      postCode,
      cart,
      totalDiscount,
      totalItem,
      totalPrice,
      user,
    });
    return Response.json(
      { message: "سفارش با موفقیت ثبت شد.", data: addToCart },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await dbConnection();
    const user = await getUser();
    if (!user) return Response.json({ message: "لطفا وارد شوید/ثبت نام کنید" });
    const userCart = await CartModel.find({ user: user?._id });

    return Response.json({ data: userCart }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `خطای سمت سرور => `, error },
      { status: 500 }
    );
  }
};
