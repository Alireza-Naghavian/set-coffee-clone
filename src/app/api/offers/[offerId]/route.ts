import dbConnection from "@/dbConfigs/db";
import OfferModel from "@/models/offers/offer";
import { getUser } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const user = await getUser();
    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "شما به این قسمت دسترسی ندارید." },
        { status: 404 }
      );
    }
    const { offerId } = params;
    if (!isValidObjectId(offerId)) return notFound();

    await OfferModel.findOneAndDelete({ _id: offerId });
    return Response.json(
      { message: "کد تخفیف مورد نظر حذف گردید" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `خطا سمت سرور =>`, error },
      { status: 500 }
    );
  }
};
