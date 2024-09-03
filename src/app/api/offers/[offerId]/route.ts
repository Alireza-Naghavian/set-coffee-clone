import dbConnection from "@/dbConfigs/db";
import OfferModel from "@/models/offers/offer";
import { authAdmin } from "@/utils/auth/authHelper";
import { isValidObjectId } from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await dbConnection();
    const isAdmin =  await authAdmin();
    if (!isAdmin) {
      return Response.json({ message: "شما اجازه دسترسی ندارید" }, { status: 403 });
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
